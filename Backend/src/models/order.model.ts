import {model, Schema, Types} from 'mongoose';
import { Item, ItemSchema } from './item.model';
import { OrderStatusEnum } from '../constants/order_status';

export interface OrderItem{
    item: Item;
    price: number;
    quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>(
    {
        item:{type: ItemSchema, required: true},
        price:{type: Number, required: true},
        quantity:{type: Number, required: true},
    }
);

export interface Order{
    id: number;
    items: OrderItem[];
    totalPrice: number;
    name: string;
    lastname: string;
    address: string;
    paymentId: string;
    status: OrderStatusEnum;
    phoneNumber :number;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const orderShema = new Schema<Order>({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: Number},
    paymentId: {type: String},
    totalPrice: {type: Number, required: true},
    items: {type: [OrderItemSchema], required: true},
    status: {type: String, default: OrderStatusEnum.NEW},
    user: {type: Schema.Types.ObjectId, required: true},
},{
    timestamps: true,
    toJSON:{
        virtuals:true,
    },
    toObject:{
        virtuals:true,
    }
});

export const OrderModel = model('order',orderShema);