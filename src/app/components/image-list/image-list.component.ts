import {Component} from '@angular/core';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent {
  images: any[] = [];

  constructor(private imageService: ImageService) {
  }


  ngOnInit() {
    // Appeler le service pour récupérer les images
    console.log("Starting"); // this is a test -> need to bind the value of the search bar with this.
    let response = this.imageService.getPhotosByKeyword("bus").then((response) => {
      console.log(response.data);
      this.images = this.imageService.parseResponse(response);
      console.log(this.images);
    })
  }
}
