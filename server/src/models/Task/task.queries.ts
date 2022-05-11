import { prisma } from "../../../prisma/prisma-client"

export const createTaskQuery = async (newTask: any) => {
    const task = await prisma.task.create({
        data: newTask
    })

    if (!task) throw new Error();

    return task;
}

export const findTaskQuery = async (id: number) => {
    const task = await prisma.task.findUnique({
        where: {
            id
        }
    })

    if (!task) return null;

    return task;
}