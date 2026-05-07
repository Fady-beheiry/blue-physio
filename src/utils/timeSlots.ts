import { getDay } from 'date-fns';

export const FRIDAY_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

export const WEEKDAY_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
];

export interface SlotGroup {
  label: string;
  icon: string;
  slots: string[];
}

export function getSlotsForDate(date: Date): string[] {
  const day = getDay(date);
  return day === 5 ? FRIDAY_SLOTS : WEEKDAY_SLOTS;
}

export function groupSlots(slots: string[]): SlotGroup[] {
  const morning: string[] = [];
  const afternoon: string[] = [];
  const evening: string[] = [];

  slots.forEach((slot) => {
    const hour = parseInt(slot.split(':')[0]);
    const isPM = slot.includes('PM');
    const hour24 = isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;
    if (hour24 < 12) morning.push(slot);
    else if (hour24 < 17) afternoon.push(slot);
    else evening.push(slot);
  });

  return [
    { label: 'Morning', icon: '🌅', slots: morning },
    { label: 'Afternoon', icon: '☀️', slots: afternoon },
    { label: 'Evening', icon: '🌙', slots: evening },
  ].filter((g) => g.slots.length > 0);
}

export function isDateDisabled(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}
