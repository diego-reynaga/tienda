import { Component } from '@angular/core';
import { Producto } from '../../modelo/producto.modelo';
import { ProductoService } from '../../servicios/producto.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Producto[] | null = null;

  constructor(private productoServicio: ProductoService) {}
  ngOnInit() {
    this.productoServicio.getProductos().subscribe(productos => {
      console.log('Productos recibidos con detalles:', productos);
      // Verificar el tipo de dato del precio en cada producto
      productos.forEach(producto => {
        console.log(`Producto: ${producto.nombre}, Precio: ${producto.precio}, Tipo: ${typeof producto.precio}`);
      });
      this.productos = productos;
    });
  }

}
