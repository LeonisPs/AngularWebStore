"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = exports.ItemSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.ItemModel = (0, mongoose_1.model)('item', exports.ItemSchema);
