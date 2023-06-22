import { Component } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent {
  currentImage: any;

  constructor() {}

  ngOnInit() {
    // Appeler le service pour récupérer les images

    // Sélectionner la première image par défaut
  }

  next() {
    // Logique de navigation vers l'image suivante
    // Mettre à jour la valeur de "currentImage" en fonction de la position actuelle
  }

  previous() {
    // Logique de navigation vers l'image précédente
    // Mettre à jour la valeur de "currentImage" en fonction de la position actuelle
  }
}
