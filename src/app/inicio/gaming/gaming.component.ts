import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { FooterInicioComponent } from '../footer-inicio/footer-inicio.component';
import { CarritoService } from '../../services/carrito.service';

interface Product {
  id: number;
  name: string;
  platform: string;
  category: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount: number;
  featured?: boolean;
  new?: boolean;
  rating: number;
  reviews: number;
}

@Component({
  selector: 'app-gaming',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './gaming.component.html',
  styleUrl: './gaming.component.css'
})
export class GamingComponent {
  searchTerm: string = '';
  selectedPlatform: string = '';
  selectedCategory: string = '';

  products: Product[] = [
    {
      id: 1,
      name: 'PlayStation 5 Digital Edition',
      platform: 'PlayStation',
      category: 'Consolas',
      imageUrl: 'assets/images/gaming/ps5-digital.jpg',
      price: 399.99,
      originalPrice: 0,
      discount: 0,
      featured: true,
      rating: 4.9,
      reviews: 1245
    },
    {
      id: 2,
      name: 'Xbox Series X',
      platform: 'Xbox',
      category: 'Consolas',
      imageUrl: 'assets/images/gaming/xbox-series-x.jpg',
      price: 499.99,
      originalPrice: 549.99,
      discount: 9,
      featured: true,
      rating: 4.8,
      reviews: 982
    },
    {
      id: 3,
      name: 'Nintendo Switch OLED',
      platform: 'Nintendo',
      category: 'Consolas',
      imageUrl: 'assets/images/gaming/switch-oled.jpg',
      price: 349.99,
      originalPrice: 0,
      discount: 0,
      rating: 4.7,
      reviews: 1173
    },
    {
      id: 4,
      name: 'God of War Ragnarök',
      platform: 'PlayStation',
      category: 'Juegos',
      imageUrl: 'assets/images/gaming/god-of-war.jpg',
      price: 69.99,
      originalPrice: 0,
      discount: 0,
      new: true,
      rating: 4.9,
      reviews: 2341
    },
    {
      id: 5,
      name: 'Halo Infinite',
      platform: 'Xbox',
      category: 'Juegos',
      imageUrl: 'assets/images/gaming/halo-infinite.jpg',
      price: 59.99,
      originalPrice: 69.99,
      discount: 14,
      rating: 4.6,
      reviews: 1589
    },
    {
      id: 6,
      name: 'The Legend of Zelda: Tears of the Kingdom',
      platform: 'Nintendo',
      category: 'Juegos',
      imageUrl: 'assets/images/gaming/zelda-totk.jpg',
      price: 59.99,
      originalPrice: 0,
      discount: 0,
      featured: true,
      rating: 5.0,
      reviews: 3241
    },
    {
      id: 7,
      name: 'DualSense Wireless Controller',
      platform: 'PlayStation',
      category: 'Accesorios',
      imageUrl: 'assets/images/gaming/dualsense.jpg',
      price: 69.99,
      originalPrice: 79.99,
      discount: 13,
      rating: 4.8,
      reviews: 892
    },
    {
      id: 8,
      name: 'Xbox Elite Wireless Controller Series 2',
      platform: 'Xbox',
      category: 'Accesorios',
      imageUrl: 'assets/images/gaming/xbox-elite-controller.jpg',
      price: 179.99,
      originalPrice: 199.99,
      discount: 10,
      rating: 4.7,
      reviews: 645
    },
    {
      id: 9,
      name: 'Nintendo Joy-Con (L/R)',
      platform: 'Nintendo',
      category: 'Accesorios',
      imageUrl: 'assets/images/gaming/joy-con.jpg',
      price: 79.99,
      originalPrice: 0,
      discount: 0,
      rating: 4.5,
      reviews: 789
    },
    {
      id: 10,
      name: 'PlayStation VR2',
      platform: 'PlayStation',
      category: 'Accesorios',
      imageUrl: 'assets/images/gaming/psvr2.jpg',
      price: 549.99,
      originalPrice: 599.99,
      discount: 8,
      new: true,
      featured: true,
      rating: 4.8,
      reviews: 423
    },
    {
      id: 11,
      name: 'Xbox Game Pass Ultimate (3 meses)',
      platform: 'Xbox',
      category: 'Suscripciones',
      imageUrl: 'assets/images/gaming/gamepass.jpg',
      price: 44.99,
      originalPrice: 49.99,
      discount: 10,
      rating: 4.9,
      reviews: 1876
    },
    {
      id: 12,
      name: 'PlayStation Plus (12 meses)',
      platform: 'PlayStation',
      category: 'Suscripciones',
      imageUrl: 'assets/images/gaming/ps-plus.jpg',
      price: 59.99,
      originalPrice: 69.99,
      discount: 14,
      rating: 4.7,
      reviews: 1342
    }
  ];

  // ------------------------------------------------------------------------------
  constructor(private carritoService: CarritoService) {}
  agregarAlCarrito(producto: any): void {
    this.carritoService.agregarProducto(producto);
    alert(`${producto.name} añadido al carrito`);
  }
  // ----------------------------------------------------


  get platforms(): string[] {
    return [...new Set(this.products.map(product => product.platform))];
  }

  get categories(): string[] {
    return [...new Set(this.products.map(product => product.category))];
  }

  get featuredProducts(): Product[] {
    return this.products.filter(product => product.featured).slice(0, 4);
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPlatform = this.selectedPlatform ? product.platform === this.selectedPlatform : true;
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      
      return matchesSearch && matchesPlatform && matchesCategory;
    });
  }
  
  ngOnInit() {
    // Asegurar que los productos con descuento tengan precio original
    this.products.forEach(product => {
      if (product.discount > 0 && !product.originalPrice) {
        product.originalPrice = product.price * (100 / (100 - product.discount));
      }
    });
  }
}
