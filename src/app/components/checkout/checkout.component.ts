import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  
  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice: number = 0;
  cartProducts: Product[] = [];
  finalProducts: {id: number, quantity: number}[] = []; 

  checkoutForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', Validators.required),
    lname: new UntypedFormControl('', Validators.required),
    cardName: new UntypedFormControl('', Validators.required),
    detail: new UntypedFormControl('', Validators.required),
    addOne: new UntypedFormControl('', Validators.required),
    addTwo: new UntypedFormControl(''),
    city: new UntypedFormControl('', Validators.required),
    state: new UntypedFormControl('', Validators.required),
    zipCode: new UntypedFormControl('', Validators.required),
    country: new UntypedFormControl('', Validators.required)
  });

  constructor(private productService: ProductService, private orderService: OrderService, private router: Router, private titleService: Title) { 
    this.titleService.setTitle("Checkout - Soul Sounds");
  }

  ngOnInit(): void {
    
    this.productService.getUserCart().subscribe(
      (cart) => {
        this.productService.getCartItems().subscribe(
          (items) => {
            hideLoader();
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

  onSubmit(): void {
    this.orderService.submitOrder().subscribe(
      (resp) => {
        console.log(resp);
        this.router.navigate(['/orders']);
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/orders']); 
      },
      () => {
        alert("Order submitted successfully.");
        this.router.navigate(['/home']);
      }
    );
    this.products.forEach(
      (element) => {
        const id = element.product.id;
        const quantity = element.quantity
        this.finalProducts.push({id, quantity})
      } 
    );

    // if(this.finalProducts.length > 0) {
    //   this.productService.purchase(this.finalProducts).subscribe(
    //     (resp) => console.log(resp),
    //     (err) => console.log(err),
    //     () => {
    //       let cart = {
    //         cartCount: 0,
    //         totalQuantity: 0,
    //         products: [],
    //         totalPrice: 0.00
    //       };
    //       this.productService.setCart(cart);
    //       this.router.navigate(['/home']);
    //     } 
    //   );

    // } else {
    //   this.router.navigate(['/home']);
    // }
  }

}
