import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/gates")
export class ListGatesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async listGates() {
    const gates = await this.prisma.gate.findMany({
      include: {
        local: true,
      },
    });
    return { gates };
  }

  @Get(":id")
  async getGateById(@Param("id") id: string) {
    const gate = await this.prisma.gate.findUnique({
      where: {
        id: String(id),
      },
      include: {
        local: true,
      },
    });

    if (!gate) {
      throw new NotFoundException("Gate not found.");
    }

    return { gate };
  }
}
