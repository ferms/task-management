import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormCreateTaskComponent } from "../../components/form-create-task/form-create-task.component";
@Component({
  selector: 'app-create',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    FormCreateTaskComponent
],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],

})
export default class CreateComponent {
  
}
