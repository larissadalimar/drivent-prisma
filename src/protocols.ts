import { Payment, Ticket } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string
}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type createTicketBody = {
  ticketTypeId: number 
};

export type createTicket = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

export type createPaymentBody = {
	ticketId: number,
	cardData: {
		issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
	}
};

export type createPayment = Omit<Payment, "id" | "createdAt" | "updatedAt">;

export type getTicketPaymentQuery = {
  ticketId: string
};
