import { Component } from '@angular/core';
import { ProductosComponent } from "../productos/productos.component";

@Component({
  selector: 'app-tablero',
  imports: [ProductosComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

}
