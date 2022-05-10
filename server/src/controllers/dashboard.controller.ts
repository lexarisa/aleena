import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const getMainDashboard = async (req: Request, res: Response) => {
  try {
    const project_id = req.params.project_id;
    const user_id = req.params.user_id;
    const page = req.params.page;
    // const { project_id, user_id, page } = req
    let next = Number(page) * 10; //first page should be 0;
    const dashboard = await prisma.user_Projects.findMany({
      where: {
        project_id: +project_id,
        user_id: +user_id,
      },
      include: {
        project: {
          select: {
            milestones: {
              select: {
                title: true,
                tasks: {
                  skip: next,
                  take: 10,
                  orderBy: {
                    updated_at: 'desc',
                  },
                  select: {
                    id: true,
                    title: true,
                    description: true,
                    status: true,
                    deadline: true,
                    user_id: true,
                    users: {
                      select: {
                        user: {
                          select: {
                            profile_pic: true,
                          },
                        },
                      },
                    },
                    project_id: true,
                    tags: true,
                  },
                },
              },
            },
          },
        },
        user: true,
      },
    });

    res.send(dashboard);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { getMainDashboard };
