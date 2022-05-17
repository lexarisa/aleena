import { prisma } from '../../../prisma/prisma-client';

export const getAllDocsInMilestoneQuery = async (milestoneId: number) => {
  const allDocs = await prisma.milestone.findMany({
    where: {
      id: milestoneId,
    },
    select: {
      documents: {
        select: {
          id: true,
          milestone_id: true,
          title: true,
          articles: {
            select: {
              title: true,
              id: true,
              content: true,
              user_id: true,
            },
          },
        },
      },
    },
  });

  if (!allDocs) return null;
  return allDocs;
};
export const getAllDocumentsInProjectQuery = async (project_id: number) => {
  const allArticles = await prisma.project.findUnique({
    where: {
      id: project_id,
    },
    select: {
      milestones: {
        select: {
          documents: {
            select: {
              milestone_id: true,
              title: true,
              id: true,
              articles: {
                select: {
                  title: true,
                  id: true,
                  content: true,
                  user_id: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!allArticles) return null;
  return allArticles;
};

export const getDocumentationQuery = async (id: number) => {
  const newDoc = await prisma.documentation.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      milestone_id: true,
      title: true,
      articles: {
        select: {
          title: true,
          id: true,
          content: true,
          user_id: true,
        },
      },
    },
  });
  if (!newDoc) return null;
  return newDoc;
};

export const createDocumentationQuery = async (
  title: string,
  milestone_id: number
) => {
  const newDoc = await prisma.documentation.create({
    data: {
      title: title,
      milestone_id: milestone_id,
      articles: {},
    },
  });
  if (!newDoc) return null;
  return newDoc;
};
export const updateDocumentationQuery = async (title: string, id: number) => {
  const updatedDoc = await prisma.documentation.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });
  if (!updatedDoc) return null;
  return updatedDoc;
};
export const deleteDocumentationQuery = async (id: number) => {
  const deletedDoc = await prisma.documentation.delete({
    where: {
      id: id,
    },
  });
  if (!deletedDoc) return null;
  return deletedDoc;
};
export const getAllArticlesInMilestone = async (milestone_id: number) => {
  const allArticles = await prisma.milestone.findMany({
    where: {
      id: milestone_id,
    },
    select: {
      documents: {
        select: {
          title: true,
          articles: true,
        },
      },
    },
  });
  if (!allArticles) return null;
  return allArticles;
};
