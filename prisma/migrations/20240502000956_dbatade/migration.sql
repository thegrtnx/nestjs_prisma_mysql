-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('User', 'Admin') NOT NULL DEFAULT 'User',
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `membership_fee` VARCHAR(191) NOT NULL DEFAULT '0',
    `pictureUrl` VARCHAR(191) NULL,
    `cardFrontUrl` VARCHAR(191) NULL,
    `cardBackUrl` VARCHAR(191) NULL,
    `entry_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guarantors` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `pictureUrl` VARCHAR(191) NULL,
    `cardFrontUrl` VARCHAR(191) NULL,
    `cardBackUrl` VARCHAR(191) NULL,
    `UserID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Guarantors_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Guarantors` ADD CONSTRAINT `Guarantors_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
