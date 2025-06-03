import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Producto } from '../modelo/producto.modelo';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: Observable<Producto[]>;
  constructor(private firestore: Firestore) { 
    console.log('Inicializando ProductoService');
    try {
      // realizamos una consulta para obtener los productos
      const productosRef = collection(this.firestore, 'Productos');
      console.log('Colección de productos referenciada:', productosRef);
      
      const consulta = query(productosRef, orderBy('nombre', 'asc'));
      console.log('Query creada correctamente');
      
      this.productos = collectionData(consulta, { idField: 'id' }).pipe(
        tap(data => {
          console.log('Datos obtenidos de Firestore:', data);
          if (data.length === 0) {
            console.warn('No se encontraron productos en Firestore');
          }
        }),
        catchError(error => {
          console.error('Error al obtener productos de Firestore:', error);
          throw error;
        })
      ) as Observable<Producto[]>;
    } catch (error) {
      console.error('Error al configurar la consulta a Firestore:', error);
      throw error;
    }
  }

  getProductos(): Observable<Producto[]> {
    console.log('Solicitando productos desde servicio');
    return this.productos;
  }
}
