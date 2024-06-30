import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const updateTicketGateBodySchema = z.object({
  name: z.string().optional(),
  localId: z.string().optional(),
});

type UpdateTicketGateBodySchema = z.infer<typeof updateTicketGateBodySchema>;

@Controller("/ticket_gates")
export class UpdateTicketGateController {
  constructor(private prisma: PrismaService) {}

  @Patch("/:id")
  async updateTicketGate(
    @Param("id") id: string,
    @Body() body: UpdateTicketGateBodySchema
  ) {
    const parsedBody = updateTicketGateBodySchema.parse(body);

    const existingTicketGate = await this.prisma.ticketGate.findUnique({
      where: {
        id: String(id),
      },
      include: {
        local: true,
      },
    });

    if (!existingTicketGate) {
      throw new NotFoundException("Ticket Gate not found.");
    }

    if (parsedBody.localId) {
      const existingLocal = await this.prisma.ticketGate.findUnique({
        where: {
          id: parsedBody.localId,
        },
      });

      if (!existingLocal) {
        throw new NotFoundException("Local not found.");
      }
    }

    await this.prisma.ticketGate.update({
      where: { id: String(id) },
      data: parsedBody,
      include: {
        local: true,
      },
    });

    const updatedTicketGate = await this.prisma.ticketGate.findUnique({
      where: {
        id: String(id),
      },
      include: {
        local: true,
      },
    });

    return updatedTicketGate;
  }
}
