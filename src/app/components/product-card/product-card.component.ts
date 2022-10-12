import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  cartCount!: number;
  totalQuantity!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;

  wishlistClicked = false;
  cartBtnClicked = false;

  responseReceived = false;
  response = "";

  @Input() productInfo!: Product;

  constructor(private productService: ProductService, private wishlistService: WishlistService, private router: Router) { }
  
  ngOnInit(): void {

    if (localStorage.getItem("mode") === "dark") {
      
      let darkModeToggler = document.getElementById("checkbox");
      darkModeToggler?.setAttribute("checked", "true");

      let bodyBackground = document.getElementsByClassName("body-light-background");
      bodyBackground[0].classList.add('body-dark-background');

      let lightForeground = document.getElementsByClassName("light-foreground");
      let lightBackground = document.getElementsByClassName("light-background");
      let lightBackground2 = document.getElementsByClassName("light-background-2");

      let lightButtonPrimary = document.getElementsByClassName("btn-primary");
      let lightButtonSuccess = document.getElementsByClassName("btn-outline-success");
      
      
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

      for (let i = 0; i < lightButtonPrimary.length; i++) {
        lightButtonPrimary[i].classList.add("btn-primary-dark");
      }

      for (let i = 0; i < lightButtonSuccess.length; i++) {
        lightButtonSuccess[i].classList.add("btn-outline-success-dark");
      }
    }
  }

  addToCart(product: Product): void {
    let inCart = false;

    this.products.forEach(
      (element) => {
        if(element.product == product){
          ++element.quantity;

          this.productService.addCartItem(product).subscribe(
            (resp) => {
              this.responseReceived = true;
              this.response = resp.message;
              alert(resp.message);
            },
            (error) => {
              console.log(error);
            }, 
            () => {
              this.productService.getUserCart().subscribe(
                (cart) => {
                  this.productService.setCart(cart);
                },
                (error) => {
                  console.log(error);
                  if (error.status == 401) {
                    sessionStorage.setItem("loggedIn", "false");
                    sessionStorage.removeItem("loggedInUser");
                    this.router.navigate(['login']);
                  }
                },
                () => {
                  this.cartBtnClicked = false;
                  inCart=true;
                  return;
                }
              );
            }
          );
          
        };
      }
    );

    if(inCart == false){
      this.productService.addCartItem(product).subscribe(
        (resp) => {
          alert(resp.message);

          this.productService.getUserCart().subscribe(
            (cart) => {
              this.productService.setCart(cart);
              console.log(cart.totalQuantity);
            },
            (error) => {
              console.log(error);
              if (error.status == 401) {
                sessionStorage.setItem("loggedIn", "false");
                sessionStorage.removeItem("loggedInUser");
                this.router.navigate(['login']);
              }
            },
            () => {
              this.cartBtnClicked = false;
            }
          );
        } ,
        (error) => {
          console.log(error);
        }, 
        () => {
          
        }
      );
    }
      
  }

  addToWishlist(product: Product): void {
    this.wishlistService.addToWishlist(product.id).subscribe(
      (resp) => {
        alert(resp.message);
      },
      (error) => {
        console.log(error);
        if (error.status == 401) {
          sessionStorage.setItem("loggedIn", "false");
          sessionStorage.removeItem("loggedInUser");
          this.router.navigate(['login']);
        }
      }, 
      () => {
      }
    )
  }

  resetResponse() {
    this.responseReceived = false;
    console.log(this.responseReceived);
    
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
