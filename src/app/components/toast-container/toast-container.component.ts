import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'async-toast-container',
  templateUrl: './toast-container.component.html',
  imports: [ToastModule, ButtonModule],
})
export class ToastContainerComponent {
  constructor(private toastService: ToastService) {}

  onReject() {
    this.toastService.clear();
  }
}
