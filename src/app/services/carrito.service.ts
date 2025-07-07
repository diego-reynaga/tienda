import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ProductoCarrito {
  id: number;
  name: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  price: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private productos: ProductoCarrito[] = [];
  private contador = new BehaviorSubject<number>(0);
  contador$ = this.contador.asObservable();

  constructor() {}

  // Método para añadir un producto al carrito
  agregarProducto(producto: ProductoCarrito): void {
    const productoExistente = this.productos.find((p) => p.id === producto.id);
    if (productoExistente) {
      productoExistente.cantidad += producto.cantidad || 1;
    } else {
      this.productos.push({ ...producto, cantidad: producto.cantidad || 1 });
    }
    this.actualizarContador();
  }

  // Método para obtener los productos del carrito
  obtenerProductos(): ProductoCarrito[] {
    return this.productos;
  }

  // Método para eliminar un producto del carrito
  eliminarProducto(id: number): void {
    this.productos = this.productos.filter((producto) => producto.id !== id);
    this.actualizarContador();
  }

  // Método para vaciar el carrito
  vaciarCarrito(): void {
    this.productos = [];
    this.actualizarContador();
  }

  private actualizarContador(): void {
    const totalProductos = this.productos.reduce((total, producto) => total + producto.cantidad, 0);
    this.contador.next(totalProductos); // Emite el nuevo valor del contador
  }

  obtenerTotal(): number {
  return this.productos.reduce((total, producto) => 
    total + (producto.price * producto.cantidad), 0);
}
}