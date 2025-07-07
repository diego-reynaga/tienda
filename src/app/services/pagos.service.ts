import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = 'https://digital.regionhuanuco.gob.pe/tramite/persona/dni/'; // URL base para la API (se debe reemplazar por la real)

  // Datos de prueba
  private ventasMock = [
    {
      id: 1,
      fecha: new Date('2025-06-25T14:30:00'),
      cliente: {
        dni: '12345678',
        nombres: 'Juan Carlos',
        primerApellido: 'Pérez',
        segundoApellido: 'López',
        direccion: 'Av. Principal 123, Andahuaylas',
        telefono: '999888777',
        email: 'juancarlos@example.com'
      },
      productos: [
        {id: 1, nombre: 'Laptop HP Pavilion', cantidad: 1, precio: 2499.90},
        {id: 5, nombre: 'Mouse inalámbrico', cantidad: 1, precio: 89.90}
      ],
      total: 2589.80,
      estado: 'pending',
      comprobantePago: 'assets/images/comprobante-ejemplo.jpg',
      codigoSeguridad: '123'
    },
    {
      id: 2,
      fecha: new Date('2025-06-26T10:15:00'),
      cliente: {
        dni: '87654321',
        nombres: 'María Elena',
        primerApellido: 'Gómez',
        segundoApellido: 'Vargas',
        direccion: 'Jr. Los Pinos 456, Andahuaylas',
        telefono: '977666555',
        email: 'mariaelena@example.com'
      },
      productos: [
        {id: 3, nombre: 'Smartphone Samsung Galaxy', cantidad: 1, precio: 1299.90},
        {id: 8, nombre: 'Auriculares Bluetooth', cantidad: 2, precio: 129.90}
      ],
      total: 1559.70,
      estado: 'approved',
      comprobantePago: 'assets/images/comprobante-ejemplo.jpg',
      codigoSeguridad: '456'
    }
  ];

  constructor(private http: HttpClient) { }

  enviarPago(formData: FormData): Observable<any> {
    // En un entorno real, enviaría los datos al backend
    // return this.http.post(`${this.apiUrl}/procesar-pago`, formData);
    
    // Para demo, simulamos una respuesta exitosa tras un retraso
    return of({status: 'success', message: 'Pago recibido y en proceso de verificación'})
      .pipe(delay(1500)); // Simulamos un retardo en la respuesta
  }

  obtenerVentas(): Observable<any[]> {
    // En un entorno real, obtendría los datos del backend
    // return this.http.get<any[]>(`${this.apiUrl}/ventas`);
    
    // Para demo, devolvemos datos simulados
    return of(this.ventasMock).pipe(delay(800));
  }

  aprobarVenta(id: number): Observable<any> {
    // En un entorno real
    // return this.http.put(`${this.apiUrl}/ventas/${id}/aprobar`, {});
    
    // Para demo
    const venta = this.ventasMock.find(v => v.id === id);
    if (venta) {
      venta.estado = 'approved';
    }
    return of({status: 'success'}).pipe(delay(800));
  }

  rechazarVenta(id: number): Observable<any> {
    // En un entorno real
    // return this.http.put(`${this.apiUrl}/ventas/${id}/rechazar`, {});
    
    // Para demo
    const venta = this.ventasMock.find(v => v.id === id);
    if (venta) {
      venta.estado = 'rejected';
    }
    return of({status: 'success'}).pipe(delay(800));
  }
}