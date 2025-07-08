import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = `https://api.datos.org.pe/reniec/src`; // URL base para la API (se debe reemplazar por la real)

  constructor(private personaHttp: HttpClient) { }

  getPersonaInfo(dni: string): Observable<any> {
    const url = `${this.apiUrl}/${dni}/tokendemo`;
    return this.personaHttp.get<any>(url).pipe(
      map((response) => ({
        dni: response.dni,
        apellido_paterno: response.apellido_paterno,
        apellido_materno: response.apellido_materno,
        nombres: response.nombres,
        genero: response.genero,
        fecha_nacimiento: response.fecha_nacimiento,
        ubigeo: response.ubigeo ?? 'No disponible' // Manejo de valores null
      }))
    );
  }
  actualizarEstadoVenta(idVenta: number, nuevoEstado: 'approved' | 'rejected'): Observable<void> {
  return this.personaHttp.put<void>(`/api/ventas/${idVenta}/estado`, { estado: nuevoEstado });
}
}