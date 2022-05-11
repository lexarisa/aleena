import express, { Application } from 'express';
import cors from 'cors';
import router from './routers/github.routes';
import routerFeed from './routers/feed.routes';

import routerUpdateTasks from './routers/updateTasks.routes';
import dashRouter from './routers/dashboard.routes';
import taskRouter from './routers/task.routes';
import projectRouter from './routers/project.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(routerFeed);

app.use(routerUpdateTasks);
app.use(dashRouter);
app.use(taskRouter);
app.use(projectRouter);


export default app;
