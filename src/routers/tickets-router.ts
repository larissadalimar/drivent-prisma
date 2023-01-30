import { createTicket, getTicketsTypes, getUserTickets } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicketBodySchema } from "@/schemas";
import { Router } from "express";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createTicketBodySchema), createTicket)
  .get("/", getUserTickets)
  .get("/types", getTicketsTypes);

export { ticketRouter };
