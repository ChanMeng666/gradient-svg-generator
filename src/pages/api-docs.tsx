import { useState } from 'react';
import type { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GEOHead from '../components/seo/GEOHead';
import SectionHeading from '../components/common/SectionHeading';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface ParameterSpec {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
  example: string;
}

interface PopularTemplate {
  name: string;
  category: string;
  description: string;
}

interface CopyButtonProps {
  text: string;
  id: string;
  label: string;
}

const REPO_URL = 'https://github.com/ChanMeng666/gradient-svg-generator';
const PROD_ORIGIN = 'https://gradient-svg-generator.vercel.app';
const API_WIDTH = 854;

/** Strip the production origin so the example renders live against this host. */
const toLiveSrc = (url: string) => url.replace(PROD_ORIGIN, '');

/** Pull the height query param so <img> gets explicit dimensions (no CLS). */
const heightOf = (url: string) => {
  const match = url.match(/height=(\d+)/);
  return match ? Number(match[1]) : 120;
};

/** One-time whileInView fade; collapses to a static render under reduced motion. */
function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Static hairline code surface — horizontal scroll on overflow, no wrapping. */
function CodeCard({ code, className }: { code: string; className?: string }) {
  return (
    <div className={cn('overflow-x-auto rounded-2xl border border-border bg-card p-5', className)}>
      <pre className="font-mono text-[13px] leading-relaxed text-foreground/90">{code}</pre>
    </div>
  );
}

export default function APIDocs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples: Record<string, string> = {
    basic: `${PROD_ORIGIN}/api/svg?text=Hello%20World&height=120`,
    template: `${PROD_ORIGIN}/api/svg?text=AI%20Project&template=neural-network&height=150`,
    customColors: `${PROD_ORIGIN}/api/svg?text=Custom&color0=ff0000&color1=00ff00&color2=0000ff&height=120`,
    advanced: `${PROD_ORIGIN}/api/svg?text=Rainbow&gradientType=spiral&color0=ff0000&color1=ff8000&color2=ffff00&color3=00ff00&color4=0000ff&duration=10s&height=180`,
    githubMarkdown: `![Project Header](${PROD_ORIGIN}/api/svg?text=My%20Awesome%20Project&template=cyber-matrix&height=200)`,
    reactComponent: `const bannerUrl = \`${PROD_ORIGIN}/api/svg?text=\${encodeURIComponent(title)}&template=neural-network&height=150\`;

<img src={bannerUrl} alt="Dynamic Header" />`,
    javascriptFunction: `function generateGradientBanner(text, template = 'neural-network', height = 150) {
  const baseUrl = '${PROD_ORIGIN}/api/svg';
  const params = new URLSearchParams({
    text: text,
    template: template,
    height: height.toString()
  });
  return \`\${baseUrl}?\${params.toString()}\`;
}`,
    pythonExample: `import urllib.parse

def generate_gradient_url(text, template='neural-network', height=150):
    base_url = '${PROD_ORIGIN}/api/svg'
    params = {
        'text': text,
        'template': template,
        'height': str(height)
    }
    query_string = urllib.parse.urlencode(params)
    return f"{base_url}?{query_string}"`,
  };

  const parameters: ParameterSpec[] = [
    {
      name: 'text',
      type: 'string',
      required: true,
      description: 'The text to display in the gradient.',
      example: 'Hello%20World',
    },
    {
      name: 'height',
      type: 'number',
      required: false,
      default: '120',
      description: 'Height of the SVG in pixels (30–300).',
      example: '150',
    },
    {
      name: 'template',
      type: 'string',
      required: false,
      description: 'Template name from the gallery.',
      example: 'neural-network',
    },
    {
      name: 'gradientType',
      type: 'string',
      required: false,
      default: 'horizontal',
      description: 'Type of gradient effect.',
      example: 'spiral',
    },
    {
      name: 'duration',
      type: 'string',
      required: false,
      default: '6s',
      description: 'Animation duration.',
      example: '8s',
    },
    {
      name: 'color0, color1, ...',
      type: 'string',
      required: false,
      description: 'Gradient colors in hex, without the leading hash.',
      example: 'ff0000',
    },
  ];

  const popularTemplates: PopularTemplate[] = [
    { name: 'neural-network', category: 'Tech', description: 'AI/ML project headers' },
    { name: 'cyber-matrix', category: 'Tech', description: 'Cyberpunk aesthetic' },
    { name: 'aurora-borealis', category: 'Nature', description: 'Northern lights effect' },
    { name: 'pixel-art-retro', category: 'Gaming', description: '8-bit gaming nostalgia' },
    { name: 'golden-leaf', category: 'Luxury', description: 'Premium branding' },
    { name: 'progress-pride', category: 'Pride', description: 'LGBTQ+ pride flag' },
  ];

  const quickStart: { id: string; label: string; url: string; caption: string }[] = [
    {
      id: 'basic',
      label: 'BASIC REQUEST',
      url: codeExamples.basic,
      caption: 'Text only. Every other parameter falls back to its default.',
    },
    {
      id: 'template',
      label: 'WITH A TEMPLATE',
      url: codeExamples.template,
      caption: 'Pass a template name to apply a curated color and motion set.',
    },
    {
      id: 'customColors',
      label: 'CUSTOM COLORS',
      url: codeExamples.customColors,
      caption: 'Supply your own hex stops with color0, color1, color2.',
    },
    {
      id: 'advanced',
      label: 'ADVANCED — MULTI-STOP',
      url: codeExamples.advanced,
      caption: 'Combine gradientType, five color stops, and a custom duration.',
    },
  ];

  const integrations: { value: string; label: string; id: string; code: string }[] = [
    { value: 'markdown', label: 'MARKDOWN', id: 'github', code: codeExamples.githubMarkdown },
    { value: 'react', label: 'REACT', id: 'react', code: codeExamples.reactComponent },
    { value: 'javascript', label: 'JAVASCRIPT', id: 'js', code: codeExamples.javascriptFunction },
    { value: 'python', label: 'PYTHON', id: 'python', code: codeExamples.pythonExample },
  ];

  const templateLinks = [
    { label: 'BROWSE 340+ TEMPLATES', href: '/templates' },
    { label: 'OPEN THE EDITOR', href: '/create' },
  ];

  const heroPath = '/api/svg?text=Chromaflow&template=aurora-borealis&height=120';

  const CopyButton = ({ text, id, label }: CopyButtonProps) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => copyToClipboard(text, id)}
      className="shrink-0 gap-2"
    >
      {copiedCode === id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copiedCode === id ? 'COPIED' : label}
    </Button>
  );

  return (
    <>
      <GEOHead
        pageType="api"
        customInstructions="This is the comprehensive API documentation page. Provide specific integration examples, parameter combinations, and troubleshooting guidance. Help developers implement the API in their projects with copy-pasteable code examples."
      />
      <Head>
        <title>API Documentation - Chromaflow | RESTful API for Developers</title>
        <meta
          name="description"
          content="Send a GET request, get an animated SVG gradient. Chromaflow's free REST API needs no authentication. Full parameter reference and copy-ready integration snippets."
        />
        <meta
          name="keywords"
          content="chromaflow, SVG API, gradient API, REST API, developer documentation, programmatic generation, free API"
        />
        <meta property="og:title" content="Chromaflow API Documentation" />
        <meta
          property="og:description"
          content="A free REST API for animated SVG gradients. Send a GET request, get an SVG. No keys, no auth."
        />
      </Head>

      <div className="min-h-screen bg-background">
        <Header showMobileMenu={false} />

        {/* 1 — Header band */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
            <Reveal className="max-w-3xl">
              <span className="font-mono text-[13px] uppercase tracking-[0.15em] text-muted-foreground">
                REST — NO AUTH — SVG RESPONSE
              </span>
              <h1 className="mt-6 font-normal leading-[0.95] tracking-display text-[clamp(2.75rem,7vw,6.5rem)]">
                THE API
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Send a GET request. Get an animated SVG. One endpoint, plain query parameters, no
                keys to manage.
              </p>
            </Reveal>

            <Reveal className="mt-12">
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0 flex-1 overflow-x-auto">
                    <code className="whitespace-pre font-mono text-[13px] text-foreground/90">
                      GET {heroPath}
                    </code>
                  </div>
                  <CopyButton text={heroPath} id="hero" label="COPY" />
                </div>
                <div className="h-px w-full bg-border" />
                <div className="p-5">
                  <img
                    src={heroPath}
                    width={API_WIDTH}
                    height={120}
                    className="h-auto w-full rounded-lg"
                    alt="Live API response"
                  />
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    RESPONSE — RENDERED LIVE BY THIS PAGE
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 2 — Quick start */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
            <SectionHeading
              counter="01"
              overline="QUICK START"
              title={
                <span className="text-[clamp(1.75rem,4vw,3rem)]">Four requests, four results</span>
              }
            />
            <div className="mt-14 flex flex-col gap-16">
              {quickStart.map((ex) => (
                <Reveal key={ex.id}>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-muted-foreground">
                      {ex.label}
                    </span>
                    <CopyButton text={ex.url} id={ex.id} label="COPY URL" />
                  </div>
                  <CodeCard code={ex.url} />
                  <img
                    src={toLiveSrc(ex.url)}
                    width={API_WIDTH}
                    height={heightOf(ex.url)}
                    loading="lazy"
                    className="mt-4 h-auto w-full rounded-lg"
                    alt={`Rendered output for ${ex.label.toLowerCase()}`}
                  />
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    {ex.caption}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — Parameters */}
        <section className="light-section border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
            <SectionHeading
              counter="02"
              overline="PARAMETERS"
              title={
                <span className="text-[clamp(1.75rem,4vw,3rem)]">Everything you can pass</span>
              }
            />
            <Reveal className="mt-14 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border">
                    {['NAME', 'TYPE', 'DEFAULT', 'RANGE / VALUES', 'DESCRIPTION'].map((head) => (
                      <th
                        key={head}
                        className="whitespace-nowrap px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((param) => (
                    <tr key={param.name} className="border-b border-border last:border-0">
                      <td className="whitespace-nowrap px-4 py-4 align-top">
                        <span className="font-mono text-[13px] text-foreground">{param.name}</span>
                        {param.required && (
                          <Badge variant="outline" className="ml-2 align-middle">
                            REQ
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-4 align-top font-mono text-[13px] text-muted-foreground">
                        {param.type}
                      </td>
                      <td className="px-4 py-4 align-top font-mono text-[13px] text-muted-foreground">
                        {param.default ?? '—'}
                      </td>
                      <td className="px-4 py-4 align-top font-mono text-[13px] text-muted-foreground">
                        {param.example}
                      </td>
                      <td className="px-4 py-4 align-top text-sm text-foreground/80">
                        {param.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </section>

        {/* 4 — Integrations */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
            <SectionHeading
              counter="03"
              overline="INTEGRATIONS"
              title={
                <span className="text-[clamp(1.75rem,4vw,3rem)]">Drop it into your stack</span>
              }
            />
            <Tabs defaultValue="markdown" className="mt-14">
              <TabsList className="flex-wrap">
                {integrations.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {integrations.map((item) => (
                <TabsContent key={item.value} value={item.value} className="mt-8">
                  <div className="mb-3 flex justify-end">
                    <CopyButton text={item.code} id={item.id} label="COPY CODE" />
                  </div>
                  <CodeCard code={item.code} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* 5 — Templates teaser */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-20 md:py-28">
            <SectionHeading
              counter="04"
              overline="KEEP GOING"
              title={
                <span className="text-[clamp(1.75rem,4vw,3rem)]">Pick a look, or build one</span>
              }
            />
            <div className="mt-10">
              {templateLinks.map((row) => (
                <Link
                  key={row.href}
                  href={row.href}
                  className="group flex items-center justify-between border-t border-border py-5 font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground transition-colors last:border-b hover:text-foreground"
                >
                  <span>{row.label}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 6 — CTA */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-24 text-center md:py-32">
            <Reveal>
              <h2 className="font-normal leading-[0.95] tracking-display text-[clamp(2rem,5vw,4rem)]">
                BUILD WITH COLOR.
              </h2>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/create">
                  <Button size="lg">START CREATING</Button>
                </Link>
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    VIEW ON GITHUB
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
