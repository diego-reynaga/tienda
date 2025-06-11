import { Component } from '@angular/core';
import { Producto } from '../../modelo/producto.modelo';
import { ProductoService } from '../../servicios/producto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-productos',
  imports: [FormsModule, RouterModule],
  templateUrl: './editar-productos.component.html',
  styleUrl: './editar-productos.component.css',
})
export class EditarProductosComponent {
  producto: Producto = {
    nombre: '',
    descripcion: '',
    color: '',
    precio: undefined,
  };
  id: string | null = null;

  constructor(
    private productosServicio: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('[EditarProductosComponent] ID obtenido de la ruta:', this.id);
    if (this.id) {
      this.productosServicio
        .getProducto(this.id)
        .subscribe((producto: Producto | null) => {
          if (producto) {
            this.producto = producto;
          } else {
            console.log('Producto no encontrado' + this.id);
            this.router.navigate(['/']);
          }
        });
    } else {
      console.log('ID no proporcionado');
      this.router.navigate(['/']);
    }
  }

  guardar(_t8: NgForm) {
    throw new Error('Method not implemented.');
  }
  eliminar() {
    throw new Error('Method not implemented.');
  }
}
