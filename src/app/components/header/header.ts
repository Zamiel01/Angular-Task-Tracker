import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../button/button';
import { Ui } from '../../services/ui';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  showAddTaskButton: boolean = true;
  subscription: Subscription;
  
  constructor(private ui: Ui, private router: Router) {
    this.subscription = this.ui
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
    
    this.router.events.subscribe(() => {
      this.showAddTaskButton = this.router.url !== '/about';
    });
  }
  toggleAddTask() {
    this.ui.toggleAddTask();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
