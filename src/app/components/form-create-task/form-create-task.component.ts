import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-form-create-task',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    ChipModule,
    FormsModule,
  ],
  templateUrl: './form-create-task.component.html',
  styleUrls: ['./form-create-task.component.scss'],
  providers: [MessageService],
})
export class FormCreateTaskComponent {

  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);  
  public taskForm!: FormGroup;
  public nuevaHabilidadInput: string[] = [];

  ngOnInit(): void {
    this.taskForm = this._formBuilder.group({
      nameTask: ['', [Validators.required, Validators.minLength(5)]],
      deadline: ['', Validators.required],
      personas: this._formBuilder.array([], this.validarPersonasMinimas()),
    });
  }

  get personas(): FormArray {
    return this.taskForm.get('personas') as FormArray;
  }

  nuevaPersona(): FormGroup {
    return this._formBuilder.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      edad: [null, [Validators.required, Validators.min(18)]],
      habilidades: this._formBuilder.array([]),
      nuevaHabilidad: [''],
    });
  }

  validarPersonasMinimas(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const personas = formArray as FormArray;
      return personas.length > 0 ? null : { minPersonas: true };
    };
  }
    
    isNombreDuplicado(index: number): boolean {
      const personaGroup = this.personas.at(index);
      const nombre = personaGroup.get('nombreCompleto')?.value?.toLowerCase();
      const nombres = this.personas.controls
        .filter((_, i) => i !== index)
        .map((persona) =>
          persona.get('nombreCompleto')?.value?.toLowerCase()
        );
      return nombres.includes(nombre);
    }

  nuevaHabilidad(): FormGroup {
    return this._formBuilder.group({
      habilidad: ['', Validators.required]
    });
  }

  agregarPersona(): void {
    this.personas.push(this.nuevaPersona());
  }

  eliminarPersona(index: number): void {
    this.personas.removeAt(index);
  }


  agregarHabilidad(personaIndex: number): void {
    const personaGroup = this.personas.at(personaIndex) as FormGroup;
    const habilidades = this.getHabilidades(personaIndex);
    const nuevaHabilidad = personaGroup.get('nuevaHabilidad')?.value?.trim();
    if (!nuevaHabilidad) {
      alert('No puedes agregar una habilidad vacía.');
      return;
    }
    const habilidadDuplicada = habilidades.controls.some(
      (control) => control.value.habilidad.toLowerCase() === nuevaHabilidad.toLowerCase()
    );
  
    if (habilidadDuplicada) {
      alert('Esta habilidad ya existe.');
      return;
    }
    habilidades.push(
      this._formBuilder.group({
        habilidad: [nuevaHabilidad, Validators.required]
      })
    );
  
    personaGroup.get('nuevaHabilidad')?.reset();
  }

  eliminarHabilidad(personaIndex: number, habilidadIndex: number): void {
    const habilidades = this.personas.at(personaIndex).get('habilidades') as FormArray;
    habilidades.removeAt(habilidadIndex);
  }

  getHabilidades(personaIndex: number): FormArray {
    return this.personas.at(personaIndex).get('habilidades') as FormArray;
  }
  


  // Method to submit the task
  public sendTask(): void {
    if (this.taskForm.valid) {
      const userId = 2;  // Example user ID
  
      const taskData: Task = {
        userId: userId,  // Assign the userId to the task
        id: this.generateTaskId(),  // Generate a unique task ID
        title: this.taskForm.get('nameTask')?.value,
        completed: false,
        personas: this.personas.value.map((persona: any) => ({
          ...persona,
          userId: userId  // Ensure each persona has the same userId
        })),
      };
  
      // Save the task using the TaskService
      this._taskService.saveTask(taskData);
      console.log('Task saved successfully', taskData);
    } else {
      this.taskForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }
  

  // Utility to generate a unique task ID (you can modify this as needed)
  private generateTaskId(): number {
    return Math.floor(Math.random() * 1000);  // Example logic for ID generation
  }

}
