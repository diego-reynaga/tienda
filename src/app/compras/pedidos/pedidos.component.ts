import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { LoginService } from '../../servicios/login.service';
import { MensajeChat } from '../../modelo/mensaje-chat.modelo';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { CabeceroComponent } from "../../inicio/cabecero/cabecero.component";

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule, CabeceroComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  
  usuario: User | null = null;
  pedidos: any[] = [];
  contactos: any[] = [];
  mensajesChat: { [contactoId: string]: MensajeChat[] } = {};
  contactoSeleccionado: any = null;
  nuevoMensaje: string = '';
  pedidosExpandidos: { [key: string]: boolean } = {};
  
  private subscriptions: Subscription[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    // Obtener usuario autenticado
    const userSubscription = this.loginService.getAuthState().subscribe((user: User | null) => {
      this.usuario = user;
      if (user?.email) {
        this.cargarDatosUsuario(user.email);
      }
    });
    this.subscriptions.push(userSubscription);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  cargarDatosUsuario(email: string) {
    // Cargar pedidos del usuario (solo aprobados)
    const pedidosSubscription = this.firebaseService.obtenerComprasPorUsuario(email).subscribe(
      compras => {
        // Filtrar solo las compras aprobadas (tanto 'approved' como 'aprobada')
        this.pedidos = compras
          .filter(compra => compra.estado === 'approved' || compra.estado === 'aprobada')
          .sort((a, b) => {
            const fechaA = new Date(a.fecha || a.fechaCompra).getTime();
            const fechaB = new Date(b.fecha || b.fechaCompra).getTime();
            return fechaB - fechaA;
          });
      },
      error => {
        console.error('Error al cargar pedidos:', error);
      }
    );
    this.subscriptions.push(pedidosSubscription);

    // Cargar contactos del usuario
    const contactosSubscription = this.firebaseService.obtenerContactosPorUsuario(email).subscribe(
      contactos => {
        this.contactos = contactos.sort((a, b) => {
          const fechaA = this.obtenerFechaContacto(a);
          const fechaB = this.obtenerFechaContacto(b);
          const timeA = fechaA.toDate ? fechaA.toDate().getTime() : new Date(fechaA).getTime();
          const timeB = fechaB.toDate ? fechaB.toDate().getTime() : new Date(fechaB).getTime();
          return timeB - timeA;
        });
        
        // Cargar mensajes para cada contacto
        contactos.forEach(contacto => {
          if (contacto.id) {
            // Inicializar array de mensajes
            if (!this.mensajesChat[contacto.id]) {
              this.mensajesChat[contacto.id] = [];
            }
            
            const mensajesSubscription = this.firebaseService.obtenerMensajesPorContacto(contacto.id).subscribe(
              mensajes => {
                this.mensajesChat[contacto.id] = mensajes;
              },
              error => {
                console.error('Error al cargar mensajes del contacto:', error);
              }
            );
            this.subscriptions.push(mensajesSubscription);
          }
        });
      },
      error => {
        console.error('Error al cargar contactos:', error);
      }
    );
    this.subscriptions.push(contactosSubscription);
  }

  seleccionarContacto(contacto: any) {
    this.contactoSeleccionado = contacto;
    // Marcar mensajes como leídos
    if (contacto.id) {
      this.firebaseService.marcarMensajesComoLeidos(contacto.id, 'cliente');
    }
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim() && this.contactoSeleccionado && this.usuario) {
      const mensaje: MensajeChat = {
        contactoId: this.contactoSeleccionado.id,
        remitente: 'cliente',
        mensaje: this.nuevoMensaje.trim(),
        fechaEnvio: new Date(),
        leido: false,
        nombreRemitente: this.usuario.displayName || 'Cliente',
        emailRemitente: this.usuario.email || ''
      };

      this.firebaseService.agregarMensajeChat(mensaje).then(() => {
        this.nuevoMensaje = '';
      }).catch(error => {
        console.error('Error al enviar mensaje:', error);
        alert('Error al enviar mensaje. Verifica las reglas de Firestore.');
      });
    }
  }

  private scrollToBottom(): void {
    if (this.chatContainer) {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return '';
    
    // Manejar tanto el campo 'fecha' como 'fechaCompra'
    const fechaObj = fecha.toDate ? fecha.toDate() : new Date(fecha);
    const ahora = new Date();
    const diff = ahora.getTime() - fechaObj.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (dias === 0) {
      return fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (dias === 1) {
      return 'Ayer';
    } else if (dias < 7) {
      return `Hace ${dias} días`;
    } else {
      return fechaObj.toLocaleDateString('es-ES');
    }
  }

  obtenerEstadoPedido(estado: string): string {
    const estados: { [key: string]: string } = {
      'pending': 'Pendiente',
      'approved': 'Aprobado',
      'rejected': 'Rechazado',
      'pendiente': 'Pendiente',
      'aprobada': 'Aprobado',
      'rechazada': 'Rechazado',
      'procesando': 'Procesando',
      'enviado': 'Enviado',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };
    return estados[estado] || estado;
  }

  obtenerColorEstado(estado: string): string {
    const colores: { [key: string]: string } = {
      'pending': 'orange',
      'approved': 'green',
      'rejected': 'red',
      'pendiente': 'orange',
      'aprobada': 'green',
      'rechazada': 'red',
      'procesando': 'blue',
      'enviado': 'purple',
      'entregado': 'green',
      'cancelado': 'red'
    };
    return colores[estado] || 'gray';
  }

  calcularTotalPedido(productos: any[]): number {
    // Usar tanto 'price' como 'precio' y 'cantidad'
    return productos.reduce((total, producto) => {
      const precio = producto.price || producto.precio || 0;
      const cantidad = producto.cantidad || 1;
      return total + (precio * cantidad);
    }, 0);
  }

  tieneNuevosMensajes(contactoId: string): boolean {
    const mensajes = this.mensajesChat[contactoId] || [];
    return mensajes.some(mensaje => mensaje.remitente === 'personal' && !mensaje.leido);
  }

  obtenerUltimoMensaje(contactoId: string): string {
    const mensajes = this.mensajesChat[contactoId] || [];
    if (mensajes.length === 0) {
      // Si no hay mensajes del chat, mostrar el mensaje original del contacto
      const contacto = this.contactos.find(c => c.id === contactoId);
      if (contacto) {
        const mensajeOriginal = this.obtenerMensajeContacto(contacto);
        return mensajeOriginal.substring(0, 50) + (mensajeOriginal.length > 50 ? '...' : '');
      }
      return 'Mensaje de contacto enviado';
    }
    
    const ultimoMensaje = mensajes[mensajes.length - 1];
    return ultimoMensaje.mensaje.substring(0, 50) + (ultimoMensaje.mensaje.length > 50 ? '...' : '');
  }

  // Obtener el conteo total de mensajes (incluyendo el original)
  obtenerTotalMensajes(contactoId: string): number {
    const mensajes = this.mensajesChat[contactoId] || [];
    return mensajes.length + 1; // +1 por el mensaje original
  }

  // Método para crear un mensaje de bienvenida si no existe
  crearMensajeBienvenida(contacto: any): void {
    if (contacto.id && !this.mensajesChat[contacto.id]) {
      this.mensajesChat[contacto.id] = [];
    }
  }

  togglePedidoExpandido(pedidoId: string): void {
    this.pedidosExpandidos[pedidoId] = !this.pedidosExpandidos[pedidoId];
  }

  esPedidoExpandido(pedidoId: string): boolean {
    return this.pedidosExpandidos[pedidoId] || false;
  }

  obtenerResumenProductos(productos: any[]): string {
    if (!productos || productos.length === 0) {
      return 'Sin productos';
    }
    
    if (productos.length === 1) {
      return productos[0].name || productos[0].nombre || 'Producto';
    }
    
    const primerProducto = productos[0].name || productos[0].nombre || 'Producto';
    return `${primerProducto} y ${productos.length - 1} más`;
  }

  // Métodos auxiliares para manejar diferentes estructuras de contacto
  obtenerAsuntoContacto(contacto: any): string {
    return contacto.subject || contacto.asunto || 'Sin asunto';
  }

  obtenerNombreContacto(contacto: any): string {
    if (contacto.firstName && contacto.lastName) {
      return `${contacto.firstName} ${contacto.lastName}`;
    } else if (contacto.nombre && contacto.apellido) {
      return `${contacto.nombre} ${contacto.apellido}`;
    }
    return 'Cliente';
  }

  obtenerEmailContacto(contacto: any): string {
    return contacto.email || contacto.correo || '';
  }

  obtenerMensajeContacto(contacto: any): string {
    return contacto.message || contacto.mensaje || '';
  }

  obtenerTelefonoContacto(contacto: any): string {
    return contacto.phone || contacto.telefono || '';
  }

  obtenerFechaContacto(contacto: any): any {
    return contacto.fechaCreacion || contacto.fecha || new Date();
  }

  obtenerEstadoContacto(contacto: any): string {
    return contacto.estado || 'pendiente';
  }
}
