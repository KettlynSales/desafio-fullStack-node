import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const ticketGateSchema = z.object({
  name: z.string(),
  localId: z.string(),
});

const createLocalBodySchema = z.object({
  name: z.string(),
  surname: z.string(),
  type: z.string(),
  cnpj: z.string(),
  city: z.string(),
  zipCode: z.string(),
  state: z.string(),
  address: z.string(),
  complement: z.string(),
  email: z.string().email(),
  phone: z.string(),
  gates: z.array(z.string()).optional(),
  ticketGates: z.array(z.string()).optional(),
});

type CreateLocalBodySchema = z.infer<typeof createLocalBodySchema>;

@Controller("/locais")
export class CreateLocalController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() body: CreateLocalBodySchema) {
    const {
      name,
      surname,
      type,
      cnpj,
      city,
      zipCode,
      state,
      address,
      complement,
      email,
      phone,
      gates,
      ticketGates,
    } = createLocalBodySchema.parse(body);

    const localWithSameEmail = await this.prisma.local.findUnique({
      where: {
        email,
      },
    });

    if (localWithSameEmail) {
      throw new ConflictException(
        "Local with same e-mail address already exists."
      );
    }
    const createdLocal = await this.prisma.local.create({
      data: {
        name,
        surname,
        type,
        cnpj,
        city,
        zipCode,
        state,
        address,
        complement,
        email,
        phone,
        events: { create: [] },
      },
      include: {
        events: true,
      },
    });

    if (gates && gates?.length > 0) {
      const gatesToCreate = gates.map((gate) => ({
        name: gate,
        localId: createdLocal.id,
      }));
      await this.prisma.gate.createMany({
        data: gatesToCreate,
      });
    }

    if (ticketGates && ticketGates.length > 0) {
      const ticketGatesToCreate = ticketGates.map((ticketGate) => ({
        name: ticketGate,
        localId: createdLocal.id,
      }));
      await this.prisma.ticketGate.createMany({
        data: ticketGatesToCreate,
      });
    }

    return createdLocal;
  }
}
