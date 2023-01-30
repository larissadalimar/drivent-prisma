import { AuthenticatedRequest } from "@/middlewares";
import { createTicketBody } from "@/protocols";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";


export async function createTicket(req: AuthenticatedRequest, res: Response) {
    
    const ticket = req.body as createTicketBody;

    try {

        const newTicket = await ticketService.create(ticket, req.userId);
        
        return res.status(201).send(newTicket);

    } catch (error) {
        if(error.status === 404){
            return res.sendStatus(httpStatus.NOT_FOUND)
        }else {
            return res.status(500).send(error.message)
        }
    }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
    
    try {
        
        const tickets = await ticketService.getUserTickets(req.userId);

        if(!tickets) return res.sendStatus(httpStatus.NOT_FOUND);

        return res.status(200).send(tickets);

    } catch (error) {

        if(error.status === 404){
            return res.sendStatus(httpStatus.NOT_FOUND);
        }else {
            return res.status(500).send(error.message);
        }
    }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
    
    try {

        const ticketsTypes = await ticketService.getTicketsTypes();

        return res.status(200).send(ticketsTypes);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}