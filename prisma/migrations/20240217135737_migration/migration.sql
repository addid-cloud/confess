/*
  Warnings:

  - Added the required column `background` to the `confessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `confessions` ADD COLUMN `background` VARCHAR(191) NOT NULL;
