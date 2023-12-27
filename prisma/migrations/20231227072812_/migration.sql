/*
  Warnings:

  - Made the column `desc` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `project` MODIFY `desc` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `projectreference` MODIFY `desc` VARCHAR(191) NULL;
