import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Header,
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    RouterOutlet
  ],
  template: `<div class="container">
<app-header></app-header>
<router-outlet></router-outlet><br>
<footer>
    <p>Copyright &copy; 2026</p>
  <a routerLink="/about">About</a>
</footer>
</div>`,
  styles: [`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    app-header,
    app-tasks {
      display: block;
      border: 1px solid black;
      padding: 16px;
      margin: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-top: 10px;
    }

    .form-control {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-control-check {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    label {
      font-weight: 600;
      font-size: 14px;
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }

    input[type="checkbox"] {
      width: auto;
      margin-left: 10px;
    }

    input:focus,
    textarea:focus,
    select:focus {
      outline: none;
      border-color: black;
    }

    .btn {
      display: inline-block;
      padding: 10px;
      border: 1px solid black;
      background: black;
      color: white;
      cursor: pointer;
      font-weight: 600;
      text-align: center;
    }

    .btn:hover {
      opacity: 0.85;
    }

    .btn-block {
      width: 100%;
    }

    footer {
      text-align: center;
      margin-top: 20px;
      padding: 10px;
    }

    .a {
      text-decoration: none;
      color: black;
      font-weight: 600;
    }

    .a:hover {
      opacity: 0.85;
    }
  `]
}) 
export class App {
  name = 'Zamiel Morningstar';
}