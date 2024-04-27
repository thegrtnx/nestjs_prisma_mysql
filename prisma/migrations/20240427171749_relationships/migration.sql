/*
  Warnings:

  - You are about to drop the column `guranted_for` on the `guarantors` table. All the data in the column will be lost.
  - Added the required column `UserID` to the `Guarantors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guarantors` DROP COLUMN `guranted_for`,
    ADD COLUMN `UserID` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `VerificationData` (
    `id` VARCHAR(191) NOT NULL,
    `id_1` VARCHAR(191) NOT NULL,
    `id_2` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `VerificationData_UserId_key`(`UserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Guarantors` ADD CONSTRAINT `Guarantors_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerificationData` ADD CONSTRAINT `VerificationData_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
