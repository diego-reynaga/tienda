import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { LoginService } from '../../servicios/login.service';
import { CabeceroComponent } from "../../inicio/cabecero/cabecero.component";
import { FooterInicioComponent } from "../../inicio/footer-inicio/footer-inicio.component";

interface ProductoCarrito {
  id: number;
  name: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  price: number;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CabeceroComponent, FooterInicioComponent]
})
export class CarritoComponent {
  productos: ProductoCarrito[] = [];
  isLoggedIn: boolean = false;
  loggedInUser: string | null = null;

  constructor(
    private router: Router,
    private carritoService: CarritoService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.productos = this.carritoService.obtenerProductos();
    this.loginService.getAuthState().subscribe((usuario) => {
      if (usuario) {
        this.isLoggedIn = true;
        this.loggedInUser = usuario.email;
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = null;//borrar si hayerror
      }
    });
  }

  aumentarCantidad(id: number): void {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      producto.cantidad++;
    }
  }

  disminuirCantidad(id: number): void {
    const producto = this.productos.find(p => p.id === id);
    if (producto && producto.cantidad > 1) {
      producto.cantidad--;
    }
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
    this.productos = this.carritoService.obtenerProductos();
  }

  obtenerTotalProductos(): number {
    return this.productos.reduce((total, producto) => total + producto.cantidad, 0);
  }

  obtenerSubtotal(): number {
    return this.productos.reduce((total, producto) => 
      total + (producto.price * producto.cantidad), 0);
  }

  obtenerTotal(): number {
    return this.obtenerSubtotal(); // Agregar impuestos si es necesario
  }

  procederAlPago() {
    if(this.isLoggedIn){
      this.router.navigate(['/pasarela-pagos']);
    }else{
      alert('INICIA SECION PARA PROCEDER A PAGAR')
    }
  }

  continuarComprando() {
    this.router.navigate(['/inicio']);
  }
}
