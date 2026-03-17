import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  template: `<button [ngStyle]="{ 'background-color': color }"  (click)="onClick()">
 {{text}}
</button>`,
  styles: [`
    button {
      background: lightgreen;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      color: white;
      font-size: 16px;
      border-radius: 5px;
    }
  `]
})
export class Button {
  @Input() color: string = 'steelblue';
  @Input() text: string = 'Button';
  @Output() btnClick = new EventEmitter();
  onClick() {
    this.btnClick.emit();
  }
}
