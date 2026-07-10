import { useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GEOHead from '../components/seo/GEOHead';
import { Button } from '../components/ui/button';
import SectionHeading from '../components/common/SectionHeading';
import { GradientInkText } from '../components/home/GradientInkText';
import { HeroHeadline } from '../components/home/HeroHeadline';
import { LiveEndpointCard } from '../components/home/LiveEndpointCard';
import { getCategories, getTemplatesByCategory } from '../utils/templateUtils';
import { HERO_TEMPLATES, EDITORS_CHOICE, POPULAR_TEMPLATES } from '../features/home/homeData';

const REPO_URL = 'https://github.com/ChanMeng666/gradient-svg-generator';

interface CategoryMeta {
  id: string;
  name: string;
  icon: string;
}

interface TemplateSummary {
  name: string;
  displayName?: string;
}

interface SpecRow {
  no: string;
  label: string;
  copy: string;
}

const SPEC_ROWS: readonly SpecRow[] = [
  {
    no: '01',
    label: '340+ Templates',
    copy: 'A curated library spanning 19 categories, from aurora to hologram.',
  },
  {
    no: '02',
    label: '180+ Gradient Types',
    copy: 'Each template is a distinct animation, driven by SVG and SMIL.',
  },
  {
    no: '03',
    label: 'Live Preview',
    copy: 'The response is the preview — every URL renders the real thing.',
  },
  {
    no: '04',
    label: 'No Auth',
    copy: 'No keys, no sign-up, no rate wall. Point an <img> at it and go.',
  },
];

/** "aurora-borealis" -> "AURORA BOREALIS" */
function slugToCaps(slug: string): string {
  return slug.replace(/-/g, ' ').toUpperCase();
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Home() {
  const reduceMotion = useReducedMotion();
  const categories = useMemo<CategoryMeta[]>(() => getCategories() as CategoryMeta[], []);
  const [activeTemplate, setActiveTemplate] = useState<string>(HERO_TEMPLATES[0]);

  // whileInView props for section reveals, disabled under reduced motion.
  const revealProps = reduceMotion
    ? {}
    : ({
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-80px' },
      } as const);

  return (
    <>
      <GEOHead pageType="home" />
      <Head>
        <title>Chromaflow — Animated SVG Gradients | Free API, 340+ Templates</title>
        <meta
          name="description"
          content="Animated SVG gradient banners for READMEs and headers. 340+ templates, 180+ gradient types, a free /api/svg endpoint — no keys, no sign-up. Point an image tag at it and go."
        />
        <meta
          name="keywords"
          content="chromaflow, gradient generator, SVG creator, animated banners, GitHub headers, design tools, API, templates, free"
        />
        <meta property="og:title" content="Chromaflow — Animated SVG Gradients, Free API" />
        <meta
          property="og:description"
          content="340+ animated gradient templates and a free /api/svg endpoint. Living color for READMEs, headers, and banners — no keys, no sign-up."
        />
        <meta property="og:url" content="https://chromaflow.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chromaflow — Animated SVG Gradients, Free API" />
        <meta
          name="twitter:description"
          content="340+ animated gradient templates and a free /api/svg endpoint. No keys, no sign-up."
        />
        <link
          rel="preload"
          as="image"
          href="/api/svg?text=%20&template=aurora-borealis&height=300"
        />
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Header showMobileMenu={false} />

        {/* ---------------------------------------------------------------- Hero */}
        <section className="relative flex min-h-[85vh] items-center overflow-hidden">
          <motion.div
            className="mx-auto w-full max-w-7xl px-4 py-24"
            variants={reduceMotion ? undefined : containerVariants}
            initial={reduceMotion ? undefined : 'hidden'}
            animate={reduceMotion ? undefined : 'visible'}
          >
            <motion.p
              variants={reduceMotion ? undefined : itemVariants}
              className="font-mono text-[13px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              Animated Gradient SVG — Free API — 340+ Templates
            </motion.p>

            <motion.div variants={reduceMotion ? undefined : itemVariants} className="mt-8">
              <HeroHeadline
                lines={['LIVING', 'COLOR.']}
                templates={HERO_TEMPLATES}
                onTemplateChange={setActiveTemplate}
                className="text-[clamp(3.5rem,9vw,9.5rem)] font-normal leading-[0.95] tracking-display"
              />
            </motion.div>

            <motion.p
              variants={reduceMotion ? undefined : itemVariants}
              className="mt-8 max-w-xl text-xl text-muted-foreground md:text-2xl"
            >
              Animated SVG banners for READMEs and headers.
            </motion.p>

            <motion.div
              variants={reduceMotion ? undefined : itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link href="/create">
                <Button size="lg">Start Creating</Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline">
                  Browse Templates
                </Button>
              </Link>
            </motion.div>

            <motion.p
              variants={reduceMotion ? undefined : itemVariants}
              className="mt-12 font-mono text-[13px] text-muted-foreground"
            >
              <span className="text-foreground">◉</span> NOW RENDERING: {slugToCaps(activeTemplate)}{' '}
              — /api/svg?template={activeTemplate}
            </motion.p>
          </motion.div>
        </section>

        {/* ------------------------------------------------- 01 · The endpoint */}
        <section className="border-t border-border py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading
              counter="01"
              overline="Live Endpoint"
              title={<span className="text-4xl md:text-6xl">One URL, one gradient</span>}
            />

            <motion.div className="mt-12" variants={revealVariants} {...revealProps}>
              <LiveEndpointCard text="Hello" template="sunset-gold" height={120} />
            </motion.div>

            <div className="mt-16 border-t border-border">
              {SPEC_ROWS.map((row) => (
                <div
                  key={row.no}
                  className="flex flex-col gap-1 border-b border-border py-6 md:flex-row md:items-baseline md:gap-8"
                >
                  <span className="font-mono text-[13px] text-muted-foreground">{row.no}</span>
                  <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-foreground md:w-56">
                    {row.label}
                  </span>
                  <span className="text-muted-foreground md:flex-1">{row.copy}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------- 02 · Editor's choice (light) */}
        <section className="light-section py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading
              counter="02"
              overline="Curated"
              title={<span className="text-4xl md:text-6xl">Editor&rsquo;s choice</span>}
              action={
                <Link
                  href="/templates"
                  className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  View all →
                </Link>
              }
            />

            <motion.div
              className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              variants={reduceMotion ? undefined : containerVariants}
              initial={reduceMotion ? undefined : 'hidden'}
              whileInView={reduceMotion ? undefined : 'visible'}
              viewport={{ once: true, margin: '-80px' }}
            >
              {EDITORS_CHOICE.map((template) => (
                <motion.div
                  key={template.name}
                  variants={reduceMotion ? undefined : revealVariants}
                >
                  <Link
                    href={`/create?template=${template.name}`}
                    className="group block overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/30"
                  >
                    <img
                      src={`/api/svg?text=${template.text}&template=${template.name}&height=120`}
                      alt={template.displayName}
                      width={854}
                      height={120}
                      loading="lazy"
                      className="aspect-[854/120] h-auto w-full"
                    />
                    <div className="flex items-baseline justify-between gap-3 px-4 py-3">
                      <span className="truncate font-mono text-[11px] uppercase tracking-[0.1em] text-foreground">
                        {template.displayName}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                        {template.category}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ------------------------------------------------- 03 · Popular (dark) */}
        <section className="border-t border-border py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading
              counter="03"
              overline="Most Used"
              title={<span className="text-4xl md:text-6xl">Popular right now</span>}
            />

            <motion.div
              className="mt-12 border-t border-border"
              variants={reduceMotion ? undefined : containerVariants}
              initial={reduceMotion ? undefined : 'hidden'}
              whileInView={reduceMotion ? undefined : 'visible'}
              viewport={{ once: true, margin: '-80px' }}
            >
              {POPULAR_TEMPLATES.map((template, i) => (
                <motion.div
                  key={template.name}
                  variants={reduceMotion ? undefined : revealVariants}
                >
                  <Link
                    href={`/create?template=${template.name}`}
                    className="group flex items-center gap-4 border-b border-border py-5 transition-colors hover:bg-accent/40 md:gap-8"
                  >
                    <span className="font-mono text-[13px] text-muted-foreground">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-mono text-[15px] uppercase tracking-[0.08em] text-foreground md:text-lg">
                      {template.displayName}
                    </span>
                    <img
                      src={`/api/svg?text=%20&template=${template.name}&height=80`}
                      alt=""
                      width={854}
                      height={80}
                      loading="lazy"
                      aria-hidden
                      className="hidden h-8 w-40 rounded object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block"
                    />
                    <span className="hidden font-mono text-[13px] text-muted-foreground sm:inline">
                      {template.users} uses
                    </span>
                    <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-foreground">
                      Use →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ----------------------------------------------- 04 · The index (light) */}
        <section className="light-section py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading
              counter="04"
              overline="All Categories"
              title={<span className="text-4xl md:text-6xl">The index</span>}
            />

            <div className="mt-12 grid grid-cols-1 gap-x-12 border-t border-border md:grid-cols-2">
              {categories.map((category) => {
                const categoryTemplates = getTemplatesByCategory(category.id) as TemplateSummary[];
                const sample = categoryTemplates[0];
                return (
                  <Link
                    key={category.id}
                    href={`/templates?category=${category.id}`}
                    className="group flex items-center gap-4 border-b border-border py-5 transition-colors hover:bg-accent/50"
                  >
                    <span className="flex-1 font-mono text-[14px] uppercase tracking-[0.1em] text-foreground">
                      {category.name}{' '}
                      <span className="text-muted-foreground">({categoryTemplates.length})</span>
                    </span>
                    {sample && (
                      <img
                        src={`/api/svg?text=%20&template=${sample.name}&height=48`}
                        alt=""
                        width={854}
                        height={48}
                        loading="lazy"
                        aria-hidden
                        className="hidden h-6 w-24 rounded object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
                      />
                    )}
                    <span className="font-mono text-[13px] text-muted-foreground transition-colors group-hover:text-foreground">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- CTA (dark) */}
        <section className="border-t border-border py-40">
          <div className="mx-auto max-w-7xl px-4">
            <GradientInkText
              text="READY?"
              template="sunset-gold"
              className="text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.95] tracking-display"
            />
            <p className="mt-6 max-w-xl text-xl text-muted-foreground">
              Free to use, open source, no sign-up. Start with a template or build your own.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/create">
                <Button size="lg">Start Creating</Button>
              </Link>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  Star on GitHub
                </Button>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
