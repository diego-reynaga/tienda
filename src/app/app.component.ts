import { Component } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RouterOutlet } from '@angular/router';
import { InicioComponent } from "./inicio/inicio.component";

@Component({
  selector: 'app-root',
  imports: [LoginComponent, NotFoundComponent, RouterOutlet, InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
