export function getWhatsAppNumber(branch: string): string {
  if (branch === 'Gardenia Branch') {
    return '201144764712';
  }
  return '201515286215';
}

export function buildBookingMessage(booking: {
  name: string;
  service: string;
  branch: string;
  date: string;
  time: string;
}): string {
  return encodeURIComponent(
    `Hello Blue Physio, I just booked an appointment.\nName: ${booking.name}\nService: ${booking.service}\nBranch: ${booking.branch}\nDate: ${booking.date}\nTime: ${booking.time}\nPlease confirm.`
  );
}

export function openWhatsApp(branch: string, booking: {
  name: string;
  service: string;
  branch: string;
  date: string;
  time: string;
}): void {
  const number = getWhatsAppNumber(branch);
  const message = buildBookingMessage(booking);
  window.open(`https://wa.me/${number}?text=${message}`, '_blank');
}
