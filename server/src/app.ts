import express, { Application } from 'express';
import cors from 'cors';
<<<<<<< HEAD
import gitRouter from './models/Github/github.routes';
import feedRouter from './models/Feed/feed.routes';
import dashRouter from './models/Dashboard/dashboard.routes';
=======
import router from './routers/github.routes';
import routerFeed from './routers/feed.routes';
<<<<<<< HEAD
import routerUpdateTasks from './routers/updateTasks.routes';
import dashRouter from './routers/dashboard.routes';
=======

import routerUpdateTasks from './routers/updateTasks.routes';
import dashRouter from './routers/dashboard.routes';
import taskRouter from './routers/task.routes';
import projectRouter from './routers/project.routes';
>>>>>>> development
>>>>>>> development

const app: Application = express();

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(gitRouter);
app.use(feedRouter);
=======
app.use(router);
app.use(routerFeed);
<<<<<<< HEAD
app.use(routerUpdateTasks);
>>>>>>> development
app.use(dashRouter);
=======

app.use(routerUpdateTasks);
app.use(dashRouter);
app.use(taskRouter);
app.use(projectRouter);

>>>>>>> development

export default app;
