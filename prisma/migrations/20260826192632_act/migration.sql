/*
  Warnings:

  - Added the required column `totalEmission` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalEnergy` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFood` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTransport` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalWaste` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "totalEmission" INTEGER NOT NULL,
ADD COLUMN     "totalEnergy" INTEGER NOT NULL,
ADD COLUMN     "totalFood" INTEGER NOT NULL,
ADD COLUMN     "totalTransport" INTEGER NOT NULL,
ADD COLUMN     "totalWaste" INTEGER NOT NULL;
