import express from 'express';
import passport from '../passport'

const router = express.Router();
const passportJwt = passport.authenticate('jwt', {session: false});

router.get('/me', passportJwt, (req, res) => {

    if(!req.user)

        return res.status(400).json({message: "No user found"});

    return res.status(200).json({user: req.user});
});

export default router;