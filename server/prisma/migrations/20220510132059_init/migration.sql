/*
  Warnings:

  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserBookMark` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `DocumentationDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserBookMark" DROP CONSTRAINT "UserBookMark_documentationDetail_id_fkey";

-- DropForeignKey
ALTER TABLE "UserBookMark" DROP CONSTRAINT "UserBookMark_user_id_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DocumentationDetail" ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Github" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Milestone" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "password",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "slack_id" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "UserBookMark";

-- AddForeignKey
ALTER TABLE "DocumentationDetail" ADD CONSTRAINT "DocumentationDetail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
