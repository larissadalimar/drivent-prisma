import prisma from "@/database/db";
import { createTicket } from "@/protocols";

async function create(createTicket: createTicket) {
    return await prisma.ticket.create({
        data: createTicket,
        include : {
            TicketType: true
        }
    });
}

async function getUserTickets(enrollmentId: number) {

    return await prisma.ticket.findFirst({
        where: { enrollmentId: enrollmentId},
        include: {
            TicketType: true
        }
    });
    
}

async function getTicketsTypes() {
    
    return await prisma.ticketType.findMany();
}


export const ticketRepository = {
    create,
    getUserTickets,
    getTicketsTypes
};