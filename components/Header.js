'use client';

import Link from 'next/link';
import BaseballIcon from './BaseballIcon';

export default function Header({ current = '' }) {
  const navItems = [
    { label: 'ホーム', href: '/' },
    { label: '活動報告', href: '/reports' },
    { label: 'メンバー', href: '/members' },
  ];

  return (
    <header
      style={{
        background: 'linear-gradient(90deg, #0052D4, #0066FF)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 20px rgba(0,82,212,0.3)',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            background: '#FFD600',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0052D4',
            boxShadow: '0 2px 8px rgba(255,214,0,0.4)',
          }}
        >
          <BaseballIcon size={22} />
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '10px',
              color: '#FFD600',
              letterSpacing: '4px',
            }}
          >
            KESENNUMA SEAHAWKS
          </div>
          <div style={{ fontSize: '12px', color: '#fff', fontWeight: 900, marginTop: '-1px' }}>
            気仙沼シーホークス少年野球クラブ
          </div>
        </div>
      </Link>

      <nav style={{ display: 'flex', gap: '14px' }}>
        {navItems.map((item) => {
          const isActive = item.label === current;
          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                color: isActive ? '#FFD600' : 'rgba(255,255,255,0.85)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                padding: '4px 8px',
                borderRadius: '4px',
                background: isActive ? 'rgba(255,214,0,0.15)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
