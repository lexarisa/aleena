import express, { Application } from 'express';
import cors from 'cors';

import gitRouter from './models/Github/github.routes';
import feedRouter from './models/Feed/feed.routes';
import dashRouter from './models/Dashboard/dashboard.routes';
import taskRouter from './models/Dashboard/dashboard.routes';
import routerUpdateTasks from './routers/updateTasks.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(gitRouter);
app.use(dashRouter);
app.use(feedRouter);
app.use(taskRouter);
app.use(routerUpdateTasks);

export default app;
