import { Component } from '@angular/core';

@Component({
  selector: 'app-productos-inicio',
  imports: [],
  templateUrl: './productos-inicio.component.html',
  styleUrl: './productos-inicio.component.css',
})
export class ProductosInicioComponent {
  categorias = [
    {
      titulo: 'Laptops y Computadoras',
      descripcion:
        'Explora las mejores opciones en equipos de alto rendimiento.',
      imagen: 'assets/img/audifono.png',
    },
    {
      titulo: 'Accesorios Tecnológicos',
      descripcion: 'Encuentra mouse, teclados, cargadores y más.',
      imagen: 'assets/img/accesorios.png',
    },
    {
      titulo: 'Smartphones y Celulares',
      descripcion: 'Modelos avanzados con tecnología de punta.',
      imagen: 'assets/img/smartphones.webp',
    },
    {
      titulo: 'Audio y Video',
      descripcion:
        'Auriculares, bocinas y televisores para una experiencia inmersiva.',
      imagen: 'assets/img/audiovisual.webp',
    },
    {
      titulo: 'Wearables y Smartwatches',
      descripcion: 'Relojes inteligentes y dispositivos portables.',
      imagen: 'assets/img/smartwatch.webp',
    },
    {
      titulo: 'Tablets y Dispositivos Móviles',
      descripcion:
        'Encuentra las mejores opciones para productividad y entretenimiento.',
      imagen: 'assets/img/tablets.jpeg',
    },
    {
      titulo: 'Cámaras y Fotografía',
      descripcion: 'Desde cámaras profesionales hasta gadgets creativos.',
      imagen: 'assets/img/camaras.webp',
    },
    {
      titulo: 'Consolas y Gaming',
      descripcion: 'PlayStation, Xbox, Nintendo y todo para gamers.',
      imagen: 'assets/img/consolas.webp',
    },
    {
      titulo: 'Drones y Gadgets',
      descripcion: 'Equipos innovadores para fotografía y exploración.',
      imagen: 'assets/img/drones.webp',
    },
  ];
}
