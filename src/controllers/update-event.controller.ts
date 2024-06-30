import {
  Body,
  ConflictException,
  Controller,
  Param,
  Patch,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const updateEventBodySchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  date: z.string().optional(),
  hour: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  localId: z.string().optional(),
});

type UpdateEventBodySchema = z.infer<typeof updateEventBodySchema>;

@Controller("/events")
export class UpdateEventController {
  constructor(private prisma: PrismaService) {}

  @Patch("/:id")
  async handle(@Param("id") id: string, @Body() body: UpdateEventBodySchema) {
    const parsedBody = updateEventBodySchema.parse(body);

    const existingEvent = await this.prisma.event.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!existingEvent) {
      throw new NotFoundException("Event not found.");
    }

    if (parsedBody.email && parsedBody.email !== existingEvent.email) {
      const eventWithSameEmail = await this.prisma.event.findUnique({
        where: {
          email: parsedBody.email,
        },
      });

      if (eventWithSameEmail) {
        throw new ConflictException(
          "Event with same email address already exists."
        );
      }
    }

    if (parsedBody.date || parsedBody.hour || parsedBody.localId) {
      const eventWithSameDateTime = await this.prisma.event.findFirst({
        where: {
          id: {
            not: String(id),
          },
          localId: parsedBody.localId ?? existingEvent.localId,
          date: parsedBody.date ?? existingEvent.date,
          hour: parsedBody.hour ?? existingEvent.hour,
        },
      });
      if (eventWithSameDateTime) {
        throw new ConflictException(
          "An event is already scheduled at the same time in this location."
        );
      }
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id: String(id) },
      data: parsedBody,
      include: {
        local: true,
      },
    });

    return updatedEvent;
  }
}
