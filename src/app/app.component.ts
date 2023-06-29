import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cheeeeese';
  searchTerm: string = "";
  onSearch(searchTerm: string) {
    // Perform the search operation using the searchTerm
    //console.log('Search term:', searchTerm);
    this.searchTerm = searchTerm;
    //console.log(this.searchTerm);
    // Add your search logic here
  }
}


