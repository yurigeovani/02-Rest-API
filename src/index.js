import express from 'express';
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
import {router} from './routes/main.js';

app.use(router);
app.listen(3000);
console.log('Server on port 3000')