/*
  Warnings:

  - The primary key for the `brandcategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `brandcategory` table. All the data in the column will be lost.
  - You are about to drop the `brandcategories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `brandcategories` DROP FOREIGN KEY `BrandCategories_brandId_fkey`;

-- DropForeignKey
ALTER TABLE `brandcategories` DROP FOREIGN KEY `BrandCategories_categoryId_fkey`;

-- DropIndex
DROP INDEX `BrandCategory_brandId_categoryId_key` ON `brandcategory`;

-- AlterTable
ALTER TABLE `brandcategory` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `brandName` VARCHAR(191) NULL,
    MODIFY `categoryName` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`brandId`, `categoryId`);

-- DropTable
DROP TABLE `brandcategories`;

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- AddForeignKey
ALTER TABLE `BrandCategory` ADD CONSTRAINT `BrandCategory_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BrandCategory` ADD CONSTRAINT `BrandCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
