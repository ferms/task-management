import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
@Component({
  selector: 'app-create',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule ,
    ChipModule,
  ],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [MessageService],
})
export default class CreateComponent {
  private _formBuilder = inject(FormBuilder);

  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      nameTask: ['', [Validators.required, Validators.minLength(5)]],
      deadline: ['', Validators.required],
      personas: this._formBuilder.array([])
    });
  }

  get personas(): FormArray {
    return this.loginForm.get('personas') as FormArray;
  }

  nuevaPersona(): FormGroup {
    return this._formBuilder.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(5)]],
      edad: [null, [Validators.required, Validators.min(18)]],
      habilidades: this._formBuilder.array([this.nuevaHabilidad()])
    });
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

  agregarHabilidad(index: number): void {
    const habilidades = this.personas.at(index).get('habilidades') as FormArray;
    habilidades.push(this.nuevaHabilidad());
  }

  eliminarHabilidad(personaIndex: number, habilidadIndex: number): void {
    const habilidades = this.personas.at(personaIndex).get('habilidades') as FormArray;
    habilidades.removeAt(habilidadIndex);
  }

  getHabilidades(personaIndex: number): FormArray {
    return this.personas.at(personaIndex).get('habilidades') as FormArray;
  }
  



  public login() {

    console.log('%c⧭', 'color: #00e600', );
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  }
}
