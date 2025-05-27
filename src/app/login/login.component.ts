import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //agrega una clase al div pricipal 'container' para que trabaje con el css
  isClaseAgregada = false;
  onSignUp() {
    this.isClaseAgregada = false;
  }
  onSignIn() {
    this.isClaseAgregada = true;
  }
  // ----------------
  textoCompleto = '';
  primeraPalabra = '';

  filtrarPrimeraPalabra(event: any) {
    const valor = event.target.value;
    this.textoCompleto = valor;
    
    // Extraer solo la primera palabra
    this.primeraPalabra = valor.split(' ')[0]; 
  }

  // verificar si el campo de correo y contraseña tiene datos
  usuarioAutenticado(){
    const email = (document.getElementById('loginEmail') as HTMLInputElement);
    const password = (document.getElementById('loginPassword') as HTMLInputElement);

    if (email.value && password.value) {
      //un href a la pagina de inicio
      window.location.href = 'http://localhost:4200/inicio';
    } else {
      //alerta de error
      alert('Por favor, ingrese su correo y contraseña');
    }
  }
}
