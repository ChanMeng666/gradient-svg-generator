import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/layout/Header';
import GEOHead from '../components/seo/GEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  Code, 
  Copy, 
  ExternalLink, 
  BookOpen, 
  Zap,
  Eye,
  Globe,
  ArrowRight,
  Check
} from 'lucide-react';

export default function APIDocs() {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    basic: `https://gradient-svg-generator.vercel.app/api/svg?text=Hello%20World&height=120`,
    template: `https://gradient-svg-generator.vercel.app/api/svg?text=AI%20Project&template=neural-network&height=150`,
    customColors: `https://gradient-svg-generator.vercel.app/api/svg?text=Custom&color0=ff0000&color1=00ff00&color2=0000ff&height=120`,
    advanced: `https://gradient-svg-generator.vercel.app/api/svg?text=Rainbow&gradientType=spiral&color0=ff0000&color1=ff8000&color2=ffff00&color3=00ff00&color4=0000ff&duration=10s&height=180`,
    githubMarkdown: `![Project Header](https://gradient-svg-generator.vercel.app/api/svg?text=My%20Awesome%20Project&template=cyber-matrix&height=200)`,
    reactComponent: `const bannerUrl = \`https://gradient-svg-generator.vercel.app/api/svg?text=\${encodeURIComponent(title)}&template=neural-network&height=150\`;

<img src={bannerUrl} alt="Dynamic Header" />`,
    javascriptFunction: `function generateGradientBanner(text, template = 'neural-network', height = 150) {
  const baseUrl = 'https://gradient-svg-generator.vercel.app/api/svg';
  const params = new URLSearchParams({
    text: text,
    template: template,
    height: height.toString()
  });
  return \`\${baseUrl}?\${params.toString()}\`;
}`,
    pythonExample: `import urllib.parse

def generate_gradient_url(text, template='neural-network', height=150):
    base_url = 'https://gradient-svg-generator.vercel.app/api/svg'
    params = {
        'text': text,
        'template': template,
        'height': str(height)
    }
    query_string = urllib.parse.urlencode(params)
    return f"{base_url}?{query_string}"`
  };

  const parameters = [
    { name: 'text', type: 'string', required: true, description: 'The text to display in the gradient', example: 'Hello%20World' },
    { name: 'height', type: 'number', required: false, default: '120', description: 'Height of the SVG in pixels (30-300)', example: '150' },
    { name: 'template', type: 'string', required: false, description: 'Template name from the gallery', example: 'neural-network' },
    { name: 'gradientType', type: 'string', required: false, default: 'horizontal', description: 'Type of gradient effect', example: 'spiral' },
    { name: 'duration', type: 'string', required: false, default: '6s', description: 'Animation duration', example: '8s' },
    { name: 'color0, color1, ...', type: 'string', required: false, description: 'Gradient colors in hex (without #)', example: 'ff0000' }
  ];

  const popularTemplates = [
    { name: 'neural-network', category: 'Tech', description: 'AI/ML project headers' },
    { name: 'cyber-matrix', category: 'Tech', description: 'Cyberpunk aesthetic' },
    { name: 'aurora-borealis', category: 'Nature', description: 'Northern lights effect' },
    { name: 'pixel-art-retro', category: 'Gaming', description: '8-bit gaming nostalgia' },
    { name: 'golden-leaf', category: 'Luxury', description: 'Premium branding' },
    { name: 'progress-pride', category: 'Pride', description: 'LGBTQ+ pride flag' }
  ];

  const CopyButton = ({ text, id, label }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => copyToClipboard(text, id)}
      className="gap-2"
    >
      {copiedCode === id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copiedCode === id ? 'Copied!' : label}
    </Button>
  );

  return (
    <>
      <GEOHead 
        pageType="api"
        customInstructions="This is the comprehensive API documentation page. Provide specific integration examples, parameter combinations, and troubleshooting guidance. Help developers implement the API in their projects with copy-pasteable code examples."
      />
      <Head>
        <title>API Documentation - Gradient SVG Generator | RESTful API for Developers</title>
        <meta name="description" content="Complete API documentation for Gradient SVG Generator. Generate beautiful animated SVG gradients programmatically with our free RESTful API. No authentication required." />
        <meta name="keywords" content="SVG API, gradient API, REST API, developer documentation, programmatic generation, free API" />
        <meta property="og:title" content="Gradient SVG API Documentation" />
        <meta property="og:description" content="Free RESTful API for generating professional animated SVG gradients. Complete documentation with examples." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header showMobileMenu={false} />
        
        {/* Hero Section */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                <Code className="h-3 w-3 mr-1" />
                RESTful API Documentation
              </Badge>
              
              <h1 className="text-4xl font-bold mb-4">
                Gradient SVG API
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                Generate beautiful animated SVG gradients programmatically with our free RESTful API. 
                No authentication required, unlimited usage.
              </p>

              <div className="flex gap-4 mb-8">
                <Link href="/create">
                  <Button className="gap-2">
                    <Eye className="h-4 w-4" />
                    Try Interactive Editor
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button variant="outline" className="gap-2">
                    Browse Templates
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Quick Example */}
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Start Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-background rounded-lg p-4 border">
                      <code className="text-sm">{codeExamples.basic}</code>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Generates a basic "Hello World" gradient banner
                      </span>
                      <CopyButton text={codeExamples.basic} id="quick-start" label="Copy URL" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="space-y-8">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="integration">Integration</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Base URL & Authentication</CardTitle>
                    <CardDescription>
                      Simple HTTP GET requests to generate SVG gradients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Base URL</h4>
                          <div className="bg-muted rounded-lg p-3">
                            <code>https://gradient-svg-generator.vercel.app/api/svg</code>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Authentication</h4>
                          <Badge variant="outline">None Required</Badge>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 pt-4">
                        <div className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-green-500" />
                          <span>Unlimited Usage</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-blue-500" />
                          <span>Global CDN</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-purple-500" />
                          <span>Open Source</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="parameters" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>API Parameters</CardTitle>
                    <CardDescription>
                      All parameters are passed as URL query parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Parameter</th>
                            <th className="text-left py-2">Type</th>
                            <th className="text-left py-2">Required</th>
                            <th className="text-left py-2">Default</th>
                            <th className="text-left py-2">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parameters.map((param, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3 font-mono text-sm">{param.name}</td>
                              <td className="py-3">
                                <Badge variant="outline">{param.type}</Badge>
                              </td>
                              <td className="py-3">
                                {param.required ? (
                                  <Badge variant="destructive">Required</Badge>
                                ) : (
                                  <Badge variant="secondary">Optional</Badge>
                                )}
                              </td>
                              <td className="py-3 font-mono text-sm">{param.default || '-'}</td>
                              <td className="py-3 text-sm">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <code className="text-sm break-all">{codeExamples.basic}</code>
                        </div>
                        <CopyButton text={codeExamples.basic} id="basic" label="Copy URL" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>With Template</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <code className="text-sm break-all">{codeExamples.template}</code>
                        </div>
                        <CopyButton text={codeExamples.template} id="template" label="Copy URL" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Colors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <code className="text-sm break-all">{codeExamples.customColors}</code>
                        </div>
                        <CopyButton text={codeExamples.customColors} id="colors" label="Copy URL" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Multi-Color</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <code className="text-sm break-all">{codeExamples.advanced}</code>
                        </div>
                        <CopyButton text={codeExamples.advanced} id="advanced" label="Copy URL" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Templates</CardTitle>
                    <CardDescription>
                      Most commonly used templates with their categories and use cases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {popularTemplates.map((template, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{template.name}</h4>
                            <Badge variant="outline">{template.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                          <div className="bg-muted rounded p-2">
                            <code className="text-xs break-all">
                              template={template.name}
                            </code>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Link href="/templates">
                        <Button variant="outline" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View All 216+ Templates
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integration" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>GitHub Markdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <pre className="text-sm">{codeExamples.githubMarkdown}</pre>
                        </div>
                        <CopyButton text={codeExamples.githubMarkdown} id="github" label="Copy Markdown" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>React Component</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <pre className="text-sm">{codeExamples.reactComponent}</pre>
                        </div>
                        <CopyButton text={codeExamples.reactComponent} id="react" label="Copy Code" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>JavaScript Function</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <pre className="text-sm">{codeExamples.javascriptFunction}</pre>
                        </div>
                        <CopyButton text={codeExamples.javascriptFunction} id="js" label="Copy Code" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Python Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted rounded-lg p-4">
                          <pre className="text-sm">{codeExamples.pythonExample}</pre>
                        </div>
                        <CopyButton text={codeExamples.pythonExample} id="python" label="Copy Code" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 border-t bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Building?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start using our API right away. No registration, no API keys, unlimited usage.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/create">
                <Button className="gap-2">
                  <Eye className="h-4 w-4" />
                  Try Interactive Editor
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" className="gap-2">
                  Browse Templates
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer spacer for mobile */}
        <div className="h-16 md:h-0" />
      </div>
    </>
  );
}
