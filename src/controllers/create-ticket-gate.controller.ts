import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createTicketGateBodySchema = z.object({
  name: z.string(),
  localId: z.string(),
});

type CreateTicketGateBodySchema = z.infer<typeof createTicketGateBodySchema>;

@Controller("/ticket_gates")
export class CreateTicketGateController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() body: CreateTicketGateBodySchema) {
    const { name, localId } = createTicketGateBodySchema.parse(body);

    const existingTicketGate = await this.prisma.ticketGate.findFirst({
      where: {
        name,
        localId,
      },
    });

    if (existingTicketGate) {
      throw new ConflictException(
        `TicketGate with name ${name} already exists for the specified Local.`
      );
    }

    const createdTicketGate = await this.prisma.ticketGate.create({
      data: {
        name,
        local: {
          connect: { id: localId },
        },
      },
    });

    return { ticketGate: createdTicketGate };
  }
}
