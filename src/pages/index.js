import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Slider,
  Paper,
  Button,
  Snackbar,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';

// 导入所有模板配置
const TEMPLATES = {
  basic: [
    { 
      value: 'sunset-gold', 
      label: 'Sunset Gold',
      description: 'Warm golden gradients perfect for luxury branding',
      colors: ['ffd700', 'ffa500', 'ff8c00']
    },
    { 
      value: 'ocean-heart', 
      label: 'Ocean Heart',
      description: 'Cool blue waves for calming effects',
      colors: ['00ffff', '0000ff', '000080']
    },
    { 
      value: 'emerald-forest', 
      label: 'Emerald Forest',
      description: 'Natural green gradients for environmental themes',
      colors: ['50c878', '228b22', '006400']
    },
    { 
      value: 'violet-dream', 
      label: 'Violet Dream',
      description: 'Purple hues for creative projects',
      colors: ['9400d3', '800080', '4b0082']
    },
    { 
      value: 'blood-dawn', 
      label: 'Blood Dawn',
      description: 'Dramatic red gradients for bold statements',
      colors: ['dc143c', 'b22222', '8b0000']
    },
    { 
      value: 'aurora', 
      label: 'Aurora',
      description: 'Ethereal northern lights effect',
      colors: ['00ff7f', '00fa9a', '00ffff']
    },
    { 
      value: 'cyberpunk', 
      label: 'Cyberpunk',
      description: 'Neon effects for tech themes',
      colors: ['ff00ff', '00ffff', 'ff00ff']
    },
    { 
      value: 'neon-city', 
      label: 'Neon City',
      description: 'Vibrant urban nightlife themes',
      colors: ['ff1493', 'ff00ff', 'ff69b4']
    },
    {
      value: 'electric-beat',
      label: 'Electric Beat',
      description: 'Dynamic pulses for music and energy themes',
      colors: ['00ff00', '00ffff', '00ff00']
    }
  ],
  pride: [
    {
      value: 'progress-pride',
      label: 'Progress Pride',
      description: 'Modern inclusive pride flag',
      colors: ['ff0000', 'ff8c00', 'ffef00', '008e45', '004dff', '760089', 'ffffff', 'f5a9b8', '5bcefa', '000000', '784F17']
    },
    {
      value: 'pride-rainbow',
      label: 'Rainbow Pride',
      description: 'Traditional 6-color pride flag',
      colors: ['ff0000', 'ff8c00', 'ffef00', '008e45', '004dff', '760089']
    },
    {
      value: 'trans-pride',
      label: 'Trans Pride',
      description: 'Transgender pride flag colors',
      colors: ['5bcefa', 'f5a9b8', 'ffffff', 'f5a9b8', '5bcefa']
    },
    {
      value: 'bi-pride',
      label: 'Bi Pride',
      description: 'Bisexual pride flag colors',
      colors: ['d60270', '9b4f96', '0038a8']
    },
    {
      value: 'pan-pride',
      label: 'Pan Pride',
      description: 'Pansexual pride flag colors',
      colors: ['ff1b8d', 'ffd800', '1bb3ff']
    },
    {
      value: 'ace-pride',
      label: 'Ace Pride',
      description: 'Asexual pride flag colors',
      colors: ['000000', 'a4a4a4', 'ffffff', '810081']
    },
    {
      value: 'nonbinary-pride',
      label: 'Nonbinary Pride',
      description: 'Nonbinary pride flag colors',
      colors: ['fcf434', 'ffffff', '9c59d1', '2c2c2c']
    },
    {
      value: 'genderqueer-pride',
      label: 'Genderqueer Pride',
      description: 'Genderqueer pride flag colors',
      colors: ['b57edc', 'ffffff', '4a8123']
    },
    {
      value: 'lesbian-pride',
      label: 'Lesbian Pride',
      description: 'Modern lesbian flag colors',
      colors: ['d62900', 'ff9b55', 'ffffff', 'd461a6', 'a50062']
    },
    {
      value: 'intersex-pride',
      label: 'Intersex Pride',
      description: 'Intersex pride flag colors',
      colors: ['ffd800', '7902aa']
    },
    {
      value: 'genderfluid-pride',
      label: 'Genderfluid Pride',
      description: 'Genderfluid pride flag colors',
      colors: ['ff75a2', 'ffffff', 'be18d6', '000000', '333ebd']
    },
    {
      value: 'agender-pride',
      label: 'Agender Pride',
      description: 'Agender pride flag colors',
      colors: ['000000', 'bababa', 'ffffff', 'b8f483', 'ffffff', 'bababa', '000000']
    },
    {
      value: 'aromantic-pride',
      label: 'Aromantic Pride',
      description: 'Aromantic pride flag colors',
      colors: ['3da542', 'a7d379', 'ffffff', 'a9a9a9', '000000']
    }
  ],
  animated: [
    {
      value: 'rainbow-wave',
      label: 'Rainbow Wave',
      description: 'Flowing rainbow animation',
      colors: ['ff0000', 'ff8c00', 'ffef00', '008e45', '004dff', '760089'],
      gradientType: 'diagonal',
      animationDuration: '8s'
    },
    {
      value: 'neon-pulse',
      label: 'Neon Pulse',
      description: 'Pulsing neon effect',
      colors: ['ff00ff', '00ffff'],
      gradientType: 'circular',
      animationDuration: '4s'
    },
    {
      value: 'aurora-borealis',
      label: 'Aurora Borealis',
      description: 'Northern lights simulation',
      colors: ['00ff7f', '00fa9a', '00ffff', '87ceeb'],
      gradientType: 'vertical',
      animationDuration: '10s'
    }
  ]
};

