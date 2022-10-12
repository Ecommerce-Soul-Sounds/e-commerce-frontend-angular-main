import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../models/product";
import { WishlistItem } from "../models/wishlistitem";

interface Cart {
    cartCount: number;
    products: {
        product: Product,
        quantity: number
    }[];
    totalPrice: number;
}
  
@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    private wishlistUrl: string = "/api/wishlist";

    private _cart = new BehaviorSubject<Cart>({
        cartCount: 0,
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

    public getWishlistProducts(): Observable<WishlistItem[]> {
        return this.http.get<WishlistItem[]>(environment.baseUrl+this.wishlistUrl+"/items", {headers: environment.headers, withCredentials: environment.withCredentials});
    }

    public addToWishlist(productId: number): Observable<any> {
        const payload = {productId:productId};
        console.log(payload);
        return this.http.post<any>(environment.baseUrl+ this.wishlistUrl+`/add-item`, productId, {headers: environment.headers, withCredentials: environment.withCredentials} )
    }

    public removeFromWishlist(productId: number): Observable<any> {
        const payload = {productId:productId};
        console.log(payload);
        return this.http.delete<any>(environment.baseUrl+ this.wishlistUrl+`/delete-item?productId=${productId}`, {headers: environment.headers, withCredentials: environment.withCredentials} )
    }
}