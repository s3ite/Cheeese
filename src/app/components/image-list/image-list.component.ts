import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ImageService} from '../../services/image.service';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnChanges, OnInit {
  images: any[] = [];

  @Input() searchTerm: string = "";

  selectedImage: any;

  showInfo: boolean = false;

  imageInfo: any

  constructor(private imageService: ImageService) {
  }

  handleSearch(searchTerm: string) {
    if (searchTerm == "") {
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
    if (!changes['searchTerm'].firstChange && changes['searchTerm'].currentValue) {
      console.log(this.searchTerm);
      this.handleSearch(this.searchTerm);
    }
  }

  ngOnInit() {
    console.log(this.searchTerm);
    this.handleSearch(this.searchTerm);
  }

  showImageDetails(image: any) {
    this.selectedImage = image;
    this.showInfo = true;
    //console.log("HOVERING");
    //console.log(this.showInfo);
    let imageInfo = this.imageService.getPhotoInfo(this.selectedImage.id).then((infos) => {
      this.imageInfo = infos;
      //console.log(this.imageInfo);
      //console.log(this.imageInfo.location)
      const country: Object = this.imageInfo.location['country'];
      //console.log(Object.values(country));
    }).catch((error) => {
      console.log(error);
    })
  }

  hideImageDetails() {
    this.selectedImage = null;
    this.imageInfo = null;
    this.showInfo = false;
    //console.log(this.showInfo);
  }
}
