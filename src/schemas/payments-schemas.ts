import { createPaymentBody, getTicketPaymentQuery } from "@/protocols";
import Joi from "joi";

export const createPaymentSchema = Joi.object<createPaymentBody>({
  ticketId: Joi.number().integer().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.string().min(3).max(3).required()
  }
});

export const getTicketPaymentSchema = Joi.object<getTicketPaymentQuery>({
  ticketId: Joi.number().integer().required()
});
