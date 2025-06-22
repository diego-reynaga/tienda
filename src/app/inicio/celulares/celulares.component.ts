import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { FooterInicioComponent } from '../footer-inicio/footer-inicio.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-celulares',
  templateUrl: './celulares.component.html',
  styleUrls: ['./celulares.component.css'],
  standalone: true, // Agregar standalone: true para Angular 20+
  imports: [CommonModule, CabeceroComponent, FooterInicioComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CelularesComponent {
  activeModal = signal<string>('');
  activeDetails = signal<string>('');

  phones = [
    { id: 'iphone15promax', name: 'iPhone 15 Pro Max', brand: 'apple' },
    { id: 'galaxys23ultra', name: 'Galaxy S23 Ultra', brand: 'samsung' },
    { id: 'xiaomi13pro', name: 'Xiaomi 13 Pro', brand: 'xiaomi' },
    { id: 'pixel7pro', name: 'Google Pixel 7 Pro', brand: 'google' }
  ];

  // Abrir modal de "Saber más"
  openModal(brand: string): void {
    this.activeModal.set(brand);
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }

  // Cerrar modal de "Saber más"
  closeModal(): void {
    this.activeModal.set('');
    document.body.style.overflow = 'auto'; // Restaurar scroll
  }

  // Abrir modal de detalles técnicos
  openDetails(brand: string): void {
    this.activeDetails.set(brand);
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }

  // Cerrar modal de detalles técnicos
  closeDetails(): void {
    this.activeDetails.set('');
    document.body.style.overflow = 'auto'; // Restaurar scroll
  }
}
