import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'async-side-nav',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './async-side-nav.component.html',
  styleUrl: './async-side-nav.component.scss'
})
export class AsyncSideNavComponent {

}
