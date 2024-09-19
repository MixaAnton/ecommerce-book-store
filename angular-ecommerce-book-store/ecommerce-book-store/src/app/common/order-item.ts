import { CartItem } from "./cart-item";

export class OrderItem {
    image: any;
    imageExtension:string | null;
    unitPrice: number;
    quantity: number;
    productId: number;

    constructor(cartItem: CartItem) {
        this.image = cartItem.image;
        this.imageExtension = cartItem.imageExtension;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;
    }
}