-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_local_id_fkey";

-- DropForeignKey
ALTER TABLE "gates" DROP CONSTRAINT "gates_local_id_fkey";

-- DropForeignKey
ALTER TABLE "ticket_gates" DROP CONSTRAINT "ticket_gates_local_id_fkey";

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gates" ADD CONSTRAINT "gates_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_gates" ADD CONSTRAINT "ticket_gates_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
