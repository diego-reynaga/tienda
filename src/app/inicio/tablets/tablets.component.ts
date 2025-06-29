import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { FooterInicioComponent } from '../footer-inicio/footer-inicio.component';
import { CarritoService } from '../../services/carrito.service';

interface Tablet {
  id: number;
  name: string;
  brand: string;
  type: string;
  imageUrl: string;
  displaySize: string;
  processor: string;
  ram: string;
  storage: string;
  cellular?: boolean;
  price: number;
  originalPrice?: number;
  discount: number;
  new?: boolean;
}

@Component({
  selector: 'app-tablets',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './tablets.component.html',
  styleUrl: './tablets.component.css'
})
export class TabletsComponent {
  searchTerm: string = '';
  filterByBrand: string = '';
  filterByType: string = '';

  tablets: Tablet[] = [
    {
      id: 1,
      name: 'iPad Pro 12.9" M2',
      brand: 'Apple',
      type: 'Premium',
      imageUrl: 'assets/images/tablets/ipad-pro.jpg',
      displaySize: '12.9" Liquid Retina XDR',
      processor: 'Apple M2',
      ram: '8GB',
      storage: '256GB',
      cellular: true,
      price: 1299.99,
      originalPrice: 1399.99,
      discount: 7,
      new: true
    },
    {
      id: 2,
      name: 'Samsung Galaxy Tab S9 Ultra',
      brand: 'Samsung',
      type: 'Premium',
      imageUrl: 'assets/images/tablets/galaxy-tab-s9.jpg',
      displaySize: '14.6" Dynamic AMOLED 2x',
      processor: 'Snapdragon 8 Gen 2',
      ram: '12GB',
      storage: '256GB',
      cellular: true,
      price: 1199.99,
      originalPrice: 1299.99,
      discount: 8
    },
    {
      id: 3,
      name: 'iPad Air 5th Gen',
      brand: 'Apple',
      type: 'Mid-range',
      imageUrl: 'assets/images/tablets/ipad-air.jpg',
      displaySize: '10.9" Liquid Retina',
      processor: 'Apple M1',
      ram: '8GB',
      storage: '64GB',
      price: 599.99,
      originalPrice: 649.99,
      discount: 8
    },
    {
      id: 4,
      name: 'Microsoft Surface Pro 9',
      brand: 'Microsoft',
      type: 'Premium',
      imageUrl: 'assets/images/tablets/surface-pro.jpg',
      displaySize: '13" PixelSense Flow',
      processor: 'Intel Core i7-1255U',
      ram: '16GB',
      storage: '512GB SSD',
      price: 1599.99,
      originalPrice: 1699.99,
      discount: 6
    },
    {
      id: 5,
      name: 'Amazon Fire HD 10',
      brand: 'Amazon',
      type: 'Budget',
      imageUrl: 'assets/images/tablets/fire-hd.jpg',
      displaySize: '10.1" Full HD',
      processor: 'Octa-core 2.0 GHz',
      ram: '3GB',
      storage: '32GB',
      price: 149.99,
      originalPrice: 179.99,
      discount: 17
    },
    {
      id: 6,
      name: 'Lenovo Tab P12 Pro',
      brand: 'Lenovo',
      type: 'Mid-range',
      imageUrl: 'assets/images/tablets/lenovo-tab-p12.jpg',
      displaySize: '12.6" AMOLED',
      processor: 'Snapdragon 870',
      ram: '6GB',
      storage: '128GB',
      cellular: true,
      price: 699.99,
      originalPrice: 749.99,
      discount: 7
    },
    {
      id: 7,
      name: 'iPad 10th Gen',
      brand: 'Apple',
      type: 'Mid-range',
      imageUrl: 'assets/images/tablets/ipad-10.jpg',
      displaySize: '10.9" Liquid Retina',
      processor: 'A14 Bionic',
      ram: '4GB',
      storage: '64GB',
      price: 449.99,
      originalPrice: 0,
      discount: 0
    },
    {
      id: 8,
      name: 'Samsung Galaxy Tab A8',
      brand: 'Samsung',
      type: 'Budget',
      imageUrl: 'assets/images/tablets/galaxy-tab-a8.jpg',
      displaySize: '10.5" LCD',
      processor: 'Unisoc T618',
      ram: '4GB',
      storage: '64GB',
      price: 229.99,
      originalPrice: 279.99,
      discount: 18
    },
    {
      id: 9,
      name: 'Xiaomi Pad 6',
      brand: 'Xiaomi',
      type: 'Mid-range',
      imageUrl: 'assets/images/tablets/xiaomi-pad-6.jpg',
      displaySize: '11" LCD',
      processor: 'Snapdragon 870',
      ram: '6GB',
      storage: '128GB',
      price: 349.99,
      originalPrice: 399.99,
      discount: 13,
      new: true
    }
  ];


  // ------------------------------------------------------------------------------
    constructor(private carritoService: CarritoService) {}
    agregarAlCarrito(producto: any): void {
      this.carritoService.agregarProducto(producto);
      alert(`${producto.name} añadido al carrito`);
    }
    // ----------------------------------------------------
  


  get brands(): string[] {
    return [...new Set(this.tablets.map(tablet => tablet.brand))];
  }

  get types(): string[] {
    return [...new Set(this.tablets.map(tablet => tablet.type))];
  }

  get filteredTablets(): Tablet[] {
    return this.tablets.filter(tablet => {
      const matchesSearch = tablet.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           tablet.processor.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesBrand = this.filterByBrand ? tablet.brand === this.filterByBrand : true;
      const matchesType = this.filterByType ? tablet.type === this.filterByType : true;
      
      return matchesSearch && matchesBrand && matchesType;
    });
  }

  ngOnInit() {
    // Asegurar que los productos con descuento tengan precio original
    this.tablets.forEach(tablet => {
      if (tablet.discount > 0 && !tablet.originalPrice) {
        tablet.originalPrice = tablet.price * (100 / (100 - tablet.discount));
      }
    });
  }
}
