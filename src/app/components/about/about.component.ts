import { Component, Input, OnInit } from '@angular/core';

interface aboutImage {
    imageSrc: string;
    imageAlt: string;
}

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    @Input() images: aboutImage[] = [];

    @Input() images: aboutImage[] = [
      {
        imageSrc:
          '/src/assets/images/david.jfif',
        imageAlt: 'david',
      },
      {
        imageSrc:
          '/src/assets/images/jerry.jfif',
        imageAlt: 'jerry',
      },
      {
        imageSrc:
          '/src/assets/images/tristan.jfif',
        imageAlt: 'tristan',
      },
      {
        imageSrc:
          '/src/assets/images/bruce.jfif',
        imageAlt: 'bruce',
      },
      {
        imageSrc:
          '/src/assets/images/joel.jfif',
        imageAlt: 'joel',
      },
      {
        imageSrc:
          '/src/assets/images/salvator.jfif',
        imageAlt: 'salvator',
      },
      {
        imageSrc:
          '/src/assets/images/raphael.jfif',
        imageAlt: 'raphael',
      },
      {
        imageSrc:
          '/src/assets/images/varada.jfif',
        imageAlt: 'varada',
      },
      {
        imageSrc:
          '/src/assets/images/sam.jfif',
        imageAlt: 'sam',
      },
  ];


    selectedIndex = 0

    ngOnInit(): void {
      if(this.autoSlide){
        this.autoSlideImages();
      }

    }

    // Changes slide in every 3 second interval
    autoSlideImages(): void {
      // setInterval(() => {
      //   this.onNextClick();
      // }, this.slideInterval);
    }

    // sets index of image on dot/indicator click
    selectedImage(index: number): void{
      this.selectedIndex = index;
    }

    onPrevClick(): void {
      if(this.selectedIndex === 0) {
        this.selectedIndex = this.images.length -1;
      }
      else{
        this.selectedIndex--;
      }
    }

    onNextClick(): void {
      if(this.selectedIndex === this.images.length -1) {
        this.selectedIndex = 0;
      }
      else{
        this.selectedIndex++;
      }
    }
    // Note: these might have to go into app.components.ts?
    // Commenting out to see if above fix works, below was original code
    /*images = [
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
    ] */
}