'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import clsx from 'clsx';

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push('/');
  }

  const links = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <header className="border-b border-borderLight bg-page sticky top-0 z-20 font-sans">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 flex items-center justify-between h-20">
        <Link href="/dashboard" className="text-xl font-serif font-medium tracking-tight text-ink">
          Expense Tracker
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'text-[13px] uppercase tracking-[0.1em] font-semibold transition-colors',
                pathname === href
                  ? 'text-accent'
                  : 'text-[#8A8278] hover:text-ink'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <span className="text-[13px] text-ink/60 hidden sm:inline font-medium">{user?.email}</span>
          <button 
            type="button" 
            onClick={handleLogout} 
            className="text-[13px] font-medium text-[#8A8278] hover:text-ink transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
