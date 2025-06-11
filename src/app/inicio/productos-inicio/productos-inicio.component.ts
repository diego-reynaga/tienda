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
      imagen: 'telefonol.webp',
    },
    {
      titulo: 'Accesorios Tecnológicos',
      descripcion: 'Encuentra mouse, teclados, cargadores y más.',
      imagen: 'telefonol.webp',
    },
    {
      titulo: 'Smartphones y Celulares',
      descripcion: 'Modelos avanzados con tecnología de punta.',
      imagen: 'telefonol.webp',
    },
    {
      titulo: 'Audio y Video',
      descripcion:
        'Auriculares, bocinas y televisores para una experiencia inmersiva.',
      imagen: 'telefonol.webp',
    },
    {
      titulo: 'Wearables y Smartwatches',
      descripcion: 'Relojes inteligentes y dispositivos portables.',
      imagen: 'telefonol.webp',
    },
    {
      titulo: 'Tablets y Dispositivos Móviles',
      descripcion:
        'Encuentra las mejores opciones para productividad y entretenimiento.',
      imagen: 'telefonol.webp',
    },
    {
      titulo: 'Cámaras y Fotografía',
      descripcion: 'Desde cámaras profesionales hasta gadgets creativos.',
      imagen: 'telefonol.webp',
    },
    {
      titulo: 'Consolas y Gaming',
      descripcion: 'PlayStation, Xbox, Nintendo y todo para gamers.',
      imagen: 'telefonol.webp',
    },
    {
      titulo: 'Drones y Gadgets',
      descripcion: 'Equipos innovadores para fotografía y exploración.',
      imagen: 'telefonol.webp',
    },
  ];
}
