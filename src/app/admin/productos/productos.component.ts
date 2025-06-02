import { Component } from '@angular/core';
import { Producto } from '../../modelo/producto.modelo';
import { ProductoService } from '../../servicios/producto.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Producto[] | null = null;

  constructor(private productoServicio: ProductoService) {}

  ngOnInit() {
    this.productoServicio.getProductos().subscribe(productos => {
      this.productos = productos;
    } );
  }

}
