import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PageTransition } from '../components/common/PageTransition';
import { api } from '../lib/storage';
import { MessageCircle, Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '../components/common/MagneticButton';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  event_type: z.string().min(1, 'Please select an event type'),
  event_date: z.string().min(1, 'Please select an approximate event date'),
  location: z.string().min(2, 'Please specify the city or venue'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      event_type: 'Royal Wedding',
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    try {
      await api.addEnquiry(data);
      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error('Failed to submit enquiry', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirectUrl =
    'https://wa.me/919876543210?text=' +
    encodeURIComponent(
      'Hello AD Zoom Studio, I would like to enquire about your photography and cinema availability.'
    );

  return (
    <PageTransition>
      <main className="w-full pt-32 pb-24 text-offwhite bg-ink film-grain min-h-screen">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          {/* Header */}
          <div className="mb-14 lg:mb-20 space-y-4 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium block">
              — INITIATE A COMMISSION
            </span>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light leading-tight">
              Connect with <span className="italic">AD Zoom</span>
            </h1>
            <p className="text-warmgrey text-sm sm:text-base font-light leading-relaxed pt-2">
              Tell us about your wedding visions, celebration dates, and destinations. We respond to all formal enquiries within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-[#141414] border border-white/10 p-6 sm:p-10">
              {isSuccess ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle2 strokeWidth={1.25} className="w-16 h-16 text-accent-orange mx-auto" />
                  <h3 className="font-display text-3xl text-offwhite font-light">
                    Your Enquiry Has Been Received
                  </h3>
                  <p className="text-sm text-warmgrey max-w-md mx-auto leading-relaxed">
                    Thank you for trusting AD Zoom Studio. Our creative director will review your dates and connect with you shortly with date availability and investment details.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs uppercase tracking-[0.2em] text-accent-orange hover:underline pt-4 block mx-auto"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-warmgrey block">
                        Full Name *
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="e.g. Radhika Sharma"
                        className="w-full bg-ink border border-white/15 px-4 py-3 text-sm text-offwhite focus:border-accent-orange outline-none transition-colors"
                      />
                      {errors.name && (
                        <p className="text-xs text-accent-orange">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-warmgrey block">
                        Phone / WhatsApp *
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full bg-ink border border-white/15 px-4 py-3 text-sm text-offwhite focus:border-accent-orange outline-none transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-xs text-accent-orange">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-warmgrey block">
                        Email Address *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="name@domain.com"
                        className="w-full bg-ink border border-white/15 px-4 py-3 text-sm text-offwhite focus:border-accent-orange outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xs text-accent-orange">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Event Type */}
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-warmgrey block">
                        Event Discipline *
                      </label>
                      <select
                        {...register('event_type')}
                        className="w-full bg-ink border border-white/15 px-4 py-3 text-sm text-offwhite focus:border-accent-orange outline-none transition-colors"
                      >
                        <option value="Royal Wedding">Royal Destination Wedding</option>
                        <option value="Wedding Cinema & Photography">Complete Wedding Package</option>
                        <option value="Pre-Wedding Film">Pre-Wedding & Concept Shoot</option>
                        <option value="Cinematic Stills Only">Cinematic Photography Stills</option>
                        <option value="Other Celebration">Other Rituals / Celebrations</option>
                      </select>
                      {errors.event_type && (
                        <p className="text-xs text-accent-orange">{errors.event_type.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Event Date */}
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-warmgrey block">
                        Celebration Date(s) *
                      </label>
                      <input
                        {...register('event_date')}
                        type="date"
                        className="w-full bg-ink border border-white/15 px-4 py-3 text-sm text-offwhite focus:border-accent-orange outline-none transition-colors"
                      />
                      {errors.event_date && (
                        <p className="text-xs text-accent-orange">{errors.event_date.message}</p>
                      )}
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-warmgrey block">
                        Venue & City *
                      </label>
                      <input
                        {...register('location')}
                        type="text"
                        placeholder="e.g. Udaivilas, Udaipur"
                        className="w-full bg-ink border border-white/15 px-4 py-3 text-sm text-offwhite focus:border-accent-orange outline-none transition-colors"
                      />
                      {errors.location && (
                        <p className="text-xs text-accent-orange">{errors.location.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-warmgrey block">
                      Tell Us About Your Vision & Events *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Number of guests, events planned (Haldi, Sangeet, Phere), aesthetic preferences..."
                      className="w-full bg-ink border border-white/15 px-4 py-3 text-sm text-offwhite focus:border-accent-orange outline-none transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-accent-orange">{errors.message.message}</p>
                    )}
                  </div>

                  <MagneticButton
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full !py-4 text-xs font-semibold"
                  >
                    {isSubmitting ? 'Transmitting Enquiry...' : 'Transmit Formal Commission Request'}
                  </MagneticButton>
                </form>
              )}
            </div>

            {/* Right Column: Direct Channels, Maps, Hours */}
            <div className="lg:col-span-5 space-y-8">
              {/* Instant WhatsApp & Call Cards */}
              <div className="p-6 bg-[#141414] border border-white/10 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent-orange font-medium block">
                  — DIRECT CONCIERGE
                </span>
                <p className="text-xs text-warmgrey font-light leading-relaxed">
                  Need an immediate date availability confirmation or wish to schedule a coffee consultation?
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3.5 bg-ink border border-white/15 hover:border-accent-orange text-offwhite text-xs uppercase tracking-[0.2em] transition-all"
                  >
                    <MessageCircle strokeWidth={1.5} className="w-5 h-5 text-accent-orange" />
                    <span>Instant WhatsApp Chat</span>
                  </a>

                  <a
                    href="tel:+919876543210"
                    className="flex items-center space-x-3 p-3.5 bg-ink border border-white/15 hover:border-accent-orange text-offwhite text-xs uppercase tracking-[0.2em] transition-all"
                  >
                    <Phone strokeWidth={1.5} className="w-5 h-5 text-accent-orange" />
                    <span>Call Studio: +91 98765 43210</span>
                  </a>
                </div>
              </div>

              {/* Physical Studio Coordinates */}
              <div className="p-6 bg-[#141414] border border-white/10 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent-orange font-medium block">
                  — STUDIO HEADQUARTERS
                </span>
                <div className="space-y-3 text-xs text-warmgrey font-light">
                  <div className="flex items-start space-x-3">
                    <MapPin strokeWidth={1.25} className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
                    <span>AD Zoom Studio, Heritage Arts Enclave, MG Road, New Delhi, India</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail strokeWidth={1.25} className="w-4 h-4 text-accent-orange shrink-0" />
                    <span>contact@adzoomstudio.com</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock strokeWidth={1.25} className="w-4 h-4 text-accent-orange shrink-0 mt-0.5" />
                    <span>Monday – Saturday: 10:00 AM – 7:30 PM (IST)</span>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="border border-white/10 overflow-hidden aspect-[16/10] bg-black">
                <iframe
                  title="AD Zoom Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754728512!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-75"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};
