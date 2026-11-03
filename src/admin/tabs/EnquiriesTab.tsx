import React, { useState, useEffect } from 'react';
import { Enquiry } from '../../types';
import { api, exportEnquiriesCSV } from '../../lib/storage';
import { Download, Mail, Phone, Calendar, MapPin, CheckCircle, Trash2 } from 'lucide-react';

export const EnquiriesTab: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

  useEffect(() => {
    api.getEnquiries().then(setEnquiries);
  }, []);

  const handleStatusChange = async (id: string, status: 'unread' | 'read' | 'replied') => {
    await api.updateEnquiryStatus(id, status);
    const updated = enquiries.map((e) => (e.id === id ? { ...e, status } : e));
    setEnquiries(updated);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this client enquiry?')) return;
    await api.deleteEnquiry(id);
    setEnquiries(enquiries.filter((e) => e.id !== id));
  };

  const filtered = enquiries.filter((e) => (filter === 'all' ? true : e.status === filter));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sand">
        <div>
          <h2 className="font-display text-2xl text-ink">Client Inquiries Inbox</h2>
          <p className="text-xs text-warmgrey-dark">
            Direct commissions requested from the website with full event dates, contacts, and notes.
          </p>
        </div>

        <button
          onClick={() => exportEnquiriesCSV(enquiries)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-ink text-offwhite text-xs uppercase tracking-wider font-medium hover:bg-black transition-colors"
        >
          <Download strokeWidth={1.5} className="w-4 h-4 text-accent-orange" />
          <span>Export Inquiries CSV</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 text-xs uppercase tracking-wider">
        {(['all', 'unread', 'read', 'replied'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 border transition-all ${
              filter === status
                ? 'bg-ink text-offwhite border-ink font-medium'
                : 'bg-white text-warmgrey-dark border-sand hover:border-ink'
            }`}
          >
            {status} ({enquiries.filter((e) => (status === 'all' ? true : e.status === status)).length})
          </button>
        ))}
      </div>

      {/* Enquiries List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white border border-sand text-xs text-warmgrey">
            No inquiries match this filter.
          </div>
        ) : (
          filtered.map((enq) => (
            <div
              key={enq.id}
              className={`p-6 bg-white border transition-all shadow-sm space-y-4 ${
                enq.status === 'unread' ? 'border-accent-orange bg-beige/10' : 'border-sand'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand/70 pb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-display text-xl text-ink font-medium">{enq.name}</h4>
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase tracking-widest font-semibold rounded-none ${
                      enq.status === 'unread'
                        ? 'bg-accent-orange text-white'
                        : enq.status === 'replied'
                        ? 'bg-green-700 text-white'
                        : 'bg-sand text-ink'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>

                <span className="text-[11px] text-warmgrey-dark font-mono">
                  Received: {new Date(enq.created_at).toLocaleString()}
                </span>
              </div>

              {/* Contact meta strip */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-warmgrey-dark">
                <div className="flex items-center space-x-2">
                  <Phone strokeWidth={1.25} className="w-3.5 h-3.5 text-accent-orange" />
                  <a href={`tel:${enq.phone}`} className="hover:text-ink font-medium">
                    {enq.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail strokeWidth={1.25} className="w-3.5 h-3.5 text-accent-orange" />
                  <a href={`mailto:${enq.email}`} className="hover:text-ink">
                    {enq.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar strokeWidth={1.25} className="w-3.5 h-3.5 text-accent-orange" />
                  <span>{enq.event_date} ({enq.event_type})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin strokeWidth={1.25} className="w-3.5 h-3.5 text-accent-orange" />
                  <span>{enq.location}</span>
                </div>
              </div>

              {/* Message body */}
              <div className="p-4 bg-offwhite border border-sand text-xs text-ink font-light leading-relaxed">
                {enq.message}
              </div>

              {/* Status Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase text-warmgrey-dark tracking-wider">
                    Status:
                  </span>
                  <select
                    value={enq.status}
                    onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
                    className="bg-white border border-sand px-2 py-1 text-xs text-ink outline-none"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Mark as Read</option>
                    <option value="replied">Replied to Client</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(enq.id)}
                  className="p-1.5 text-warmgrey hover:text-red-600 transition-colors"
                  title="Delete inquiry"
                >
                  <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

