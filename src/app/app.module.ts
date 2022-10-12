import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DisplayGuitarProductsComponent } from './components/categories/display-guitar-products/display-guitar-products.component';
import { DisplayPianoProductsComponent } from './components/categories/display-piano-products/display-piano-products.component';
import { DisplayDjEquipmentProductsComponent } from './components/categories/display-dj-equipment-products/display-dj-equipment-products.component';
import { DisplayWoodwindsProductsComponent } from './components/categories/display-woodwinds-products/display-woodwinds-products.component';
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
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { userProfileComponent } from './components/userProfile/userProfile.component';
import { wishListComponent } from './components/wishList/wishList.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProductCardComponent,
    CartComponent,
    CheckoutComponent,
    DisplayProductsComponent,
    DisplayGuitarProductsComponent,
    DisplayPianoProductsComponent,
    DisplayDjEquipmentProductsComponent,
    DisplayWoodwindsProductsComponent,
    DisplayDrumProductsComponent,
    DisplayMartinProductsComponent,
    DisplayFenderProductsComponent,
    DisplayEpiphoneProductsComponent,
    DisplayTaylorProductsComponent,
    DisplayCasioProductsComponent,
    DisplayRogueProductsComponent,
    DisplayWilliamsProductsComponent,
    DisplayNumarkProductsComponent,
    DisplayYamahaProductsComponent,
    DisplayEtudeProductsComponent,
    DisplayMitchellProductsComponent,
    DisplayPioneerProductsComponent,
    LoadingSpinnerComponent,
    OrdersComponent,
    HomeComponent,
    userProfileComponent,
    wishListComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
