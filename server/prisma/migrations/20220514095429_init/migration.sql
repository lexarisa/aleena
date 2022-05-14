/*
  Warnings:

  - Added the required column `title` to the `Documentation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Documentation" ADD COLUMN     "title" TEXT NOT NULL;
