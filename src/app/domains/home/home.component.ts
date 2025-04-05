import { Component } from '@angular/core';
import { AsyncSideNavComponent } from '../../components/async-side-nav/async-side-nav.component';
import { AsyncTopMenuComponent } from '../../components/async-top-menu/async-top-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'async-home',
  imports: [AsyncTopMenuComponent, AsyncSideNavComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
