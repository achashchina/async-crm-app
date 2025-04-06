import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  success(summary: string, detail: string) {
    this.messageService.add({
      key: 'confirm',
      sticky: true,
      severity: 'success',
      summary,
      detail,
    });
  }

  error(summary?: string, detail?: string) {
    this.messageService.add({
      key: 'confirm',
      sticky: true,
      severity: 'error',
      summary,
      detail,
    });
  }

  info(summary: string, detail: string) {
    this.messageService.add({
      key: 'confirm',
      sticky: true,
      severity: 'info',
      summary,
      detail,
    });
  }

  warn(summary: string, detail: string) {
    this.messageService.add({
      key: 'confirm',
      sticky: true,
      severity: 'warn',
      summary,
      detail,
    });
  }

  clear() {
    this.messageService.clear();
  }
}
