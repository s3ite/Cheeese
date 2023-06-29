import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  image: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupérer l'identifiant de l'image à partir des paramètres de l'URL
    const imageId = this.route.snapshot.params['id'];

  }
}
