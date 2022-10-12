import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  allProducts: Product[] = [];
  param: string = "";
  title: string = "All Products";

  formModal:any;

  pageError: string = "";

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router, private titleService: Title) { 
    this.titleService.setTitle("Products - Soul Sounds");
  }



  ngOnInit(): void {

    this.formModal = new window.bootstrap.Modal(
      document.getElementById("errorModal")
    );

    if (sessionStorage.getItem("loggedIn") === "true") {
      
      /**
       * Retrieve products by category if category param is provided
       */
      if (this.activatedRoute.snapshot.queryParams['category']) {
        let category = this.activatedRoute.snapshot.queryParams['category'];
        console.log(category);
        this.titleService.setTitle(`${category} Products - Soul Sounds`);
        this.title = `${category}`;

        this.productService.getProductsByCategory(category).subscribe(
          (resp) => {
            hideLoader();
            this.allProducts = resp;
          },
          (err) => {
            hideLoader();
            console.log(err);
            if (err.status == 401) {
              sessionStorage.setItem("loggedIn", "false");
              sessionStorage.removeItem("loggedInUser");
              this.router.navigate(['login']);
            } else if (err.status === 0) {
              this.pageError = "Connection Error. Please check your connection and try again.";
              this.viewErrorModal();
              //this.router.navigate(['home']);
            }
          },
          () => console.log("Products Retrieved")
        );


      /**
       * Retrieve products by brand if brand param is provided
       */
      } else if (this.activatedRoute.snapshot.queryParams['brand']) {
        let brand = this.activatedRoute.snapshot.queryParams['brand'];
        console.log(brand);
        this.titleService.setTitle(`${brand} Products - Soul Sounds`);
        this.title = `Products by ${brand} Brand`;

        this.productService.getProductsByBrand(brand).subscribe(
          (resp) => {
            hideLoader(); 
            this.allProducts = resp
          },
          (err) => {
            console.log(err);
            if (err.status == 401) {
              sessionStorage.setItem("loggedIn", "false");
              sessionStorage.removeItem("loggedInUser");
              this.router.navigate(['login']);
            } else if (err.status === 0) {
              this.pageError = "Connection Error. Please check your connection and try again.";
              this.viewErrorModal();
              //this.router.navigate(['home']);
            }
          },
          () => console.log("Products Retrieved")
        );
      /**
       * Retrieve all products if and only if brand and category params are not provided
       */
      } else {
        this.productService.getProducts().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (resp) => {
            hideLoader(); 
            this.allProducts = resp
          },
          (err) => {
            console.log(err);
            if (err.status == 401) {
              sessionStorage.setItem("loggedIn", "false");
              sessionStorage.removeItem("loggedInUser");
              this.router.navigate(['login']);
            } else if (err.status === 0) {
              this.pageError = "Connection Error. Please check your connection and try again.";
              this.viewErrorModal();
            }
          },
          () => console.log("Products Retrieved")
        );
        
        
    
        if (localStorage.getItem("mode") === "dark") {
    
          let lightForeground = document.getElementsByClassName("light-foreground");
          let lightBackground = document.getElementsByClassName("light-background");
          let lightBackground2 = document.getElementsByClassName("light-background-2");
        
        
          //var darkForeground = document.getElementsByClassName("dark-foreground");
          var darkBackground = document.getElementsByClassName("dark-background");
        
          for (let i = 0; i < lightBackground.length; i++) {
            
            //lightBackground[i].classList.toggle('light-background');
            lightBackground[i].classList.add('dark-background');
            //lightBackground[i].classList.replace("light-background", "dark-background");
          }
        
          for (let i = 0; i < lightBackground2.length; i++) {
            //lightBackground[i].classList.toggle('light-background');
            lightBackground2[i].classList.add('dark-background-2');
            //lightBackground[i].classList.replace("light-background", "dark-background");
          }
        
          for (let i = 0; i < lightForeground.length; i++) {
            lightForeground[i].classList.add("dark-foreground");
          }
        }
      }
      
    } else {
      this.router.navigate(['login']);
    }
    
    function hideLoader() {
      document.getElementById("loaderSpinner")!.style.display = 'none';
    }
  }

  ngOnDestroy():void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  viewErrorModal(){
    this.formModal.show();
    
    
  }

  closeErrorModal(nRoute: string | undefined){
    this.formModal.hide();
    this.router.navigate([`${nRoute}`]);
  }
}
