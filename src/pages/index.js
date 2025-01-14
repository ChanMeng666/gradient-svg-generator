import React from 'react';

export default function Home() {
  // 暂时保持根路径返回默认SVG
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img 
        src="/api/svg?text=Welcome" 
        alt="Welcome" 
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
} 