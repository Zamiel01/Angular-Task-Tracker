import { Component, OnInit, signal } from '@angular/core';
import { Task } from '../../Task';
import { CommonModule } from '@angular/common';
import { TasksItem } from '../tasks-item/tasks-item';
import { TaskServices } from '../../services/task';
import { AddTask } from '../add-task/add-task';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, TasksItem, AddTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks implements OnInit {
  tasks = signal<Task[]>([]);

  constructor(private taskService: TaskServices) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
      },
      error: (error) => {
        console.error('[Tasks] Error fetching tasks:', error);
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks.update(t => t.filter((item) => item.id !== task.id));
    });
  }

  onToggleReminder(task: Task) {
    const updatedTask = { ...task, reminder: !task.reminder };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.tasks.update(t => t.map((item) =>
        item.id === task.id ? updatedTask : item
      ));
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((newTask) => {
      this.tasks.update(t => [...t, newTask]);
    });
  }

  emptyTasksError() {
    // Only show error if we've actually loaded and have no tasks
    if (this.tasks().length === 0) {
      return 'No Tasks To Show';
    }
    return '';
  }
}
