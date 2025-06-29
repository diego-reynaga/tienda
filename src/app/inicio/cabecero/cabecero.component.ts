import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-cabecero',
  imports: [RouterModule],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css',
})
export class CabeceroComponent {
  constructor(
    public router: Router,
    private loginService: LoginService,
    private carritoService: CarritoService
  ) {}
  isLoggedIn: boolean = false;
  loggedInUser: string | null = null;  //alamacena el email del usuario logueado
  contadorCarrito: number = 0;

  ngOnInit() {
    this.loginService.getAuthState().subscribe((usuario) => {
      if (usuario) {
        this.isLoggedIn = true;
        this.loggedInUser = usuario.email;
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = null;//borrar si hayerror
      }
    });
    this.carritoService.contador$.subscribe((contador) => {
      this.contadorCarrito = contador; // Actualiza el contador en tiempo real
    });
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/inicio']);
  }
}
