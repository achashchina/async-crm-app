import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'async-top-menu',
  imports: [
    AvatarModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    OverlayPanelModule,
  ],
  templateUrl: './async-top-menu.component.html',
  styleUrl: './async-top-menu.component.scss',
})
export class AsyncTopMenuComponent {
  members = [
    {
      name: 'Amy Elsner',
      image: 'amyelsner.png',
      email: 'amy@email.com',
      role: 'Owner',
    },
    {
      name: 'Bernardo Dominic',
      image: 'bernardodominic.png',
      email: 'bernardo@email.com',
      role: 'Editor',
    },
    {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png',
      email: 'ioni@email.com',
      role: 'Viewer',
    },
  ];
}
