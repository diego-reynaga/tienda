import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterInicioComponent } from './footer-inicio/footer-inicio.component';
import { ProductosInicioComponent } from "./productos-inicio/productos-inicio.component";
@Component({
  selector: 'app-inicio',
  imports: [FooterInicioComponent, ProductosInicioComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioComponent {

}
