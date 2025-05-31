import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Control del estado de la animación de cambio de formulario
  isClaseAgregada = false;

  // Datos del formulario de login
  login = {
    email: '',
    password: '',
  };

  // Control del nombre en registro
  textoCompleto = '';
  primeraPalabra = '';

  constructor(private router: Router) {}

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

  // Lógica de autenticación simulada
  usuarioAutenticado() {
    const { email, password } = this.login;

    if (email && password) {
      // Simulación de inicio de sesión exitoso
      this.router.navigate(['/inicio']);
    } else {
      alert('Por favor, ingrese su correo y contraseña');
    }
  }
}
