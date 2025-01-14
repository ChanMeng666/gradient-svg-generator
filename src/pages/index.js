import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      gap: '2rem'
    }}>
      <img 
        src="/api/svg?text=Welcome" 
        alt="Welcome" 
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Link href="/settings">
        <button style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Go to Generator Settings
        </button>
      </Link>
    </div>
  );
} 