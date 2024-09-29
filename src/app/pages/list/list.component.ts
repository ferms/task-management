import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskListComponent } from 'src/app/components/task-list/task-list.component';


@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  imports: [
    CommonModule,
    TaskListComponent,
],
  styleUrls: ['./list.component.scss']
})
export default class ListComponent {

}
