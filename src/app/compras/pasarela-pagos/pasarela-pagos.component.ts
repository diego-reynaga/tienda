import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from '../../services/carrito.service';
import { PagosService } from '../../services/pagos.service';
import { CabeceroComponent } from '../../inicio/cabecero/cabecero.component';
import { FooterInicioComponent } from '../../inicio/footer-inicio/footer-inicio.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { FirebaseService } from '../../services/firebase.service';
import { EstadoCompraService } from '../../services/estado-compra.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pasarela-pagos',
  standalone: true,
  imports: [CabeceroComponent, FooterInicioComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './pasarela-pagos.component.html',
  styleUrls: ['./pasarela-pagos.component.css']
})
export class PasarelaPagosComponent implements OnInit, OnDestroy {
  currentStep = 1;
  datosForm!: FormGroup;
  pagoForm!: FormGroup;
  submitted = false;
  dniVerificado = false;
  dniError: string | null = null;
  comprobanteSeleccionado = false;
  comprobanteFile: File | null = null;
  totalPagar = 0;
  estadoCompra = 'pendiente';
  numeroPedido: string = '';
  loggedInUser: string | null = null;
  isLoggedIn: boolean = false;
  comprasCliente: any[] = [];
  
  // Propiedades para el estado de compra
  mostrarEstadoCompra = false;
  estadoCompraActual = '';
  cargandoCompra = false;
  compraEnProceso = false; // Nueva variable para controlar si hay una compra actual en proceso
  timestampCompra: Date | null = null; // Timestamp de cuando se inició la compra
  
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private carritoService: CarritoService,
    private pagosService: PagosService,
    private loginService: LoginService,
    private firebaseService: FirebaseService,
    private estadoCompraService: EstadoCompraService
  ) { }

  ngOnInit(): void {
    this.configurarFormularios();
    this.configurarSuscripciones();
    
    this.totalPagar = this.carritoService.obtenerTotal();
    
    // Si no hay productos en el carrito, redirigir al carrito
    if (this.totalPagar === 0) {
      this.router.navigate(['/carrito']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    // Limpiar estado al salir del componente
    this.compraEnProceso = false;
    this.timestampCompra = null;
  }

  private configurarFormularios(): void {
    this.datosForm = this.formBuilder.group({
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      nombres: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.pagoForm = this.formBuilder.group({
      codigoSeguridad: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  private configurarSuscripciones(): void {
    // Suscribirse al estado de autenticación
    const authSub = this.loginService.getAuthState().subscribe((usuario) => {
      if (usuario) {
        this.isLoggedIn = true;
        this.loggedInUser = usuario.email;

        // Autocompletar el campo email del formulario con el email del usuario logueado
        this.datosForm.patchValue({
          email: this.loggedInUser
        });

        // Configurar listeners para el estado de compra
        this.configurarListenersEstadoCompra();
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = null;
      }
    });
    this.subscriptions.push(authSub);

    // Suscribirse a las compras
    const comprasSub = this.firebaseService.escucharCompras().subscribe((compras) => {
      if (this.loggedInUser) {
        this.comprasCliente = compras.filter((compra) => compra.cliente.email === this.loggedInUser);
      }
    });
    this.subscriptions.push(comprasSub);
  }

  private configurarListenersEstadoCompra(): void {
    if (!this.loggedInUser) return;

    // Listener para el estado de carga
    const cargaSub = this.estadoCompraService.obtenerEstadoCarga(this.loggedInUser).subscribe(cargando => {
      this.cargandoCompra = cargando;
    });
    this.subscriptions.push(cargaSub);

    // Listener para el estado de la compra
    const estadoSub = this.estadoCompraService.obtenerEstadoCompra(this.loggedInUser).subscribe(estado => {
      this.estadoCompraActual = estado;
      // Solo reaccionar si hay una compra en proceso
      if (this.compraEnProceso) {
        if (estado === 'approved' || estado === 'aprobada') {
          this.mostrarEstadoCompra = true;
          this.estadoCompraService.establecerEstadoCarga(this.loggedInUser!, false);
          setTimeout(() => {
            this.limpiarEstadoYRedirigir();
          }, 3000);
        } else if (estado === 'rejected' || estado === 'rechazada') {
          this.mostrarEstadoCompra = true;
          this.estadoCompraService.establecerEstadoCarga(this.loggedInUser!, false);
          setTimeout(() => {
            this.estadoCompraService.limpiarEstado(this.loggedInUser!);
            this.mostrarEstadoCompra = false;
            this.compraEnProceso = false; // Resetear el estado
          }, 3000);
        }
      }
    });
    this.subscriptions.push(estadoSub);

    // Listener para cambios en compras del usuario
    const comprasUsuarioSub = this.firebaseService.obtenerComprasPorUsuario(this.loggedInUser).subscribe(compras => {
      // Solo procesar si hay una compra en proceso
      if (this.compraEnProceso && this.timestampCompra) {
        // Filtrar solo las compras creadas después del timestamp actual
        const comprasNuevas = compras.filter(c => {
          const fechaCompra = new Date(c.fecha);
          return fechaCompra >= this.timestampCompra!;
        });
        
        const comprasPendientes = comprasNuevas.filter(c => c.estado === 'pending' || c.estado === 'pendiente');
        
        if (comprasPendientes.length > 0) {
          this.estadoCompraService.establecerEstadoCarga(this.loggedInUser!, true);
        }

        // Verificar si hay compras aprobadas o rechazadas (solo las nuevas)
        const comprasAprobadas = comprasNuevas.filter(c => c.estado === 'approved' || c.estado === 'aprobada');
        const comprasRechazadas = comprasNuevas.filter(c => c.estado === 'rejected' || c.estado === 'rechazada');

        if (comprasAprobadas.length > 0) {
          this.estadoCompraService.establecerEstadoCompra(this.loggedInUser!, 'approved');
        } else if (comprasRechazadas.length > 0) {
          this.estadoCompraService.establecerEstadoCompra(this.loggedInUser!, 'rejected');
        }
      }
    });
    this.subscriptions.push(comprasUsuarioSub);
  }

  verificarDNI(): void {
  this.submitted = true;
  const dni = this.datosForm.get('dni')?.value;

  if (dni && dni.length === 8) {
    this.pagosService.getPersonaInfo(dni).subscribe({
      next: (data) => {
        if (data) {
          this.dniVerificado = true;
          this.dniError = null;

          // Autocompletar los datos del formulario
          this.datosForm.patchValue({
            nombres: data.nombres,
            primerApellido: data.apellido_paterno,
            segundoApellido: data.apellido_materno,
            direccion: data.ubigeo ?? 'No disponible' // Manejo de valores null
          });
        } else {
          this.dniVerificado = false;
          this.dniError = 'No se encontraron datos para el DNI proporcionado.';
        }
      },
      error: (err) => {
        this.dniVerificado = false;
        this.dniError = 'No se pudo verificar el DNI. Por favor, intenta nuevamente.';
        console.error(err);
      }
    });
  }
}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.comprobanteFile = file;
      this.comprobanteSeleccionado = true;
    } else {
      this.comprobanteSeleccionado = false;
    }
  }

  siguientePaso(): void {
    this.submitted = true;

    if (this.currentStep === 1) {
      if (this.datosForm.valid && this.dniVerificado) {
        this.currentStep = 2;
        this.submitted = false;
      }
    }
  }

  volverPaso(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.submitted = false;
    }
  }

  enviarPago(): void {
  this.submitted = true;

  if (this.pagoForm.valid && this.comprobanteSeleccionado) {
    // Simular el envío del comprobante y código
    this.currentStep = 3;

    const compra = {
      cliente: {
        dni: this.datosForm.value.dni || 'N/A',
        nombres: this.datosForm.value.nombres || 'N/A',
        primerApellido: this.datosForm.value.primerApellido || 'N/A',
        segundoApellido: this.datosForm.value.segundoApellido || 'N/A',
        direccion: this.datosForm.value.direccion || 'N/A',
        telefono: this.datosForm.value.telefono || 'N/A',
        email: this.datosForm.value.email || 'N/A',
      },
      productos: this.carritoService.obtenerProductos(),
      total: this.totalPagar,
      estado: 'pending', // Estado inicial
      fecha: new Date().toISOString(), // Convertir a string ISO para mejor compatibilidad
      comprobante: this.comprobanteFile?.name || 'N/A',
      codigoSeguridad: this.pagoForm.get('codigoSeguridad')?.value || 'N/A',
    };

    if (!compra.productos || compra.productos.length === 0) {
      console.error('Error: No hay productos en el carrito.');
      alert('No hay productos en el carrito. Por favor, agrega productos antes de finalizar la compra.');
      return;
    }

    // Registrar la compra en Firebase
    this.firebaseService.agregarCompra(compra).then(() => {
      // Activar bandera de compra en proceso y establecer timestamp
      this.compraEnProceso = true;
      this.timestampCompra = new Date();
      
      // Establecer estado de carga
      if (this.loggedInUser) {
        this.estadoCompraService.establecerEstadoCarga(this.loggedInUser, true);
      }
      
      // Limpiar carrito después de enviar la compra
      this.carritoService.vaciarCarrito();
      
      // Mostrar mensaje de éxito
      alert('Tu compra está siendo procesada. Serás notificado cuando sea aprobada.');
      
      // Reiniciar formularios
      this.datosForm.reset();
      this.pagoForm.reset();
      
      // Permanecer en la misma página para mostrar el estado de carga
      this.currentStep = 4; // Nuevo paso para mostrar el estado de espera
    }).catch((error) => {
      console.error('Error al registrar la compra en Firebase:', error);
      alert('Ocurrió un error al procesar tu compra. Por favor, intenta nuevamente.');
    });
  } else {
    alert('Por favor, completa todos los campos requeridos antes de enviar el pago.');
  }
}
  
  cancelarCompra(): void {
    if (confirm('¿Estás seguro de cancelar la compra?')) {
      this.router.navigate(['/carrito']);
    }
  }

  volverInicio(): void {
    this.router.navigate(['/inicio']);
  }

  private generarNumeroPedido(): string {
    return 'PED-' + Math.floor(Math.random() * 900000 + 100000).toString();
  }

  eliminarComprobante(): void {
    this.comprobanteFile = null;
    this.comprobanteSeleccionado = false;
  }

  finalizarCompra(): void {
    const { value, valid } = this.datosForm;

    if (valid && this.dniVerificado) {
      const compra = {
        cliente: {
          dni: value.dni || 'N/A',
          nombres: value.nombres || 'N/A',
          primerApellido: value.primerApellido || 'N/A',
          segundoApellido: value.segundoApellido || 'N/A',
          direccion: value.direccion || 'N/A',
          telefono: value.telefono || 'N/A',
          email: value.email || 'N/A',
        },
        productos: this.carritoService.obtenerProductos(),
        total: this.totalPagar,
        estado: 'pending', // Estado inicial
        fecha: new Date().toISOString(), // Convertir a string ISO para mejor compatibilidad
      };

      if (!compra.productos || compra.productos.length === 0) {
        console.error('Error: No hay productos en el carrito.');
        alert('No hay productos en el carrito. Por favor, agrega productos antes de finalizar la compra.');
        return;
      }

      this.firebaseService.agregarCompra(compra).then(() => {
        alert('Tu compra está siendo procesada.');
        this.datosForm.reset(); // Limpiar el formulario después de finalizar la compra
        this.router.navigate(['/estado-compra']);
      }).catch((error) => {
        console.error('Error al registrar la compra en Firebase:', error);
        alert('Ocurrió un error al procesar tu compra. Por favor, intenta nuevamente.');
      });
    } else {
      alert('Por favor, completa todos los campos requeridos antes de finalizar la compra.');
    }
  }

  limpiarEstadoYRedirigir(): void {
    if (this.loggedInUser) {
      this.estadoCompraService.limpiarEstado(this.loggedInUser);
    }
    this.mostrarEstadoCompra = false;
    this.compraEnProceso = false; // Resetear bandera
    this.timestampCompra = null; // Resetear timestamp
    this.router.navigate(['/pedidos']);
  }

  volverAInicio(): void {
    this.router.navigate(['/inicio']);
  }

  continuarComprando(): void {
    // Resetear estado antes de redirigir
    this.compraEnProceso = false;
    this.timestampCompra = null;
    if (this.loggedInUser) {
      this.estadoCompraService.limpiarEstado(this.loggedInUser);
    }
    this.router.navigate(['/inicio']);
  }
}