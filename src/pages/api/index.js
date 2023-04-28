import express from 'express';
import next from 'next';
import { dbConnection } from './db/index.js';
import router from './router.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.use('/api', router);

app.prepare().then(() => {
    server.use(handle).listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
        dbConnection();
    });
});
