/*
  Warnings:

  - You are about to drop the column `subCategoryId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_subCategoryId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `subCategoryId`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_sub_category_id_fkey` FOREIGN KEY (`sub_category_id`) REFERENCES `SubCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
