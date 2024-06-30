import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const updateGateBodySchema = z.object({
  name: z.string().optional(),
  localId: z.string().optional(),
});

type UpdateGateBodySchema = z.infer<typeof updateGateBodySchema>;

@Controller("/gates")
export class UpdateGateController {
  constructor(private prisma: PrismaService) {}

  @Patch("/:id")
  async updateGate(
    @Param("id") id: string,
    @Body() body: UpdateGateBodySchema
  ) {
    const parsedBody = updateGateBodySchema.parse(body);

    const existingGate = await this.prisma.gate.findUnique({
      where: {
        id: String(id),
      },
      include: {
        local: true,
      },
    });

    if (!existingGate) {
      throw new NotFoundException("Gate not found.");
    }

    if (parsedBody.localId) {
      const existingLocal = await this.prisma.gate.findUnique({
        where: {
          id: parsedBody.localId,
        },
      });

      if (!existingLocal) {
        throw new NotFoundException("Local not found.");
      }
    }

    await this.prisma.gate.update({
      where: { id: String(id) },
      data: parsedBody,
      include: {
        local: true,
      },
    });

    const updatedGate = await this.prisma.gate.findUnique({
      where: {
        id: String(id),
      },
      include: {
        local: true,
      },
    });

    return updatedGate;
  }
}
