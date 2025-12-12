import { model, Schema } from "mongoose";

export interface Item{
    id:string;
    name:string;
    price:number;  
    description:string;
    imageUrl:string;
}

export const ItemSchema = new Schema<Item>(
    {
        name: {type: String, required:true},
        price: {type: Number, required:true},
        description: {type: String, required:true},
        imageUrl: {type: String, required:true},
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps: true
    }
);

export const  ItemModel = model<Item>('item', ItemSchema);