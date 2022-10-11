import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayDjEquipmentProductsComponent } from './components/categories/display-dj-equipment-products/display-dj-equipment-products.component';
import { DisplayGuitarProductsComponent } from './components/categories/display-guitar-products/display-guitar-products.component';
import { DisplayPianoProductsComponent } from './components/categories/display-piano-products/display-piano-products.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { DisplayWoodwindsProductsComponent } from './components/categories/display-woodwinds-products/display-woodwinds-products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DisplayDrumProductsComponent } from './components/categories/display-drum-products/display-drum-products.component';
import { DisplayMartinProductsComponent } from './components/brands/display-martin-products/display-martin-products.component';
import { DisplayFenderProductsComponent } from './components/brands/display-fender-products/display-fender-products.component';
import { DisplayEpiphoneProductsComponent } from './components/brands/display-epiphone-products/display-epiphone-products.component';
import { DisplayTaylorProductsComponent } from './components/brands/display-taylor-products/display-taylor-products.component';
import { DisplayCasioProductsComponent } from './components/brands/display-casio-products/display-casio-products.component';
import { DisplayRogueProductsComponent } from './components/brands/display-rogue-products/display-rogue-products.component';
import { DisplayWilliamsProductsComponent } from './components/brands/display-williams-products/display-williams-products.component';
import { DisplayNumarkProductsComponent } from './components/brands/display-numark-products/display-numark-products.component';
import { DisplayYamahaProductsComponent } from './components/brands/display-yamaha-products/display-yamaha-products.component';
import { DisplayEtudeProductsComponent } from './components/brands/display-etude-products/display-etude-products.component';
import { DisplayMitchellProductsComponent } from './components/brands/display-mitchell-products/display-mitchell-products.component';
import { DisplayPioneerProductsComponent } from './components/brands/display-pioneer-products/display-pioneer-products.component';
import { userProfileComponent } from './components/userProfile/userProfile.component';
import { wishListComponent } from './components/wishList/wishList.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "account", component: userProfileComponent },
  { path: "wishlist", component: wishListComponent },
  { path: "orders", component: OrdersComponent },
  { path: "products", component: DisplayProductsComponent },
  { path: "products/category/guitars", component: DisplayGuitarProductsComponent },
  { path: "products/category/keyboards", component: DisplayPianoProductsComponent },
  { path: "products/category/woodwinds", component: DisplayWoodwindsProductsComponent },
  { path: "products/category/drums", component: DisplayDrumProductsComponent },
  { path: "products/category/dj-equipment", component: DisplayDjEquipmentProductsComponent },
  { path: "products/brand/martin", component: DisplayMartinProductsComponent },
  { path: "products/brand/fender", component: DisplayFenderProductsComponent },
  { path: "products/brand/epiphone", component: DisplayEpiphoneProductsComponent },
  { path: "products/brand/taylor", component: DisplayTaylorProductsComponent },
  { path: "products/brand/casio", component: DisplayCasioProductsComponent },
  { path: "products/brand/rogue", component: DisplayRogueProductsComponent },
  { path: "products/brand/williams", component: DisplayWilliamsProductsComponent },
  { path: "products/brand/numark", component: DisplayNumarkProductsComponent },
  { path: "products/brand/yamaha", component: DisplayYamahaProductsComponent },
  { path: "products/brand/etude", component: DisplayEtudeProductsComponent },
  { path: "products/brand/mitchell", component: DisplayMitchellProductsComponent },
  { path: "products/brand/pioneer", component: DisplayPioneerProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "orders", component: OrdersComponent},
  { path: "about", component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
