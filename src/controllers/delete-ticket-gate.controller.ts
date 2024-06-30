import { Controller, Delete, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/ticket_gates")
export class DeleteTicketGateController {
  constructor(private prisma: PrismaService) {}

  @Delete("/:id")
  async deleteGate(@Param("id") id: string) {
    const existingTicketGate = await this.prisma.ticketGate.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!existingTicketGate) {
      throw new NotFoundException("Ticket gate not found.");
    }

    await this.prisma.ticketGate.delete({
      where: {
        id: String(id),
      },
    });
  }
}
