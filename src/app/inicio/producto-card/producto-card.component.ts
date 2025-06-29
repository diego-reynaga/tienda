import { Component, Input } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  precio: number;
}

@Component({
  selector: 'app-producto-card',
  template: `
    <div class="card bg-dark text-light h-100">
      <img [src]="producto.imagen" class="card-img-top" [alt]="producto.nombre">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ producto.nombre }}</h5>
        <p class="card-text">{{ producto.descripcion }}</p>
        <span class="badge bg-primary mb-2">{{ producto.categoria }}</span>
        <div class="mt-auto">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fs-4 fw-bold text-success">\${{ producto.precio.toFixed(2) }}</span>
          </div>
          <button class="btn btn-primary w-100" (click)="agregarAlCarrito()">
            <i class="bi bi-cart-plus me-2"></i>Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProductoCardComponent {
  @Input() producto!: Producto;

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito() {
    this.carritoService.agregarProducto({
      id: this.producto.id,
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      imagen: this.producto.imagen,
      categoria: this.producto.categoria,
      precioUnitario: this.producto.precio
    });
    
    // Opcional: mostrar notificación
    alert('Producto agregado al carrito');
  }
}
