import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { GradientInkText } from '../components/home/GradientInkText';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found | Chromaflow</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex min-h-screen flex-col bg-background">
        <Header showMobileMenu={false} />

        <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
          <GradientInkText
            text="404"
            template="hologram-matrix"
            className="text-[clamp(8rem,30vw,20rem)] leading-none tracking-display"
          />

          <p className="mt-8 font-mono text-[13px] uppercase tracking-[0.15em] text-muted-foreground">
            Page Not Found — The Gradient Ends Here
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/">
              <Button>Back to Index</Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline">Browse Templates</Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
