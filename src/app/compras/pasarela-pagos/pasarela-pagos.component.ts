import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-pasarela-pagos',
  standalone: true,
  imports: [CabeceroComponent, FooterInicioComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './pasarela-pagos.component.html',
  styleUrls: ['./pasarela-pagos.component.css']
})
export class PasarelaPagosComponent implements OnInit {
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private carritoService: CarritoService,
    private pagosService: PagosService,
    private loginService: LoginService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.firebaseService.escucharCompras().subscribe((compras) => {
    // Filtrar las compras del cliente logueado
    this.comprasCliente = compras.filter((compra) => compra.cliente.email === this.loggedInUser);
  });
  this.loginService.getAuthState().subscribe((usuario) => {
    if (usuario) {
      this.isLoggedIn = true;
      this.loggedInUser = usuario.email;

      // Autocompletar el campo email del formulario con el email del usuario logueado
      this.datosForm.patchValue({
        email: this.loggedInUser
      });
    } else {
      this.isLoggedIn = false;
      this.loggedInUser = null;
    }
  });

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

  this.totalPagar = this.carritoService.obtenerTotal();

  // Si no hay productos en el carrito, redirigir al carrito
  if (this.totalPagar === 0) {
    this.router.navigate(['/carrito']);
  }
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
        nombres: this.datosForm.value.nombres || 'N/A',
        primerApellido: this.datosForm.value.primerApellido || 'N/A',
        segundoApellido: this.datosForm.value.segundoApellido || 'N/A',
        email: this.datosForm.value.email || 'N/A',
      },
      productos: this.carritoService.obtenerProductos(),
      total: this.totalPagar,
      estado: 'pending', // Estado inicial
      fecha: new Date(),
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
      alert('Tu compra está siendo procesada.');
      this.datosForm.reset(); // Limpiar el formulario después de finalizar la compra
      this.pagoForm.reset(); // Limpiar el formulario de pago
      // this.router.navigate(['/estado-compra']);
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
        nombres: value.nombres || 'N/A',
        primerApellido: value.primerApellido || 'N/A',
        segundoApellido: value.segundoApellido || 'N/A',
        email: value.email || 'N/A',
      },
      productos: this.carritoService.obtenerProductos(),
      total: this.totalPagar,
      estado: 'pending', // Estado inicial
      fecha: new Date(),
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
}