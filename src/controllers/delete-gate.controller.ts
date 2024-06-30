import { Controller, Delete, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/gates")
export class DeleteGateController {
  constructor(private prisma: PrismaService) {}

  @Delete("/:id")
  async deleteGate(@Param("id") id: string) {
    const existingGate = await this.prisma.gate.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!existingGate) {
      throw new NotFoundException("Gate not found.");
    }

    await this.prisma.gate.delete({
      where: {
        id: String(id),
      },
    });
  }
}
