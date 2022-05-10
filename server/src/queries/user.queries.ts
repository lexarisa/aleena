import { IUser, INewUser } from "./../interfaces/user"
import { prisma } from "./../../prisma/prisma-client"

export const createUserQuery = async (newUser: INewUser): Promise<IUser> => {
    const userData = await prisma.user.create({
        // @ts-ignore
        data: newUser
    })

    if(!userData) throw new Error();

    // @ts-ignore
    return userData;
}

export const findUserQuery = async (id: number): Promise<IUser | null> => {
    const userData = await prisma.user.findUnique({
        where: {
            id
        }
    })

    if(!userData) return null;

    // @ts-ignore
    return userData;
}

