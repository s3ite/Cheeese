import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ImageService} from '../../services/image.service';

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

  @Input() formData: any = null;

  fullDetail: boolean = false;

  constructor(private imageService: ImageService) {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm']) {
      if ((!changes['searchTerm'].firstChange && changes['searchTerm'].currentValue) ||
        (!changes['formData'].firstChange && changes['formData'].currentValue)) {
        this.imageService.handleSearch(this.searchTerm, this.imageService, this.formData)
          .then((res) => {
            this.images = res;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else if (changes['formData']) {
      if (!changes['formData'].firstChange && changes['formData'].currentValue) {
        console.log(this.formData);
        this.imageService.handleSearch(this.searchTerm, this.imageService, this.formData)
          .then((res) => {
            this.images = res;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  ngOnInit() {
    console.log(this.searchTerm);
    this.imageService.handleSearch(this.searchTerm, this.imageService, this.formData).then((res) => {
      this.images = res;
    })
  }

  showImageDetails(image: any) {
    this.selectedImage = image;
    this.showInfo = true;
    if (this.formData !== undefined) {
      if (this.formData.fullDetail) {
        console.log("Showing Full Detail");
        this.fullDetail = true;
      }
      else {
        this.fullDetail = false;
      }
    }
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
