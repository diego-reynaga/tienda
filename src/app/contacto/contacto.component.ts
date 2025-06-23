import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FooterInicioComponent } from "../inicio/footer-inicio/footer-inicio.component";
import { CabeceroComponent } from "../inicio/cabecero/cabecero.component";

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, CommonModule, RouterModule, FooterInicioComponent, CabeceroComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  @ViewChild('contactForm') contactForm!: NgForm;

  constructor(public router: Router) {}

  formEnviado: boolean = false;
  formError: boolean = false;

  scrollToForm() {
    const element = document.getElementById('contactFormSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Aquí iría la lógica para enviar el formulario a un servidor
      // Simulamos una respuesta exitosa después de un tiempo
      setTimeout(() => {
        this.formEnviado = true;
        this.formError = false;
        this.contactForm.resetForm();

        // Reset del estado después de 5 segundos
        setTimeout(() => {
          this.formEnviado = false;
        }, 5000);
      }, 1500);
    }
  }

  toggleFaq(event: Event) {
    const faqItem = (event.currentTarget as HTMLElement);
    faqItem.classList.toggle('active');
  }
}
