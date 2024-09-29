import { inject, Injectable, signal } from '@angular/core';
import { Task } from 'src/models/task.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TaskService  {
  private cookieService = inject(CookieService);
  private taskSignal = signal<Task[]>([]); 

  constructor() {
    this.loadTasksFromCookies();
  }

  private loadTasksFromCookies(): void {
    const taskData = this.cookieService.get('taskData');
    if (taskData) {
      try {
        const tasks = JSON.parse(taskData) as Task[];
        console.log('%c⧭', 'color: #1d3f73', tasks);
        if (Array.isArray(tasks)) {
          console.log('%c⧭', 'color: #997326', Array.isArray(tasks));
          this.taskSignal.set(tasks);
        } else {
          console.warn('Task data from cookies is not an array.');
        }
      } catch (error) {
        console.error('Error loading tasks from cookies:', error);
      }
    }
  }

  public saveTask(task: Task): void {
    const currentTasks = this.taskSignal();
    const taskExists = currentTasks.some(t => t.id === task.id);
    if (taskExists) {
      console.warn(`Task with ID ${task.id} already exists and will not be added.`);
      return;
    }

    const updatedTasks = [...currentTasks, task];
    const taskString = JSON.stringify(updatedTasks);
    this.cookieService.set('taskData', taskString);
    this.taskSignal.set(updatedTasks);
  }

  public getTasks(): Task[] {
    return this.taskSignal();
  }

}
