import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: 'default' | 'minimal';
}

export default function Layout({ children, variant = 'default' }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <header className="sticky top-0 z-30 border-b border-stone-100/60 bg-ivory/75 backdrop-blur-md">
        <div className="container-content flex h-20 items-center justify-between">
          <Link
            to="/"
            className="font-display text-[22px] tracking-tight text-ink-900"
          >
            Scent Fit
          </Link>
          <nav className="hidden items-center gap-10 text-[13px] text-taupe-500 sm:flex">
            <Link to="/#how" className="transition-colors duration-300 hover:text-ink-900">
              About
            </Link>
            <Link to="/#preview" className="transition-colors duration-300 hover:text-ink-900">
              Diagnosis
            </Link>
            <Link
              to="/quiz"
              className="rounded-full border border-ink-900/15 px-5 py-2.5 text-ink-900 transition-colors duration-300 hover:border-ink-900/40"
            >
              Begin
            </Link>
          </nav>
          <Link
            to="/quiz"
            className="rounded-full border border-ink-900/15 px-4 py-2 text-[12px] text-ink-900 sm:hidden"
          >
            Begin
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {variant === 'default' && (
        <footer className="border-t border-stone-100/60 py-14">
          <div className="container-content flex flex-col items-start gap-3 text-[12px] text-taupe-400 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-display text-base text-ink-700">Scent Fit</span>
            <span className="tracking-wide">
              © {new Date().getFullYear()} Scent Fit. A diagnosis, not a store.
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}