import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, onSnapshot, query, where, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private comprasRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.comprasRef = collection(this.firestore, 'compras') as CollectionReference<DocumentData>;
  }

  // Agregar una nueva compra
  agregarCompra(compra: any): Promise<void> {
    return addDoc(this.comprasRef, compra)
      .then(() => {
        console.log('Compra registrada exitosamente en Firebase');
      })
      .catch((error) => {
        console.error('Error al registrar la compra en Firebase:', error);
        throw error; // Propagar el error para manejarlo en el componente
      });
  }

  // Actualizar el estado de una compra
  actualizarEstadoCompra(id: string, nuevoEstado: string): Promise<void> {
    const compraDoc = doc(this.firestore, `compras/${id}`);
    return updateDoc(compraDoc, { estado: nuevoEstado })
      .then(() => console.log(`Estado de la compra ${id} actualizado a ${nuevoEstado}`))
      .catch((error) => {
        console.error(`Error al actualizar el estado de la compra ${id}:`, error);
        throw error; // Propagar el error para manejarlo en el componente
      });
  }

  // Escuchar cambios en las compras en tiempo real
  escucharCompras(): Observable<any[]> {
    const q = query(this.comprasRef);
    return new Observable((observer) => {
      try {
        onSnapshot(q, (snapshot) => {
          const compras = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          observer.next(compras);
        });
      } catch (error) {
        console.error('Error al escuchar cambios en la colección compras:', error);
        observer.error(error); // Emitir el error al Observable
      }
    });
  }
}