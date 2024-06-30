import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/events")
export class ListEventsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const events = await this.prisma.event.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        date: true,
        hour: true,
        email: true,
        phone: true,

        local: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return events;
  }
  @Get("/:id")
  async getEventById(@Param("id") id: string) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: String(id),
      },
    });
    if (!event) {
      throw new NotFoundException("Event not found");
    }
    return event;
  }
}
