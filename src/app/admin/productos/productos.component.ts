import { Component, ElementRef, ViewChild } from '@angular/core';
import { Producto } from '../../modelo/producto.modelo';
import { ProductoService } from '../../servicios/producto.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CabeceroComponent } from '../../inicio/cabecero/cabecero.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule, CabeceroComponent, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  productos: Producto[] | null = null;

  producto:Producto = {
    nombre: '',
    descripcion: '',
    // imagen: '',
    color: '',
    precio: undefined
  };

  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

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

  // getprecioTotal(): number {
  //   let precioTotal: number = 0;
  //   if(this.productos){
  //     this.productos.forEach(producto => {
  //       if (producto.precio !== undefined) {
  //         precioTotal += producto.precio;
  //       }
  //     });
  //   }
  //   return precioTotal;
  // }
  getprecioTotal(): number{
    return this.productos?.reduce((total, producto)=> total+(producto.precio ?? 0), 0) ?? 0;
  }

  agregar(productoForm: NgForm) {
    const {value, valid} = productoForm;
    if (valid) {
     //agregamos la logica para guardar el producto
     this.productoServicio.agregarProducto(value);
     
     //limpiamos el formulario
     productoForm.resetForm();
     this.cerrarModal();
    }
  }
  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
