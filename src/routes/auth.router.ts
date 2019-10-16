import express from 'express';
import {schema, validateBody} from "../helpers";
import passport from '../passport'
import {UserController} from '../controllers';

const router = express.Router();
const passportLocal = passport.authenticate('local', {session: false});

router.route('/login')
    .post(passportLocal, (req, res) => {

        try{

            const jwt = UserController.login(req.user as any);

            return res.status(200).json({jwt});

        }catch (e) {

            return res.status(400).json({message: "Bad credentials"});
        }
    }
);

export default router;