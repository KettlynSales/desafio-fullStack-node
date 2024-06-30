/*
  Warnings:

  - You are about to drop the column `created_at` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `gates` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `gates` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `gates` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `locais` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `locais` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `locais` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ticket_gates` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `ticket_gates` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ticket_gates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "gates" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "locais" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "ticket_gates" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";
