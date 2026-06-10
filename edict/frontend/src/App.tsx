import { useEffect, useState } from 'react';
import EdictBoard from './components/EdictBoard';
import MemorialPanel from './components/MemorialPanel';
import ModelConfig from './components/ModelConfig';
import MonitorPanel from './components/MonitorPanel';
import MorningPanel from './components/MorningPanel';
import OfficialPanel from './components/OfficialPanel';
import SessionsPanel from './components/SessionsPanel';
import SkillsConfig from './components/SkillsConfig';
import TaskModal from './components/TaskModal';
import TemplatePanel from './components/TemplatePanel';
import { TAB_DEFS, isArchived, isEdict, startPolling, stopPolling, useStore } from './store';
import { useWebSocket } from './useWebSocket';
// ConfirmDialog is used inside TaskModal as needed
import CourtCeremony from './components/CourtCeremony';
import CourtDiscussion from './components/CourtDiscussion';
import DashboardLayout from './components/DashboardLayout';
import GlobalSearch from './components/GlobalSearch';
import LanguageSwitcher from './components/LanguageSwitcher';
import Toaster from './components/Toaster';

// 全局快捷键 — Escape 关闭当前弹窗
function useGlobalShortcuts() {
  const setModalTaskId = useStore((s) => s.setModalTaskId);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // 关闭 TaskModal
        setModalTaskId(null);
        // 关闭其他弹窗通过各自组件的内部监听
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [setModalTaskId]);
}

export default function App() {
  useGlobalShortcuts();

  // WebSocket 实时推送 — 连接 + 事件处理
  const { connected, useWS } = useWebSocket();
  const setWsConnected = useStore((s) => s.setWsConnected);
  const handleWSEvent = useStore((s) => s.handleWSEvent);

  // Layout 模式切换
  const [layoutMode, setLayoutMode] = useState(false);
  const activeTab = useStore((s) => s.activeTab);
  const setActiveTab = useStore((s) => s.setActiveTab);
  const liveStatus = useStore((s) => s.liveStatus);
  const countdown = useStore((s) => s.countdown);
  const loadAll = useStore((s) => s.loadAll);

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, []);

  // WebSocket 状态同步 + 事件处理
  useEffect(() => {
    setWsConnected(connected);
  }, [connected, setWsConnected]);

  // 注册 WebSocket 事件监听
  useEffect(() => {
    const unsub = useWS((event) => {
      if (event.type === 'event' && event.topic && event.data) {
        handleWSEvent(event.topic, event.data);
      }
    });
    return unsub;
  }, [useWS, handleWSEvent]);

  // Compute header chips
  const tasks = liveStatus?.tasks || [];
  const edicts = tasks.filter(isEdict);
  const activeEdicts = edicts.filter((t) => !isArchived(t));
  const syncOk = liveStatus?.syncStatus?.ok;

  // Tab badge counts
  const wsConnected = useStore((s) => s.wsConnected);
  const tabBadge = (key: string): string => {
    if (key === 'edicts') return String(activeEdicts.length);
    if (key === 'sessions') return String(tasks.filter((t) => !isEdict(t)).length);
    if (key === 'memorials') return String(edicts.filter((t) => ['Done', 'Cancelled'].includes(t.state)).length);
    if (key === 'monitor') {
      const activeDepts = tasks.filter((t) => isEdict(t) && t.state === 'Doing').length;
      return activeDepts + '活跃';
    }
    return '';
  };

  return (
    <div className="wrap">
      {/* ── Header ── */}
      <div className="hdr">
        <div>
          <div className="logo">三省六部 · 总控台</div>
          <div className="sub-text">OpenClaw Sansheng-Liubu Dashboard</div>
        </div>
        <div className="hdr-r">
          <span className={`chip ${syncOk ? 'ok' : syncOk === false ? 'err' : ''}`}>
            {syncOk ? '✅ 同步正常' : syncOk === false ? '❌ 服务器未启动' : '⏳ 连接中…'}
          </span>
          <span className="chip">{activeEdicts.length} 道旨意</span>
          <span className={`chip ${wsConnected ? 'ok' : ''}`} title={wsConnected ? 'WebSocket 已连接' : 'HTTP 轮询模式'}>
            {wsConnected ? '🔌 实时' : '🔄 轮询'}
          </span>
          <button className="btn-refresh" onClick={() => { loadAll(); }} title="刷新数据">
            ⟳ 刷新
          </button>
          <button className="btn-refresh" onClick={() => window.dispatchEvent(new CustomEvent('open-search'))} title="搜索 (Ctrl+K)" style={{ fontSize: 13 }}>
            🔍
          </button>
          <button className="btn-refresh" onClick={() => setLayoutMode(!layoutMode)} style={{ borderColor: layoutMode ? 'var(--ok)' : undefined, color: layoutMode ? 'var(--ok)' : undefined }} title="面板布局模式">
            {layoutMode ? '📐 布局' : '📐 布局'}
          </button>
          <LanguageSwitcher />
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>⟳ {countdown}s</span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="tabs">
        {TAB_DEFS.map((t) => (
          <div
            key={t.key}
            className={`tab ${activeTab === t.key ? 'active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.icon} {t.label}
            {tabBadge(t.key) && <span className="tbadge">{tabBadge(t.key)}</span>}
          </div>
        ))}
      </div>

      {/* ── Panels (Tab Mode) ── */}
      {!layoutMode && (
        <>
          {activeTab === 'edicts' && <EdictBoard />}
          {activeTab === 'court' && <CourtDiscussion />}
          {activeTab === 'monitor' && <MonitorPanel />}
          {activeTab === 'officials' && <OfficialPanel />}
          {activeTab === 'models' && <ModelConfig />}
          {activeTab === 'skills' && <SkillsConfig />}
          {activeTab === 'sessions' && <SessionsPanel />}
          {activeTab === 'memorials' && <MemorialPanel />}
          {activeTab === 'templates' && <TemplatePanel />}
          {activeTab === 'morning' && <MorningPanel />}
        </>
      )}

      {/* ── Panels (Layout Mode) ── */}
      {layoutMode && (
        <DashboardLayout
          panels={[
            { id: 'edicts', label: '旨意看板', icon: '📜', defaultSize: 50, component: <EdictBoard /> },
            { id: 'court', label: '朝堂议政', icon: '🏛️', defaultSize: 50, component: <CourtDiscussion /> },
            { id: 'monitor', label: '省部调度', icon: '🔌', defaultSize: 33, component: <MonitorPanel /> },
            { id: 'officials', label: '官员总览', icon: '👔', defaultSize: 33, component: <OfficialPanel /> },
            { id: 'models', label: '模型配置', icon: '🤖', defaultSize: 33, component: <ModelConfig /> },
            { id: 'skills', label: '技能配置', icon: '🎯', defaultSize: 50, component: <SkillsConfig /> },
            { id: 'sessions', label: '小任务', icon: '💬', defaultSize: 50, component: <SessionsPanel /> },
            { id: 'memorials', label: '奏折阁', icon: '📜', defaultSize: 33, component: <MemorialPanel /> },
            { id: 'templates', label: '旨库', icon: '📋', defaultSize: 33, component: <TemplatePanel /> },
            { id: 'morning', label: '天下要闻', icon: '🌅', defaultSize: 34, component: <MorningPanel /> },
          ]}
        />
      )}

      {/* ── Overlays ── */}
      <TaskModal />
      <Toaster />
      <CourtCeremony />
      <GlobalSearch />
    </div>
  );
}
