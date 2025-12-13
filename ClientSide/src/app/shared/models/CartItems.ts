import { Item } from "./item";

export class CartItems{
    quantity:number = 1;
    price:number;
    constructor(public item:Item){
        this.item = item;
        this.price = this.item.price;
    }
}