import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cartItem';

interface Cart {
  cartCount: number;
  totalQuantity: number;
  products: {
    product: Product,
    quantity: number
  }[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "/api/product";
  private cartUrl: string = "/api/cart";

  private _cart = new BehaviorSubject<Cart>({
    cartCount: 0,
    totalQuantity: 0,
    products: [],
    totalPrice: 0.00
  });

  private _cart$ = this._cart.asObservable();

  getCart(): Observable<Cart> {
    return this._cart$;
  }

  setCart(latestValue: Cart) {
    return this._cart.next(latestValue);
  }

  constructor(private http: HttpClient) { }

  public getUserCart(): Observable<Cart> {
    return this.http.get<any>(environment.baseUrl+this.cartUrl+`/get-cart`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getCartItems(): Observable<CartItem[]> {
    return this.http.get<any>(environment.baseUrl+this.cartUrl+`/items`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.productUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getProductsByBrand(brand :String): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.productUrl+`/brand?brand=${brand}`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getProductsByCategory(category :String): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.productUrl+`/category?category=${category}`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+id);
  }

  public purchase(products: {id:number, quantity:number}[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl+this.productUrl, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  public addCartItem(product:Product): Observable<any> {
    const payload = {productId: product.id, quantity: 1};
    return this.http.post<any>(environment.baseUrl+this.cartUrl+`/add-item`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public removeItem(item: CartItem): Observable<any>{
    const payload = {id: item.id, productId: item.product.id, quantity: 1}
    return this.http.delete<any>(environment.baseUrl+ this.cartUrl+`/delete-item`, {headers: environment.headers, withCredentials: environment.withCredentials, body: payload} )
  }

  public emptyCart(): Observable<any> {
    return this.http.delete<any>(environment.baseUrl+ this.cartUrl+`/empty`, {headers: environment.headers, withCredentials: environment.withCredentials} );
  }
}
