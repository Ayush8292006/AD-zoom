import React, { useState, useEffect } from 'react';
import { Testimonial } from '../../types';
import { api } from '../../lib/storage';
import { Plus, Trash2 } from 'lucide-react';

export const TestimonialsTab: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [quote, setQuote] = useState('');
  const [clientName, setClientName] = useState('');
  const [eventType, setEventType] = useState('Royal Wedding');
  const [year, setYear] = useState('2026');
  const [location, setLocation] = useState('Udaipur');

  useEffect(() => {
    api.getTestimonials().then(setTestimonials);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote || !clientName) return;

    const newT: Testimonial = {
      id: 't-' + Date.now(),
      quote,
      client_name: clientName,
      event_type: eventType,
      year,
      location,
    };

    const updated = [newT, ...testimonials];
    setTestimonials(updated);
    await api.saveTestimonials(updated);

    setQuote('');
    setClientName('');
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    await api.saveTestimonials(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
        <div>
          <h2 className="font-display text-2xl text-ink">Client Testimonials & Words</h2>
          <p className="text-xs text-warmgrey-dark">
            Manage authentic quotes from couples and families (editorial layout, zero star gimmicks).
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
        >
          <Plus strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="p-6 bg-white border border-sand flex flex-col justify-between space-y-4 shadow-sm">
            <p className="font-display text-lg text-ink italic leading-snug">
              “{t.quote}”
            </p>

            <div className="pt-3 border-t border-sand flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink block">
                  {t.client_name}
                </span>
                <span className="text-[11px] text-warmgrey-dark">
                  {t.event_type} • {t.location} • {t.year}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                className="p-1.5 text-warmgrey hover:text-red-600 transition-colors"
              >
                <Trash2 strokeWidth={1.5} className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-offwhite border border-sand p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-sand pb-3">
              <h3 className="font-display text-xl text-ink">Add Testimonial</h3>
              <button onClick={() => setShowModal(false)} className="text-xs uppercase text-warmgrey">
                Cancel
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Couple / Client Names *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya & Kabir Mehta"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wider text-warmgrey-dark block">
                  Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Their reflections on the film and photos..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-white border border-sand px-3 py-2 text-xs text-ink outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] uppercase text-warmgrey-dark block">Event</label>
                  <input
                    type="text"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-white border border-sand px-2 py-1.5 text-xs text-ink outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-warmgrey-dark block">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-sand px-2 py-1.5 text-xs text-ink outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-warmgrey-dark block">Year</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-white border border-sand px-2 py-1.5 text-xs text-ink outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-sand text-xs uppercase tracking-wider text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black"
                >
                  Save Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

