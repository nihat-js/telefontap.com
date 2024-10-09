/*
  Warnings:

  - The values [EMAIL,PHONE] on the enum `VerificationCode_type` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updatedAt` to the `VerificationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `verificationcode` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `type` ENUM('CONFIRM_BY_EMAIL', 'CONFIRM_BY_PHONE', 'RESET_BY_EMAIL', 'RESET_BY_PHONE') NOT NULL;
