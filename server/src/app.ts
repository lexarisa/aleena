import express, { Application } from 'express';
import cors from 'cors';
import gitRouter from './routers/github.routes';
import feedRouter from './routers/feed.routes';
import dashRouter from './Dashboard/dashboard.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(gitRouter);
app.use(feedRouter);
app.use(dashRouter);

export default app;
