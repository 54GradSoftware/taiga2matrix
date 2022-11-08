export const ticketToString = ticket => `
Titel: ${ ticket.subject }
Beschreibung: ${ ticket.description }
Status: ${ ticket.status?.name ?? '- kein Status -' }
Creator: ${ ticket.owner?.full_name }
Zugewiesen an: ${ ticket.assigned_to?.full_name ?? '- nicht zugewiesen -' }
`;
