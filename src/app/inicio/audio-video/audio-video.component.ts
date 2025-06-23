import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { FooterInicioComponent } from '../footer-inicio/footer-inicio.component';

interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount: number;
  rating: number;
  reviews: number;
  description?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-audio-video',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './audio-video.component.html',
  styleUrl: './audio-video.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AudioVideoComponent {
  searchTerm: string = '';
  selectedCategory: string = '';

  products: Product[] = [
    {
      id: 1,
      name: 'Auriculares Sony WH-1000XM4',
      category: 'Auriculares',
      imageUrl: 'assets/images/audio-video/sony-wh1000xm4.jpg',
      price: 349.99,
      originalPrice: 399.99,
      discount: 12,
      rating: 4.9,
      reviews: 2456,
      description: 'Cancelación de ruido líder en la industria'
    },
    {
      id: 2,
      name: 'Altavoz Bluetooth JBL Charge 5',
      category: 'Altavoces',
      imageUrl: 'assets/images/audio-video/jbl-charge5.jpg',
      price: 179.99,
      originalPrice: 199.99,
      discount: 10,
      rating: 4.7,
      reviews: 1823
    },
    {
      id: 3,
      name: 'Proyector 4K Epson Home Cinema',
      category: 'Proyectores',
      imageUrl: 'assets/images/audio-video/epson-projector.jpg',
      price: 1999.99,
      originalPrice: 2299.99,
      discount: 13,
      rating: 4.8,
      reviews: 452
    },
    {
      id: 4,
      name: 'Barra de Sonido Samsung HW-Q950T',
      category: 'Barras de Sonido',
      imageUrl: 'assets/images/audio-video/samsung-soundbar.jpg',
      price: 1299.99,
      originalPrice: 0,
      discount: 0,
      rating: 4.6,
      reviews: 874
    },
    {
      id: 5,
      name: 'Auriculares Apple AirPods Pro',
      category: 'Auriculares',
      imageUrl: 'assets/images/audio-video/airpods-pro.jpg',
      price: 249.99,
      originalPrice: 0,
      discount: 0,
      rating: 4.8,
      reviews: 3256
    },
    {
      id: 6,
      name: 'Reproductor Multimedia Nvidia Shield TV Pro',
      category: 'Reproductores',
      imageUrl: 'assets/images/audio-video/nvidia-shield.jpg',
      price: 199.99,
      originalPrice: 219.99,
      discount: 9,
      rating: 4.7,
      reviews: 1245
    },
    {
      id: 7,
      name: 'Micrófono Blue Yeti USB',
      category: 'Micrófonos',
      imageUrl: 'assets/images/audio-video/blue-yeti.jpg',
      price: 129.99,
      originalPrice: 149.99,
      discount: 13,
      rating: 4.6,
      reviews: 2789
    },
    {
      id: 8,
      name: 'TV OLED LG C1 65"',
      category: 'Televisores',
      imageUrl: 'assets/images/audio-video/lg-oled.jpg',
      price: 2499.99,
      originalPrice: 2799.99,
      discount: 11,
      rating: 4.9,
      reviews: 1876
    }
  ];

  get categories(): string[] {
    return [...new Set(this.products.map(product => product.category))];
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }
  
  // Asegúrate que los objetos con discount > 0 siempre tengan originalPrice
  ngOnInit() {
    this.products.forEach(product => {
      if (product.discount > 0 && !product.originalPrice) {
        product.originalPrice = product.price * (100 / (100 - product.discount));
      }
    });
  }
}
