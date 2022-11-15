export const ticketToString = ticket => `${ ticket.id } ${ ticket.subject.slice(0, 40) } ${ ticket.status?.name ?? 'kein Status' } ${ ticket.assigned_to?.full_name ?? 'nicht zugewiesen' }
${ ticket.permalink }
`;
