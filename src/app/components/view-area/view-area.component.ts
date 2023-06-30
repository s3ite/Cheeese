import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-view-area',
  templateUrl: './view-area.component.html',
  styleUrls: ['./view-area.component.css']
})
export class ViewAreaComponent {
  @Input() searchTerm: string = "";
  @Input() formData: any;
}
