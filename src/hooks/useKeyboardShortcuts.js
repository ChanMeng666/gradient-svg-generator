import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useKeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignore if user is typing in an input
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      // Cmd/Ctrl + K - Search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Cmd/Ctrl + N - New/Create
      if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
        event.preventDefault();
        router.push('/create');
      }

      // Cmd/Ctrl + H - Home
      if ((event.metaKey || event.ctrlKey) && event.key === 'h') {
        event.preventDefault();
        router.push('/');
      }

      // Cmd/Ctrl + T - Templates
      if ((event.metaKey || event.ctrlKey) && event.key === 't') {
        event.preventDefault();
        router.push('/templates');
      }

      // Escape - Close modals
      if (event.key === 'Escape') {
        // This will be handled by individual modal components
      }

      // ? - Show help (when shift is not pressed)
      if (event.key === '?' && !event.shiftKey) {
        event.preventDefault();
        // Show keyboard shortcuts help modal
        showKeyboardShortcutsHelp();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);
}

function showKeyboardShortcutsHelp() {
  // Create a simple alert for now
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