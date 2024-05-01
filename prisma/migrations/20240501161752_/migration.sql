-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Admin');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "email" TEXT NOT NULL,
    "address" TEXT,
    "membership_fee" TEXT NOT NULL DEFAULT '0',
    "pictureUrl" TEXT,
    "cardFrontUrl" TEXT,
    "cardBackUrl" TEXT,
    "entry_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guarantors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pictureUrl" TEXT,
    "cardFrontUrl" TEXT,
    "cardBackUrl" TEXT,
    "UserID" TEXT NOT NULL,

    CONSTRAINT "Guarantors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guarantors_email_key" ON "Guarantors"("email");

-- AddForeignKey
ALTER TABLE "Guarantors" ADD CONSTRAINT "Guarantors_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
