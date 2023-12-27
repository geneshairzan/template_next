/*
  Warnings:

  - You are about to drop the column `date` on the `projectreference` table. All the data in the column will be lost.
  - You are about to drop the column `file_invoice` on the `projectreference` table. All the data in the column will be lost.
  - You are about to drop the column `img_path` on the `projectreference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `projectreference` DROP COLUMN `date`,
    DROP COLUMN `file_invoice`,
    DROP COLUMN `img_path`;
