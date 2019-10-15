import express  from 'express';
import router from './routes';

const app  = express();

app.use('/api', router);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${ port }`);
});