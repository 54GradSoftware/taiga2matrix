export const ticketToString = ticket => `
Id: ${ ticket.id }
Titel: ${ ticket.subject.slice(0, 40) }
Status: ${ ticket.status?.name ?? 'kein Status' }
Zugewiesen an: ${ ticket.assigned_to?.full_name ?? 'nicht zugewiesen' }
Link: ${ ticket.permalink }
`;
