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
  perPage: number = 15;
  fullDetail: boolean = false;

  @Output() formEvent : EventEmitter<any> = new EventEmitter<any>();

  search() {
    const formData = {
      searchQuery: this.searchQuery,
      imageSize: this.imageSize,
      minUploadDate: this.minUploadDate,
      maxUploadDate: this.maxUploadDate,
      per_page: this.perPage,
      fullDetail: this.fullDetail
    };
    this.formEvent.emit(formData);
  }
}