export default function Home() {
  const [config, setConfig] = useState({
    text: 'Hello World',
    color: '000000',
    height: 120,
    template: '',
    gradientType: 'horizontal',
    animationDuration: 6
  });
  
  const [currentTab, setCurrentTab] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [markdownCode, setMarkdownCode] = useState('');
  
  useEffect(() => {
    const url = `https://gradient-svg-generator.vercel.app/?text=${encodeURIComponent(config.text)}&color=${config.color}&height=${config.height}${config.template ? `&template=${config.template}` : ''}&gradientType=${config.gradientType}&duration=${config.animationDuration}`;
    setPreviewUrl(url);
    setMarkdownCode(`![${config.text}](${url})`);
  }, [config]);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownCode);
    setShowSnackbar(true);
  };

  const handleTemplateChange = (e) => {
    const templateValue = e.target.value;
    const selectedTemplate = [...TEMPLATES.basic, ...TEMPLATES.pride, ...TEMPLATES.animated]
      .find(t => t.value === templateValue);

    if (selectedTemplate) {
      setConfig({
        ...config,
        template: templateValue,
        gradientType: selectedTemplate.gradientType || config.gradientType,
        animationDuration: selectedTemplate.animationDuration 
          ? parseInt(selectedTemplate.animationDuration) 
          : config.animationDuration
      });
    } else {
      setConfig({
        ...config,
        template: templateValue
      });
    }
  };

  return (
    <>
      <Head>
        <title>Gradient SVG Generator</title>
        <meta name="description" content="Create beautiful gradient SVGs for your GitHub README" />
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" align="center" gutterBottom>
            Gradient SVG Generator
          </Typography>
          
          <Grid container spacing={4}>
            {/* 配置面板 */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Tabs
                  value={currentTab}
                  onChange={(e, newValue) => setCurrentTab(newValue)}
                  sx={{ mb: 3 }}
                >
                  <Tab label="Basic" />
                  <Tab label="Templates" />
                  <Tab label="Advanced" />
                </Tabs>

                {currentTab === 0 && (
                  <>
                    <TextField
                      fullWidth
                      label="Text"
                      value={config.text}
                      onChange={(e) => setConfig({...config, text: e.target.value})}
                      sx={{ mb: 2 }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Color (hex)"
                      value={config.color}
                      onChange={(e) => setConfig({...config, color: e.target.value})}
                      sx={{ mb: 2 }}
                    />
                    
                    <Typography gutterBottom>Height: {config.height}px</Typography>
                    <Slider
                      value={config.height}
                      min={30}
                      max={300}
                      onChange={(e, newValue) => setConfig({...config, height: newValue})}
                      sx={{ mb: 2 }}
                    />
                  </>
                )}

                {currentTab === 1 && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>Basic Templates</Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Select
                        value={config.template}
                        onChange={handleTemplateChange}
                      >
                        <MenuItem value="">None</MenuItem>
                        <Divider />
                        {TEMPLATES.basic.map(template => (
                          <MenuItem key={template.value} value={template.value}>
                            <Box>
                              <Typography>{template.label}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {template.description}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Typography variant="subtitle2" gutterBottom>Pride Templates</Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Select
                        value={config.template}
                        onChange={handleTemplateChange}
                      >
                        <MenuItem value="">None</MenuItem>
                        <Divider />
                        {TEMPLATES.pride.map(template => (
                          <MenuItem key={template.value} value={template.value}>
                            <Box>
                              <Typography>{template.label}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {template.description}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Typography variant="subtitle2" gutterBottom>Animated Templates</Typography>
                    <FormControl fullWidth>
                      <Select
                        value={config.template}
                        onChange={handleTemplateChange}
                      >
                        <MenuItem value="">None</MenuItem>
                        <Divider />
                        {TEMPLATES.animated.map(template => (
                          <MenuItem key={template.value} value={template.value}>
                            <Box>
                              <Typography>{template.label}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {template.description}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}

                {currentTab === 2 && (
                  <>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Gradient Type</InputLabel>
                      <Select
                        value={config.gradientType}
                        onChange={(e) => setConfig({...config, gradientType: e.target.value})}
                        label="Gradient Type"
                      >
                        <MenuItem value="horizontal">Horizontal</MenuItem>
                        <MenuItem value="vertical">Vertical</MenuItem>
                        <MenuItem value="diagonal">Diagonal</MenuItem>
                        <MenuItem value="circular">Circular</MenuItem>
                      </Select>
                    </FormControl>

                    <Typography gutterBottom>
                      Animation Duration: {config.animationDuration}s
                    </Typography>
                    <Slider
                      value={config.animationDuration}
                      min={1}
                      max={10}
                      step={0.5}
                      onChange={(e, newValue) => setConfig({...config, animationDuration: newValue})}
                      sx={{ mb: 2 }}
                    />
                  </>
                )}
              </Paper>
            </Grid>
            
            {/* 预览区域 */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Preview
                </Typography>
                
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%' }} />
                </Box>
                
                <Typography variant="h6" gutterBottom>
                  Markdown Code
                </Typography>
                
                <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {markdownCode}
                  </Typography>
                </Paper>
                
                <Button
                  variant="contained"
                  onClick={handleCopy}
                  sx={{ mt: 2 }}
                >
                  Copy to Clipboard
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Copied to clipboard!"
      />
    </>
  );
} 