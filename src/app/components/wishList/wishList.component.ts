import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { WishlistItem } from 'src/app/models/wishlistitem';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { WishlistService } from 'src/app/services/wishlist.service';

declare var window: any;

@Component({
  selector: 'app-wishList',
  templateUrl: './wishList.component.html',
  styleUrls: ['./wishList.component.css']
})
export class wishListComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  wishlistProducts: Product[] = [];

  title: string = "Wishlist";
  formModal:any;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router, private titleService: Title, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("orderItemsModal")
    );

    this.titleService.setTitle("Wishlist - Soul Sounds Shop");
    let loggedInUser = JSON.parse(sessionStorage.loggedInUser || "{}");

    if (Object.keys(loggedInUser).length !== 0) {
      this.title = `${loggedInUser.firstName}'s Wishlist`;

      showLoader();
      this.wishlistService.getWishlistProducts().subscribe(
        (resp) => {
          console.log(resp);
          for (let item of resp) {
            this.wishlistProducts.push(item.product);
          }
          hideLoader(); 
        },
        (err) => {
          hideLoader(); 
          console.log(err);
          if (err.status == 401) {
            sessionStorage.setItem("loggedIn", "false");
            this.router.navigate(['login']);
          } 
        },
        () => console.log("Products Retrieved")
      )

    } else {
      sessionStorage.setItem("loggedIn", "false");
      sessionStorage.removeItem("loggedInUser");
      this.router.navigate(['login']);
    }

    function showLoader() {
      document.getElementById("loaderSpinner")!.style.display = 'block';
    }

    function hideLoader() {
      document.getElementById("loaderSpinner")!.style.display = 'none';
    }
  }

  closeMessage() {

  }
  openMessage() {
    this.formModal.show();
  }
}