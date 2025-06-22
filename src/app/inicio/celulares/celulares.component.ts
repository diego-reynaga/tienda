import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoResumen } from '../../modelo/producto.modelo';
import { CELULARES_DATOS, CELULARES_DETALLES } from './celulares-datos';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { FooterInicioComponent } from '../footer-inicio/footer-inicio.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-celulares',
  standalone: true,
  imports: [CommonModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './celulares.component.html',
  styleUrls: ['./celulares.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CelularesComponent {
  celulares: ProductoResumen[] = CELULARES_DATOS;
  celularesDetalles: Record<string, {
    titulo: string;
    descripcion: string;
    especificaciones: {
      pantalla: string;
      chip: string;
      bateria: string;
      camara: string;
      almacenamiento: string;
      resistencia: string;
    };
  }> = CELULARES_DETALLES;

  private modalActivo = signal('');
  private detallesActivos = signal('');

  activeModal() {
    return this.modalActivo();
  }

  activeDetails() {
    return this.detallesActivos();
  }

  openModal(id: string) {
    this.modalActivo.set(id);
  }

  closeModal() {
    this.modalActivo.set('');
  }

  openDetails(id: string) {
    this.detallesActivos.set(id);
  }

  closeDetails() {
    this.detallesActivos.set('');
  }

  getDetalles(id: string) {
    return this.celularesDetalles[id];
  }

  getEspecificacion(id: string, key: 'pantalla' | 'chip' | 'bateria' | 'camara' | 'almacenamiento' | 'resistencia'): string {
    const especificaciones = this.celularesDetalles[id]?.especificaciones;
    return especificaciones ? especificaciones[key] : '';
  }

  getEspecificacionKeys(): Array<'pantalla' | 'chip' | 'bateria' | 'camara' | 'almacenamiento' | 'resistencia'> {
    return ['pantalla', 'chip', 'bateria', 'camara', 'almacenamiento', 'resistencia'];
  }
}
