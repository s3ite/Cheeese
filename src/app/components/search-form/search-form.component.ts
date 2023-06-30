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
    // Logique de recherche et filtrage
    // Appeler les services appropriés pour récupérer les images en fonction des critères de recherche
    const formData = {
      searchQuery: this.searchQuery,
      imageSize: this.imageSize,
      minUploadDate: this.minUploadDate,
      maxUploadDate: this.maxUploadDate,
    };
    this.formEvent.emit(formData);
  }
}
