import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { WindowService } from './services/window.service';


@Component({
  selector: 'app-root',
   imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, @Inject(WindowService) private windowService: WindowService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const win = this.windowService.nativeWindow;
        if (win) {
          win.scrollTo(0, 0); // Solo se ejecuta si `window` está disponible
        }
      }
    });
  }
}
