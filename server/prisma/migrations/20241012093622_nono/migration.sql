/*
  Warnings:

  - You are about to drop the column `ramInGB` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `storageInGB` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `itemproperty` table. All the data in the column will be lost.
  - You are about to drop the column `batteryCapacity` on the `phonespec` table. All the data in the column will be lost.
  - You are about to drop the column `operatingSystem` on the `phonespec` table. All the data in the column will be lost.
  - You are about to drop the column `ramInGB` on the `phonespec` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `phonespec` table. All the data in the column will be lost.
  - You are about to drop the column `screenSize` on the `phonespec` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemId` to the `ItemProperty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `item` DROP COLUMN `ramInGB`,
    DROP COLUMN `storageInGB`,
    ADD COLUMN `categoryId` VARCHAR(191) NULL,
    ADD COLUMN `contactPhoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `favoritedCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `status` ENUM('IN_REVIEW', 'PUBLISHED', 'ARCHIEVED', 'DRAFT', 'SUSPENDED', 'EXPIRED', 'REJECTED', 'SCHEDULED', 'DELETED', 'MODIFIED') NOT NULL DEFAULT 'IN_REVIEW',
    ADD COLUMN `viewCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `brand` VARCHAR(191) NULL,
    MODIFY `model` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `itemproperty` DROP COLUMN `productId`,
    ADD COLUMN `itemId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `phonespec` DROP COLUMN `batteryCapacity`,
    DROP COLUMN `operatingSystem`,
    DROP COLUMN `ramInGB`,
    DROP COLUMN `releaseYear`,
    DROP COLUMN `screenSize`,
    ADD COLUMN `battery` VARCHAR(191) NULL,
    ADD COLUMN `benchmarkResults` VARCHAR(191) NULL,
    ADD COLUMN `brandId` INTEGER NULL,
    ADD COLUMN `colorOptions` VARCHAR(191) NULL,
    ADD COLUMN `decsription` VARCHAR(191) NULL,
    ADD COLUMN `dimensions` VARCHAR(191) NULL,
    ADD COLUMN `releasedIn` VARCHAR(191) NULL,
    ADD COLUMN `sensors` VARCHAR(191) NULL,
    ADD COLUMN `storageOptions` VARCHAR(191) NULL,
    ADD COLUMN `weight` VARCHAR(191) NULL,
    MODIFY `brand` VARCHAR(191) NULL,
    MODIFY `model` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `parentId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BrandCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brandId` INTEGER NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BrandCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brandId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Brand_name_key` ON `Brand`(`name`);

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemProperty` ADD CONSTRAINT `ItemProperty_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
