import express from 'express';
import passport from '../passport'
import {schema, validateBody} from "../helpers";
import WishlistController from "../controllers/WishlistController";
var mongoose = require('mongoose');


const router = express.Router();
const passportJwt = passport.authenticate('jwt', {session: false});

router.get('/me', passportJwt, (req, res) => {

    if(!req.user)

        return res.status(400).json({message: "No user found"});

    return res.status(200).json({user: req.user});
});

router.get('/:user_id/wishlist', async (req, res) => {
    try {
        const wishlist = await WishlistController.getUserWishlist(mongoose.Types.ObjectId(req.params.user_id))
        res.json(wishlist);
    } catch (e) {
        console.log(e)
        res.status(500).end();
    }
});

router.delete('/:user_id/wishlist/:custom_id', async (req, res) => {
    try {
        const wishlist = await WishlistController.delete(mongoose.Types.ObjectId(req.params.user_id), req.params.custom_id)
        res.json(wishlist);
    } catch (e) {
        res.status(500).end();
    }
});

router.post('/:user_id/wishlist', async (req, res) => {
    try {
        const wishlist = await WishlistController.addToWishList(mongoose.Types.ObjectId(req.params.user_id), req.body.custom_id)
        res.json(wishlist);
    } catch (e) {
        res.status(500).end();
    }
});

export default router;