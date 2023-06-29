import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnChanges, OnInit{
  images: any[] = [];

  @Input() searchTerm: string = "";

  constructor(private imageService: ImageService) {
  }
  handleSearch(searchTerm: string){
    if(searchTerm == "") {
      return;
    }
    console.log("Starting"); // this is a test -> need to bind the value of the search bar with this.
    let response = this.imageService.getPhotosByKeyword(searchTerm).then((response) => {
      console.log(response);
      this.images = this.imageService.parseResponse(response);
      console.log(this.images);
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if(!changes['searchTerm'].firstChange && changes['searchTerm'].currentValue) {
      console.log(this.searchTerm);
      this.handleSearch(this.searchTerm);
    }
  }

  ngOnInit() {
    console.log(this.searchTerm);
    this.handleSearch(this.searchTerm);
  }
}
