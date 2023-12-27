/*
  Warnings:

  - Made the column `brand_id` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_brand_id_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `brand_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
