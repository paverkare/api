import express from 'express';
import {schema, validateBody} from "../helpers";
import passport from '../passport';
import {UserController} from '../controllers';
import {HttpException, sendError} from "../helpers/HttpException";

const router = express.Router();
const passportLocal = passport.authenticate('local', {session: false});

router.route('/login')
    .post(passportLocal, (req, res) => {

            try {

                const jwt = UserController.login(req.user as any);

                return res.status(200).json({jwt});

            } catch (e) {

                return res.status(400).json({message: "Bad credentials"});
            }
        }
    );

router.post('/register', validateBody(schema.registerSchema), async (req, res) => {

    try {

        const createdUser = await UserController.register(req.body.email, req.body.password, req.body.firstName, req.body.lastName);

        return res.status(200).json(createdUser);

    } catch (e) {

        return sendError(res as any, e);
    }
});

export default router;
