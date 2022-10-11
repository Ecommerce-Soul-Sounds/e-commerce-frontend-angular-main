import { Product } from "./product";

export class WishlistItem {
    id: number;
    product: Product;
    wishlistId: number;

    constructor (id: number, product: Product, wishlistId: number) {
        this.id = id;
        this.product = product;
        this.wishlistId = wishlistId;
    }
}
