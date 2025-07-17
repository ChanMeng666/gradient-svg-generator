import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sparkles, Code2, Palette, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Header({ onMenuClick }) {
  const router = useRouter();
  const isCreatePage = router.pathname === '/create';
  const isHomePage = router.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl hidden sm:inline-block">
            Gradient SVG
          </span>
          <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
            Beta
          </Badge>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 ml-6 hidden md:flex">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isHomePage ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/create"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isCreatePage ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Create
          </Link>
          <Link
            href="/templates"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              router.pathname === '/templates' ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Templates
          </Link>
          <a
            href="https://gradient-svg-generator.vercel.app/api/svg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            API
          </a>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => window.open('https://github.com/yourusername/gradient-svg-generator', '_blank')}
          >
            <Code2 className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          
          {!isCreatePage && (
            <Button onClick={() => router.push('/create')}>
              <Palette className="mr-2 h-4 w-4" />
              Start Creating
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}