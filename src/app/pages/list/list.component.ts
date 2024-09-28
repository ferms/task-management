import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export default class ListComponent {
ngOnInit() {
 
 console.log('%c⧭', 'color: #ff0000', );
}
}
