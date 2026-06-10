/**
 * WebSocket Hook — 实时事件推送
 *
 * 替代 HTTP 5s 轮询，提供实时任务状态更新。
 * 自动处理连接/断线重连/降级回退。
 *
 * 使用方式：
 *   const { connected, useWS } = useWebSocket();
 *   useWS((event) => { /* handle event *\/ });
 */

import { useEffect, useRef, useCallback, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';
const WS_BASE = API_BASE
  ? API_BASE.replace(/^http/, 'ws') + '/ws'
  : `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws`;

type WSEvent = {
  type: 'event' | 'pong' | 'subscribed';
  topic?: string;
  data?: Record<string, unknown>;
};

type Listener = (event: WSEvent) => void;

let _ws: WebSocket | null = null;
let _listeners: Set<Listener> = new Set();
let _reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let _reconnectAttempts = 0;
const MAX_RECONNECT_DELAY = 30000; // 30s cap

function connect() {
  if (_ws && (_ws.readyState === WebSocket.OPEN || _ws.readyState === WebSocket.CONNECTING)) return;

  try {
    _ws = new WebSocket(WS_BASE);

    _ws.onopen = () => {
      _reconnectAttempts = 0;
      _listeners.forEach((fn) => fn({ type: 'pong' })); // signal connected
    };

    _ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data) as WSEvent;
        _listeners.forEach((fn) => fn(event));
      } catch {
        // ignore parse errors
      }
    };

    _ws.onclose = () => {
      _ws = null;
      scheduleReconnect();
    };

    _ws.onerror = () => {
      // onclose will fire after this
    };
  } catch {
    scheduleReconnect();
  }
}

function scheduleReconnect() {
  if (_reconnectTimer) return;
  const delay = Math.min(1000 * 2 ** _reconnectAttempts, MAX_RECONNECT_DELAY);
  _reconnectAttempts++;
  _reconnectTimer = setTimeout(() => {
    _reconnectTimer = null;
    connect();
  }, delay);
}

function disconnect() {
  if (_reconnectTimer) {
    clearTimeout(_reconnectTimer);
    _reconnectTimer = null;
  }
  if (_ws) {
    _ws.close();
    _ws = null;
  }
}

export function useWebSocket() {
  const [connected, setConnected] = useState(false);
  const listenerRef = useRef<Listener | null>(null);

  // Register listener
  const useWS = useCallback((fn: Listener) => {
    listenerRef.current = fn;
    _listeners.add(fn);
    return () => {
      _listeners.delete(fn);
      listenerRef.current = null;
    };
  }, []);

  // Manage connection lifecycle
  useEffect(() => {
    connect();

    // Track connection state
    const connListener: Listener = (ev) => {
      if (ev.type === 'pong') {
        setConnected(true);
      }
    };
    _listeners.add(connListener);

    return () => {
      _listeners.delete(connListener);
      // Don't disconnect here — other components may use the shared connection
    };
  }, []);

  return { connected, useWS };
}

// ── 全局发送 ──

export function wsSend(data: Record<string, unknown>) {
  if (_ws && _ws.readyState === WebSocket.OPEN) {
    _ws.send(JSON.stringify(data));
  }
}

// ── 全局断开（用于页面卸载）──

export function wsDisconnect() {
  disconnect();
}
