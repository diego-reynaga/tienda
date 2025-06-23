import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { FooterInicioComponent } from '../footer-inicio/footer-inicio.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface Wearable {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount: number;
  features: string[];
  compatibility: string[];
  new?: boolean;
}

@Component({
  selector: 'app-wearables',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './wearables.component.html',
  styleUrl: './wearables.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WearablesComponent {
  searchTerm: string = '';
  filterByType: string = '';

  wearables: Wearable[] = [
    {
      id: 1,
      name: 'Apple Watch Series 8',
      type: 'Smartwatch',
      imageUrl: 'assets/images/wearables/apple-watch.jpg',
      price: 399.99,
      originalPrice: 429.99,
      discount: 7,
      features: ['Monitor de Oxígeno', 'ECG', 'Pantalla Always-On', 'Resistente al agua 50m'],
      compatibility: ['iOS'],
      new: true
    },
    {
      id: 2,
      name: 'Samsung Galaxy Watch 5',
      type: 'Smartwatch',
      imageUrl: 'assets/images/wearables/galaxy-watch.jpg',
      price: 329.99,
      originalPrice: 349.99,
      discount: 6,
      features: ['Monitoreo avanzado del sueño', 'BioActive Sensor', 'Resistente al agua 50m', 'Batería de larga duración'],
      compatibility: ['Android', 'iOS']
    },
    {
      id: 3,
      name: 'Fitbit Sense 2',
      type: 'Fitness Tracker',
      imageUrl: 'assets/images/wearables/fitbit-sense.jpg',
      price: 249.99,
      originalPrice: 299.99,
      discount: 17,
      features: ['Sensor EDA', 'GPS integrado', 'ECG', 'Batería de 6+ días'],
      compatibility: ['Android', 'iOS']
    },
    {
      id: 4,
      name: 'Garmin Forerunner 955',
      type: 'Sports Watch',
      imageUrl: 'assets/images/wearables/garmin-forerunner.jpg',
      price: 499.99,
      originalPrice: 0,
      discount: 0,
      features: ['GPS multibanda', 'Mapas a color', 'Análisis de entrenamiento', 'Batería de hasta 15 días'],
      compatibility: ['Android', 'iOS', 'Windows']
    },
    {
      id: 5,
      name: 'Xiaomi Mi Band 7',
      type: 'Fitness Tracker',
      imageUrl: 'assets/images/wearables/mi-band.jpg',
      price: 49.99,
      originalPrice: 59.99,
      discount: 17,
      features: ['Monitor de ritmo cardíaco', 'Batería de 14 días', 'Pantalla AMOLED', '120 modos deportivos'],
      compatibility: ['Android', 'iOS']
    },
    {
      id: 6,
      name: 'Whoop 4.0',
      type: 'Fitness Tracker',
      imageUrl: 'assets/images/wearables/whoop.jpg',
      price: 239.99,
      originalPrice: 0,
      discount: 0,
      features: ['Monitoreo 24/7', 'Sin pantalla', 'Análisis avanzado de recuperación', 'Batería intercambiable'],
      compatibility: ['Android', 'iOS'],
      new: true
    },
    {
      id: 7,
      name: 'Google Pixel Watch',
      type: 'Smartwatch',
      imageUrl: 'assets/images/wearables/pixel-watch.jpg',
      price: 349.99,
      originalPrice: 379.99,
      discount: 8,
      features: ['Wear OS', 'Fitbit integrado', 'Asistente Google', 'Diseño minimalista'],
      compatibility: ['Android']
    },
    {
      id: 8,
      name: 'Amazfit GTR 4',
      type: 'Smartwatch',
      imageUrl: 'assets/images/wearables/amazfit.jpg',
      price: 199.99,
      originalPrice: 219.99,
      discount: 9,
      features: ['GPS de precisión', 'Batería de 14 días', '150 modos deportivos', 'Alexa integrado'],
      compatibility: ['Android', 'iOS']
    }
  ];

  get deviceTypes(): string[] {
    return [...new Set(this.wearables.map(device => device.type))];
  }

  get filteredWearables(): Wearable[] {
    return this.wearables.filter(device => {
      const matchesSearch = device.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           device.features.some(feature => feature.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesType = this.filterByType ? device.type === this.filterByType : true;
      
      return matchesSearch && matchesType;
    });
  }
  
  ngOnInit() {
    this.wearables.forEach(device => {
      if (device.discount > 0 && !device.originalPrice) {
        device.originalPrice = device.price * (100 / (100 - device.discount));
      }
    });
  }
}
