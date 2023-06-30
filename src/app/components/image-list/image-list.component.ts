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

  constructor(private imageService: ImageService) {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (!changes['searchTerm'].firstChange && changes['searchTerm'].currentValue) {
      this.imageService.handleSearch(this.searchTerm, this.imageService)
        .then((res) => {
          this.images = res;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  ngOnInit() {
    console.log(this.searchTerm);
    this.imageService.handleSearch(this.searchTerm, this.imageService).then((res) => {
      this.images = res;
    })
  }

  showImageDetails(image: any) {
    this.selectedImage = image;
    this.showInfo = true;
    for (let image_ of this.images) {
      if (image_ === image) {
        this.selectedImage = image_;
      }
    }
  }

  hideImageDetails() {
    this.selectedImage = null;
    this.showInfo = false;
  }
}
