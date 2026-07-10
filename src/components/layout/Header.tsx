import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

interface HeaderProps {
  onMenuClick?: () => void;
  showMobileMenu?: boolean;
}

const NAV_ITEMS: readonly { href: string; label: string }[] = [
  { href: '/create', label: 'Create' },
  { href: '/templates', label: 'Templates' },
  { href: '/api-docs', label: 'API' },
];

export default function Header({ onMenuClick, showMobileMenu = true }: HeaderProps) {
  const router = useRouter();
  const isCreatePage = router.pathname === '/create';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile menu button */}
        {showMobileMenu && onMenuClick && (
          <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <img src="/gradient-svg-generator.svg" alt="Chromaflow" className="h-7 w-7" />
          <span className="hidden font-mono text-[13px] uppercase tracking-[0.2em] text-foreground transition-opacity group-hover:opacity-80 sm:inline-block">
            Chromaflow
          </span>
        </Link>

        {/* Navigation */}
        <nav className="ml-8 hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-mono text-[13px] uppercase tracking-[0.08em] transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() =>
              window.open('https://github.com/ChanMeng666/gradient-svg-generator', '_blank')
            }
          >
            GitHub ↗
          </Button>

          {!isCreatePage && (
            <Button size="sm" onClick={() => router.push('/create')}>
              Start Creating
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
