import { requestError } from "@/errors";
import { createPayment, createPaymentBody } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import { ticketRepository } from "@/repositories/ticket-repository";
import { Payment } from "@prisma/client";

async function create(payment: createPaymentBody, userId: number): Promise<Payment> {
  const ticket = await ticketRepository.getOne(payment.ticketId);
  
  if(!ticket) throw requestError(404, "No exist ticket with this id");

  const enrollmentId = (await enrollmentRepository.findWithAddressByUserId(userId)).id;

  if(ticket.enrollmentId !== enrollmentId) throw requestError(401, "This tickets does not belong to this user");

  const insertPayment: createPayment = {
    ticketId: payment.ticketId,
    cardIssuer: payment.cardData.issuer,
    cardLastDigits: payment.cardData.number.toString().substring(payment.cardData.number.toString().length - 4),
    value: ticket.TicketType.price
  };

  const paymentCreated = await paymentRepository.create(insertPayment);

  await ticketRepository.payTicket(payment.ticketId);

  return paymentCreated;
}

async function getTicketPayment(ticketId: number, userId: number): Promise<Payment> {
  const ticket = await ticketRepository.getOne(ticketId);
  
  if(!ticket) throw requestError(404, "Ticket with this id does not exist");

  const enrollmentId = (await enrollmentRepository.findWithAddressByUserId(userId)).id;

  if(ticket.enrollmentId !== enrollmentId) throw requestError(401, "This tickets does not belong to this user");

  return await paymentRepository.getTicketPayment(ticketId);
}

const paymentService = {
  create,
  getTicketPayment
};

export default paymentService;
