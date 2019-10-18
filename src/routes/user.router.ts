import express from 'express';
import passport from '../passport';
import WishlistController from "../controllers/WishlistController";
import CartController from "../controllers/CartController";
import OrderController from "../controllers/OrderController";
import {IUser} from "../models/user";
import mongoose from 'mongoose'
import CustomController from "../controllers/CustomController";
import {ICustom} from "../models/custom";


const router = express.Router();
const passportJwt = passport.authenticate('jwt', {session: false});

router.get('/me', passportJwt, (req, res) => {

    if (!req.user)

        return res.status(400).json({message: "No user found"});

    return res.status(200).json({user: req.user});
});

router.get('/wishlist', passportJwt, async (req, res) => {
    try {
        const wishlist = await WishlistController.getUserWishlist(mongoose.Types.ObjectId((req.user as IUser).id));
        if (!wishlist)
            res.status(404).end();
        res.json(wishlist);
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
});

router.delete('/wishlist/:custom_id', passportJwt, async (req, res) => {
    try {
        const wishlist = await WishlistController.delete(mongoose.Types.ObjectId((req.user as IUser).id), req.params.custom_id);
        res.json(wishlist);
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/wishlist', passportJwt, async (req, res) => {
    try {
        const customId = await CustomController.searchCustom(req.body.idBracelet, req.body.idCadran);
        const wishlist = await WishlistController.addToWishList(mongoose.Types.ObjectId((req.user as IUser).id), customId as ICustom);

        res.json(wishlist);
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

router.get('/cart', passportJwt, async (req, res) => {
    try {
        const cart = await CartController.getUserCart(mongoose.Types.ObjectId((req.user as IUser).id));
        if (!cart)
            res.status(404).end();
        res.json(cart);
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
});

router.delete('/cart/:custom_id', passportJwt, async (req, res) => {
    try {
        const cart = await CartController.delete(mongoose.Types.ObjectId((req.user as IUser).id), req.params.custom_id);
        res.json(cart);
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/cart', passportJwt, async (req, res) => {
    try {
        const cart = await CartController.addToCart(mongoose.Types.ObjectId((req.user as IUser).id), req.body.custom_id);
        res.json(cart);
    } catch (e) {
        res.status(500).end();
    }
});

router.get('/order', passportJwt, async (req, res) => {
    try {
        const order = await OrderController.getOrder(mongoose.Types.ObjectId((req.user as IUser).id));
        if (!order)
            res.status(404).end();
        res.json(order);
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
});

router.post('/order', passportJwt, async (req, res) => {
    try {
        const cart = await OrderController.addToOrder(mongoose.Types.ObjectId((req.user as IUser).id), req.body.custom_id);
        res.json(cart);
    } catch (e) {
        res.status(500).end();
    }
});

export default router;
