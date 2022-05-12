import { IUser, INewUser } from "../../interfaces/user"
import { prisma } from "../../../prisma/prisma-client"

export const createUserQuery = async (newUser: INewUser) => {
    const userData = await prisma.user.create({
        data: newUser
    });
    
    if(!userData) throw new Error();

    return userData;
}

export const findUserQuery = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if(!user) return null;
   
    return user;
}

export const findUserProjectsQuery = async (id: number) => {
    const projects = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            projects: {
                select: {
                    project: {
                        select: {
                            title: true,
                            description: true,
                            status: true,
                            deadline: true,
                        }
                    }
                }
            }
        }
    })

    if(!projects) return null;
   
    return projects;
}

