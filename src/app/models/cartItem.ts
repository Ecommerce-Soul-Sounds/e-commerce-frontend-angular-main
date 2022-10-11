import { Product } from "./product";

export class CartItem {
    id: number;
    quantity: number;
    product: Product;
    

    constructor (id: number, quantity: number, product: Product) {
        this.id = id;
        this.quantity = quantity;
        this.product = product;
    }
}