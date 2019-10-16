import express from 'express';
import {schema, validateBody} from "../helpers";
import CategoryController from "../controllers/CategoryController";
import mongoose from "mongoose";


const router = express.Router();

router.get('/', async (req, res) => {
        try {
            const customCategory = await CategoryController.getAll();
            res.json(customCategory);
        } catch (e) {
            res.status(500).end();
        }
    }
).get('/:id', async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const customCategory = await CategoryController.getById(id);
        res.json(customCategory);
    } catch (e) {
        res.status(404).end();
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const oldCategory = await CategoryController.delete(req.params.id);
        res.status(201).end();
    } catch (e) {
        res.status(404).end();
    }
});


router.put('/:id', async (req, res) => {
    try {
        const category = await CategoryController
            .update(req.params.id, req.body);
        res.json(category);
    } catch (e) {
        res.status(404).end();
    }
});


router.post('/', validateBody(schema.categorySchema), async (req, res) => {
    try {
        const category = req.body;
        const newCategory = await CategoryController
            .create(category.name);
        res.json(newCategory);
    } catch (e) {
        res.status(500).end();
    }
});





export default router;
