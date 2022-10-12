import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice: number = 0;
  cartProducts: Product[] = [];
  cartItems: CartItem[] = [];

  
  constructor(private productService: ProductService, private router: Router, private titleService: Title) {
    this.titleService.setTitle("View Cart - Soul Sounds");
  }

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
      
      console.log(lightForeground);
      
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

    showLoader();
    this.productService.getUserCart().subscribe(
      (cart) => {
        this.productService.getCartItems().subscribe(
          (items) => {
            hideLoader();
            this.cartItems = items;
            for (let item of items) {
              this.products.push({product: item.product, quantity: item.quantity});
              let itemTotalPrice = (item.product.price * item.quantity);
              this.totalPrice += itemTotalPrice; 
            }
          },
          (error) => {
            hideLoader();
            console.log(error);
          },
          () => {
            hideLoader();
            // this.products = cart.products;
            this.products.forEach(
              (element) => {
                this.cartProducts.push(element.product);
              }
            );
            
          }
        )
        
      },
      (err) => {
        console.log(err);
        if (err.status == 401) {
          sessionStorage.setItem("loggedIn", "false");
          this.router.navigate(['login']);
        } 
      }
    );

    function showLoader() {
      document.getElementById("loaderSpinner")!.style.display = 'block';
    }
  
    function hideLoader() {
      document.getElementById("loaderSpinner")!.style.display = 'none';
    }

  }

  ngAfterViewInit() {
    
  }

  addItem(item: CartItem): void {
    ++item.quantity;
    this.productService.addCartItem(item.product).subscribe(
      (resp) => {
        console.log(resp);
        
      }, 
      (error) => {
        if (error.status == 401) {
          sessionStorage.setItem("loggedIn", "false");
          this.router.navigate(['login']);
        } 
      },
      () => {

      }

    )
  }

  removeItem(item: CartItem):void{
    console.log(item.id);
    --item.quantity;
    this.productService.removeItem(item).subscribe(
      (resp) => {
        console.log(resp);
        
      },
      (err) => {
      console.log(err);
      if (err.status == 401) {
        sessionStorage.setItem("loggedIn", "false");
        this.router.navigate(['login']);
      } 
      },() => console.log("CartItem Removed")
    );

  }

  emptyCart(): void {
    // let cart = {
    //   cartCount: 0,
    //   totalQuantity: 0,
    //   products: [],
    //   totalPrice: 0.00
    // };
    // this.productService.setCart(cart);

    this.productService.emptyCart().subscribe(
      () => {
        alert("Cart was cleared.");
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.router.navigate(['/home']);
      }
    )
    
  }

}
