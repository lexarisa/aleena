import express, { Application } from 'express';
import cors from 'cors';
import router from './routers/github.routes';
import routerFeed from './routers/feed.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(routerFeed);

export default app;
