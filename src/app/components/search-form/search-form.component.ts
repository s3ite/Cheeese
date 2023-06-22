import { Component } from '@angular/core';

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
  
  search() {
    // Logique de recherche et filtrage
    // Appeler les services appropriés pour récupérer les images en fonction des critères de recherche
  }
}
