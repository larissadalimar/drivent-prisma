import { AuthenticatedRequest } from "@/middlewares";
import { createPaymentBody, getTicketPaymentQuery } from "@/protocols";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const payment = req.body as createPaymentBody;
  
  try {
    const newPayment = await paymentService.create(payment, req.userId);
    
    return res.status(200).send(newPayment);
  } catch (error) {
    if(error.status === 404) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if(error.status === 401) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      return res.status(500).send(error.message);
    }
  }
}

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const ticketIdQuery = req.query as getTicketPaymentQuery;

  try {
    const payment = await paymentService.getTicketPayment(Number(ticketIdQuery.ticketId), req.userId);
    
    return res.status(200).send(payment);
  } catch (error) {
    if(error.status === 404) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if(error.status === 401) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    } else {
      return res.status(500).send(error.message);
    }
  }
}
