import { Controller, Delete, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/events")
export class DeleteEventController {
  constructor(private prisma: PrismaService) {}

  @Delete(":id")
  async handle(@Param("id") id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!event) {
      throw new NotFoundException("Event not found.");
    }

    await this.prisma.event.delete({
      where: {
        id: String(id),
      },
    });
  }
}
