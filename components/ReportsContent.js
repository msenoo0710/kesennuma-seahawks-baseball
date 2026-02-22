'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BaseballIcon from '@/components/BaseballIcon';
import { categoryStyle, formatDate } from '@/lib/styles';

const ITEMS_PER_PAGE = 6;

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

export default function ReportsContent({ reports }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('card');

  let filtered = reports;
  if (activeCategory !== 'all') filtered = filtered.filter((r) => r.category === activeCategory);
  if (activeYear !== 'all') filtered = filtered.filter((r) => formatDate(r.date).year === Number(activeYear));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const countAll = reports.length;
  const countByCategory = (cat) => reports.filter((r) => r.category === cat).length;

  // 年度リストを動的に生成
  const years = [...new Set(reports.map((r) => formatDate(r.date).year))].sort((a, b) => b - a);

  const handleFilter = (setter, value) => { setter(value); setCurrentPage(1); };

  return (
    <>
      <Header current="活動報告" />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0052D4 0%, #0066FF 40%, #00B4D8 100%)', padding: '40px 20px 52px', position: 'relative', overflow: 'hidden' }}>
        <div className="stripe-bg" />
        <div style={{ position: 'absolute', top: '-30px', right: '-20px', opacity: 0.08, color: '#fff' }}><BaseballIcon size={140} /></div>
        <div className="fade-up" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
            <Link href="/" style={{ transition: 'color 0.2s' }}>ホーム</Link><span style={{ margin: '0 8px' }}>/</span><span style={{ color: '#fff' }}>活動報告</span>
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '42px', color: '#fff', letterSpacing: '4px', lineHeight: 1, marginBottom: '4px', textShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>REPORTS</div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: 'rgba(255,255,255,0.9)', letterSpacing: '4px' }}>活動報告</div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
            {[
              { label: '全記事', count: countAll, color: '#FFD600' },
              { label: '試合', count: countByCategory('試合'), color: '#FF1744' },
              { label: '練習', count: countByCategory('練習'), color: '#00C853' },
              { label: 'イベント', count: countByCategory('イベント'), color: '#FF9100' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: s.color, lineHeight: 1 }}>{s.count}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '1px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Content */}
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#fff', borderRadius: '14px', padding: '16px 18px', marginTop: '-24px', position: 'relative', zIndex: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#999', letterSpacing: '1px', marginRight: '4px' }}>カテゴリ</span>
            {[
              { key: 'all', label: 'すべて', color: '#0066FF' },
              { key: '試合', label: '⚾ 試合', color: '#FF1744' },
              { key: '練習', label: '💪 練習', color: '#00C853' },
              { key: 'イベント', label: '🎉 イベント', color: '#FF9100' },
            ].map((tab) => (
              <button key={tab.key} className="filter-btn" onClick={() => handleFilter(setActiveCategory, tab.key)} style={{ padding: '5px 14px', borderRadius: '20px', border: 'none', background: activeCategory === tab.key ? tab.color : '#F0F0F0', color: activeCategory === tab.key ? '#fff' : '#888', fontSize: '11px', fontWeight: 800, boxShadow: activeCategory === tab.key ? `0 3px 10px ${tab.color}33` : 'none' }}>{tab.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#999', letterSpacing: '1px', marginRight: '4px' }}>年度</span>
              <button className="filter-btn" onClick={() => handleFilter(setActiveYear, 'all')} style={{ padding: '5px 14px', borderRadius: '20px', border: 'none', background: activeYear === 'all' ? '#333' : '#F0F0F0', color: activeYear === 'all' ? '#fff' : '#888', fontSize: '11px', fontWeight: 800 }}>すべて</button>
              {years.map((y) => (
                <button key={y} className="filter-btn" onClick={() => handleFilter(setActiveYear, String(y))} style={{ padding: '5px 14px', borderRadius: '20px', border: 'none', background: activeYear === String(y) ? '#333' : '#F0F0F0', color: activeYear === String(y) ? '#fff' : '#888', fontSize: '11px', fontWeight: 800 }}>{y}年</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '2px', background: '#F0F0F0', borderRadius: '8px', padding: '2px' }}>
              <button className="view-btn" onClick={() => setViewMode('card')} style={{ width: '30px', height: '28px', borderRadius: '6px', border: 'none', background: viewMode === 'card' ? '#fff' : 'transparent', color: viewMode === 'card' ? '#0066FF' : '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: viewMode === 'card' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="7" height="7" rx="1.5" /><rect x="9" y="0" width="7" height="7" rx="1.5" /><rect x="0" y="9" width="7" height="7" rx="1.5" /><rect x="9" y="9" width="7" height="7" rx="1.5" /></svg>
              </button>
              <button className="view-btn" onClick={() => setViewMode('list')} style={{ width: '30px', height: '28px', borderRadius: '6px', border: 'none', background: viewMode === 'list' ? '#fff' : 'transparent', color: viewMode === 'list' ? '#0066FF' : '#aaa', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: viewMode === 'list' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="1" width="16" height="3" rx="1" /><rect x="0" y="6.5" width="16" height="3" rx="1" /><rect x="0" y="12" width="16" height="3" rx="1" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: '18px 4px 12px', fontSize: '12px', color: '#999', fontWeight: 700 }}>{filtered.length} 件の記事</div>

        {/* Card view */}
        {viewMode === 'card' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingBottom: '12px' }}>
            {paged.map((report, i) => {
              const cat = categoryStyle(report.category);
              const d = formatDate(report.date);
              const preview = stripHtml(report.body);
              return (
                <Link key={report.id} href={`/reports/${report.id}`} className="card-item" style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', animation: `scaleIn 0.4s ease ${i * 0.06}s both` }}>
                  {report.thumbnail ? (
                    <div style={{ height: '100px', position: 'relative', overflow: 'hidden' }}>
                      <img src={report.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '8px', left: '8px', background: cat.bg, color: cat.text, fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', boxShadow: `0 2px 6px ${cat.bg}44` }}>{cat.icon} {report.category}</div>
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', borderRadius: '6px', padding: '3px 8px', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: '#333', lineHeight: 1 }}>{d.day}</div>
                        <div style={{ fontSize: '8px', color: '#999', fontWeight: 700 }}>{d.year}.{String(d.month).padStart(2, '0')}</div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: '100px', background: `linear-gradient(135deg, ${cat.bg}18, ${cat.bg}35)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={cat.bg} strokeWidth="1.5" opacity="0.35"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                      <div style={{ position: 'absolute', top: '8px', left: '8px', background: cat.bg, color: cat.text, fontSize: '9px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', boxShadow: `0 2px 6px ${cat.bg}44` }}>{cat.icon} {report.category}</div>
                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', borderRadius: '6px', padding: '3px 8px', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: '#333', lineHeight: 1 }}>{d.day}</div>
                        <div style={{ fontSize: '8px', color: '#999', fontWeight: 700 }}>{d.year}.{String(d.month).padStart(2, '0')}</div>
                      </div>
                    </div>
                  )}
                  <div style={{ padding: '12px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 900, color: '#222', margin: '0 0 6px 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{report.title}</h3>
                    <p style={{ fontSize: '11px', color: '#999', margin: 0, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{preview}</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                      <span style={{ fontSize: '10px', color: '#0066FF', fontWeight: 800 }}>READ MORE →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* List view */}
        {viewMode === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '12px' }}>
            {paged.map((report, i) => {
              const cat = categoryStyle(report.category);
              const d = formatDate(report.date);
              const preview = stripHtml(report.body);
              return (
                <Link key={report.id} href={`/reports/${report.id}`} className="list-item" style={{ background: '#fff', borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '14px', alignItems: 'flex-start', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', borderLeft: `4px solid ${cat.bg}`, animation: `fadeInUp 0.4s ease ${i * 0.05}s both` }}>
                  <div style={{ textAlign: 'center', flexShrink: 0, width: '44px' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: '#333', lineHeight: 1 }}>{d.day}</div>
                    <div style={{ fontSize: '9px', color: '#aaa', fontWeight: 700 }}>{d.year}.{String(d.month).padStart(2, '0')}</div>
                    <div style={{ fontSize: '9px', color: '#bbb', fontWeight: 700 }}>({d.weekday})</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '4px', background: cat.bg, color: cat.text, fontSize: '9px', fontWeight: 800 }}>{report.category}</span>
                    </div>
                    <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#222', margin: '0 0 4px 0', lineHeight: 1.4 }}>{report.title}</h3>
                    <p style={{ fontSize: '12px', color: '#999', margin: 0, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{preview}</p>
                  </div>
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', color: '#ccc' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', padding: '20px 0 40px' }}>
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: currentPage === 1 ? '#E8E8E8' : '#fff', color: currentPage === 1 ? '#ccc' : '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: currentPage === 1 ? 'none' : '0 2px 8px rgba(0,0,0,0.06)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} className="page-btn" onClick={() => setCurrentPage(page)} style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: currentPage === page ? 'linear-gradient(135deg, #0052D4, #0066FF)' : '#fff', color: currentPage === page ? '#fff' : '#555', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', boxShadow: currentPage === page ? '0 4px 12px rgba(0,82,212,0.3)' : '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{page}</button>
            ))}
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} style={{ width: '36px', height: '36px', borderRadius: '10px', border: 'none', background: currentPage === totalPages ? '#E8E8E8' : '#fff', color: currentPage === totalPages ? '#ccc' : '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: currentPage === totalPages ? 'none' : '0 2px 8px rgba(0,0,0,0.06)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
