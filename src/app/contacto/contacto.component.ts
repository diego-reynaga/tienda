import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  constructor(public router: Router) {}

  formEnviado = false;
  formError = false;

  onSubmit() {
    try {
      // Simulación de envío exitoso
      this.formEnviado = true;
      this.formError = false;

      // Aquí iría lógica real, como una llamada HTTP
    } catch (e) {
      this.formError = true;
      this.formEnviado = false;
    }
  }

  scrollToForm(): void {
    const element = document.getElementById('contactFormSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
