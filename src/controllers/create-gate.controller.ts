import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createGateBodySchema = z.object({
  name: z.string(),
  localId: z.string(),
});

type CreateGateBodySchema = z.infer<typeof createGateBodySchema>;

@Controller("/gates")
export class CreateGateController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() body: CreateGateBodySchema) {
    const { name, localId } = createGateBodySchema.parse(body);

    const existingLocal = await this.prisma.local.findUnique({
      where: {
        id: localId,
      },
    });

    if (!existingLocal) {
      throw new ConflictException('Local not found.');
    }

    const createdGate = await this.prisma.gate.create({
      data: {
        name,
        local: {
          connect: { id: localId },
        },
      },
    });

    return createdGate;
  }
}
