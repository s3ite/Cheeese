import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string =  '';
  formData: any;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() formEvent : EventEmitter<any> = new EventEmitter<any>();
  onSearch() {
    this.search.emit(this.searchTerm);
  }
  onForm(formData: any){
    this.formData = formData;
    console.log(formData);
    this.formEvent.emit(this.formData);
  }
}
