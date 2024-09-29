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
        if (Array.isArray(tasks)) {
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

  public updateTask(task: Task): Promise<void> {
    return new Promise((resolve, reject) => {
      const currentTasks = this.taskSignal();
      const index = currentTasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        const updatedTasks = [...currentTasks];
        updatedTasks[index] = task;
        this.updateTasksInCookiesAndSignal(updatedTasks);
        resolve();
      } else {
        reject('Tarea no encontrada');
      }
    });
  }
  private updateTasksInCookiesAndSignal(tasks: Task[]): void {
    this.taskSignal.set(tasks);
    const taskString = JSON.stringify(tasks);
    this.cookieService.set('taskData', taskString);
  }
  public getTasks(): Task[] {
    return this.taskSignal();
  }

}
