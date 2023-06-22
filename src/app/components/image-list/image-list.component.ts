import { Component } from '@angular/core';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent {
  images: any[] = [];

  constructor() {}

  ngOnInit() {
    // Appeler le service pour récupérer les images

  }
}