export const ticketToBody = ticket => {
  const actionTexts = new Map([
    ['create', 'erstellt ➕'],
    ['change', 'geändert ⛵'],
    ['delete', 'gelöscht ➖'],
  ]);
  return `Ticket #${ticket.data?.ref} "${ticket.data?.subject.slice(0, 40)}" ${actionTexts.get(ticket.action) ?? ticket.action} von ${ticket.by?.username ?? 'Unbekannt'} 
    ${ticket.data?.status?.name ?? 'kein Status'} 👤 ${ticket.data?.assigned_to?.username ?? 'nicht zugewiesen'}
    ${ticket.data?.permalink}`;
};
