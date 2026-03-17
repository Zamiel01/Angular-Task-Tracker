import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';
import { Ui } from '../../services/ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  @Output() onAddTask:   EventEmitter<Task> = new EventEmitter();
  text: string = '';
  day: string = '';
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private ui: Ui) {
    this.subscription = this.ui.onToggle().subscribe((value) => (this.showAddTask = value));
  }
  onSubmit() {
    if (!this.text ) {
      alert('Please add a task!');
      return;
    }
    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };
    console.log(newTask);
    // Emit event
    this.onAddTask.emit(newTask);
    // Clear form
    this.text = '';
    this.day = '';
    this.reminder = false;

 
  

  }
}
