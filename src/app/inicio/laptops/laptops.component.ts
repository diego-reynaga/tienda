import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabeceroComponent } from "../cabecero/cabecero.component";
import { FooterInicioComponent } from "../footer-inicio/footer-inicio.component";

interface Laptop {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  processor: string;
  ram: string;
  storage: string;
  price: number;
  originalPrice?: number;
  discount?: number;
}

@Component({
  selector: 'app-laptops',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './laptops.component.html',
  styleUrl: './laptops.component.css'
})
export class LaptopsComponent {
  laptops: Laptop[] = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      brand: 'Apple',
      imageUrl: 'assets/images/laptops/macbook-pro.jpg',
      processor: 'Apple M2 Pro',
      ram: '16GB',
      storage: '512GB SSD',
      price: 1999.99,
      originalPrice: 2199.99,
      discount: 9
    },
    {
      id: 2,
      name: 'Dell XPS 15',
      brand: 'Dell',
      imageUrl: 'assets/images/laptops/dell-xps.jpg',
      processor: 'Intel i7-12700H',
      ram: '16GB',
      storage: '1TB SSD',
      price: 1699.99,
    },
    {
      id: 3,
      name: 'Lenovo ThinkPad X1 Carbon',
      brand: 'Lenovo',
      imageUrl: 'assets/images/laptops/thinkpad-x1.jpg',
      processor: 'Intel i5-1240P',
      ram: '16GB',
      storage: '512GB SSD',
      price: 1399.99,
      originalPrice: 1599.99,
      discount: 12
    },
    {
      id: 4,
      name: 'HP Spectre x360',
      brand: 'HP',
      imageUrl: 'assets/images/laptops/hp-spectre.jpg',
      processor: 'Intel i7-1260P',
      ram: '16GB',
      storage: '1TB SSD',
      price: 1499.99
    },
    {
      id: 5,
      name: 'Asus ROG Zephyrus G14',
      brand: 'Asus',
      imageUrl: 'assets/images/laptops/asus-rog.jpg',
      processor: 'AMD Ryzen 9 6900HS',
      ram: '32GB',
      storage: '1TB SSD',
      price: 1899.99,
      originalPrice: 2099.99,
      discount: 10
    },
    {
      id: 6,
      name: 'Microsoft Surface Laptop 5',
      brand: 'Microsoft',
      imageUrl: 'assets/images/laptops/surface-laptop.jpg',
      processor: 'Intel i5-1235U',
      ram: '8GB',
      storage: '256GB SSD',
      price: 999.99
    },
    {
      id: 7,
      name: 'Acer Swift 5',
      brand: 'Acer',
      imageUrl: 'assets/images/laptops/acer-swift.jpg',
      processor: 'Intel i7-1260P',
      ram: '16GB',
      storage: '512GB SSD',
      price: 1299.99,
      originalPrice: 1399.99,
      discount: 7
    },
    {
      id: 8,
      name: 'Razer Blade 15',
      brand: 'Razer',
      imageUrl: 'assets/images/laptops/razer-blade.jpg',
      processor: 'Intel i9-12900H',
      ram: '32GB',
      storage: '1TB SSD',
      price: 2499.99
    }
  ];

  searchTerm: string = '';
  filterByBrand: string = '';

  get brands(): string[] {
    return [...new Set(this.laptops.map(laptop => laptop.brand))];
  }

  get filteredLaptops(): Laptop[] {
    return this.laptops.filter(laptop => {
      const matchesSearch = laptop.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           laptop.processor.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesBrand = this.filterByBrand ? laptop.brand === this.filterByBrand : true;
      
      return matchesSearch && matchesBrand;
    });
  }
}
