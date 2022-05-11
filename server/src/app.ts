import express, { Application } from 'express';
import cors from 'cors';
import gitRouter from './models/Github/github.routes';
import feedRouter from './models/Feed/feed.routes';
import dashRouter from './models/Dashboard/dashboard.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(gitRouter);
app.use(feedRouter);
app.use(dashRouter);

export default app;
