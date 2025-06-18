import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CabeceroComponent } from "../cabecero/cabecero.component";
import { FooterInicioComponent } from "../footer-inicio/footer-inicio.component";

@Component({
  selector: 'app-celulares',
  imports: [CabeceroComponent, FooterInicioComponent],
  templateUrl: './celulares.component.html',
  styleUrl: './celulares.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CelularesComponent {

}
