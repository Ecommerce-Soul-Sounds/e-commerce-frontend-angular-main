export class Cart {
    id: number;
    dateModified: Date;
    totalQuantity: number;
    

    constructor (id: number, totalQuantity: number, dateModified: Date) {
        this.id = id;
        this.dateModified = dateModified;
        this.totalQuantity = totalQuantity;
    }
}