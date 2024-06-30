/*
  Warnings:

  - You are about to drop the column `gate_id` on the `ticket_gates` table. All the data in the column will be lost.
  - Added the required column `local_id` to the `ticket_gates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket_gates" DROP CONSTRAINT "ticket_gates_gate_id_fkey";

-- AlterTable
ALTER TABLE "ticket_gates" DROP COLUMN "gate_id",
ADD COLUMN     "local_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ticket_gates" ADD CONSTRAINT "ticket_gates_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
