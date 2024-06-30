/*
  Warnings:

  - You are about to drop the column `cep` on the `locais` table. All the data in the column will be lost.
  - Added the required column `type` to the `locais` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `locais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "locais" DROP COLUMN "cep",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT NOT NULL;
