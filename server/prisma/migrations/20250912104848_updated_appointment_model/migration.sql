/*
  Warnings:

  - A unique constraint covering the columns `[availabilityId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[videoRoomId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availabilityId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Appointment" ADD COLUMN     "availabilityId" INTEGER NOT NULL,
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "videoRoomId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';

-- CreateTable
CREATE TABLE "public"."DoctorAvailability" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "slot" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DoctorAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_availabilityId_key" ON "public"."Appointment"("availabilityId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_videoRoomId_key" ON "public"."Appointment"("videoRoomId");

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "public"."DoctorAvailability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DoctorAvailability" ADD CONSTRAINT "DoctorAvailability_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
