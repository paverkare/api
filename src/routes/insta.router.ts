import express from 'express';

const router = express.Router();
const https = require('https');

router.get('/', (req, res, next ) => {
    https.get('https://www.instagram.com/explore/tags/paverkareesgi/?__a=1', (resp: any) => {
      let data = '';
      resp.on('data', (chunk: any) => {
        data += chunk;
      });
      resp.on('end', () => {
        res.json(JSON.parse(data));
      });
    }).on("error", (err: any) => {
        res.status(503).end();
      console.log("Error: " + err.message);
    });
});

export default router;