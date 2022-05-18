import { prisma } from '../../../prisma/prisma-client';
import { IComment } from '../../interfaces/IComment';

export const addCommentQuery = async (comment: IComment) => {
  console.log('comment', comment);
  const newComment = await prisma.comment.create({
    data: comment,
  });
  if (!newComment) return null;
  return newComment;
};

export const getAllCommentsQuery = async (task_id: number) => {
  const allComments = await prisma.comment.findMany({
    where: {
      task_id: task_id,
    },
    select: {
      id: true,
      description: true,
      created_at: true,
      user: {
        select: {
          username: true,
          email: true,
          profile_pic: true,
        },
      },
    },
  });
  if (!allComments) return null;
  return allComments;
};

export const deleteCommentQuery = async (comment_id: number) => {
  const commentToDelete = await prisma.comment.delete({
    where: {
      id: comment_id,
    },
  });

  if (!commentToDelete) return null;
  return commentToDelete;
};
