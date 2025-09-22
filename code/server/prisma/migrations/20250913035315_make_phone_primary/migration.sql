/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone` on table `Doctor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Doctor" ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Patient" ALTER COLUMN "phone" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "public"."Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_phone_key" ON "public"."Doctor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_phone_key" ON "public"."Patient"("phone");
