import { Component, Directive, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{

  cartCount!: number;
  subscription!: Subscription;

  userName!: string;
  usernameSub!: Subscription;

  loggedInUser!: string;

  // This is getting child elements rendered with ngIf
  @ViewChildren('navLinkLight') navLinkLightBtns!: QueryList<ElementRef>;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );

    let loggedInUser = JSON.parse(sessionStorage.loggedInUser || "{}");
    
    this.userName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  }

  retrieveByBrand(brand: string) {
    if (sessionStorage.getItem("loggedIn") === "true") {
      this.router.navigate(['products'], {
        queryParams: {
          brand:`${brand}`
        },
        skipLocationChange: false
      })
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    } else {
      this.router.navigate(['login']);
    }
  }

  retrieveByCategory(category: string) {
    if (sessionStorage.getItem("loggedIn") === "true") {
      
      this.router.navigate(['products'], {
        queryParams: {
          category:`${category}`
        },
        skipLocationChange: false
      })
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    } else {
      this.router.navigate(['login']);
    }
  }

  ngAfterViewInit() {

    console.log(localStorage.getItem("mode"));
    
    if (localStorage.getItem("mode") === "dark") {
      document.getElementById('favIcon')?.setAttribute('href', "../../../assets/images/favicon_dark.png");
      let darkModeToggler = document.getElementById("checkbox");
      darkModeToggler?.setAttribute("checked", "true");

      let bodyBackground = document.getElementsByClassName("body-light-background");
      bodyBackground[0].classList.add('body-dark-background');

      let lightForeground = document.getElementsByClassName("light-foreground");
      let lightBackground = document.getElementsByClassName("light-background");
      let lightBackground2 = document.getElementsByClassName("light-background-2");

      let lightButtonPrimary = document.getElementsByClassName("btn-primary");
      let lightButtonSuccess = document.getElementsByClassName("btn-outline-success");

      let lightBackgroundGlass = document.getElementsByClassName("light-background-glass");
      
      
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

      for (let i = 0; i < lightBackgroundGlass.length; i++) {
        lightBackgroundGlass[i].classList.add("dark-background-glass");
      }

      let lightNavLinks = this.navLinkLightBtns.toArray()
      //var lightNavLinks = document.getElementsByClassName("nav-link-light");
      for (let i = 0; i < lightNavLinks.length; i++) {
        lightNavLinks[i].nativeElement.classList.add("nav-link-dark");
      }

    }
    
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    sessionStorage.setItem("loggedIn", "false");
    sessionStorage.removeItem("loggedInUser");
    this.router.navigate(['login']);
  }
  
  get isLoggedIn(){
    let loggedInUser = JSON.parse(sessionStorage.loggedInUser || "{}");

    if (Object.keys(loggedInUser).length !== 0) {
      sessionStorage.setItem("loggedIn", "true");
      return true;
    } else {
      sessionStorage.setItem("loggedIn", "false");
      return false;
    }
    
  }



  toggleDarkMode() {
    console.log("TOGGLE");
    
    
    if (localStorage.getItem("mode") === "dark") {
      localStorage.removeItem("mode");
    } else {
      localStorage.setItem("mode", "dark");
    }

    let bodyBackground = document.getElementsByClassName("body-light-background");
    bodyBackground[0].classList.toggle('body-dark-background');

    let lightForeground = document.getElementsByClassName("light-foreground");
    let lightBackground = document.getElementsByClassName("light-background");
    let lightBackground2 = document.getElementsByClassName("light-background-2");

    let lightButtonPrimary = document.getElementsByClassName("btn-primary");
    let lightButtonSuccess = document.getElementsByClassName("btn-outline-success");

    var darkBackground = document.getElementsByClassName("dark-background");
    let lightBackgroundGlass = document.getElementsByClassName("light-background-glass");


    for (let i = 0; i < lightBackground.length; i++) {
      //lightBackground[i].classList.toggle('light-background');
      lightBackground[i].classList.toggle('dark-background');
      //lightBackground[i].classList.replace("light-background", "dark-background");
    }

    for (let i = 0; i < lightBackground2.length; i++) {
      //lightBackground[i].classList.toggle('light-background');
      lightBackground2[i].classList.toggle('dark-background-2');
      //lightBackground[i].classList.replace("light-background", "dark-background");
    }

    for (let i = 0; i < lightForeground.length; i++) {
      lightForeground[i].classList.toggle("dark-foreground");
    }

    for (let i = 0; i < lightButtonPrimary.length; i++) {
      lightButtonPrimary[i].classList.toggle("btn-primary-dark");
    }

    for (let i = 0; i < lightButtonSuccess.length; i++) {
      lightButtonSuccess[i].classList.toggle("btn-outline-success-dark");
    }

    for (let i = 0; i < lightBackgroundGlass.length; i++) {
      lightBackgroundGlass[i].classList.toggle("dark-background-glass");
    }

    //console.log(this.navLinkLightBtns.toArray());
    let lightNavLinks = this.navLinkLightBtns.toArray()
    //var lightNavLinks = document.getElementsByClassName("nav-link-light");
    for (let i = 0; i < lightNavLinks.length; i++) {
      //console.log(lightNavLinks.length);
      lightNavLinks[i].nativeElement.classList.toggle("nav-link-dark");
    }
  }

}
