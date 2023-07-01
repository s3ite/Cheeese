import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  searchQuery: string = '';
  imageSize: number = 0;
  minUploadDate: Date = new Date();
  maxUploadDate: Date = new Date();

  @Output() formEvent : EventEmitter<any> = new EventEmitter<any>();

  search() {
    const formData = {
      searchQuery: this.searchQuery,
      imageSize: this.imageSize,
      minUploadDate: this.minUploadDate,
      maxUploadDate: this.maxUploadDate,
    };
    this.formEvent.emit(formData);
  }
}
