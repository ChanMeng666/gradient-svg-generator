import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Grid3x3, PlusCircle, Clock, Star, Code } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/templates', icon: Grid3x3, label: 'Templates' },
  { href: '/create', icon: PlusCircle, label: 'Create' },
  { href: '/api-docs', icon: Code, label: 'API' },
  { href: '/recent', icon: Clock, label: 'Recent' },
  { href: '/favorites', icon: Star, label: 'Favorites' },
];

export default function MobileNav() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-transform",
                isActive && "scale-110"
              )} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}