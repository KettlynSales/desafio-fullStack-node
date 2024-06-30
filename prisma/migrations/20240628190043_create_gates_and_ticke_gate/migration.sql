/*
  Warnings:

  - You are about to drop the `Gate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TicketGate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Gate";

-- DropTable
DROP TABLE "TicketGate";

-- CreateTable
CREATE TABLE "gates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "gates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticketGates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ticketGates_pkey" PRIMARY KEY ("id")
);
