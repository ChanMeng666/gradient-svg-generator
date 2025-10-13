/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Capsule-Render Inspired Shape Templates
 * Based on the shape types from capsule-render project
 * (https://github.com/kyechan99/capsule-render)
 *
 * These templates use special background shapes with animated gradients
 */

module.exports = {
  // 🌟 Blob Morphing Templates (inspired by Venom effect)
  'liquid-venom': {
    name: 'liquid-venom',
    label: 'Liquid Venom',
    colors: ['8871e5', 'b678c4'],
    gradientType: 'blobMorph',
    animationDuration: '10s',
    description: 'Organic liquid blob morphing - inspired by Venom'
  },

  'mercury-flow': {
    name: 'mercury-flow',
    label: 'Mercury Flow',
    colors: ['C0C0C0', 'A8A8A8', 'D3D3D3'],
    gradientType: 'liquidBlob',
    animationDuration: '12s',
    description: 'Multi-layer liquid blob with metallic sheen'
  },

  'organic-plasma': {
    name: 'organic-plasma',
    label: 'Organic Plasma',
    colors: ['FF6B6B', 'FFA07A', 'FF69B4'],
    gradientType: 'organicBlob',
    animationDuration: '15s',
    description: 'Radial blob with organic glow effect'
  },

  // 🌟 Layered Wave Templates (inspired by Waving effect)
  'ocean-depths': {
    name: 'ocean-depths',
    label: 'Ocean Depths',
    colors: ['0077BE', '4A90E2', '00B4D8'],
    gradientType: 'layeredWaves',
    animationDuration: '12s',
    description: 'Multi-layer ocean waves with depth'
  },

  'aurora-waves': {
    name: 'aurora-waves',
    label: 'Aurora Waves',
    colors: ['00FF87', '60EFFF', 'B967FF'],
    gradientType: 'layeredWaves',
    animationDuration: '15s',
    description: 'Northern lights wave layers'
  },

  // 🌟 Blur Motion Templates (inspired by Blur effect)
  'dreamy-sunset': {
    name: 'dreamy-sunset',
    label: 'Dreamy Sunset',
    colors: ['FF6B6B', 'FFB347', 'FFA07A'],
    gradientType: 'blurMotion',
    animationDuration: '12s',
    description: 'Soft floating circles with sunset colors'
  },

  'pastel-dream': {
    name: 'pastel-dream',
    label: 'Pastel Dream',
    colors: ['FFB6C1', 'E0BBE4', 'C3E5AE'],
    gradientType: 'dreamyCircles',
    animationDuration: '15s',
    description: 'Multiple dreamy pastel circles'
  },

  'abstract-night': {
    name: 'abstract-night',
    label: 'Abstract Night',
    colors: ['2C3E50', '34495E', '1ABC9C'],
    gradientType: 'abstractBlur',
    animationDuration: '20s',
    description: 'Minimalist abstract blur effect'
  },

  'ethereal-mist': {
    name: 'ethereal-mist',
    label: 'Ethereal Mist',
    colors: ['DDA0DD', 'E6E6FA', 'B0C4DE'],
    gradientType: 'blurMotion',
    animationDuration: '18s',
    description: 'Soft misty atmosphere with blur'
  },

  // 🌟 Combined Effects
  'morphing-ocean': {
    name: 'morphing-ocean',
    label: 'Morphing Ocean',
    colors: ['0088CC', '00BFFF', '87CEEB'],
    gradientType: 'liquidBlob',
    animationDuration: '14s',
    description: 'Ocean-themed liquid morphing'
  },

  'sunset-blob': {
    name: 'sunset-blob',
    label: 'Sunset Blob',
    colors: ['FF4500', 'FF6347', 'FFD700'],
    gradientType: 'organicBlob',
    animationDuration: '16s',
    description: 'Warm sunset colors with organic morphing'
  },

  'neon-pulse': {
    name: 'neon-pulse',
    label: 'Neon Pulse',
    colors: ['FF00FF', '00FFFF', 'FFFF00'],
    gradientType: 'blobMorph',
    animationDuration: '8s',
    description: 'Vibrant neon blob morphing'
  },

  'cosmic-waves': {
    name: 'cosmic-waves',
    label: 'Cosmic Waves',
    colors: ['4B0082', '8A2BE2', 'DA70D6'],
    gradientType: 'layeredWaves',
    animationDuration: '18s',
    description: 'Deep space wave layers'
  },

  'soft-lavender': {
    name: 'soft-lavender',
    label: 'Soft Lavender',
    colors: ['E6E6FA', 'D8BFD8', 'DDA0DD'],
    gradientType: 'dreamyCircles',
    animationDuration: '16s',
    description: 'Gentle lavender blur circles'
  },

  'fire-morph': {
    name: 'fire-morph',
    label: 'Fire Morph',
    colors: ['FF4500', 'FF6347', 'FFA500'],
    gradientType: 'liquidBlob',
    animationDuration: '10s',
    description: 'Fiery liquid morphing effect'
  },

  // 🌟 NEW: Shape Background Templates (inspired by capsule-render shape types)
  'capsule-tech': {
    name: 'capsule-tech',
    label: 'Capsule Tech',
    colors: ['00D9FF', '00B8D4', '0097A7'],
    gradientType: 'cylinder',
    animationDuration: '8s',
    description: 'Tech-themed cylinder/capsule shape'
  },

  'soft-modern': {
    name: 'soft-modern',
    label: 'Soft Modern',
    colors: ['E0BBE4', 'D5AAD6', 'C399C8'],
    gradientType: 'softRounded',
    animationDuration: '10s',
    description: 'Modern soft rounded corners'
  },

  'organic-egg': {
    name: 'organic-egg',
    label: 'Organic Egg',
    colors: ['FFF8E1', 'FFECB3', 'FFE082'],
    gradientType: 'eggShape',
    animationDuration: '12s',
    description: 'Organic egg/oval shape'
  },

  'dynamic-slice': {
    name: 'dynamic-slice',
    label: 'Dynamic Slice',
    colors: ['FF6B6B', 'FF8E53', 'FFB84D'],
    gradientType: 'sliceShape',
    animationDuration: '6s',
    description: 'Angular diagonal slice design'
  },

  'chat-bubble': {
    name: 'chat-bubble',
    label: 'Chat Bubble',
    colors: ['4CAF50', '66BB6A', '81C784'],
    gradientType: 'speechBubble',
    animationDuration: '10s',
    description: 'Speech/chat bubble with tail'
  },

  'energy-teeth': {
    name: 'energy-teeth',
    label: 'Energy Teeth',
    colors: ['9C27B0', 'BA68C8', 'CE93D8'],
    gradientType: 'sharkTeeth',
    animationDuration: '8s',
    description: 'Sharp shark teeth zigzag bottom'
  },

  'bold-rounded': {
    name: 'bold-rounded',
    label: 'Bold Rounded',
    colors: ['2196F3', '42A5F5', '64B5F6'],
    gradientType: 'largeRounded',
    animationDuration: '10s',
    description: 'Bold large rounded corners'
  },

  'cyber-capsule': {
    name: 'cyber-capsule',
    label: 'Cyber Capsule',
    colors: ['00FFFF', '00E5FF', '00B8D4'],
    gradientType: 'cylinder',
    animationDuration: '6s',
    description: 'Cyberpunk capsule design'
  },

  'golden-egg': {
    name: 'golden-egg',
    label: 'Golden Egg',
    colors: ['FFD700', 'FFC107', 'FFB300'],
    gradientType: 'eggShape',
    animationDuration: '14s',
    description: 'Luxurious golden egg shape'
  },

  'message-box': {
    name: 'message-box',
    label: 'Message Box',
    colors: ['2979FF', '448AFF', '82B1FF'],
    gradientType: 'speechBubble',
    animationDuration: '12s',
    description: 'Messenger-style bubble box'
  }
};
