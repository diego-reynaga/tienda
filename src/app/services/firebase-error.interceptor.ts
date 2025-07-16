import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class FirebaseErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.code === 'failed-precondition') {
          console.warn('Error de índice de Firebase detectado:', error.error.message);
          // Aquí puedes manejar el error como prefieras
          // Por ejemplo, mostrar un mensaje más amigable al usuario
        }
        return throwError(error);
      })
    );
  }
}
