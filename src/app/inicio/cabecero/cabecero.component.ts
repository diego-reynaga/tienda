import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cabecero',
  imports: [RouterModule],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css',
})
export class CabeceroComponent {
  constructor(public router: Router) {}
}
