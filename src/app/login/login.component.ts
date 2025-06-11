import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Control del estado de la animación de cambio de formulario
  isClaseAgregada = false;

  email: string = '';
  password: string = '';
  mensaje: string | null = null;

  // Control del nombre en registro
  textoCompleto = '';
  primeraPalabra = '';

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.getAuthState().subscribe((usuario) => {
      if (usuario) {
        // Si el usuario ya está autenticado, redirigir a la página principal
        this.router.navigate(['/inicio']);
      }
    });
  }

  // Muestra el formulario de iniciar sesión
  showLoginForm() {
    this.isClaseAgregada = true;
  }

  // Muestra el formulario de registro
  showRegisterForm() {
    this.isClaseAgregada = false;
  }

  // Extrae la primera palabra del campo de nombre en el registro
  filtrarPrimeraPalabra(event: any) {
    const valor = event.target.value;
    this.textoCompleto = valor;
    this.primeraPalabra = valor.split(' ')[0];
  }

  login(){
    console.log('Intentando iniciar sesión con:', this.email); // Log para depuración
    
    if(this.email && this.password){
      this.loginService.login(this.email, this.password)
      .then((result) => {
        console.log('Login exitoso:', result); // Ver qué devuelve el login
        
        // Si el login es exitoso, navegamos a la página principal
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error en login:', error); // Ver detalles completos del error
        
        // Mostrar mensaje de error más descriptivo
        if (error.code) {
          switch(error.code) {
            case 'auth/invalid-email':
              this.mensaje = 'El formato del correo electrónico no es válido.';
              break;
            case 'auth/user-disabled':
              this.mensaje = 'Esta cuenta de usuario ha sido deshabilitada.';
              break;
            case 'auth/user-not-found':
              this.mensaje = 'No existe usuario con este correo electrónico.';
              break;
            case 'auth/wrong-password':
              this.mensaje = 'La contraseña es incorrecta.';
              break;
            default:
              this.mensaje = 'Error al hacer login: ' + error.message;
              break;
          }
        } else {
          this.mensaje = 'Error al hacer login: ' + error;
        }
        
        // Mostrar alerta con el mensaje de error
        alert(this.mensaje);
      });
    } else {
      this.mensaje = 'Por favor ingrese un email y contraseña válidos';
      alert(this.mensaje);
    }
  }
}
