/**
 * DashboardLayout — 可拖拽/可调整大小的面板布局系统
 *
 * 基于 react-resizable-panels（源自 YYC3-Pulse/resizable.tsx）
 * 功能：
 *   - 水平/垂直分割面板
 *   - 拖拽调整面板大小
 *   - 面板最大化/还原
 *   - 面板显示/隐藏
 *   - 布局持久化（localStorage）
 */

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';

export interface PanelDef {
  id: string;
  label: string;
  icon: string;
  defaultSize: number;
  minSize?: number;
  component: ReactNode;
}

interface SavedLayout {
  hidden: string[];
  maximized: string | null;
}

const STORAGE_KEY = 'dynasty_layout_v2';

function loadLayout(): SavedLayout {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* */ }
  return { hidden: [], maximized: null };
}

function saveLayout(layout: SavedLayout) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(layout)); } catch { /* */ }
}

interface Props {
  panels: PanelDef[];
}

export default function DashboardLayout({ panels }: Props) {
  const [saved, setSaved] = useState<SavedLayout>(loadLayout);

  useEffect(() => { saveLayout(saved); }, [saved]);

  const visiblePanels = panels.filter((p) => !saved.hidden.includes(p.id));
  const maximizedId = saved.maximized && panels.find((p) => p.id === saved.maximized) ? saved.maximized : null;

  const toggleVisibility = useCallback((panelId: string) => {
    setSaved((prev) => {
      const hidden = prev.hidden.includes(panelId)
        ? prev.hidden.filter((id) => id !== panelId)
        : [...prev.hidden, panelId];
      return { ...prev, hidden };
    });
  }, []);

  const toggleMaximize = useCallback((panelId: string) => {
    setSaved((prev) => ({ ...prev, maximized: prev.maximized === panelId ? null : panelId }));
  }, []);

  const resetLayout = useCallback(() => {
    setSaved({ hidden: [], maximized: null });
  }, []);

  const displayPanels = maximizedId
    ? visiblePanels.filter((p) => p.id === maximizedId)
    : visiblePanels;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, height: '100%' }}>
      {/* 控制栏 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap',
        fontSize: 11, color: 'var(--muted)',
      }}>
        <span>📐 面板布局</span>
        <span style={{ color: 'var(--line)' }}>|</span>
        <span style={{ fontSize: 10 }}>拖拽手柄调整大小</span>
        <button className="btn btn-secondary btn-xs" onClick={resetLayout} style={{ marginLeft: 'auto', fontSize: 10 }}>
          ↩ 重置
        </button>
      </div>

      {/* 可见性开关 */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
        {panels.map((p) => {
          const visible = !saved.hidden.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggleVisibility(p.id)}
              className="btn btn-xs"
              style={{
                padding: '2px 8px', fontSize: 10,
                background: visible ? 'var(--acc)22' : 'transparent',
                borderColor: visible ? 'var(--acc)' : 'var(--line)',
                color: visible ? 'var(--acc)' : 'var(--muted)',
              }}
            >
              {visible ? '✓ ' : '✗ '}{p.icon} {p.label}
            </button>
          );
        })}
      </div>

      {/* 可拖拽面板区域 */}
      {displayPanels.length === 0 ? (
        <div className="empty" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          所有面板已隐藏
        </div>
      ) : displayPanels.length === 1 ? (
        <PanelFrame panel={displayPanels[0]} isMaximized={!!maximizedId} onToggleMaximize={toggleMaximize} onHide={toggleVisibility} />
      ) : (
        <Group orientation="horizontal" style={{ flex: 1, gap: 6 }}>
          {displayPanels.map((p) => (
            <Panel key={p.id} defaultSize={p.defaultSize} minSize={p.minSize || 15}>
              <PanelFrame panel={p} isMaximized={false} onToggleMaximize={toggleMaximize} onHide={toggleVisibility} />
            </Panel>
          ))}
          {displayPanels.length >= 2 && <Separator style={{ width: 4, cursor: 'col-resize', background: 'var(--line)', borderRadius: 2 }} />}
        </Group>
      )}
    </div>
  );
}

function PanelFrame({
  panel,
  isMaximized,
  onToggleMaximize,
  onHide,
}: {
  panel: PanelDef;
  isMaximized: boolean;
  onToggleMaximize: (id: string) => void;
  onHide: (id: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 12px',
        background: 'var(--panel2)',
        fontSize: 12, fontWeight: 600, userSelect: 'none',
        border: '1px solid var(--line)',
        borderRadius: '10px 10px 0 0',
        borderBottom: 'none',
      }}>
        <span>{panel.icon}</span>
        <span style={{ flex: 1 }}>{panel.label}</span>
        <span onClick={() => onHide(panel.id)} style={{ cursor: 'pointer', fontSize: 12, color: 'var(--muted)', opacity: 0.5, padding: '0 4px' }} title="隐藏">✕</span>
        <span onClick={() => onToggleMaximize(panel.id)} style={{ cursor: 'pointer', fontSize: 11, color: 'var(--muted)', padding: '0 4px' }} title={isMaximized ? '还原' : '最大化'}>
          {isMaximized ? '⤡' : '⤢'}
        </span>
      </div>
      <div style={{
        flex: 1, overflow: 'auto', padding: '10px 14px',
        border: '1px solid var(--line)', borderTop: 'none',
        borderRadius: '0 0 10px 10px',
        background: 'var(--panel)',
      }}>
        {panel.component}
      </div>
    </div>
  );
}
