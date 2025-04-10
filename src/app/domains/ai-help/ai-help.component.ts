import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { AIHelpService } from './ai-help.service';

@Component({
  selector: 'async-ai-help',
  imports: [TextareaModule],
  templateUrl: './ai-help.component.html',
  styleUrl: './ai-help.component.scss',
  providers: [AIHelpService]
})
export class AiHelpComponent {

}
