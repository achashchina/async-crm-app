import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncTopMenuComponent } from './components/async-top-menu/async-top-menu.component';
import { AsyncSideNavComponent } from './components/async-side-nav/async-side-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncTopMenuComponent, AsyncSideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
