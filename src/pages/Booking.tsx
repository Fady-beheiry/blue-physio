import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { Waves, ChevronRight, ChevronLeft, Loader2, CheckCircle2, User, Phone, MessageCircle } from 'lucide-react';
import { getBookedSlots, createBooking } from '../services/bookings';
import { getSlotsForDate } from '../utils/timeSlots';
import { openWhatsApp } from '../utils/whatsapp';
import StepIndicator from '../components/booking/StepIndicator';
import ServiceSelector from '../components/booking/ServiceSelector';
import BranchSelector from '../components/booking/BranchSelector';
import BookingCalendar from '../components/booking/BookingCalendar';
import TimeSlotPicker from '../components/booking/TimeSlotPicker';
import BookingSummaryCard from '../components/booking/BookingSummaryCard';

const EG_PHONE_RE = /^(\+20|0020|0)?1[0125][0-9]{8}$/;

interface FormState {
  service: string;
  branch: string;
  date: string;
  time: string;
  name: string;
  phone: string;
}

const STEP_LABELS = ['Service', 'Branch', 'Date & Time', 'Your Info', 'Confirm'];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [maxReached, setMaxReached] = useState(1);
  const [form, setForm] = useState<FormState>({
    service: '', branch: '', date: '', time: '', name: '', phone: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Fetch slots when branch or date changes
  useEffect(() => {
    if (form.branch && form.date) {
      setLoadingSlots(true);
      setForm((f) => ({ ...f, time: '' }));
      getBookedSlots(form.branch, form.date)
        .then(setBookedSlots)
        .catch(() => setBookedSlots([]))
        .finally(() => setLoadingSlots(false));
    }
  }, [form.branch, form.date]);

  const slots = selectedDate ? getSlotsForDate(selectedDate) : [];

  const goToStep = (n: number) => {
    setStep(n);
    setMaxReached((prev) => Math.max(prev, n));
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNext = () => goToStep(step + 1);
  const handleBack = () => goToStep(step - 1);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setForm((f) => ({ ...f, date: format(date, 'yyyy-MM-dd'), time: '' }));
  };

  const canProceed = () => {
    if (step === 1) return !!form.service;
    if (step === 2) return !!form.branch;
    if (step === 3) return !!form.date && !!form.time;
    if (step === 4) {
      return (
        form.name.trim().length >= 2 &&
        EG_PHONE_RE.test(form.phone.replace(/\s/g, ''))
      );
    }
    return true;
  };

  const validateInfo = () => {
    let valid = true;
    if (!form.name.trim() || form.name.trim().length < 2) {
      setNameError('Please enter your full name');
      valid = false;
    } else setNameError('');
    if (!EG_PHONE_RE.test(form.phone.replace(/\s/g, ''))) {
      setPhoneError('Enter a valid Egyptian phone number (e.g. 01xxxxxxxxx)');
      valid = false;
    } else setPhoneError('');
    return valid;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      await createBooking({ ...form });
      setSuccess(true);
      openWhatsApp(form.branch, {
        name: form.name,
        service: form.service,
        branch: form.branch,
        date: form.date,
        time: form.time,
      });
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 bg-cyan-400 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 bg-blue-300 blur-3xl" />
        </div>
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 glass-card rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </motion.div>
          <h2 className="font-serif text-3xl font-bold text-slate-800 mb-2">You're Booked!</h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            Your appointment is confirmed. WhatsApp has opened so the clinic can confirm your slot.
          </p>
          <div className="bg-slate-50 rounded-2xl p-5 text-sm text-left space-y-2.5 mb-6">
            {[
              { label: '🩺 Service', value: form.service },
              { label: '📍 Branch', value: form.branch },
              { label: '📅 Date', value: form.date },
              { label: '⏰ Time', value: form.time },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-slate-400">{label}</span>
                <span className="font-semibold text-slate-700 text-right">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => openWhatsApp(form.branch, form as any)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </button>
            <Link
              to="/"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl text-center text-sm hover:opacity-90 transition-opacity"
            >
              Back Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const stepContent: Record<number, React.ReactNode> = {
    1: (
      <StepPanel title="Choose Your Service" subtitle="Select the type of therapy you need">
        <ServiceSelector
          selected={form.service}
          onSelect={(s) => setForm((f) => ({ ...f, service: s }))}
        />
      </StepPanel>
    ),
    2: (
      <StepPanel title="Select a Branch" subtitle="Choose your preferred clinic location">
        <BranchSelector
          selected={form.branch}
          onSelect={(b) => setForm((f) => ({ ...f, branch: b }))}
        />
      </StepPanel>
    ),
    3: (
      <StepPanel title="Pick a Date & Time" subtitle="Select when you'd like your appointment">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <BookingCalendar selected={selectedDate} onSelect={handleDateSelect} />
          </div>

          {/* Time slots */}
          <div>
            {selectedDate ? (
              <div>
                <div className="mb-4 px-1">
                  <p className="font-semibold text-slate-700 text-sm">
                    {format(selectedDate, 'EEEE, MMMM d')}
                  </p>
                  {!form.branch && (
                    <p className="text-xs text-amber-500 mt-1 font-medium">
                      ⚠️ Select a branch first to see real-time availability
                    </p>
                  )}
                </div>
                <TimeSlotPicker
                  slots={slots}
                  bookedSlots={bookedSlots}
                  selected={form.time}
                  onSelect={(t) => setForm((f) => ({ ...f, time: t }))}
                  loading={loadingSlots}
                />
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                <div className="text-5xl mb-3 opacity-30">📅</div>
                <p className="text-slate-400 font-medium">Pick a date on the calendar</p>
                <p className="text-slate-300 text-xs mt-1">Available slots will appear here</p>
              </div>
            )}
          </div>
        </div>
      </StepPanel>
    ),
    4: (
      <StepPanel title="Your Information" subtitle="Tell us a little about yourself">
        <div className="space-y-5 max-w-md">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" /> Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setNameError(''); }}
              placeholder="Enter your full name"
              autoComplete="name"
              className={`w-full px-4 py-3.5 rounded-xl border bg-white text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all ${
                nameError ? 'border-red-300 ring-2 ring-red-200' : 'border-slate-200'
              }`}
            />
            {nameError && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1.5">
                {nameError}
              </motion.p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" /> Phone Number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); setPhoneError(''); }}
              placeholder="01xxxxxxxxx"
              autoComplete="tel"
              className={`w-full px-4 py-3.5 rounded-xl border bg-white text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base transition-all ${
                phoneError ? 'border-red-300 ring-2 ring-red-200' : 'border-slate-200'
              }`}
            />
            {phoneError && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs mt-1.5">
                {phoneError}
              </motion.p>
            )}
          </div>
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-600">
            <span className="font-semibold">Note:</span> After booking, WhatsApp will open automatically so the clinic can confirm your appointment.
          </div>
        </div>
      </StepPanel>
    ),
    5: (
      <StepPanel title="Confirm Your Appointment" subtitle="Review your details before confirming">
        <div className="max-w-md space-y-4">
          {/* Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100 space-y-4">
            {[
              { icon: '🩺', label: 'Service', value: form.service },
              { icon: '📍', label: 'Branch', value: form.branch },
              { icon: '📅', label: 'Date', value: form.date ? format(parseISO(form.date), 'EEEE, MMMM d, yyyy') : '' },
              { icon: '⏰', label: 'Time', value: form.time },
              { icon: '👤', label: 'Name', value: form.name },
              { icon: '📱', label: 'Phone', value: form.phone },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-lg">{icon}</span>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
            >
              {submitError}
            </motion.div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-base"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
            {submitting ? 'Confirming...' : 'Confirm Appointment'}
          </button>
          <p className="text-xs text-slate-400 text-center">
            WhatsApp will open automatically for clinic confirmation
          </p>
        </div>
      </StepPanel>
    ),
  };

  return (
    <div className="min-h-screen bg-slate-50" ref={topRef}>
      {/* Top bar */}
      <div className="bg-hero px-6 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow">
              <Waves className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif font-bold text-lg text-white tracking-wide">
              BLUE <span className="text-cyan-300">PHYSIO</span>
            </span>
          </Link>
          <Link to="/" className="text-white/60 hover:text-white text-sm font-medium transition-colors hidden sm:block">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Hero strip */}
      <div className="bg-hero pb-8 pt-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-1.5">Book Your Appointment</h1>
            <p className="text-white/70 text-sm">Step {step} of 5 — {STEP_LABELS[step - 1]}</p>
          </div>
          {/* Step indicator */}
          <div className="max-w-xl mx-auto">
            <StepIndicator current={step} onStepClick={goToStep} maxReached={maxReached} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Step content — 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {stepContent[step]}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-600 font-semibold text-sm border border-slate-200 hover:border-slate-300 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>

                {step < 5 ? (
                  <motion.button
                    type="button"
                    onClick={() => {
                      if (step === 4 && !validateInfo()) return;
                      handleNext();
                    }}
                    disabled={!canProceed()}
                    whileTap={canProceed() ? { scale: 0.97 } : undefined}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm shadow hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Summary card — 1/3 width, sticky */}
          <div className="hidden lg:block">
            <BookingSummaryCard
              service={form.service}
              branch={form.branch}
              date={form.date}
              time={form.time}
            />
          </div>
        </div>

        {/* Mobile summary strip */}
        <AnimatePresence>
          {(form.service || form.branch || form.date || form.time) && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 lg:hidden z-30 bg-white border-t border-slate-200 shadow-2xl px-4 py-3"
            >
              <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                {form.service && (
                  <div className="flex-shrink-0 px-3 py-1.5 bg-blue-50 rounded-full text-xs font-semibold text-blue-700">
                    🩺 {form.service}
                  </div>
                )}
                {form.branch && (
                  <div className="flex-shrink-0 px-3 py-1.5 bg-purple-50 rounded-full text-xs font-semibold text-purple-700 max-w-[140px] truncate">
                    📍 {form.branch.split(' ').slice(0, 2).join(' ')}
                  </div>
                )}
                {form.date && (
                  <div className="flex-shrink-0 px-3 py-1.5 bg-teal-50 rounded-full text-xs font-semibold text-teal-700">
                    📅 {format(parseISO(form.date), 'MMM d')}
                  </div>
                )}
                {form.time && (
                  <div className="flex-shrink-0 px-3 py-1.5 bg-emerald-50 rounded-full text-xs font-semibold text-emerald-700">
                    ⏰ {form.time}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepPanel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-bold text-slate-800">{title}</h2>
        <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
