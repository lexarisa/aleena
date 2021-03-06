import bcrypt from 'bcrypt';
import { prisma } from './prisma-client';
import { userMockData } from './userMockData';
import { projectMockData } from './project-mock-data';


const runSeeding = async () => {
  const salt = bcrypt.genSaltSync();
  await Promise.all(
    userMockData.map((user) => {
      return prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: {
          id: user.id,
          email: user.email,
          username: user.username,
          // @ts-ignore
          name: user.name,
          slack_id: user.slack_id,
          profile_pic: user.profile_pic,
          status: user.status,
        },
      });
    })
  );
  await Promise.all(
    projectMockData.map((project) => {
      return prisma.project.upsert({
        where: { id: project.id },
        update: {},
        create: {
          id: project.id,
          title: project.title,
          description: project.description,
          status: project.status,
          created_at: project.created_at,
          deadline: project.deadline,
        },
      });
    })
  );
};

runSeeding()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
