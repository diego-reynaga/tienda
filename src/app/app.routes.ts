import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }, //Esta es la ruta por defecto, que se ejecuta cuando no se encuentra la ruta solicitada
  { path: 'inicio', component: InicioComponent},
  { path: '**', component: NotFoundComponent }, //Este es la ruta comodín, que se ejecuta cuando no se encuentra la ruta solicitada
];
