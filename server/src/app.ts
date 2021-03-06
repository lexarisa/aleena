import 'reflect-metadata';
import Container from 'typedi';
import express, { Application } from 'express';
import cors from 'cors';
import gitRouter from './models/Github/github.routes';
import dashRouter from './models/Dashboard/dashboard.routes';
import taskRouter from './models/Task/task.routes';
import userRouter from './models/User/user.routes';
import feedRouter from './models/Feed/feed.routes';
import projectRouter from './models/Project/project.routes';
import milestoneRouter from './models/Milestone/milestone.routes';
import documentRouter from './models/Documentation/documentation.routes';
import articleRouter from './models/Articles/articles.routes';
import commentRouter from './models/Comment/comment.routes';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(gitRouter);
app.use(dashRouter);
app.use(taskRouter);
app.use(userRouter);
app.use(feedRouter);
app.use(projectRouter);
app.use(milestoneRouter);
app.use(documentRouter);
app.use(articleRouter);
app.use(commentRouter);

export default app;
