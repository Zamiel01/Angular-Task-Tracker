import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Task } from '../Task';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TaskServices {
  private apiUrl = '/tasks';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Fetch all tasks from the server.
   * SSR-safe: Works on both server and client.
   * On server, data is fetched and transferred to client.
   * On client, data is either hydrated or fetched if not already cached.
   */
  getTasks(): Observable<Task[]> {
    if (isPlatformBrowser(this.platformId)) {
      // Client-side: always fetch fresh data or use cached
      return this.http.get<Task[]>(this.apiUrl);
    } else {
      // Server-side: fetch to include in initial HTML payload
      return this.http.get<Task[]>(this.apiUrl);
    }
  }

  /**
   * Add a new task via POST.
   * SSR-safe: Only executes on client-side to prevent unintended side effects on server.
   */
  addTask(task: Task): Observable<Task> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.post<Task>(this.apiUrl, task);
    } else {
      // Server-side: return empty observable to prevent server-side mutation
      console.warn(
        'addTask: Attempted to add task on server. This operation is client-only.'
      );
      return of({} as Task);
    }
  }

  /**
   * Delete a task via DELETE.
   * SSR-safe: Only executes on client-side to prevent unintended side effects on server.
   */
  deleteTask(task: Task): Observable<Task> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.delete<Task>(`${this.apiUrl}/${task.id}`);
    } else {
      // Server-side: return empty observable to prevent server-side mutation
      console.warn(
        'deleteTask: Attempted to delete task on server. This operation is client-only.'
      );
      return of({} as Task);
    }
  }

  /**
   * Update a task via PUT.
   * SSR-safe: Only executes on client-side to prevent unintended side effects on server.
   */
  updateTask(task: Task): Observable<Task> {
    if (isPlatformBrowser(this.platformId)) {
      return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
    } else {
      // Server-side: return empty observable to prevent server-side mutation
      console.warn(
        'updateTask: Attempted to update task on server. This operation is client-only.'
      );
      return of({} as Task);
    }
  }
}
