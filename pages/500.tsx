import React from 'react';
import Link from 'next/link';

export default function Custom500() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#070b13',
      color: '#ffffff',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', color: '#ef4444' }}>500</h1>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Internal Server Error</h2>
      <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '24px' }}>
        SellGrow encountered an internal process exception. Please try again later.
      </p>
      <Link href="/" style={{
        padding: '10px 20px',
        backgroundColor: '#38bdf8',
        color: '#000000',
        borderRadius: '8px',
        fontWeight: '600',
        textDecoration: 'none',
        fontSize: '14px'
      }}>
        Return Home
      </Link>
    </div>
  );
}
