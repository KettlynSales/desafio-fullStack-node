import { Controller, Delete, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/locais")
export class DeleteLocalController {
  constructor(private prisma: PrismaService) {}

  @Delete(":id")
  async handle(@Param("id") id: string) {
    const local = await this.prisma.local.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!local) {
      throw new NotFoundException("Local not found.");
    }

    await this.prisma.local.delete({
      where: {
        id: String(id),
      },
    });
  }
}
