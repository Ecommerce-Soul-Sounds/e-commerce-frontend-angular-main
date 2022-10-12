
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartItem } from 'src/app/models/cartItem';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';


declare var window: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[]=[];  
  cartItems: CartItem[] =[];
  
  loading: any;

  formModal:any;



  constructor(private orderService: OrderService,private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Orders - Soul Sounds");
    
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("orderItemsModal")
    );
    
    

    if (sessionStorage.getItem("loggedIn") === "true") {
      this.orderService.getAllOrders().subscribe(
        (resp) => this.orders = resp 
        ,
        (error) => {
          console.log(error);
          if (error.status == 401) {
            sessionStorage.setItem("loggedIn", "false");
            this.router.navigate(['login']);
          }
        },
        () => console.log("Orders retrieved!")
      );

    }
  }

  viewOrderDetails(cart: Cart){
    this.formModal.show();
    showLoader();
    this.orderService.getOrderItem(cart.id).subscribe(
      (resp)=>{ console.log(resp)
        hideLoader();
      this.cartItems = resp},
      (err)=>{
        console.log(err);
        if (err.status == 401) {
          sessionStorage.setItem("loggedIn", "false");
          this.router.navigate(['login']);
        } 
      },
      () => console.log("OrderItems Retrieved")
    );
    
    function showLoader() {
        document.getElementById("loaderSpinner")!.style.display = 'block';
    }
    
    function hideLoader() {
        document.getElementById("loaderSpinner")!.style.display = 'none';
    } 
}

closeOrderDetails(){
  this.formModal.hide();
  location.reload();

}

}



function showLoader() {
    document.getElementById("loaderSpinner")!.style.display = 'block';
}

function hideLoader() {
    document.getElementById("loaderSpinner")!.style.display = 'none';
} 