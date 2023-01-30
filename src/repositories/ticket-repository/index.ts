import prisma from "@/database/db";
import { createTicket } from "@/protocols";

async function create(createTicket: createTicket) {
  return await prisma.ticket.create({
    data: createTicket,
    include: {
      TicketType: true
    }
  });
}

async function getUserTickets(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: { enrollmentId: enrollmentId },
    include: {
      TicketType: true
    }
  });
}

async function getTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function getOne(id: number) {
  return await prisma.ticket.findFirst({
    where: { id: id },
    include: {
      TicketType: true
    }
  });
}

async function payTicket(id: number) {
  return await prisma.ticket.update({
    where: { id: id },
    data: {
      status: "PAID"
    }
  });
}

export const ticketRepository = {
  create,
  getUserTickets,
  getTicketsTypes,
  getOne,
  payTicket
};
