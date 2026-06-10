/**
 * GlobalSearch — 全局搜索控件
 *
 * 跨任务/官员/模板的客户端搜索。
 * 搜索结果实时展示，点击跳转到对应面板。
 */

import { useEffect, useRef, useState } from 'react';
import { useStore, type TabKey } from '../store';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  const [results, setResults] = useState<{ type: string; label: string; desc: string; tab?: TabKey; action?: () => void }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const liveStatus = useStore((s) => s.liveStatus);
  const officialsData = useStore((s) => s.officialsData);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const setModalTaskId = useStore((s) => s.setModalTaskId);

  // Toggle with Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShow((v) => !v);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape' && show) setShow(false);
    };
    document.addEventListener('keydown', handler);
    // 响应搜索按钮点击
    const openHandler = () => { setShow(true); setTimeout(() => inputRef.current?.focus(), 100); };
    window.addEventListener('open-search', openHandler);
    return () => { document.removeEventListener('keydown', handler); window.removeEventListener('open-search', openHandler); };
  }, [show]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const hits: typeof results = [];

    // 搜索任务
    const tasks = liveStatus?.tasks || [];
    for (const t of tasks) {
      if (t.title?.toLowerCase().includes(q) || t.id?.toLowerCase().includes(q)) {
        hits.push({
          type: '任务',
          label: `${t.id}: ${(t.title || '').substring(0, 40)}`,
          desc: t.org || '—',
          action: () => { setModalTaskId(t.id); setShow(false); },
        });
        if (hits.length >= 6) break;
      }
    }

    // 搜索官员
    const officials = officialsData?.officials || [];
    for (const o of officials) {
      if (o.role?.toLowerCase().includes(q) || o.label?.toLowerCase().includes(q) || o.id?.toLowerCase().includes(q)) {
        hits.push({
          type: '官员',
          label: `${o.emoji} ${o.role} (${o.label})`,
          desc: `${o.rank} · 功绩 ${o.merit_score}`,
          action: () => { setActiveTab('officials'); setShow(false); },
        });
        if (hits.length >= 6) break;
      }
    }

    setResults(hits.slice(0, 8));
  }, [query, liveStatus, officialsData, setActiveTab, setModalTaskId]);

  if (!show) return null;

  return (
    <div className="modal-bg open" onClick={() => setShow(false)} style={{ zIndex: 200, alignItems: 'flex-start', paddingTop: '80px' }}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560, padding: 0, overflow: 'visible' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
          <span style={{ color: 'var(--muted)', marginRight: 8 }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索旨意、官员、模板... (Ctrl+K)"
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              color: 'var(--text)', fontSize: 15,
            }}
            autoFocus
          />
          <span style={{ fontSize: 10, color: 'var(--muted)', background: 'var(--panel2)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--line)' }}>
            ESC
          </span>
        </div>

        {results.length > 0 && (
          <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {results.map((r, i) => (
              <div
                key={i}
                onClick={r.action}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 8, cursor: 'pointer', fontSize: 13,
                  transition: 'background .1s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--panel2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{
                  fontSize: 10, padding: '2px 7px', borderRadius: 4,
                  background: r.type === '任务' ? '#6a9eff22' : '#a07aff22',
                  color: r.type === '任务' ? 'var(--acc)' : 'var(--acc2)',
                  fontWeight: 600, flexShrink: 0,
                }}>
                  {r.type}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text)' }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.desc}</div>
                </div>
                <span style={{ color: 'var(--muted)', fontSize: 11 }}>↵</span>
              </div>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
            未找到与「{query}」相关的结果
          </div>
        )}

        {!query.trim() && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--muted)', fontSize: 12, lineHeight: 2 }}>
            搜索旨意（按标题/编号）或官员（按姓名/官职）
          </div>
        )}
      </div>
    </div>
  );
}
