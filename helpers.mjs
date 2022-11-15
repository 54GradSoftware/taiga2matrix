export const ticketToBody = ticket => {
    let actionText = ''
    switch (ticket.action) {
        case 'create': {
            actionText = 'erstellt ➕'
            break;
        }
        case 'change': {
            actionText = 'geändert ⛵'
            break;
        }
        case 'delete': {
            actionText = 'gelöscht ➖'
            break;
        }
    }
    `Ticket #${ticket.data?.ref} "${ ticket.data?.subject.slice(0, 40) }" ${actionText} von ${ ticket.by?.username ?? 'Unbekannt'} 
    ${ ticket.data?.status?.name ?? 'kein Status' } 👤 ${ ticket.data?.assigned_to?.username ?? 'nicht zugewiesen' }
    ${ ticket.data?.permalink }ticket
`;

}