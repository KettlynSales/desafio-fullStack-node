import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createEventBodySchema = z.object({
  name: z.string(),
  type: z.string(),
  date: z.string(),
  hour: z.string(),
  email: z.string().email(),
  phone: z.string(),
  localId: z.string(), 
});

type CreateEventBodySchema = z.infer<typeof createEventBodySchema>;

@Controller("/events")
export class CreateEventController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() body: CreateEventBodySchema) {
    const { name, type, date, hour, email, phone, localId } =
      createEventBodySchema.parse(body);

    const eventWithSameEmail = await this.prisma.event.findUnique({
      where: {
        email,
      },
    });

    if (eventWithSameEmail) {
      throw new ConflictException(
        "Event with same e-mail address already exists."
      );
    }

    const eventWithSameDateTime = await this.prisma.event.findFirst({
      where: {
        localId,
        date,
        hour,
      },
    });

    if (eventWithSameDateTime) {
      throw new ConflictException(
        "An event is already scheduled at the same time in this location."
      );
    }
      

    const createdEvent = await this.prisma.event.create({
      data: {
        name,
        type,
        date,
        hour,
        email,
        phone,
        local: {
          connect: { id: localId },
        },
      },
    });

    return createdEvent;
  }
}
