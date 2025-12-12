import { Router } from "express";
import { sample_items } from "../data";
import asyncHandler from "express-async-handler";
import { ItemModel } from "../models/item.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const itemsCounts = await ItemModel.countDocuments();
        if (itemsCounts> 0) {
            res.send(sample_items);
            return;
        }

        await ItemModel.create(sample_items);
        res.send("Seed Is Done");
    } 
))

router.get("/", asyncHandler(
    async (req, res) => {
        const items = await ItemModel.find();
        res.send(items);
    }
))

router.get("/search/:search", asyncHandler(
    async (req,res) => {
        const searchRegex = new RegExp(req.params.search, 'i');
        const items = await ItemModel.find({name: {$regex:searchRegex}})
        res.send(items);
    }
));

router.get("/:itemId", asyncHandler(
    async (req,res) => {
        const item = await ItemModel.findById(req.params.itemId);
        res.send(item);
    }
));

export default router;