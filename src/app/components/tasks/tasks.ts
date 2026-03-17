import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { Task } from '../../Task';
import { CommonModule } from '@angular/common';
import { TasksItem } from '../tasks-item/tasks-item';
import { TaskServices } from '../../services/task';
import { BehaviorSubject } from 'rxjs';
import { AddTask } from '../add-task/add-task';
import { isPlatformBrowser } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';

const TASKS_KEY = makeStateKey<Task[]>('tasks');

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, TasksItem, AddTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(
    private taskService: TaskServices,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState
  ) {
    // Check if tasks are already in transfer state
    const cachedTasks = this.transferState.get(TASKS_KEY, null);
    if (cachedTasks) {
      this.tasks$.next(cachedTasks);
    } else {
      this.getTasks();
    }
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks$.next(tasks);
      // On server, store in transfer state
      if (!isPlatformBrowser(this.platformId)) {
        this.transferState.set(TASKS_KEY, tasks);
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      const updatedTasks = this.tasks$.value.filter((t) => t.id !== task.id);
      this.tasks$.next(updatedTasks);
    });
  }

  onToggleReminder(task: Task) {
    const updatedTask = { ...task, reminder: !task.reminder };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      const updatedTasks = this.tasks$.value.map((t) =>
        t.id === task.id ? updatedTask : t
      );
      this.tasks$.next(updatedTasks);
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((newTask) => {
      this.tasks$.next([...this.tasks$.value, newTask]);
    });
  }

  emptyTasksError() {
    if (this.tasks$.value.length === 0) {
      return 'No Tasks To Show';
    }
    return '';
  }
}
