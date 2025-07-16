import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';
import { CabeceroComponent } from "../../inicio/cabecero/cabecero.component";
import { FooterInicioComponent } from "../../inicio/footer-inicio/footer-inicio.component";
import { FirebaseService } from '../../services/firebase.service';
import { MensajeChat } from '../../modelo/mensaje-chat.modelo';

interface Cliente {
  dni: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  direccion: string;
  telefono: string;
  email: string;
}

interface Producto {
  id: number;
  name: string;
  cantidad: number;
  price: number;
  category: string;
  discount: number;
  imageUrl: string;
  originalPrice: number;
  rating: number;
  reviews: number;
}

interface Venta {
  id: string;
  fecha: string;
  cliente: Cliente;
  productos: Producto[];
  total: number;
  estado: 'pending' | 'approved' | 'rejected';
  comprobante: string;
  codigoSeguridad: string;
}

interface Contacto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  fechaCreacion: any;
  estado: string;
}

interface Venta {
  id: string;
  fecha: string;
  cliente: Cliente;
  productos: Producto[];
  total: number;
  estado: 'pending' | 'approved' | 'rejected';
  comprobante: string;
  codigoSeguridad: string;
}

@Component({
  selector: 'app-aprobar-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class AprobarVentasComponent implements OnInit {
  ventas: Venta[] = [];
  ventasFiltradas: Venta[] = [];
  ventaSeleccionada: Venta | null = null;
  mostrarModal = false;
  filtro = '';
  filtroEstado = 'all';

  // Propiedades para el chat
  contactos: Contacto[] = [];
  contactoSeleccionado: Contacto | null = null;
  mostrarModalChat = false;
  mensajesChat: MensajeChat[] = [];
  nuevoMensaje = '';

  constructor(
    private pagosService: PagosService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    // Cargar compras
    this.firebaseService.escucharCompras().subscribe({
      next: (compras) => {
        // Procesar los datos para asegurar que estén en el formato correcto
        this.ventas = compras.map(compra => {
          console.log('Procesando compra:', compra); // Debug
          
          // Procesar productos con manejo de errores
          const productos = (compra.productos || []).map((producto: any) => {
            console.log('Procesando producto:', producto); // Debug
            return {
              id: producto.id || 0,
              name: producto.name || 'Producto sin nombre',
              cantidad: producto.cantidad || 0,
              price: producto.price || 0,
              category: producto.category || 'Sin categoría',
              discount: producto.discount || 0,
              imageUrl: producto.imageUrl || '',
              originalPrice: producto.originalPrice || 0,
              rating: producto.rating || 0,
              reviews: producto.reviews || 0
            };
          });
          
          return {
            id: compra.id,
            fecha: compra.fecha, // Mantener como string ISO para el pipe date
            cliente: {
              dni: compra.cliente?.dni || 'N/A',
              nombres: compra.cliente?.nombres || 'N/A',
              primerApellido: compra.cliente?.primerApellido || 'N/A',
              segundoApellido: compra.cliente?.segundoApellido || 'N/A',
              direccion: compra.cliente?.direccion || 'N/A',
              telefono: compra.cliente?.telefono || 'N/A',
              email: compra.cliente?.email || 'N/A'
            },
            productos: productos,
            total: compra.total || 0,
            estado: compra.estado || 'pending',
            comprobante: compra.comprobante || 'N/A',
            codigoSeguridad: compra.codigoSeguridad || 'N/A'
          };
        });
        
        console.log('Ventas procesadas:', this.ventas); // Debug
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Error al conectar con Firestore:', err);
        this.ventas = []; // Usar datos vacíos en caso de error
      },
    });

    // Cargar contactos
    this.cargarContactos();
  }

  cargarContactos(): void {
    this.firebaseService.obtenerTodosContactos().subscribe({
      next: (contactos) => {
        this.contactos = contactos.map(contacto => ({
          id: contacto.id,
          firstName: contacto.firstName || contacto.nombre || 'N/A',
          lastName: contacto.lastName || contacto.apellido || 'N/A',
          email: contacto.email || contacto.correo || 'N/A',
          phone: contacto.phone || contacto.telefono || 'N/A',
          subject: contacto.subject || contacto.asunto || 'N/A',
          message: contacto.message || contacto.mensaje || 'N/A',
          fechaCreacion: contacto.fechaCreacion || contacto.fecha || new Date(),
          estado: contacto.estado || 'pendiente'
        }));
        console.log('Contactos cargados:', this.contactos);
      },
      error: (err) => {
        console.error('Error al cargar contactos:', err);
      }
    });
  }

 

  aplicarFiltros(): void {
    let resultado = [...this.ventas];
    
    if (this.filtro) {
      const filtroLower = this.filtro.toLowerCase();
      resultado = resultado.filter(venta => {
        const dni = venta.cliente?.dni?.toLowerCase() || '';
        const nombres = venta.cliente?.nombres?.toLowerCase() || '';
        const primerApellido = venta.cliente?.primerApellido?.toLowerCase() || '';
        const segundoApellido = venta.cliente?.segundoApellido?.toLowerCase() || '';
        
        return dni.includes(filtroLower) || 
               nombres.includes(filtroLower) || 
               primerApellido.includes(filtroLower) ||
               segundoApellido.includes(filtroLower);
      });
    }
    
    if (this.filtroEstado !== 'all') {
      resultado = resultado.filter(venta => venta.estado === this.filtroEstado);
    }
    
    this.ventasFiltradas = resultado;
  }

 

  verDetalles(venta: Venta): void {
    this.ventaSeleccionada = venta;
    this.mostrarModal = true;
    
    // Debug: Imprimir los datos de la venta seleccionada
    console.log('Venta seleccionada:', venta);
    console.log('Productos:', venta.productos);
    
    // Debug: Verificar cada producto individualmente
    if (venta.productos && venta.productos.length > 0) {
      venta.productos.forEach((producto, index) => {
        console.log(`Producto ${index}:`, producto);
        console.log(`- name: ${producto.name}`);
        console.log(`- price: ${producto.price}`);
        console.log(`- cantidad: ${producto.cantidad}`);
      });
    } else {
      console.log('No hay productos en esta venta');
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.ventaSeleccionada = null;
  }

   aprobarCompra(): void {
    if (this.ventaSeleccionada) {
      this.firebaseService.actualizarEstadoCompra(this.ventaSeleccionada.id, 'approved').then(() => {
        alert('La compra ha sido aprobada exitosamente.');
        this.cerrarModal();
      }).catch((error) => {
        console.error('Error al aprobar la compra:', error);
        alert('Ocurrió un error al aprobar la compra. Por favor, intenta nuevamente.');
      });
    }
  }

  rechazarCompra(): void {
    if (this.ventaSeleccionada) {
      this.firebaseService.actualizarEstadoCompra(this.ventaSeleccionada.id, 'rejected').then(() => {
        alert('La compra ha sido rechazada.');
        this.cerrarModal();
      }).catch((error) => {
        console.error('Error al rechazar la compra:', error);
        alert('Ocurrió un error al rechazar la compra. Por favor, intenta nuevamente.');
      });
    }
  }

  actualizarDatos(): void {
    // Forzar actualización de filtros
    this.aplicarFiltros();
  }

  // Métodos para el chat
  abrirChat(contacto: Contacto): void {
    this.contactoSeleccionado = contacto;
    this.mostrarModalChat = true;
    this.cargarMensajesChat(contacto.id);
  }

  cerrarModalChat(): void {
    this.mostrarModalChat = false;
    this.contactoSeleccionado = null;
    this.mensajesChat = [];
    this.nuevoMensaje = '';
  }

  cargarMensajesChat(contactoId: string): void {
    this.firebaseService.obtenerMensajesPorContacto(contactoId).subscribe({
      next: (mensajes) => {
        this.mensajesChat = mensajes;
      },
      error: (err) => {
        console.error('Error al cargar mensajes:', err);
      }
    });
  }

  enviarMensaje(): void {
    if (this.nuevoMensaje.trim() && this.contactoSeleccionado) {
      const mensaje: MensajeChat = {
        contactoId: this.contactoSeleccionado.id,
        remitente: 'personal',
        mensaje: this.nuevoMensaje.trim(),
        fechaEnvio: new Date(),
        leido: false,
        nombreRemitente: 'Equipo de Soporte',
        emailRemitente: 'soporte@techstore.com'
      };

      this.firebaseService.agregarMensajeChat(mensaje).then(() => {
        this.nuevoMensaje = '';
        // Actualizar el estado del contacto a "respondido"
        this.firebaseService.actualizarEstadoContacto(this.contactoSeleccionado!.id, 'respondido');
      }).catch(error => {
        console.error('Error al enviar mensaje (personal):', error);
        alert('Error al enviar mensaje. Verifica las reglas de Firestore.');
      });
    }
  }

  formatearFecha(fecha: any): string {
    if (!fecha) return '';
    
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

  obtenerEstadoContacto(estado: string): string {
    const estados: { [key: string]: string } = {
      'pendiente': 'Pendiente',
      'respondido': 'Respondido',
      'resuelto': 'Resuelto'
    };
    return estados[estado] || estado;
  }

  obtenerColorEstado(estado: string): string {
    const colores: { [key: string]: string } = {
      'pendiente': '#ff9800',
      'respondido': '#2196f3',
      'resuelto': '#4caf50'
    };
    return colores[estado] || '#757575';
  }
}