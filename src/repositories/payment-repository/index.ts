import prisma from "@/database/db";
import { createPayment } from "@/protocols";
import { Payment } from "@prisma/client";

async function create(payment: createPayment): Promise<Payment> {
  return prisma.payment.create({
    data: payment 
  });
}

async function getTicketPayment(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId
    }
  });
}

const paymentRepository = {
  create,
  getTicketPayment
};

export default paymentRepository;
