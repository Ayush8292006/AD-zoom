import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { MagneticButton } from '../components/common/MagneticButton';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // If Supabase is configured, use official Supabase Auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) {
          setError(authError.message);
          setIsLoading(false);
          return;
        }
      } catch (err: any) {
        setError(err.message || 'Authentication error');
        setIsLoading(false);
        return;
      }
    }

    // Default studio demo admin authentication
    // Accepts any credentials or standard 'admin@adzoomstudio.com' / 'studio2026'
    localStorage.setItem('adz_admin_authenticated', 'true');
    localStorage.setItem('adz_admin_email', email || 'admin@adzoomstudio.com');
    onLoginSuccess();
    setIsLoading(false);
    navigate('/admin');
  };

  const handleDemoBypass = () => {
    setEmail('director@adzoomstudio.com');
    setPassword('studio2026');
    localStorage.setItem('adz_admin_authenticated', 'true');
    localStorage.setItem('adz_admin_email', 'director@adzoomstudio.com');
    onLoginSuccess();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-ink text-offwhite flex items-center justify-center p-6 film-grain select-none">
      <div className="w-full max-w-md bg-[#141414] border border-white/10 p-8 sm:p-10 shadow-2xl relative">
        <Link
          to="/"
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.2em] text-warmgrey hover:text-accent-orange transition-colors mb-6"
        >
          <ArrowLeft strokeWidth={1.25} className="w-3.5 h-3.5" />
          <span>Return to Website</span>
        </Link>

        {/* Brand Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 mx-auto rounded-full overflow-hidden border border-white/20">
            <img src="/logo.png" alt="AD Zoom Studio" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-display text-2xl uppercase tracking-wider text-offwhite">
            AD Zoom Studio CMS
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-accent-orange font-medium">
            Administrative Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-500/30 text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] text-warmgrey block">
              Admin Email
            </label>
            <div className="relative">
              <Mail strokeWidth={1.25} className="w-4 h-4 text-warmgrey absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="director@adzoomstudio.com"
                className="w-full bg-ink border border-white/15 pl-10 pr-4 py-3 text-xs text-offwhite focus:border-accent-orange outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-[0.2em] text-warmgrey block">
              Master Password
            </label>
            <div className="relative">
              <Lock strokeWidth={1.25} className="w-4 h-4 text-warmgrey absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-ink border border-white/15 pl-10 pr-4 py-3 text-xs text-offwhite focus:border-accent-orange outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-offwhite text-ink text-xs uppercase tracking-[0.2em] font-medium hover:bg-white hover:text-accent-orange transition-all flex items-center justify-center space-x-2"
          >
            <span>{isLoading ? 'Verifying...' : 'Access Dashboard'}</span>
            <ArrowRight strokeWidth={1.25} className="w-4 h-4 text-accent-orange" />
          </button>
        </form>

        {/* 1-Click Demo Login Helper */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={handleDemoBypass}
            className="text-xs uppercase tracking-[0.2em] text-accent-orange hover:underline inline-flex items-center space-x-1.5"
          >
            <ShieldCheck strokeWidth={1.25} className="w-4 h-4" />
            <span>Instant Demo Studio Login</span>
          </button>
          <p className="text-[10px] text-warmgrey mt-2">
            Works out of the box with offline persistence & Supabase sync
          </p>
        </div>
      </div>
    </div>
  );
};

