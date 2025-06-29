import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { FooterInicioComponent } from '../footer-inicio/footer-inicio.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';

interface Drone {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount: number;
  camera: string;
  flightTime: string;
  range: string;
  features?: string[];
}

@Component({
  selector: 'app-drones',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './drones.component.html',
  styleUrl: './drones.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DronesComponent {
  searchTerm: string = '';
  selectedCategory: string = '';

  drones: Drone[] = [
    {
      id: 1,
      name: 'DJI Mini 3 Pro',
      category: 'Drones Compactos',
      imageUrl: 'assets/images/drones/dji-mini-3.jpg',
      price: 759.99,
      originalPrice: 829.99,
      discount: 8,
      camera: '4K 60fps',
      flightTime: '34 min',
      range: '12 km',
      features: ['Peso menor a 249g', 'Sensores de obstáculos', 'Seguimiento inteligente']
    },
    {
      id: 2,
      name: 'Autel EVO Lite+',
      category: 'Drones Profesionales',
      imageUrl: 'assets/images/drones/autel-evo-lite.jpg',
      price: 1349.99,
      originalPrice: 1499.99,
      discount: 10,
      camera: '6K 30fps',
      flightTime: '40 min',
      range: '12 km',
      features: ['Sensor 1"', 'Zoom digital 16x', 'Modo nocturno RYYB']
    },
    {
      id: 3,
      name: 'DJI FPV Combo',
      category: 'Drones FPV',
      imageUrl: 'assets/images/drones/dji-fpv.jpg',
      price: 999.99,
      originalPrice: 1299.99,
      discount: 23,
      camera: '4K 60fps',
      flightTime: '20 min',
      range: '10 km',
      features: ['Experiencia inmersiva', 'Velocidad máx. 140 km/h', 'Gafas V2 incluidas']
    },
    {
      id: 4,
      name: 'Skydio 2+',
      category: 'Drones Autónomos',
      imageUrl: 'assets/images/drones/skydio-2.jpg',
      price: 1099.99,
      originalPrice: 0,
      discount: 0,
      camera: '4K 60fps HDR',
      flightTime: '27 min',
      range: '6 km',
      features: ['IA de evasión de obstáculos', 'Seguimiento avanzado', 'Grabación deportiva']
    },
    {
      id: 5,
      name: 'DJI Air 2S',
      category: 'Drones Compactos',
      imageUrl: 'assets/images/drones/dji-air-2s.jpg',
      price: 899.99,
      originalPrice: 999.99,
      discount: 10,
      camera: '5.4K 30fps',
      flightTime: '31 min',
      range: '12 km',
      features: ['Sensor CMOS 1"', 'Mastershots', 'ActiveTrack 4.0']
    },
    {
      id: 6,
      name: 'Ryze Tello',
      category: 'Drones Educativos',
      imageUrl: 'assets/images/drones/ryze-tello.jpg',
      price: 99.99,
      originalPrice: 129.99,
      discount: 23,
      camera: 'HD 720p',
      flightTime: '13 min',
      range: '100 m',
      features: ['Programable', 'Modos automáticos', 'Ligero (80g)']
    },
    {
      id: 7,
      name: 'Parrot Anafi',
      category: 'Drones Profesionales',
      imageUrl: 'assets/images/drones/parrot-anafi.jpg',
      price: 699.99,
      originalPrice: 749.99,
      discount: 7,
      camera: '4K HDR',
      flightTime: '25 min',
      range: '4 km',
      features: ['Cámara rotación 180°', 'Zoom 3x', 'Ultraportátil']
    },
    {
      id: 8,
      name: 'Holy Stone HS720E',
      category: 'Drones para Principiantes',
      imageUrl: 'assets/images/drones/holystone-hs720.jpg',
      price: 349.99,
      originalPrice: 399.99,
      discount: 13,
      camera: '4K UHD',
      flightTime: '23 min',
      range: '1.2 km',
      features: ['GPS', 'Return to Home', 'Motores sin escobillas']
    }
  ];

  // ------------------------------------------------------------------------------
  constructor(private carritoService: CarritoService) {}
  agregarAlCarrito(producto: any): void {
    this.carritoService.agregarProducto(producto);
    alert(`${producto.name} añadido al carrito`);
  }
  // ----------------------------------------------------


  get categories(): string[] {
    return [...new Set(this.drones.map(drone => drone.category))];
  }

  get filteredDrones(): Drone[] {
    return this.drones.filter(drone => {
      const matchesSearch = drone.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? drone.category === this.selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }
  
  ngOnInit() {
    // Asegurar que los productos con descuento tengan precio original
    this.drones.forEach(drone => {
      if (drone.discount > 0 && !drone.originalPrice) {
        drone.originalPrice = drone.price * (100 / (100 - drone.discount));
      }
    });
  }
}
