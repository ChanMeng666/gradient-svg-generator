import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useKeyboardShortcuts(): void {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[type="search"], input[placeholder*="Search"]',
        );
        searchInput?.focus();
      }

      if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
        event.preventDefault();
        router.push('/create');
      }

      if ((event.metaKey || event.ctrlKey) && event.key === 'h') {
        event.preventDefault();
        router.push('/');
      }

      if ((event.metaKey || event.ctrlKey) && event.key === 't') {
        event.preventDefault();
        router.push('/templates');
      }

      if (event.key === '?' && !event.shiftKey) {
        event.preventDefault();
        showKeyboardShortcutsHelp();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);
}

function showKeyboardShortcutsHelp(): void {
  const shortcuts = `
Keyboard Shortcuts:

⌘/Ctrl + K - Focus search
⌘/Ctrl + N - Create new gradient
⌘/Ctrl + H - Go to home
⌘/Ctrl + T - Browse templates
Escape - Close modals
? - Show this help
  `;
  alert(shortcuts);
}
