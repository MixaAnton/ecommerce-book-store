import { Address } from "./address";
import { Customer } from "./customer";
import { OrderItem } from "./order-item";
import { Status } from "./status";

export interface OrderHistory{
    id:number;
    orderTrackingNumber:string;
    totalQuantity:number;
    totalPrice:number;
    dateCreated:Date;
    lastUpdated:Date;
    orderItems:OrderItem;
    customer:Customer;
    shippingAddress:Address;
    billingAddress:Address;
    status:Status;
}