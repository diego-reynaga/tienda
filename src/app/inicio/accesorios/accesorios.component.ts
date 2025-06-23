import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabeceroComponent } from "../cabecero/cabecero.component";
import { FooterInicioComponent } from "../footer-inicio/footer-inicio.component";

interface Accessory {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  price: number;  // Siempre requerido
  originalPrice?: number;  // Opcional
  discount: number;
  rating: number;
  reviews: number;
}

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent {
  accessories: Accessory[] = [
    {
      id: 1,
      name: 'Logitech MX Master 3',
      category: 'Mouse',
      imageUrl: 'assets/images/accesorios/mouse-logitech.jpg',
      price: 89.99,
      originalPrice: 99.99,
      discount: 10,
      rating: 4.8,
      reviews: 456
    },
    {
      id: 2,
      name: 'Teclado Mecánico Keychron K2',
      category: 'Teclado',
      imageUrl: 'assets/images/accesorios/teclado-keychron.jpg',
      price: 79.99,
      originalPrice: 89.99,
      discount: 11,
      rating: 4.7,
      reviews: 325
    },
    {
      id: 3,
      name: 'Cargador Rápido Anker 65W',
      category: 'Cargador',
      imageUrl: 'assets/images/accesorios/cargador-anker.jpg',
      price: 45.99,
      originalPrice: 0,
      discount: 0,
      rating: 4.5,
      reviews: 210
    },
    {
      id: 4,
      name: 'Airpods Pro 2',
      category: 'Auriculares',
      imageUrl: 'assets/images/accesorios/airpods-pro.jpg',
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.9,
      reviews: 789
    },
    {
      id: 5,
      name: 'Hub USB-C Multipuerto',
      category: 'Hub',
      imageUrl: 'assets/images/accesorios/hub-usbc.jpg',
      price: 39.99,
      originalPrice: 49.99,
      discount: 20,
      rating: 4.4,
      reviews: 178
    },
    {
      id: 6,
      name: 'Funda MacBook Pro 16"',
      category: 'Fundas',
      imageUrl: 'assets/images/accesorios/funda-macbook.jpg',
      price: 29.99,
      originalPrice: 0,
      discount: 0,
      rating: 4.3,
      reviews: 97
    },
    {
      id: 7,
      name: 'Soporte para Laptop Ajustable',
      category: 'Soporte',
      imageUrl: 'assets/images/accesorios/soporte-laptop.jpg',
      price: 35.99,
      originalPrice: 39.99,
      discount: 10,
      rating: 4.6,
      reviews: 245
    },
    {
      id: 8,
      name: 'Disco Duro Externo 2TB',
      category: 'Almacenamiento',
      imageUrl: 'assets/images/accesorios/disco-externo.jpg',
      price: 79.99,
      originalPrice: 94.99,
      discount: 15,
      rating: 4.7,
      reviews: 412
    },
    {
      id: 9,
      name: 'Webcam Logitech C920',
      category: 'Webcam',
      imageUrl: 'assets/images/accesorios/webcam-logitech.jpg',
      price: 69.99,
      originalPrice: 79.99,
      discount: 12,
      rating: 4.5,
      reviews: 368
    }
  ];

  searchTerm: string = '';
  selectedCategory: string = '';

  get categories(): string[] {
    return [...new Set(this.accessories.map(item => item.category))];
  }

  get filteredAccessories(): Accessory[] {
    return this.accessories.filter(accessory => {
      const matchesSearch = accessory.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory ? accessory.category === this.selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }

  // Asegúrate que los objetos con discount > 0 siempre tengan originalPrice
  ngOnInit() {
    // Validación de datos - Para evitar inconsistencias en los datos
    this.accessories.forEach(accessory => {
      if (accessory.discount > 0 && !accessory.originalPrice) {
        accessory.originalPrice = accessory.price * (100 / (100 - accessory.discount));
      }
    });
  }
}
