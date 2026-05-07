import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LogOut, Waves, RefreshCw, Loader2, MessageCircle, Check, X,
  Calendar, Users, Clock, Filter, Search
} from 'lucide-react';
import { format } from 'date-fns';
import { getAllBookings, updateBookingStatus } from '../services/bookings';
import { openWhatsApp } from '../utils/whatsapp';
import { Booking } from '../lib/supabase';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'BluePhysio2025';

const BRANCHES = ['all', 'Madinaty Sports Club', 'Madinaty British School', 'Gardenia Branch'];
const STATUSES = ['all', 'pending', 'confirmed', 'cancelled'];

type BookingWithId = Booking & { id: string };

function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: number; icon: React.ElementType; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-sm text-slate-500">{label}</div>
      </div>
    </motion.div>
  );
}

const statusStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-100 text-red-600 border-red-200',
};

export default function Admin() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('bp_admin') === '1');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [bookings, setBookings] = useState<BookingWithId[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [filterBranch, setFilterBranch] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [search, setSearch] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const data = await getAllBookings({
        branch: filterBranch,
        status: filterStatus,
        date: filterDate || undefined,
      });
      setBookings(data as BookingWithId[]);
    } catch (e: any) {
      setFetchError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) fetchBookings();
  }, [authed, filterBranch, filterStatus, filterDate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('bp_admin', '1');
      setAuthed(true);
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
    setLoginLoading(false);
  };

  const handleStatusUpdate = async (id: string, status: 'confirmed' | 'cancelled') => {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch {
      alert('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.phone.includes(q) ||
      b.service.toLowerCase().includes(q)
    );
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center px-6">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 bg-cyan-400 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 bg-blue-300 blur-3xl" />
        </div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 glass-card rounded-3xl p-10 w-full max-w-sm shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Waves className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-slate-800">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Blue Physio Clinic</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                autoFocus
              />
              {loginError && <p className="text-red-500 text-xs mt-1.5">{loginError}</p>}
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0c2d6b 0%, #1a56b8 100%)' }} className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-serif font-bold text-white text-lg leading-none">Blue Physio</div>
              <div className="text-cyan-300 text-xs">Admin Dashboard</div>
            </div>
          </div>
          <button
            onClick={() => { localStorage.removeItem('bp_admin'); setAuthed(false); }}
            className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Bookings" value={stats.total} icon={Users} color="bg-blue-500" />
          <StatCard label="Pending" value={stats.pending} icon={Clock} color="bg-amber-500" />
          <StatCard label="Confirmed" value={stats.confirmed} icon={Check} color="bg-emerald-500" />
          <StatCard label="Cancelled" value={stats.cancelled} icon={X} color="bg-red-500" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </div>

            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {BRANCHES.map((b) => <option key={b} value={b}>{b === 'all' ? 'All Branches' : b}</option>)}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>

            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              onClick={fetchBookings}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          )}
          {!loading && fetchError && (
            <div className="text-center py-16 text-red-500">{fetchError}</div>
          )}
          {!loading && !fetchError && filteredBookings.length === 0 && (
            <div className="text-center py-20">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">No bookings found</p>
              <p className="text-slate-300 text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}
          {!loading && !fetchError && filteredBookings.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Name', 'Phone', 'Service', 'Branch', 'Date', 'Time', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredBookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-slate-800 whitespace-nowrap">{booking.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{booking.phone}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{booking.service}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap max-w-[140px] truncate">{booking.branch}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{booking.date}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{booking.time}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyles[booking.status || 'pending']}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openWhatsApp(booking.branch, {
                              name: booking.name,
                              service: booking.service,
                              branch: booking.branch,
                              date: booking.date,
                              time: booking.time,
                            })}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          {booking.status !== 'confirmed' && (
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              disabled={updatingId === booking.id}
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors disabled:opacity-50"
                              title="Confirm"
                            >
                              {updatingId === booking.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                            </button>
                          )}
                          {booking.status !== 'cancelled' && (
                            <button
                              onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              disabled={updatingId === booking.id}
                              className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                              title="Cancel"
                            >
                              {updatingId === booking.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
