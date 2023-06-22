import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cheeeeese';

  onSearch(searchTerm: string) {
    // Perform the search operation using the searchTerm
    console.log('Search term:', searchTerm);
    // Add your search logic here
  }
}


