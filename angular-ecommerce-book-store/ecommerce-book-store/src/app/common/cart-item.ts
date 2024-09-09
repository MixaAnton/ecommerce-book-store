import { Product } from "./product";

export class CartItem {
    id: number;
    name: string;
    imageUrl: string | null;
    unitPrice: number;

    quantity: number;

    constructor(product: Product) {
        this.id= product.id;
        this.name = product.name;
        this.imageUrl = product.image;
        this.unitPrice = product.unitPrice;

        this.quantity = 1;
    }
}
