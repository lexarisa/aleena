import { prisma } from "../../../prisma/prisma-client"

export const findDashboardQuery = 
    async (project_id: number, user_id: number, page: number, status: string) => {

      const next = page * 10;

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
                      where: {
                        status: status,
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

  return dashboard;
}