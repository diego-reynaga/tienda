import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CabeceroComponent } from "../cabecero/cabecero.component";
import { FooterInicioComponent } from "../footer-inicio/footer-inicio.component";

@Component({
  selector: 'app-audio-video',
  imports: [CabeceroComponent, FooterInicioComponent],
  templateUrl: './audio-video.component.html',
  styleUrl: './audio-video.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioVideoComponent {

}
