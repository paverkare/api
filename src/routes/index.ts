import express from 'express';
import authRouter from './auth.router';


class Router {

    public router: express.Router;

    constructor(){

        this.router = express.Router();
        this.build();
    }

    private build(): void {

        this.router.use('/auth', authRouter);
    }
}

export default new Router().router;