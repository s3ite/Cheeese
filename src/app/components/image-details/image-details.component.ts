import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  @Input() imageInfos: any;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    // Récupérer l'identifiant de l'image à partir des paramètres de l'URL
  }

  protected readonly Object = Object;
}
