import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { FooterInicioComponent } from '../footer-inicio/footer-inicio.component';
import { CarritoService } from '../../services/carrito.service';

interface Camera {
  id: number;
  name: string;
  brand: string;
  type: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount: number;
  megapixels?: string;
  sensor?: string;
  videoRes?: string;
  feature?: string;
  new?: boolean;
}

@Component({
  selector: 'app-camaras',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './camaras.component.html',
  styleUrl: './camaras.component.css'
})
export class CamarasComponent {
  searchTerm: string = '';
  filterByType: string = '';
  filterByBrand: string = '';

  cameras: Camera[] = [
    {
      id: 1,
      name: 'Canon EOS R5',
      brand: 'Canon',
      type: 'Cámara Mirrorless',
      imageUrl: 'assets/images/cameras/canon-eos-r5.jpg',
      price: 3899.99,
      originalPrice: 3999.99,
      discount: 3,
      megapixels: '45',
      sensor: 'Full Frame',
      videoRes: '8K',
      feature: 'IBIS 8 paradas'
    },
    {
      id: 2,
      name: 'Sony Alpha A7 IV',
      brand: 'Sony',
      type: 'Cámara Mirrorless',
      imageUrl: 'assets/images/cameras/sony-a7iv.jpg',
      price: 2499.99,
      originalPrice: 2699.99,
      discount: 7,
      megapixels: '33',
      sensor: 'Full Frame',
      videoRes: '4K 60p',
      feature: 'AF tiempo real'
    },
    {
      id: 3,
      name: 'Nikon Z9',
      brand: 'Nikon',
      type: 'Cámara Mirrorless',
      imageUrl: 'assets/images/cameras/nikon-z9.jpg',
      price: 5499.99,
      originalPrice: 5999.99,
      discount: 8,
      megapixels: '45.7',
      sensor: 'Full Frame',
      videoRes: '8K 30p',
      feature: '120fps ráfaga',
      new: true
    },
    {
      id: 4,
      name: 'Fujifilm X-T5',
      brand: 'Fujifilm',
      type: 'Cámara Mirrorless',
      imageUrl: 'assets/images/cameras/fuji-xt5.jpg',
      price: 1699.99,
      originalPrice: 0,
      discount: 0,
      megapixels: '40',
      sensor: 'APS-C',
      videoRes: '6K',
      feature: 'Simulación de película'
    },
    {
      id: 5,
      name: 'GoPro HERO 11 Black',
      brand: 'GoPro',
      type: 'Cámara de Acción',
      imageUrl: 'assets/images/cameras/gopro-11.jpg',
      price: 399.99,
      originalPrice: 449.99,
      discount: 11,
      megapixels: '27',
      sensor: '1/1.9"',
      videoRes: '5.3K 60p',
      feature: 'HyperSmooth 5.0'
    },
    {
      id: 6,
      name: 'DJI Pocket 3',
      brand: 'DJI',
      type: 'Gimbal con Cámara',
      imageUrl: 'assets/images/cameras/dji-pocket3.jpg',
      price: 519.99,
      originalPrice: 549.99,
      discount: 5,
      megapixels: '12',
      sensor: '1"',
      videoRes: '4K 120p',
      feature: 'Estabilización de 3 ejes',
      new: true
    },
    {
      id: 7,
      name: 'Canon EF 24-70mm f/2.8L II',
      brand: 'Canon',
      type: 'Objetivo',
      imageUrl: 'assets/images/cameras/canon-24-70.jpg',
      price: 1899.99,
      originalPrice: 2099.99,
      discount: 10,
      feature: 'USM Ultrasónico'
    },
    {
      id: 8,
      name: 'Sony FE 16-35mm f/2.8 GM',
      brand: 'Sony',
      type: 'Objetivo',
      imageUrl: 'assets/images/cameras/sony-16-35.jpg',
      price: 2199.99,
      originalPrice: 2299.99,
      discount: 4,
      feature: 'XA Elements'
    },
    {
      id: 9,
      name: 'Godox AD400 Pro',
      brand: 'Godox',
      type: 'Flash',
      imageUrl: 'assets/images/cameras/godox-ad400.jpg',
      price: 649.99,
      originalPrice: 699.99,
      discount: 7,
      feature: '400Ws TTL HSS'
    },
    {
      id: 10,
      name: 'Blackmagic Pocket Cinema 6K',
      brand: 'Blackmagic',
      type: 'Cámara de Cine',
      imageUrl: 'assets/images/cameras/blackmagic-6k.jpg',
      price: 2495.00,
      originalPrice: 0,
      discount: 0,
      sensor: 'Super 35',
      videoRes: '6K',
      feature: 'Raw 12-bit'
    },
    {
      id: 11,
      name: 'Instax Mini LiPlay',
      brand: 'Fujifilm',
      type: 'Cámara Instantánea',
      imageUrl: 'assets/images/cameras/instax-mini.jpg',
      price: 159.99,
      originalPrice: 179.99,
      discount: 11,
      feature: 'Impresión híbrida'
    },
    {
      id: 12,
      name: 'Insta360 X3',
      brand: 'Insta360',
      type: 'Cámara 360°',
      imageUrl: 'assets/images/cameras/insta360-x3.jpg',
      price: 449.99,
      originalPrice: 499.99,
      discount: 10,
      videoRes: '5.7K 30p',
      feature: 'FlowState Stabilization'
    }
  ];

  // ------------------------------------------------------------------------------
  constructor(private carritoService: CarritoService) {}
  agregarAlCarrito(producto: any): void {
    this.carritoService.agregarProducto(producto);
    alert(`${producto.name} añadido al carrito`);
  }
  // ----------------------------------------------------


  get cameraTypes(): string[] {
    return [...new Set(this.cameras.map(camera => camera.type))];
  }

  get brands(): string[] {
    return [...new Set(this.cameras.map(camera => camera.brand))];
  }

  get filteredCameras(): Camera[] {
    return this.cameras.filter(camera => {
      const matchesSearch = camera.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           (camera.feature && camera.feature.toLowerCase().includes(this.searchTerm.toLowerCase()));
      const matchesType = this.filterByType ? camera.type === this.filterByType : true;
      const matchesBrand = this.filterByBrand ? camera.brand === this.filterByBrand : true;
      
      return matchesSearch && matchesType && matchesBrand;
    });
  }
  
  ngOnInit() {
    // Asegurar que los productos con descuento tengan precio original
    this.cameras.forEach(camera => {
      if (camera.discount > 0 && !camera.originalPrice) {
        camera.originalPrice = camera.price * (100 / (100 - camera.discount));
      }
    });
  }
}
