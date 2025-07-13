// filepath: src/app/services/firebase.mock.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMockService {
  // Datos mock para prerenderizado
  private mockProductos = [
    {
      id: '1',
      nombre: 'iPhone 15 Pro',
      precio: 999,
      descripcion: 'Último modelo de smartphone Apple',
      imagen: 'assets/images/iphone15pro.jpg',
      categoria: 'celulares'
    },
    {
      id: '2',
      nombre: 'MacBook Pro M3',
      precio: 1499,
      descripcion: 'Laptop profesional con chip M3',
      imagen: 'assets/images/macbookpro.jpg',
      categoria: 'laptops'
    }
  ];

  private mockCompras = [
    {
      id: '1',
      usuario: 'usuario@example.com',
      productos: [],
      total: 999,
      estado: 'pendiente',
      fecha: new Date()
    }
  ];

  escucharProductos(): Observable<any[]> {
    return of(this.mockProductos);
  }

  escucharCompras(): Observable<any[]> {
    return of(this.mockCompras);
  }

  obtenerProducto(id: string): Observable<any> {
    const producto = this.mockProductos.find(p => p.id === id);
    return of(producto || null);
  }

  // Implementa otros métodos necesarios con datos mock
}