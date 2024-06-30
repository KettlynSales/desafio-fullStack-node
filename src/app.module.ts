import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CreateLocalController } from "./controllers/create-local.controller";
import { CreateEventController } from "./controllers/create-event.controller";
import { CreateGateController } from "./controllers/create-gate.controller";
import { ListLocaisController } from "./controllers/list-locais.controller";
import { ListEventsController } from "./controllers/list-events.controller";
import { ListGatesController } from "./controllers/list-gates.controller";
import { UpdateLocalController } from "./controllers/update-local.controller";
import { UpdateEventController } from "./controllers/update-event.controller";
import { UpdateGateController } from "./controllers/update-gate.controller";
import { DeleteLocalController } from "./controllers/delete-local.controller";
import { DeleteEventController } from "./controllers/delete-event.controller";
import { DeleteGateController } from "./controllers/delete-gate.controller";
import { CreateTicketGateController } from "./controllers/create-ticket-gate.controller";
import { ListTicketGatesController } from "./controllers/list-ticket-gates.controller";
import { UpdateTicketGateController } from "./controllers/update-ticket-gate.controller";
import { DeleteTicketGateController } from "./controllers/delete-ticket-gate.controller";


@Module({
  controllers: [
    CreateLocalController,
    CreateEventController,
    CreateGateController,
    CreateTicketGateController,
    ListLocaisController,
    ListEventsController,
    ListGatesController,
    ListTicketGatesController,
    UpdateLocalController,
    UpdateEventController,
    UpdateGateController,
    UpdateTicketGateController,
    DeleteTicketGateController,
    DeleteLocalController,
    DeleteEventController,
    DeleteGateController
  ],
  providers: [PrismaService],
})
export class AppModule {}
