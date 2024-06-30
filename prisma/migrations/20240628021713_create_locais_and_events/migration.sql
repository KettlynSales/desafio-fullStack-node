/*
  Warnings:

  - Added the required column `type` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `locais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "locais" ADD COLUMN     "state" TEXT NOT NULL;
