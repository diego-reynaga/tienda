import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EditarProductosComponent } from './admin/editar-productos/editar-productos.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { CelularesComponent } from './inicio/celulares/celulares.component';
import { AudioVideoComponent } from './inicio/audio-video/audio-video.component';
import { LaptopsComponent } from './inicio/laptops/laptops.component';
import { AccesoriosComponent } from './inicio/accesorios/accesorios.component';
import { WearablesComponent } from './inicio/wearables/wearables.component';
import { DronesComponent } from './inicio/drones/drones.component';
import { GamingComponent } from './inicio/gaming/gaming.component';
import { TabletsComponent } from './inicio/tablets/tablets.component';
import { CamarasComponent } from './inicio/camaras/camaras.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent}, //Esta es la ruta por defecto, que se ejecuta cuando no se encuentra la ruta solicitada
  { path: 'inicio', component: InicioComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'producto/editar/:id', component: EditarProductosComponent},
  { path: 'celulares', component: CelularesComponent},
  { path: 'audio-video', component: AudioVideoComponent},
  { path: 'laptops', component: LaptopsComponent},
  { path: 'accesorios', component: AccesoriosComponent},
  { path: 'wearables', component: WearablesComponent},
  {path: 'drones', component: DronesComponent},
  { path: 'gaming', component: GamingComponent},
  { path: 'tablets', component: TabletsComponent},
  { path: 'camaras', component: CamarasComponent},
  { path: '**', component: NotFoundComponent }, //Este es la ruta comodín, que se ejecuta cuando no se encuentra la ruta solicitada
];
