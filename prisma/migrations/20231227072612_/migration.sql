/*
  Warnings:

  - Made the column `desc` on table `projectreference` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `projectreference` ADD COLUMN `project_id` VARCHAR(191) NULL,
    MODIFY `desc` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `ProjectReference` ADD CONSTRAINT `ProjectReference_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
