import { PrismaClient } from "@prisma/client";
import { INewUser } from "./../interfaces/user";
import { findUserQuery, createUserQuery } from "./../queries/user.queries";

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

}