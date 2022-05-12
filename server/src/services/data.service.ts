import { PrismaClient } from "@prisma/client";

import { INewUser } from "./../interfaces/user";

import { createProjectQuery, findProjectQuery, deleteProjectQuery } from "../models/Project/project.queries";
import { findUserQuery, createUserQuery, findUserProjectsQuery } from "../models/User/user.queries";
import { findDashboardQuery } from "../models/Dashboard/dashboard.queries";
import { createTaskQuery, findTaskQuery } from "../models/Task/task.queries";

export class DataService {
    
    constructor(private prisma?: PrismaClient){
        prisma = new PrismaClient();
    }   

    getUser(id: number) {
        return findUserQuery(id);
    }

    createUser(user: INewUser) {
        return createUserQuery(user);
    }

    getProject(id: number) {
        return findProjectQuery(id);
    }

    getUserProjects(id: number) {
        return findUserProjectsQuery(id);
    }

    createProject(project: any){
        return createProjectQuery(project);
    }

    deleteProject(id: number) {
        return deleteProjectQuery(id);
    }

    getDashboard(project_id: number, user_id: number, page: number) {
        return findDashboardQuery(project_id, user_id, page);
    }

    getTask(id: number){
        return findTaskQuery(id);
    }

    createTask(newTask: any){
        return createTaskQuery(newTask);
    }


}