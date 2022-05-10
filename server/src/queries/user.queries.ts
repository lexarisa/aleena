import { IUser, INewUser } from "./../interfaces/user"
import { prisma } from "./../../prisma/prisma-client"

export const createUserQuery = async (newUser: INewUser) => {
    const userData = await prisma.user.create({
        //@ts-ignore
        data: newUser
    })

    if(!userData) throw new Error();

    return userData;
}

export const findUserQuery = async (id: number) => {
    const userData = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if(!userData) return null;
    
    return userData;
}

