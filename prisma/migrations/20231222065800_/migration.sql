/*
  Warnings:

  - You are about to drop the column `brandId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_locationId_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `brandId`,
    DROP COLUMN `locationId`,
    ADD COLUMN `brand_id` INTEGER NULL,
    ADD COLUMN `location_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
