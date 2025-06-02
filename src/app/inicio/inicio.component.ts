import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterInicioComponent } from './footer-inicio/footer-inicio.component';
import { ProductosInicioComponent } from "./productos-inicio/productos-inicio.component";
import { CommonModule } from '@angular/common';
import { CabeceroComponent } from "./cabecero/cabecero.component";
@Component({
  selector: 'app-inicio',
  imports: [FooterInicioComponent, ProductosInicioComponent, CommonModule, CabeceroComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioComponent {
  

}
