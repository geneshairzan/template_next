-- AlterTable
ALTER TABLE `product` ADD COLUMN `status_id` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `productcategory` ADD COLUMN `status_id` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `status_id` INTEGER NOT NULL DEFAULT 1,
    MODIFY `role_id` INTEGER NULL DEFAULT 2;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `UserRole`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
