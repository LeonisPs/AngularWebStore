"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.OrderItemSchema = void 0;
var mongoose_1 = require("mongoose");
var item_model_1 = require("./item.model");
var order_status_1 = require("../constants/order_status");
exports.OrderItemSchema = new mongoose_1.Schema({
    item: { type: item_model_1.ItemSchema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
var orderShema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [exports.OrderItemSchema], required: true },
    status: { type: String, default: order_status_1.OrderStatusEnum.NEW },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});
exports.OrderModel = (0, mongoose_1.model)('order', orderShema);
