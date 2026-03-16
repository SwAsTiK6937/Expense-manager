'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-white text-ink font-sans selection:bg-accent selection:text-white">
      {/* LEFT COLUMN - Hidden on Mobile */}
      <div className="hidden md:flex md:w-[45%] bg-page relative flex-col justify-between p-12 lg:p-20 overflow-hidden">
        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* Faint Watermark */}
        <div className="absolute inset-y-0 right-0 pointer-events-none select-none opacity-[0.02] font-serif text-[340px] leading-none tracking-tighter mix-blend-multiply flex items-center -mr-32">
          IN
        </div>

        <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <div className="uppercase tracking-[0.2em] text-[12px] font-bold text-ink/70 mb-6">
            Personal Finance Platform — 2025
          </div>
          <h1 className="text-[48px] lg:text-[56px] font-serif leading-[1.05] tracking-[-0.03em] mb-6">
            Expense Tracker
          </h1>
          <p className="text-[16px] leading-[1.6] text-ink/80 font-light max-w-sm">
            Every number tells a story. Start yours.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-[13px] font-medium tracking-wide text-ink/60 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <span>Track</span>
          <span className="w-full h-[1px] bg-borderLight flex-1 max-w-[24px]" />
          <span>Budget</span>
          <span className="w-full h-[1px] bg-borderLight flex-1 max-w-[24px]" />
          <span>Analyse</span>
        </div>
      </div>

      {/* RIGHT COLUMN - Form */}
      <div className="w-full md:w-[55%] bg-white relative flex flex-col p-8 sm:p-12 lg:p-20 md:shadow-[-4px_0_20px_rgba(0,0,0,0.04)] overflow-y-auto">
        {/* Custom fade gradient border */}
        <div
          className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-borderLight"
          style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
        />

        {/* Back Link */}
        <div className="w-full mb-16 md:mb-24 flex-shrink-0">
          <Link href="/" className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#8A8278] hover:text-ink transition-colors">
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>

          <div className="md:hidden mb-12">
            <span className="text-xl font-serif font-medium tracking-tight">Expense Tracker</span>
          </div>

          <h2 className="text-[36px] sm:text-[40px] font-serif text-ink tracking-[-0.02em] leading-[1.1] mb-3">
            Log in
          </h2>
          <p className="text-[15px] text-[#8A8278] leading-[1.6] mb-8">
            Access your expense tracker
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-[2px] text-sm font-medium animate-fade-in">
                {error}
              </div>
            )}

            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.28s', animationFillMode: 'both' }}>
              <label className="block text-[12px] uppercase tracking-[0.08em] text-ink font-bold mb-2 transition-all duration-200 group-focus-within:-translate-y-[1px] group-focus-within:text-accent">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                autoComplete="email"
                className="w-full h-[48px] bg-[#FAF8F3] border border-[#D8D3CB] rounded-[4px] px-4 text-[15px] text-ink placeholder:text-[#B0A898] placeholder:italic outline-none transition-all duration-200 focus:border-accent focus:bg-accent/[0.04]"
              />
            </div>

            <div className="group relative animate-fade-in-up" style={{ animationDelay: '0.36s', animationFillMode: 'both' }}>
              <label className="block text-[12px] uppercase tracking-[0.08em] text-ink font-bold mb-2 transition-all duration-200 group-focus-within:-translate-y-[1px] group-focus-within:text-accent">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="w-full h-[48px] bg-[#FAF8F3] border border-[#D8D3CB] rounded-[4px] px-4 pr-16 text-[15px] text-ink placeholder:text-[#B0A898] placeholder:italic outline-none transition-all duration-200 focus:border-accent focus:bg-accent/[0.04]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-medium text-accent hover:opacity-80 transition-opacity"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="mt-2 text-right">
                <a href="#" className="text-[12px] font-medium text-accent hover:underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-all">Forgot password?</a>
              </div>
            </div>

            <div className="pt-2 animate-fade-in-up" style={{ animationDelay: '0.44s', animationFillMode: 'both' }}>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[48px] bg-accent text-white rounded-[4px] text-[15px] font-medium tracking-wide transition-colors duration-150 hover:bg-[#133225] disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-12 mb-8 text-[14px] text-[#8A8278] animate-fade-in" style={{ animationDelay: '0.52s', animationFillMode: 'both' }}>
            Don't have an account?{' '}
            <Link href="/register" className="text-accent font-medium hover:underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-all">
              Sign up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
