/*
  Warnings:

  - You are about to drop the column `color_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `color` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_color_id_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `color_id`;

-- DropTable
DROP TABLE `color`;
