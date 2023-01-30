import { requestError } from "@/errors";
import { createTicket, createTicketBody } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { ticketRepository } from "@/repositories/ticket-repository";
import { Ticket, TicketType } from "@prisma/client";


async function create(createTicket: createTicketBody, userId: number):Promise<Ticket> {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(!enrollment) throw requestError(404, 'User does not have enrollment');

    const ticket:createTicket = {
        ticketTypeId: createTicket.ticketTypeId,
        status: "RESERVED",
        enrollmentId : enrollment.id
    };

    return await ticketRepository.create(ticket);
}

async function getUserTickets(userId: number):Promise<Ticket> {

    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(!enrollment) throw requestError(404, 'User does not have enrollment');

    return await ticketRepository.getUserTickets(enrollment.id);
}

async function getTicketsTypes():Promise<TicketType[]> {
    
    return await ticketRepository.getTicketsTypes();
}

const ticketService = {
    create,
    getUserTickets,
    getTicketsTypes
};

export default ticketService;