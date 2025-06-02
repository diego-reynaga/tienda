import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../modelo/producto.modelo';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: Observable<Producto[]>;

  constructor(private firestore: Firestore) { 
    // realizamos una consulta para obtener los productos
    const productosRef = collection(this.firestore, 'productos');
    const consulta = query(productosRef, orderBy('nombre', 'asc'));
    this.productos = collectionData(consulta, { idField: 'id' }) as Observable<Producto[]>;
  }

  getProductos(): Observable<Producto[]> {
    return this.productos;
  }
}
