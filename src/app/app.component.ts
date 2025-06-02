import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductosComponent } from "./admin/productos/productos.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
