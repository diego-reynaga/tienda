import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../modelo/producto.modelo';
import { Firestore, collection, collectionData, orderBy, query, CollectionReference, DocumentData, Query, docData } from '@angular/fire/firestore';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: Observable<Producto[]>;
  private productosRef: CollectionReference<DocumentData>;

  constructor (private firestore: Firestore) {
    this.productosRef = collection(this.firestore, 'Productos') as CollectionReference<DocumentData>;
    const consulta: Query<DocumentData> = query(this.productosRef, orderBy('nombre', 'asc'));
    this.productos = collectionData(consulta, { idField: 'id' }) as Observable<Producto[]>;
  }

  getProductos(): Observable<Producto[]> {
    return this.productos;
  }

  agregarProducto(producto: Producto){
    return addDoc(this.productosRef, producto);
  }

  getProducto(id: string): Observable<Producto | null>{
    const productoDocRef = doc(this.firestore, `Productos/${id}`);
    return docData(productoDocRef, {idField: 'id'}) as Observable<Producto>;
  }

  modificarProducto(producto: Producto){
    const productoDoc = doc(this.firestore, `Productos/${producto.id}`);
    return updateDoc(productoDoc, {...producto });
  }
  eliminarProducto(producto: Producto){
    const productoDoc = doc(this.firestore, `Productos/${producto.id}`);
    return deleteDoc(productoDoc);
  }
}
