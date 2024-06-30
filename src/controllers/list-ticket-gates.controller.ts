import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/ticket_gates")
export class ListTicketGatesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async listTicketGates() {
    const ticketGates = await this.prisma.ticketGate.findMany({
      include: {
        local: true,
      },
    });
    return { ticketGates };
  }

  @Get(":id")
  async getTicketGateById(@Param("id") id: string) {
    const ticketGates = await this.prisma.ticketGate.findUnique({
      where: {
        id: String(id),
      },
      include: {
        local: true,
      },
    });

    if (!ticketGates) {
      throw new NotFoundException("Gate not found.");
    }

    return { ticketGates };
  }
}
