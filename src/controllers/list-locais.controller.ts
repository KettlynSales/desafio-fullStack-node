import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/locais")
export class ListLocaisController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const locais = await this.prisma.local.findMany({
      include: {
        events: true,
        gates: true,
        tickets: true,
      },
    });
    return locais;
  }

  @Get("/:id")
  async getLocalById(@Param("id") id: string) {
    const local = await this.prisma.local.findUnique({
      where: {
        id: String(id),
      },
      include: {
        gates: true,
        tickets: true,
      },
    });

    if (!local) {
      throw new NotFoundException("Local not found");
    }
    return local;
  }
}
