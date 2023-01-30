import { createTicketBody } from "@/protocols";
import Joi from "joi";

export const createTicketBodySchema = Joi.object<createTicketBody>({
 ticketTypeId: Joi.number().integer().required()
});