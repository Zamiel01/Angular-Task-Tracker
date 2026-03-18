# AGENTS.md - Developer Guide for angular-crash

## Project Overview
This is an Angular 20 application with standalone components, Vitest testing, and SSR support.

## Commands

### Development
```bash
npm start         # Start dev server (http://localhost:4200)
npm run watch     # Build with watch mode for development
npm run dev:ssr   # Build and serve with SSR (development)
```

### Build
```bash
npm run build              # Production build
npm run build:ssr          # Production build with SSR
npm run build:ssr:dev      # Development build with SSR
```

### Testing
```bash
npm test                   # Run all tests (watch mode)
ng test --watch=false      # Run tests once (CI mode)

# Run a single test file (Vitest syntax via Angular CLI)
ng test --include="**/task.spec.ts"

# Alternative: Use npx vitest directly
npx vitest run src/app/services/task.spec.ts
npx vitest run --grep "should be created"  # Run tests matching pattern
```

## Code Style Guidelines

### File Naming
- Components/Services: kebab-case (e.g., `tasks.ts`, `task.service.ts`)
- Spec files: `.spec.ts` suffix (e.g., `task.spec.ts`)
- Templates: `.html` suffix colocated with component
- Styles: `.scss` suffix colocated with component

### Class Naming
- Use PascalCase for all class names
- Components: `Tasks`, `AddTask`, `Button`
- Services: `TaskServices`, `Ui`
- Interfaces: `Task`

### TypeScript Settings (tsconfig.json)
- Strict mode enabled
- `strict: true`
- `strictTemplates: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `noPropertyAccessFromIndexSignature: true`

### Imports
```typescript
// Angular core imports first
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Third-party imports
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Local imports (relative paths)
import { Task } from '../../Task';
import { TaskServices } from '../../services/task';
```

### Component Structure
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, OtherComponent],
  templateUrl: './component-name.html',
  styleUrl: './component-name.scss',
})
export class ComponentName implements OnInit {
  // Use signals for reactive state
  tasks = signal<Task[]>([]);

  constructor(private service: ServiceName) {}

  ngOnInit() {
    // Initialize logic
  }
}
```

### Formatting (Prettier)
- Print width: 100 characters
- Single quotes for strings
- Use Prettier to format: `npx prettier --write src/app/`

### Error Handling
```typescript
// Service errors - log with prefix
this.http.get<Task[]>(this.apiUrl).subscribe({
  next: (tasks) => { /* handle success */ },
  error: (error) => {
    console.error('[ComponentName] Error message:', error);
  }
});
```

### HTTP Services
- Always type HTTP responses with interfaces
- Use `Observable<T>` return types
- Provide services via `providedIn: 'root'`

### State Management
- Prefer Angular signals for component state
- Use immutable patterns with `.set()` and `.update()`

### Testing
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentName } from './component-name';

describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### CSS/SCSS
- Use SCSS for stylesheets
- Colocate component styles with component files
- Follow BEM-like naming for complex components

### Routing
- Define routes in `app.routes.ts`
- Use functional route guards where needed
- Lazy loading for feature modules (if added)

## Project Structure
```
src/
├── app/
│   ├── components/       # Feature components
│   │   ├── add-task/
│   │   ├── button/
│   │   ├── header/
│   │   ├── tasks/
│   │   └── tasks-item/
│   ├── services/         # Angular services
│   │   ├── task.ts
│   │   └── ui.ts
│   ├── app.ts           # Root component
│   ├── app.config.ts    # App configuration
│   ├── app.routes.ts   # Route definitions
│   └── Task.ts          # Interface definitions
├── styles.scss          # Global styles
└── main.ts              # Bootstrap
```

## Dependencies
- Angular 20 (standalone components)
- RxJS 7.x
- Vitest for testing
- Prettier for formatting
- Font Awesome for icons
- Express (for SSR)
- json-server (for mock API)
