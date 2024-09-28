import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-task-management',
  standalone: true,
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'],
  imports: [SidebarComponent]
})
export  default class TaskManagementComponent {

}
