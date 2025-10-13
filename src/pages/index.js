import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import GEOHead from '../components/seo/GEOHead';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Sparkles, 
  Palette, 
  Zap, 
  Eye, 
  Download, 
  ChevronRight,
  Star,
  Code2,
  Layers
} from 'lucide-react';

export default function Home() {
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  
  // Featured templates for hero section
  const featuredTemplates = [
    { name: "hologram-matrix", displayName: "Hologram Matrix", text: "FUTURISTIC" },
    { name: "quantum-field", displayName: "Quantum Field", text: "QUANTUM" },
    { name: "neon-arcade", displayName: "Neon Arcade", text: "GAMING" },
    { name: "burning-flame", displayName: "Burning Flame", text: "FIRE" },
  ];

  // Editor's choice templates
  const editorsChoice = [
    { name: "sunset-gold", displayName: "Sunset Gold", category: "luxury", text: "PREMIUM" },
    { name: "ocean-heart", displayName: "Ocean Heart", category: "nature", text: "OCEAN" },
    { name: "crystal-prism", displayName: "Crystal Prism", category: "material", text: "CRYSTAL" },
    { name: "rainbow-wave", displayName: "Rainbow Wave", category: "pride", text: "RAINBOW" },
    { name: "cyber-scan", displayName: "Cyber Scanner", category: "tech", text: "CYBER" },
    { name: "glitch-matrix", displayName: "Glitch Matrix", category: "textEffects", text: "GLITCH" },
    { name: "liquid-morph", displayName: "Liquid Morph", category: "morphing", text: "MORPH" },
    { name: "neural-network", displayName: "Neural Network", category: "digitalLife", text: "AI" },
  ];

  // Popular templates - use actual existing templates
  const popularTemplates = [
    { name: "wave-flow", displayName: "Wave Flow", users: "2.3k" },
    { name: "aurora-borealis", displayName: "Aurora Borealis", users: "1.8k" },
    { name: "plasma-field", displayName: "Plasma Field", users: "1.5k" },
    { name: "cosmic-voyage", displayName: "Cosmic Voyage", users: "1.2k" },
    { name: "neon-pulse", displayName: "Neon Pulse", users: "980" },
    { name: "cyber-matrix", displayName: "Cyber Matrix", users: "850" },
  ];

  // Features
  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "216+ Templates",
      description: "Professional templates across 22 categories"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "50+ Effects",
      description: "Advanced animations and visual effects"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Live Preview",
      description: "Real-time updates as you customize"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "API Access",
      description: "Generate SVGs programmatically"
    }
  ];

  // Rotate featured templates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemplateIndex((prev) => (prev + 1) % featuredTemplates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <GEOHead pageType="home" />
      <Head>
        <title>Gradient SVG Generator - Create Stunning Animated Gradients | 216+ Professional Templates</title>
        <meta name="description" content="Generate beautiful animated SVG gradients with 216+ professional templates. Perfect for headers, banners, and creative projects. Free API, no registration required." />
        <meta name="keywords" content="gradient generator, SVG creator, animated banners, GitHub headers, design tools, API, templates, free" />
        <meta property="og:title" content="Gradient SVG Generator - 216+ Professional Templates" />
        <meta property="og:description" content="Create stunning animated SVG gradients with professional templates. Free API access, no registration required." />
        <meta property="og:url" content="https://gradient-svg-generator.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gradient SVG Generator - Professional Templates" />
        <meta name="twitter:description" content="216+ professional gradient templates with real-time API. Perfect for developers and designers." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header showMobileMenu={false} />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
          <div className="container mx-auto px-4 py-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                New: AI-powered gradients coming soon
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Create Stunning
                <span className="gradient-text"> Animated SVG </span>
                Gradients
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Professional gradient generator with 216+ templates and 50+ animation effects. 
                Perfect for headers, banners, and creative projects.
              </p>

              <div className="flex gap-4 justify-center mb-12">
                <Link href="/create">
                  <Button size="lg" className="gap-2">
                    <Palette className="h-5 w-5" />
                    Start Creating
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button size="lg" variant="outline" className="gap-2">
                    Browse Templates
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Live Preview */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl" />
                <Card className="overflow-hidden relative">
                  <div className="aspect-[2/1] bg-muted flex items-center justify-center">
                    <img
                      src={`/api/svg?text=${featuredTemplates[currentTemplateIndex].text}&template=${featuredTemplates[currentTemplateIndex].name}&height=200&v=2`}
                      alt={featuredTemplates[currentTemplateIndex].displayName}
                      className="w-full h-full object-contain"
                      key={`hero-${featuredTemplates[currentTemplateIndex].name}`}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                      {featuredTemplates[currentTemplateIndex].displayName}
                    </Badge>
                    <div className="flex gap-1">
                      {featuredTemplates.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full transition-all ${
                            index === currentTemplateIndex 
                              ? 'bg-primary w-4' 
                              : 'bg-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-t">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-muted-foreground">Powerful features for creating professional gradients</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Editor's Choice Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Editor's Choice</h2>
                <p className="text-muted-foreground">Hand-picked premium templates</p>
              </div>
              <Link href="/templates">
                <Button variant="outline" className="gap-2">
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {editorsChoice.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                    <div className="aspect-video bg-muted">
                      <img
                        src={`/api/svg?text=${template.text}&template=${template.name}&height=120&v=2`}
                        alt={template.displayName}
                        className="w-full h-full object-contain"
                        key={`editor-${template.name}`}
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{template.displayName}</CardTitle>
                          <CardDescription className="text-xs capitalize">{template.category}</CardDescription>
                        </div>
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Templates Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Popular This Week</h2>
                <p className="text-muted-foreground">Most used templates by the community</p>
              </div>
              <Badge variant="outline" className="gap-1">
                <Layers className="h-3 w-3" />
                Updated weekly
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTemplates.map((template, index) => (
                <Card key={template.name} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{template.displayName}</CardTitle>
                      <Badge variant="secondary">{template.users} uses</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[3/1] bg-muted rounded-md overflow-hidden">
                      <img
                        src={`/api/svg?text=PREVIEW&template=${template.name}&height=80&v=2`}
                        alt={template.displayName}
                        className="w-full h-full object-contain"
                        key={`popular-${template.name}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers and designers creating beautiful gradients.
              Free to use, no sign-up required.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/create">
                <Button size="lg" className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  Create Your Gradient
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                onClick={() => window.open('https://github.com/ChanMeng666/gradient-svg-generator', '_blank')}
              >
                <Code2 className="h-5 w-5" />
                View on GitHub
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-gradient-to-br from-muted/20 to-background py-10 mb-16 md:mb-0">
          <div className="container mx-auto px-4">
            {/* Main Project Brand Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img 
                  src="/gradient-svg-generator.svg" 
                  alt="Gradient SVG Generator" 
                  className="h-8 w-8"
                />
                <h3 className="text-xl font-bold">Gradient SVG Generator</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Professional gradient generator with 216+ templates and 50+ animation effects. 
                Create stunning animated SVG gradients for your projects.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link href="/create" className="hover:text-primary transition-colors font-medium">Create Gradient</Link>
                <Link href="/templates" className="hover:text-primary transition-colors font-medium">Browse Templates</Link>
                <Link href="/api/svg" className="hover:text-primary transition-colors font-medium">API Documentation</Link>
                <a href="https://github.com/ChanMeng666/gradient-svg-generator" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-medium">GitHub Repository</a>
              </div>
            </div>

            {/* Bottom Section with Developer Info */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-border/50">
              <div className="flex items-center gap-4">
                <div className="text-xs text-muted-foreground">
                  © 2025 Open source under MIT License
                </div>
              </div>

              {/* Developer Attribution - Minimized */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-muted-foreground">Created by</span>
                <div className="flex items-center gap-2">
                  <img 
                    src="/chan_logo.svg" 
                    alt="Chan Meng" 
                    className="h-5 w-5 bg-white/80 p-0.5 shadow-sm"
                  />
                  <div className="flex items-center gap-3">
                    <a 
                      href="https://github.com/ChanMeng666" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Chan Meng
                    </a>
                    <span className="text-muted-foreground/60">•</span>
                    <a 
                      href="mailto:chanmeng.dev@gmail.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact for custom development
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}