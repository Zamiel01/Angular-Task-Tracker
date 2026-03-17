import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-tasks-item',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './tasks-item.html',
  styleUrl: './tasks-item.scss',
})
export class TasksItem {
  @Input() task!: Task;
  faTimes = faTimes;

  @Output() deleteTask = new EventEmitter<Task>();
  onDelete(task: Task) {
    this.deleteTask.emit(task);
  }
  @Output() toggleReminder = new EventEmitter<Task>();
  onToggle(task: Task) {
    this.toggleReminder.emit(task);
  }

}
