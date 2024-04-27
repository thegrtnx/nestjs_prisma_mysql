/*
  Warnings:

  - You are about to drop the `gurantors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `gurantors`;

-- CreateTable
CREATE TABLE `Guarantors` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `guranted_for` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Guarantors_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
