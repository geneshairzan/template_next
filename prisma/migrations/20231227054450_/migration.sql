/*
  Warnings:

  - You are about to drop the column `category_id` on the `subcategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `subcategory` DROP FOREIGN KEY `SubCategory_category_id_fkey`;

-- AlterTable
ALTER TABLE `subcategory` DROP COLUMN `category_id`;
