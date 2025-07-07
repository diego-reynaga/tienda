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

interface DatosPersona {
  apPrimer: string;
  apSegundo: string;
  direccion: string;
  prenombres: string;
}

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private carritoService: CarritoService,
    private pagosService: PagosService
  ) { }

  ngOnInit(): void {
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
    // Usamos nuestro backend en Spring Boot 
    // this.http.get<DatosPersona>(`/api/verificar-dni/${dni}`) //usando el proxy
    // this.http.get<DatosPersona>(`http://localhost:8080/api/verificar-dni/${dni}`)
    this.http.get<DatosPersona>(`/api/verificar-dni/${dni}`)

      .subscribe({
        next: (data) => {
          this.dniVerificado = true;
          this.dniError = null;
          
          // Autocompletar los datos del formulario
          this.datosForm.patchValue({
            nombres: data.prenombres,
            primerApellido: data.apPrimer,
            segundoApellido: data.apSegundo,
            direccion: data.direccion
          });
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
      
      // En un caso real, se enviaría el comprobante y datos al backend
      const formData = new FormData();
      formData.append('comprobante', this.comprobanteFile!);
      formData.append('codigoSeguridad', this.pagoForm.get('codigoSeguridad')?.value);
      formData.append('datosPersonales', JSON.stringify(this.datosForm.value));
      formData.append('total', this.totalPagar.toString());
      formData.append('productos', JSON.stringify(this.carritoService.obtenerProductos()));
      
      // Simulamos envío y espera de aprobación
      this.pagosService.enviarPago(formData).subscribe({
        next: (response) => {
          // Aquí se recibiría la respuesta del backend con el estado de la compra
          // Por ahora lo simulamos con un timeout
          setTimeout(() => {
            this.estadoCompra = 'aprobada';
            this.numeroPedido = this.generarNumeroPedido();
            this.carritoService.vaciarCarrito();
          }, 3000);
        },
        error: (err) => {
          setTimeout(() => {
            this.estadoCompra = 'rechazada';
          }, 3000);
        }
      });
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
}