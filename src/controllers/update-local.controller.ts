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

const updateLocalBodySchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  type: z.string().optional(),
  cnpj: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
  complement: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

type UpdateLocalBodySchema = z.infer<typeof updateLocalBodySchema>;

@Controller("/locais")
export class UpdateLocalController {
  constructor(private prisma: PrismaService) {}

  @Patch("/:id")
  async handle(@Param("id") id: string, @Body() body: UpdateLocalBodySchema) {
    const parsedBody = updateLocalBodySchema.parse(body);

    const existingLocal = await this.prisma.local.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!existingLocal) {
      throw new NotFoundException("Local not found.");
    }

    if (parsedBody.email && parsedBody.email !== existingLocal.email) {
      const localWithSameEmail = await this.prisma.local.findUnique({
        where: {
          email: parsedBody.email,
        },
      });

      if (localWithSameEmail) {
        throw new ConflictException(
          "Local with same email address already exists."
        );
      }
    }

    const updatedLocal = await this.prisma.local.update({
      where: { id: String(id) },
      data: parsedBody,
      include: {
        events: true,
        gates: true,
        tickets: true,
      },
    });

    return updatedLocal;
  }
}
