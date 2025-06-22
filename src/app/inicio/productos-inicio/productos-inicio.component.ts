import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos-inicio',
  imports: [RouterLink],
  templateUrl: './productos-inicio.component.html',
  styleUrl: './productos-inicio.component.css',
})
export class ProductosInicioComponent {
  categorias = [
    {
      titulo: 'Laptops y Computadoras',
      descripcion: 'Explora las mejores opciones en equipos de alto rendimiento.',
      imagen: 'laptops.jpg',
      ruta: '/laptops'
    },
    {
      titulo: 'Accesorios Tecnológicos',
      descripcion: 'Encuentra mouse, teclados, cargadores y más.',
      imagen: 'accesorios.webp',
      ruta: '/accesorios'
    },
    {
      titulo: 'Smartphones y Celulares',
      descripcion: 'Modelos avanzados con tecnología de punta.',
      imagen: 'telefonol.webp',
      ruta: '/celulares'
    },
    {
      titulo: 'Audio y Video',
      descripcion:
        'Auriculares, bocinas y televisores para una experiencia inmersiva.',
      imagen: 'audio-video.webp',
      ruta: '/audio-video'
    },
    {
      titulo: 'Wearables y Smartwatches',
      descripcion: 'Relojes inteligentes y dispositivos portables.',
      imagen: 'Smartwatches.webp',
      ruta: '/wearables'
          // <spline-viewer url="https://prod.spline.design/jhxdRiBtWIfrWbY4/scene.splinecode"></spline-viewer>
    },
    {
      titulo: 'Tablets',
      descripcion:'Encuentra las mejores opciones para productividad y entretenimiento.',
      imagen: 'tablets.webp',
      ruta: '/tablets'
    },
    {
      titulo: 'Cámaras y Fotografía',
      descripcion: 'Desde cámaras profesionales hasta gadgets creativos.',
      imagen: 'camaras.webp',
      ruta: '/camaras'
    },
    {
      titulo: 'Consolas y Gaming',
      descripcion: 'PlayStation, Xbox, Nintendo y todo para gamers.',
      imagen: 'gaming.webp',
      ruta: '/gaming'
    },
    {
      titulo: 'Drones y Gadgets',
      descripcion: 'Equipos innovadores para fotografía y exploración.',
      imagen: 'drones.webp',
      ruta: '/drones'
    },
  ];
}
