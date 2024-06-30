/*
  Warnings:

  - You are about to drop the `ticketGates` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `local_id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local_id` to the `gates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "local_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "gates" ADD COLUMN     "local_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "ticketGates";

-- CreateTable
CREATE TABLE "ticket_gates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gate_id" TEXT NOT NULL,

    CONSTRAINT "ticket_gates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gates" ADD CONSTRAINT "gates_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gates" ADD CONSTRAINT "ticket_gates_gate_id_fkey" FOREIGN KEY ("gate_id") REFERENCES "gates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
