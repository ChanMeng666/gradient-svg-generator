import { useState } from 'react';
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
import { HERO_TEMPLATES } from '../features/home/homeData';

const REPO_URL = 'https://github.com/ChanMeng666/gradient-svg-generator';

/** "aurora-borealis" -> "AURORA BOREALIS" */
function slugToCaps(slug: string): string {
  return slug.replace(/-/g, ' ').toUpperCase();
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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

        {/* ----------------------------------------------- Beat 1 · Poster hero */}
        <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-between px-4 py-10 md:py-14">
          <motion.div
            className="flex flex-1 flex-col justify-between"
            variants={reduceMotion ? undefined : containerVariants}
            initial={reduceMotion ? undefined : 'hidden'}
            animate={reduceMotion ? undefined : 'visible'}
          >
            {/* Top — mono overline */}
            <motion.p
              variants={reduceMotion ? undefined : itemVariants}
              className="font-mono text-[13px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              Animated Gradient SVG — Free API — 340+ Templates
            </motion.p>

            {/* Middle — the type IS the layout: full-width rotating gradient headline */}
            <motion.div
              variants={reduceMotion ? undefined : itemVariants}
              className="flex-1 flex flex-col justify-center py-8"
            >
              <HeroHeadline
                lines={['LIVING', 'COLOR.']}
                lineClassNames={[undefined, 'text-right']}
                templates={HERO_TEMPLATES}
                onTemplateChange={setActiveTemplate}
                className="text-[clamp(4rem,15vw,14.5rem)] font-normal uppercase leading-[0.92] tracking-display"
              />
            </motion.div>

            {/* Bottom — hairline baseline row: positioning left, CTAs right */}
            <div>
              <motion.div
                variants={reduceMotion ? undefined : itemVariants}
                className="flex flex-col gap-8 border-t border-border py-8 md:flex-row md:items-end md:justify-between md:gap-12"
              >
                <p className="max-w-md text-lg text-muted-foreground md:text-xl">
                  Animated SVG banners for READMEs, headers and docs. One URL — no keys, no build
                  step.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/create">
                    <Button size="lg">Start Creating</Button>
                  </Link>
                  <Link href="/templates">
                    <Button size="lg" variant="outline">
                      Browse Templates
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Very bottom — live status line synced to the rotation */}
              <motion.p
                variants={reduceMotion ? undefined : itemVariants}
                className="mt-6 font-mono text-[12px] text-muted-foreground md:text-[13px]"
              >
                <span className="text-foreground">◉</span> NOW RENDERING:{' '}
                {slugToCaps(activeTemplate)} — /api/svg?template={activeTemplate}
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* ------------------------------------------------ Beat 2 · The endpoint */}
        <section className="border-t border-border py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading
              counter="01"
              overline="Live Endpoint"
              title={<span className="text-4xl md:text-6xl">One URL, one gradient</span>}
            />

            <motion.div className="mt-12" variants={revealVariants} {...revealProps}>
              <LiveEndpointCard text="Hello" template="sunset-gold" height={120} />
            </motion.div>

            <motion.p
              className="mt-8 font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground"
              variants={revealVariants}
              {...revealProps}
            >
              340+ Templates
              <span className="mx-3 text-foreground/40">·</span>
              180+ Gradient Types
              <span className="mx-3 text-foreground/40">·</span>
              No Auth
              <span className="mx-3 text-foreground/40">·</span>
              MIT License
            </motion.p>
          </div>
        </section>

        {/* -------------------------------------------------------- Beat 3 · CTA */}
        <section className="border-t border-border py-32 md:py-40">
          <div className="mx-auto max-w-7xl px-4">
            <GradientInkText
              text="READY?"
              template="sunset-gold"
              className="text-[clamp(3.5rem,10vw,9rem)] font-normal leading-[0.95] tracking-display"
            />
            <p className="mt-6 max-w-xl text-xl text-muted-foreground">
              Free to use, open source, no sign-up. Start with a template or build your own.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/create">
                <Button size="lg">Start Creating</Button>
              </Link>
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  Star on GitHub
                </Button>
              </a>
            </div>
            <Link
              href="/templates"
              className="mt-10 inline-block font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse the full catalog →
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
