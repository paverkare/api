import express from 'express';
import testRouter from './test.router';

class Router {

    public router: express.Router;

    constructor(){

        this.router = express.Router();
        this.build();
    }

    private build(): void {

        this.router.use('/test', testRouter);
    }
}

export default new Router().router;