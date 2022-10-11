import { Cart } from "./cart";
import { OrderStatus } from "./orderStatus";


export class Order {
    id: number;
    total: number;
    orderPlacedDate: Date;
    status: OrderStatus;
    cart: Cart;

    constructor(id: number, total: number, orderPlacedDate: Date, status: OrderStatus, cart: Cart){
        this.id = id;
        this.total = total;
        this.orderPlacedDate = orderPlacedDate;
        this.status = status;
        this.cart = cart;

    }
    

}