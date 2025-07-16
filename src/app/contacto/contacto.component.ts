import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterInicioComponent } from "../inicio/footer-inicio/footer-inicio.component";
import { CabeceroComponent } from "../inicio/cabecero/cabecero.component";
import { FirebaseService } from '../services/firebase.service';
import { LoginService } from '../servicios/login.service';
import { Contacto } from '../modelo/contacto.modelo';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, CommonModule, RouterModule, FooterInicioComponent, CabeceroComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  @ViewChild('contactForm') contactForm!: NgForm;

  usuario: User | null = null;
  emailUsuario: string = '';

  constructor(
    public router: Router,
    private firebaseService: FirebaseService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    // Obtener usuario autenticado
    this.loginService.getAuthState().subscribe((user: User | null) => {
      this.usuario = user;
      if (user?.email) {
        this.emailUsuario = user.email;
      }
    });
  }

  formEnviado: boolean = false;
  formError: boolean = false;
  enviandoFormulario: boolean = false;

  scrollToForm() {
    const element = document.getElementById('contactFormSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit() {
    // Verificar que el usuario esté autenticado
    if (!this.usuario || !this.emailUsuario) {
      this.formError = true;
      console.error('Usuario no autenticado');
      return;
    }

    if (this.contactForm.valid) {
      this.enviandoFormulario = true;
      this.formError = false;
      
      // Extraer los datos del formulario
      const formData = this.contactForm.value;
      
      // Crear objeto contacto con el email del usuario logueado
      const contacto: Contacto = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: this.emailUsuario, // Usar el email del usuario logueado
        phone: formData.phone || '',
        subject: formData.subject,
        message: formData.message,
        agree: formData.agree
      };

      // Guardar en Firebase
      this.firebaseService.agregarContacto(contacto)
        .then((contactoId) => {
          console.log('Formulario enviado exitosamente, ID:', contactoId);
          this.formEnviado = true;
          this.formError = false;
          this.enviandoFormulario = false;
          this.contactForm.resetForm();
          // Restaurar el email después del reset
          this.emailUsuario = this.usuario?.email || '';

          // Reset del estado después de 5 segundos
          setTimeout(() => {
            this.formEnviado = false;
          }, 5000);
        })
        .catch((error) => {
          console.error('Error al enviar el formulario:', error);
          this.formError = true;
          this.formEnviado = false;
          this.enviandoFormulario = false;
        });
    } else {
      console.error('El formulario no es válido');
    }
  }

  toggleFaq(event: Event) {
    const faqItem = (event.currentTarget as HTMLElement);
    faqItem.classList.toggle('active');
  }
}
