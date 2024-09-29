import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TaskService } from 'src/app/services/task.service';
import { Persona, Task } from 'src/models/task.model';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    TableModule,
    ButtonModule,
    DropdownModule, 
    FormsModule,
],
  templateUrl: './task-list.component.html',
  providers: [MessageService],
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  private _taskService = inject(TaskService);  
  private _messageService = inject(MessageService);
  private _tasks = signal<Task[]>([]);

  public first = signal<number>(0);
  public rows = signal<number>(10);
  public totalRecords = signal<number>(0);
  public optionsStatus
  = [
    {label: 'Completado', value: true}, {label: 'Pendiente', value: false}, {label: 'Todos', value: null}
  ];
  public selectedStatus = null;
  public stateSelect: boolean | null = null;


  public tasks = computed<Task[]>(() => {
    return this._tasks() ?? [];
  });

  ngOnInit(): void {
    this._getTask();
  }

  private _getTask() {
    let selectedState = this.stateSelect;
    this._tasks.set(this._taskService.getTasks().filter(task => {
      return selectedState === null || task.completed === selectedState;
    }));
    this.totalRecords.set(this._tasks().length);
  }
  

  public getHabilidadesString(persona: Persona): string {
    return persona.habilidades.map(h => h.habilidad).join(', ');
  }

  public changeFilter(event: any) {
    this.stateSelect = event.value;
    this._getTask(); 
  }

  public finishTask(task: Task) {
    task.completed = true;
    this._taskService.updateTask(task).then(() => {
      this._messageService.add({
        severity: 'success',
        summary: 'Tarea completada',
        detail: `La tarea "${task.title}" se ha completado exitosamente.`
      });
      this._getTask();
    }).catch(() => {
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Hubo un error al intentar completar la tarea.'
      });
    });
  }
  

  public changePage({ first, rows }: PaginatorState) {
    this.first.set(first!);
    this.rows.set(rows!);
  }

}
