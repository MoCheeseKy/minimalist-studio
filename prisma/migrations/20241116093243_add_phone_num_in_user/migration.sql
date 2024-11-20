/*
  Warnings:

  - A unique constraint covering the columns `[phone_num]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone_num` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone_num" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_num_key" ON "User"("phone_num");
