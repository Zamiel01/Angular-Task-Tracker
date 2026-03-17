import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-about',
  imports: [Button],
  template: `<div class="about-content">
  <app-button color="green" text="← Back" (btnClick)="goBack()"></app-button>
  <h2>About Task Tracker</h2>
  <p>Task Tracker is a simple and intuitive application designed to help you manage your daily tasks efficiently.</p>
  
  <h3>Features</h3>
  <ul>
    <li>Add new tasks with ease</li>
    <li>Mark tasks as complete or incomplete</li>
    <li>Delete tasks you no longer need</li>
    <li>Set reminders for important tasks</li>
    <li>View all your tasks in one place</li>
  </ul>
  
  <h3>How to Use</h3>
  <p>Simply click the "Add Task" button to create a new task. You can set a reminder date and time, and toggle the task's completion status. Click on a task to edit its details.</p>
  
  <p class="version">Version 1.0.0</p>
</div>`,
  styles: [`
    .about-content {
      max-width: 600px;
      margin: 3rem auto;
      padding: 2.5rem;
      border: 1px solid #111;
      border-radius: 6px;
    }

    .about-content h2 {
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .about-content p {
      font-size: 0.95rem;
      line-height: 1.7;
      color: #333;
      margin-bottom: 1.25rem;
    }

    .about-content h3 {
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #111;
      margin-bottom: 0.6rem;
    }

    .about-content ul {
      list-style: none;
      padding: 0;
      margin-bottom: 1.25rem;
    }

    .about-content li {
      font-size: 0.9rem;
      color: #333;
      padding: 0.45rem 0;
      border-bottom: 1px solid #eee;
    }

    .about-content li::before {
      content: '→';
      margin-right: 0.6rem;
      color: #111;
      font-weight: 700;
    }

    .about-content li:last-child {
      border-bottom: none;
    }

    .about-content .version {
      font-size: 0.75rem;
      color: #999;
      text-align: right;
      margin-bottom: 0;
      margin-top: 1rem;
      letter-spacing: 0.04em;
    }
  `]
})
export class About {
  private location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
