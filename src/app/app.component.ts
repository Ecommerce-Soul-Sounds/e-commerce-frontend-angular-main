import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Commerce Client';

  images = [
    {
    imageSrc:
      '../../../assets/images/david.jfif',
    imageAlt: 'david',
  },
  {
    imageSrc:
      '../../../assets/images/jerry.jfif',
    imageAlt: 'jerry',
  },
  {
    imageSrc:
      '../../../assets/images/tristan.jfif',
    imageAlt: 'tristan',
  },
  {
    imageSrc:
      '../../../assets/images/bruce.jfif',
    imageAlt: 'bruce',
  },
  {
    imageSrc:
      '../../../assets/images/joel.jfif',
    imageAlt: 'joel',
  },
  {
    imageSrc:
      '../../../assets/images/salvator.jfif',

    imageAlt: 'salvator',
  },
  {
    imageSrc:
      '../../../assets/images/raphael.jfif',
    imageAlt: 'raphael',
  },
  {
    imageSrc:
      '../../../assets/images/varada.jfif',
    imageAlt: 'varada',
  },
  {
    imageSrc:
      '../../../assets/images/sam.jfif',
    imageAlt: 'sam',
  },
] 
}
