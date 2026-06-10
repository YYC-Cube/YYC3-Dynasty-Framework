/**
 * MarkdownRenderer — 轻量级 Markdown 渲染组件
 *
 * 用于任务描述、产出物、进展详情等富文本展示。
 * 基于 react-markdown + remark-gfm。
 */

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  content: string;
  className?: string;
  compact?: boolean;
}

export default function MarkdownRenderer({ content, className = '', compact = false }: Props) {
  if (!content) return null;

  return (
    <div className={`md-renderer ${compact ? 'md-compact' : ''} ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义链接 — 新窗口打开
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noreferrer" style={{ color: 'var(--acc)', textDecoration: 'none' }}>
              {children} ↗
            </a>
          ),
          // 自定义代码块 — 带背景色
          code: ({ children, className: codeClass }) => {
            const isInline = !codeClass;
            if (isInline) {
              return (
                <code style={{
                  fontSize: 11, background: 'var(--panel2)', padding: '2px 6px',
                  borderRadius: 4, fontFamily: 'monospace', wordBreak: 'break-all',
                }}>
                  {children}
                </code>
              );
            }
            return (
              <pre style={{
                background: 'var(--panel2)', border: '1px solid var(--line)',
                borderRadius: 8, padding: 12, overflowX: 'auto', fontSize: 12,
                margin: '8px 0',
              }}>
                <code>{children}</code>
              </pre>
            );
          },
          // 自定义表格
          table: ({ children }) => (
            <div style={{ overflowX: 'auto', margin: '8px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th style={{ padding: '6px 10px', border: '1px solid var(--line)', background: 'var(--panel2)', textAlign: 'left' }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{ padding: '6px 10px', border: '1px solid var(--line)' }}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
