import Link from 'next/link';
import { GradientInkText } from '../home/GradientInkText';

const REPO_URL = 'https://github.com/ChanMeng666/gradient-svg-generator';
const LICENSE_URL = `${REPO_URL}/blob/main/LICENSE`;

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const COLUMNS: readonly { heading: string; links: readonly FooterLink[] }[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Create', href: '/create' },
      { label: 'Templates', href: '/templates' },
      { label: 'API Docs', href: '/api-docs' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'GitHub Repository', href: REPO_URL, external: true },
      { label: 'MIT License', href: LICENSE_URL, external: true },
    ],
  },
  {
    heading: 'Author',
    links: [
      { label: 'Chan Meng', href: 'https://github.com/ChanMeng666', external: true },
      { label: 'chanmeng.dev@gmail.com', href: 'mailto:chanmeng.dev@gmail.com', external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mb-16 border-t border-[#27272c] bg-black text-[#f2f1ee] md:mb-0">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-12">
        {/* The brand, rendered by the product itself: live gradient wordmark */}
        <GradientInkText
          text="Chromaflow"
          template="aurora-borealis"
          height={300}
          as="span"
          className="pointer-events-none block select-none text-[clamp(3rem,10vw,8rem)] font-normal leading-none tracking-tight"
        />

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
                {column.heading}
              </span>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#27272c] pt-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40">
            © 2026 Chromaflow — MIT License
          </span>
        </div>
      </div>
    </footer>
  );
}
