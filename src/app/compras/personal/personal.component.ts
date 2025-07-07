import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';
import { CabeceroComponent } from "../../inicio/cabecero/cabecero.component";
import { FooterInicioComponent } from "../../inicio/footer-inicio/footer-inicio.component";

interface Cliente {
  dni: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  direccion: string;
  telefono: string;
  email: string;
}

interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Venta {
  id: number;
  fecha: Date;
  cliente: Cliente;
  productos: Producto[];
  total: number;
  estado: 'pending' | 'approved' | 'rejected';
  comprobantePago: string;
  codigoSeguridad: string;
}

@Component({
  selector: 'app-aprobar-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, CabeceroComponent, FooterInicioComponent],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class AprobarVentasComponent implements OnInit {
  ventas: Venta[] = [];
  ventasFiltradas: Venta[] = [];
  ventaSeleccionada: Venta | null = null;
  mostrarModal = false;
  filtro = '';
  filtroEstado = 'all';

  constructor(private pagosService: PagosService) { }

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.pagosService.obtenerVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Error al cargar las ventas', err);
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.ventas];
    
    if (this.filtro) {
      const filtroLower = this.filtro.toLowerCase();
      resultado = resultado.filter(venta => 
        venta.cliente.dni.includes(filtroLower) || 
        venta.cliente.nombres.toLowerCase().includes(filtroLower) || 
        venta.cliente.primerApellido.toLowerCase().includes(filtroLower) ||
        venta.cliente.segundoApellido.toLowerCase().includes(filtroLower)
      );
    }
    
    if (this.filtroEstado !== 'all') {
      resultado = resultado.filter(venta => venta.estado === this.filtroEstado);
    }
    
    this.ventasFiltradas = resultado;
  }

  refrescarVentas(): void {
    this.cargarVentas();
  }

  verDetalles(venta: Venta): void {
    this.ventaSeleccionada = venta;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.ventaSeleccionada = null;
  }

  aprobarVenta(): void {
    if (this.ventaSeleccionada) {
      this.pagosService.aprobarVenta(this.ventaSeleccionada.id).subscribe({
        next: () => {
          this.ventaSeleccionada!.estado = 'approved';
          this.cargarVentas();
        },
        error: (err) => {
          console.error('Error al aprobar la venta', err);
        }
      });
    }
  }

  rechazarVenta(): void {
    if (this.ventaSeleccionada) {
      this.pagosService.rechazarVenta(this.ventaSeleccionada.id).subscribe({
        next: () => {
          this.ventaSeleccionada!.estado = 'rejected';
          this.cargarVentas();
        },
        error: (err) => {
          console.error('Error al rechazar la venta', err);
        }
      });
    }
  }
}