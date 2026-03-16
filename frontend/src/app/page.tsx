import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function LandingPage() {
  const headingWords = "Know where every rupee goes.".split(" ");

  return (
    <div className="min-h-screen bg-page text-ink selection:bg-accent selection:text-white relative overflow-hidden">
      {/* Faint subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Background Typographic Watermark */}
      <div className="absolute top-32 -left-20 pointer-events-none select-none opacity-[0.03] font-serif text-[400px] leading-none tracking-tighter mix-blend-multiply">
        01
      </div>

      <header className="border-b border-borderLight relative z-10 bg-page/90">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-12 flex items-center justify-between h-20">
          <span className="text-xl font-serif font-medium tracking-tight">Expense Tracker</span>
          <nav className="flex items-center gap-6 font-sans">
            <Link href="/login" className="text-sm font-medium hover:text-accent transition-colors">Log in</Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-accent text-white px-6 py-2.5 rounded-[2px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 sm:px-12 pt-[120px] pb-32 grid lg:grid-cols-[55%_45%] gap-20 items-center relative z-10">
        {/* Left Column - Content */}
        <div className="flex flex-col items-start pt-10">
          <div className="uppercase tracking-[0.2em] text-[11px] font-bold text-ink/70 mb-8 animate-fade-in-up">
            Personal Finance — 2025
          </div>

          <h1 className="text-[72px] sm:text-[88px] font-serif leading-[1.05] tracking-[-0.03em] mb-8 text-ink">
            {headingWords.map((word, i) => (
              <span
                key={i}
                className="inline-block animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <p className="text-lg leading-relaxed text-ink/80 max-w-lg mb-12 font-sans animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            Spend clearly. Live freely. A precise, uncompromised system for tracking your daily habits and monthly limits.
          </p>

          <div className="flex flex-wrap items-center gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <Link
              href="/register"
              className="bg-accent text-white px-8 py-4 rounded-[2px] font-medium tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Tracking
            </Link>
            <Link
              href="/#how-it-works"
              className="group flex items-center gap-2 font-medium text-ink relative overflow-hidden"
            >
              See how it works
              <span className="block absolute left-0 bottom-0 w-full h-[1px] bg-ink transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[13px] font-medium tracking-wide uppercase text-ink/60 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <span>Daily tracking</span>
            <span className="w-1 h-1 rounded-full bg-borderLight" />
            <span>Budget limits</span>
            <span className="w-1 h-1 rounded-full bg-borderLight" />
            <span>Spending insights</span>
          </div>
        </div>

        {/* Right Column - Visual */}
        <div className="relative w-full h-full flex justify-end items-center right-0 xl:-mr-12 perspective-1000">
          <div className="w-full max-w-[540px] bg-white border border-borderLight shadow-warm p-10 animate-card-enter hover:rotate-0 transition-transform duration-500 ease-out z-10 rounded-[2px] relative origin-bottom-left">

            <div className="flex justify-between items-end mb-12 border-b border-borderLight pb-6">
              <span className="text-sm font-bold tracking-widest uppercase text-ink/50">March Overview</span>
              <span className="font-serif text-[42px] leading-none tracking-tight">₹42,850</span>
            </div>

            <div className="space-y-8">
              {/* Row 1 */}
              <div>
                <div className="flex justify-between text-sm font-medium mb-3">
                  <span>Groceries</span>
                  <span className="font-serif text-base tracking-tight">₹14,200</span>
                </div>
                <div className="w-full h-[2px] bg-surface">
                  <div className="h-full bg-accent w-[65%]" />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <div className="flex justify-between text-sm font-medium mb-3">
                  <span>Transportation</span>
                  <span className="font-serif text-base tracking-tight">₹8,450</span>
                </div>
                <div className="w-full h-[2px] bg-surface">
                  <div className="h-full bg-accent w-[40%]" />
                </div>
              </div>

              {/* Row 3 */}
              <div>
                <div className="flex justify-between text-sm font-medium mb-3">
                  <span>Dining & Coffee</span>
                  <span className="font-serif text-base tracking-tight">₹12,600</span>
                </div>
                <div className="w-full h-[2px] bg-surface">
                  <div className="h-full bg-[#B5451B] w-[85%]" />
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-borderLight flex justify-between items-center text-sm font-medium text-ink/60 hover:text-ink transition-colors cursor-pointer">
              View full statement <ArrowUpRight className="w-4 h-4" />
            </div>

          </div>

          {/* Subtle staggered decorative box behind */}
          <div className="absolute bg-surface/50 border border-borderLight w-[80%] h-[90%] -bottom-6 -right-6 -z-10 rounded-[2px] animate-fade-in" style={{ animationDelay: '0.8s' }} />
        </div>
      </main>
    </div>
  );
}
