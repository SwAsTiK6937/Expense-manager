'use client';

import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-page text-ink selection:bg-accent selection:text-white font-sans pb-32">
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 pt-16 relative z-10 w-full animate-fade-in-up">
        
        <div className="mb-16">
          <div className="uppercase tracking-[0.2em] text-[11px] font-bold text-ink/70 mb-3">
            Administration
          </div>
          <h1 className="text-[48px] font-serif leading-[1.05] tracking-tight text-ink">
            Profile & Settings
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-borderLight shadow-warm rounded-[2px] p-8">
            <h2 className="text-[12px] font-bold tracking-widest uppercase text-ink/50 border-b border-borderLight pb-4 mb-6">
              Account Attributes
            </h2>
            <dl className="space-y-6">
              <div>
                <dt className="text-[11px] uppercase tracking-wider font-bold text-ink/40 mb-1">Name</dt>
                <dd className="text-[15px] font-medium text-ink">{user?.name || '—'}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider font-bold text-ink/40 mb-1">Email address</dt>
                <dd className="text-[15px] font-medium text-ink">{user?.email}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white border border-borderLight shadow-warm rounded-[2px] p-8">
            <h2 className="text-[12px] font-bold tracking-widest uppercase text-ink/50 border-b border-borderLight pb-4 mb-6">
              System Context
            </h2>
            <p className="text-[14px] leading-[1.7] text-ink/70">
              Cloud-Based Expense Tracker. Your data is stored securely in the cloud. 
              Password changes and export options will be made available in an upcoming editorial release.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
