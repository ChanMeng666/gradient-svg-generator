import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Grid3x3, PlusCircle, Code } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

const navItems: readonly NavItem[] = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/templates', icon: Grid3x3, label: 'Templates' },
  { href: '/create', icon: PlusCircle, label: 'Create' },
  { href: '/api-docs', icon: Code, label: 'API' },
];

export default function MobileNav() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex h-full flex-1 flex-col items-center justify-center gap-1 transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {isActive && (
                <span className="absolute inset-x-4 top-0 h-0.5 bg-foreground" aria-hidden />
              )}
              <Icon className="h-5 w-5" />
              <span className="font-mono text-[10px] uppercase tracking-[0.08em]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
