/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 */

// 借鉴自 capsule-render 项目的颜色配置系统

// 预设调色板 - 单色系
const SOLID_PALETTES = [
  { idx: 0, color: 'A3DCBE', text: '363636', textBg: 'f7f5f5', name: 'Mint Fresh' },
  { idx: 1, color: 'E3A6AE', text: '363636', textBg: 'f7f5f5', name: 'Rose Blush' },
  { idx: 2, color: 'FD866E', text: 'f7f5f5', textBg: '282829', name: 'Coral Warm' },
  { idx: 3, color: 'F8E2CF', text: '363636', textBg: 'f7f5f5', name: 'Cream Soft' },
  { idx: 4, color: '6FC7E1', text: '363636', textBg: 'f7f5f5', name: 'Sky Blue' },
  { idx: 5, color: 'FFA883', text: '363636', textBg: 'f7f5f5', name: 'Peach Glow' },
  { idx: 6, color: 'CDE4AD', text: '363636', textBg: 'f7f5f5', name: 'Sage Green' },
  { idx: 7, color: '97DBAE', text: '363636', textBg: 'f7f5f5', name: 'Seafoam' },
  { idx: 8, color: '7BD1D2', text: '363636', textBg: 'f7f5f5', name: 'Turquoise' },
  { idx: 9, color: '75BDE0', text: '363636', textBg: 'f7f5f5', name: 'Ocean Blue' },
  { idx: 10, color: 'C3E5AE', text: 'f7f5f5', textBg: '363636', name: 'Lime Fresh' },
  { idx: 11, color: 'F1E1A6', text: 'f7f5f5', textBg: '363636', name: 'Butter Yellow' }
];

// 预设渐变配置 - 多色系
const GRADIENT_PALETTES = [
  {
    idx: 0,
    colors: { '0': 'F8B195', '50': 'F67280', '100': 'C06C84' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Sunset Rose'
  },
  {
    idx: 1,
    colors: { '0': 'feac5e', '50': 'c779d0', '100': '4bc0c8' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Tropical Blend'
  },
  {
    idx: 2,
    colors: { '0': '43cea2', '100': '185a9d' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Ocean Deep'
  },
  {
    idx: 3,
    colors: { '0': 'c2e59c', '100': '64b3f4' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Spring Sky'
  },
  {
    idx: 4,
    colors: { '0': '00C9FF', '100': '92FE9D' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Aqua Fresh'
  },
  {
    idx: 5,
    colors: { '0': 'e53935', '100': 'e35d5b' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Fire Red'
  },
  {
    idx: 6,
    colors: { '0': 'fc00ff', '100': '00dbde' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Electric Cyan'
  },
  {
    idx: 7,
    colors: { '0': 'ff6a00', '100': 'f720db' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Neon Burst'
  },
  {
    idx: 8,
    colors: { '0': '004FF9', '100': 'FFF94C' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Electric Storm'
  },
  {
    idx: 9,
    colors: { '0': '7b4397', '100': 'dc2430' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Royal Purple'
  },
  {
    idx: 10,
    colors: { '0': '833ab4', '50': 'fd1d1d', '100': 'fcb045' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Instagram Classic'
  },
  {
    idx: 11,
    colors: { '0': 'D38312', '100': 'A83279' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Golden Magenta'
  },
  {
    idx: 12,
    colors: { '0': '00c6ff', '100': '0072ff' },
    text: 'f7f5f5',
    textBg: '282829',
    name: 'Blue Gradient'
  }
];

// 主题色彩搭配
const THEME_PALETTES = {
  'radical': {
    background: '141321',
    title: 'fe428e',
    text: 'f8f8f2',
    icon: 'a9fef7',
    border: 'fe428e'
  },
  'dark': {
    background: '0d1117',
    title: 'fff',
    text: 'c9d1d9',
    icon: '79c0ff',
    border: '30363d'
  },
  'github': {
    background: 'ffffff',
    title: '2f80ed',
    text: '333',
    icon: '4c71f2',
    border: 'e4e2e2'
  },
  'tokyonight': {
    background: '1a1b27',
    title: '70a5fd',
    text: 'a9b1d6',
    icon: 'bb9af7',
    border: '565f89'
  },
  'dracula': {
    background: '282a36',
    title: 'ff6bcb',
    text: 'f8f8f2',
    icon: '8be9fd',
    border: '6272a4'
  }
};

// 随机颜色生成函数
function getRandomSolidPalette() {
  const randomIndex = Math.floor(Math.random() * SOLID_PALETTES.length);
  return SOLID_PALETTES[randomIndex];
}

function getRandomGradientPalette() {
  const randomIndex = Math.floor(Math.random() * GRADIENT_PALETTES.length);
  return GRADIENT_PALETTES[randomIndex];
}

function getThemePalette(themeName) {
  return THEME_PALETTES[themeName] || THEME_PALETTES['github'];
}

// 时间相关的颜色生成
function getTimedPalette(type = 'solid') {
  const hour = new Date().getHours();
  const timeIndex = Math.floor(hour / 2) % (type === 'solid' ? SOLID_PALETTES.length : GRADIENT_PALETTES.length);
  
  if (type === 'solid') {
    return SOLID_PALETTES[timeIndex];
  } else {
    return GRADIENT_PALETTES[timeIndex];
  }
}

// 自定义渐变解析函数
function parseCustomGradient(customString) {
  // 格式: "0:EEFF00,100:a82da8"
  const pairs = customString.split(',');
  const colors = {};
  
  pairs.forEach(pair => {
    const [position, color] = pair.split(':');
    if (position && color) {
      colors[position] = color;
    }
  });
  
  return colors;
}

module.exports = {
  SOLID_PALETTES,
  GRADIENT_PALETTES,
  THEME_PALETTES,
  getRandomSolidPalette,
  getRandomGradientPalette,
  getThemePalette,
  getTimedPalette,
  parseCustomGradient
}; 