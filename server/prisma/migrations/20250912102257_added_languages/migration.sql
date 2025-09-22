-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('ENGLISH', 'HINDI', 'PUNJABI');

-- CreateTable
CREATE TABLE "public"."DoctorLanguage" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "language" "public"."Language" NOT NULL,

    CONSTRAINT "DoctorLanguage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."DoctorLanguage" ADD CONSTRAINT "DoctorLanguage_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
