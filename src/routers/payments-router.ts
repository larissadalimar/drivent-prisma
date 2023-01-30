import { createPayment, getTicketPayment } from "@/controllers/payments-controller";
import { authenticateToken, validateBody, validateQueryString } from "@/middlewares";
import { createPaymentSchema, getTicketPaymentSchema } from "@/schemas/payments-schemas";
import { Router } from "express";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", validateBody(createPaymentSchema), createPayment)
  .get("/", validateQueryString(getTicketPaymentSchema), getTicketPayment);

export { paymentsRouter };
