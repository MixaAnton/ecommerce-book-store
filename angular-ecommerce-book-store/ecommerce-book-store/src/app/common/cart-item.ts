import { Product } from "./product";

export class CartItem {
    id: number;
    name: string;
    image:any;
    imageExtension: string | null;
    unitPrice: number;
    quantity: number;
    unitsInStock:number;

    constructor(product: Product) {
        this.id= product.id;
        this.name = product.name;
        this.image = product.image;
        this.imageExtension = product.imageExtension;
        this.unitPrice = product.unitPrice;
        this.quantity = 1;
        this.unitsInStock = product.unitsInStock;
    }
}
