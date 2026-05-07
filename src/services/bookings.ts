import { supabase, Booking } from '../lib/supabase';

export async function getBookedSlots(branch: string, date: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('time')
    .eq('branch', branch)
    .eq('date', date)
    .neq('status', 'cancelled');

  if (error) throw error;
  return (data || []).map((b) => b.time);
}

export async function createBooking(booking: Booking): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert([{ ...booking, status: 'pending' }])
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error('This time slot is already booked. Please choose another.');
    }
    throw error;
  }
  return data;
}

export async function getAllBookings(filters?: {
  branch?: string;
  status?: string;
  date?: string;
}) {
  let query = supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (filters?.branch && filters.branch !== 'all') {
    query = query.eq('branch', filters.branch);
  }
  if (filters?.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }
  if (filters?.date) {
    query = query.eq('date', filters.date);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function updateBookingStatus(id: string, status: 'confirmed' | 'cancelled') {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
}
