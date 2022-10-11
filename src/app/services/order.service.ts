
import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/cartItem';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl: string = "/api/orders";
  private cartUrl: string = "/api/cart"


  constructor(private http: HttpClient) { }

  public getAllOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(environment.baseUrl+this.orderUrl+"/all", {headers: environment.headers, withCredentials: environment.withCredentials});
  }


  public submitOrder(): Observable<Order>{
    return this.http.post<any>(environment.baseUrl+this.orderUrl+"/purchase",{headers: environment.headers});
  }

  public getOrderItem(cartId: number): Observable<CartItem[]>{
    
    return this.http.get<CartItem[]>(environment.baseUrl+this.cartUrl+`/order-items?cartId=${cartId}`, {headers: environment.headers, withCredentials: environment.withCredentials});
  } 

}
