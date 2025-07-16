import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoCompraService {
  private comprasEnEspera$ = new BehaviorSubject<{ [email: string]: string }>({});
  private cargandoCompras$ = new BehaviorSubject<{ [email: string]: boolean }>({});

  constructor() { }

  // Obtener el estado de carga para un email específico
  obtenerEstadoCarga(email: string): Observable<boolean> {
    return new Observable(observer => {
      this.cargandoCompras$.subscribe(cargas => {
        observer.next(cargas[email] || false);
      });
    });
  }

  // Establecer el estado de carga para un email específico
  establecerEstadoCarga(email: string, cargando: boolean): void {
    const cargas = this.cargandoCompras$.value;
    cargas[email] = cargando;
    this.cargandoCompras$.next(cargas);
  }

  // Obtener el estado de la compra para un email específico
  obtenerEstadoCompra(email: string): Observable<string> {
    return new Observable(observer => {
      this.comprasEnEspera$.subscribe(compras => {
        observer.next(compras[email] || '');
      });
    });
  }

  // Establecer el estado de la compra para un email específico
  establecerEstadoCompra(email: string, estado: string): void {
    const compras = this.comprasEnEspera$.value;
    compras[email] = estado;
    this.comprasEnEspera$.next(compras);
  }

  // Limpiar el estado para un email específico
  limpiarEstado(email: string): void {
    const cargas = this.cargandoCompras$.value;
    const compras = this.comprasEnEspera$.value;
    
    delete cargas[email];
    delete compras[email];
    
    this.cargandoCompras$.next(cargas);
    this.comprasEnEspera$.next(compras);
  }
}
