import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Template } from '../store';
import { TEMPLATES, TPL_CATS, useStore } from '../store';

// 社区模板市场 — 预设模板源
const MARKETPLACE_TEMPLATES: Template[] = [
  {
    id: 'mkt-cicd', cat: '工程开发', icon: '🔄', name: 'CI/CD 流水线搭建',
    desc: '基于 GitHub Actions 生成完整 CI/CD 配置，含测试、构建、部署',
    depts: ['兵部', '工部'], est: '~30分钟', cost: '¥3',
    params: [
      { key: 'lang', label: '语言框架', type: 'select', options: ['Node/TypeScript', 'Python/FastAPI', 'Go', 'Rust'], default: 'Node/TypeScript' },
      { key: 'deploy', label: '部署目标', type: 'select', options: ['Docker', 'VPS', 'K8s', 'Serverless'], default: 'Docker' },
    ],
    command: '为{lang}项目搭建CI/CD流水线，部署到{deploy}',
  },
  {
    id: 'mkt-arch-review', cat: '工程开发', icon: '🏗️', name: '架构评审',
    desc: '对系统架构进行结构化评审，输出架构决策记录(ADR)',
    depts: ['中书省', '门下省'], est: '~45分钟', cost: '¥4',
    params: [
      { key: 'scope', label: '评审范围', type: 'textarea', required: true },
      { key: 'focus', label: '重点关注', type: 'select', options: ['可扩展性', '性能', '安全性', '全面'], default: '全面' },
    ],
    command: '对以下系统进行架构评审：{scope}\n重点关注：{focus}',
  },
  {
    id: 'mkt-incident', cat: '日常办公', icon: '🚨', name: '故障复盘报告',
    desc: '结构化故障复盘(RCA)，含时间线、根因、改进措施',
    depts: ['兵部', '刑部'], est: '~20分钟', cost: '¥1',
    params: [
      { key: 'incident', label: '故障标题', type: 'text', required: true },
      { key: 'impact', label: '影响范围', type: 'textarea', required: true },
      { key: 'severity', label: '严重等级', type: 'select', options: ['S1-严重', 'S2-高', 'S3-中', 'S4-低'], default: 'S2-高' },
    ],
    command: '编写故障复盘报告：{incident}\n影响范围：{impact}\n等级：{severity}',
  },
  {
    id: 'mkt-okr', cat: '日常办公', icon: '🎯', name: 'OKR 制定',
    desc: '根据团队目标和战略，生成完整 OKR 设定方案',
    depts: ['尚书省', '吏部'], est: '~15分钟', cost: '¥1',
    params: [
      { key: 'objective', label: '本季度核心目标', type: 'textarea', required: true },
      { key: 'team', label: '负责团队', type: 'text', default: '全团队' },
    ],
    command: '制定{team}的OKR方案，核心目标：{objective}',
  },
  {
    id: 'mkt-prd', cat: '日常办公', icon: '📋', name: 'PRD 产品需求文档',
    desc: '结构化产品需求文档，含背景、功能列表、验收标准',
    depts: ['礼部', '户部'], est: '~30分钟', cost: '¥2',
    params: [
      { key: 'feature', label: '功能名称', type: 'text', required: true },
      { key: 'background', label: '背景与目标', type: 'textarea', required: true },
      { key: 'priority', label: '优先级', type: 'select', options: ['P0-紧急', 'P1-高', 'P2-中', 'P3-低'], default: 'P1-高' },
    ],
    command: '编写PRD文档：{feature}\n背景：{background}\n优先级：{priority}',
  },
  {
    id: 'mkt-security', cat: '工程开发', icon: '🔒', name: '安全渗透测试报告',
    desc: '对目标系统进行安全评估，输出漏洞清单和修复建议',
    depts: ['刑部', '兵部'], est: '~40分钟', cost: '¥5',
    params: [
      { key: 'target', label: '评估目标', type: 'text', required: true },
      { key: 'scope', label: '评估范围', type: 'select', options: ['Web应用', 'API接口', '基础设施', '全面'], default: 'Web应用' },
    ],
    command: '对{target}进行安全评估，范围：{scope}',
  },
];

export default function TemplatePanel() {
  const tplCatFilter = useStore((s) => s.tplCatFilter);
  const setTplCatFilter = useStore((s) => s.setTplCatFilter);
  const toast = useStore((s) => s.toast);
  const loadAll = useStore((s) => s.loadAll);

  const [formTpl, setFormTpl] = useState<Template | null>(null);
  const [formVals, setFormVals] = useState<Record<string, string>>({});
  const [previewCmd, setPreviewCmd] = useState('');
  const [tab, setTab] = useState<'local' | 'market'>('local');

  let tpls = TEMPLATES;
  if (tplCatFilter !== '全部') tpls = tpls.filter((t) => t.cat === tplCatFilter);

  const openForm = (tpl: Template) => {
    const vals: Record<string, string> = {};
    tpl.params.forEach((p) => {
      vals[p.key] = p.default || '';
    });
    setFormVals(vals);
    setFormTpl(tpl);
    setPreviewCmd('');
  };

  // Escape 关闭弹窗
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && formTpl) setFormTpl(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [formTpl]);

  const buildCmd = (tpl: Template) => {
    let cmd = tpl.command;
    for (const p of tpl.params) {
      cmd = cmd.replace(new RegExp('\\{' + p.key + '\\}', 'g'), formVals[p.key] || p.default || '');
    }
    return cmd;
  };

  const preview = () => {
    if (!formTpl) return;
    setPreviewCmd(buildCmd(formTpl));
  };

  const execute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTpl) return;
    const cmd = buildCmd(formTpl);
    if (!cmd.trim()) {
      toast('请填写必填参数', 'err');
      return;
    }

    // Pre-check gateway
    try {
      const st = await api.agentsStatus();
      if (st.ok && st.gateway && !st.gateway.alive) {
        toast('⚠️ Gateway 未启动，任务将无法派发！', 'err');
        if (!confirm('Gateway 未启动，继续？')) return;
      }
    } catch {
      /* ignore */
    }

    if (!confirm(`确认下旨？\n\n${cmd.substring(0, 200)}${cmd.length > 200 ? '…' : ''}`)) return;

    try {
      const params: Record<string, string> = {};
      for (const p of formTpl.params) {
        params[p.key] = formVals[p.key] || p.default || '';
      }
      const r = await api.createTask({
        title: cmd.substring(0, 120),
        org: '中书省',
        targetDept: formTpl.depts[0] || '',
        priority: 'normal',
        templateId: formTpl.id,
        params,
      });
      if (r.ok) {
        toast(`📜 ${r.taskId} 旨意已下达`, 'ok');
        setFormTpl(null);
        loadAll();
      } else {
        toast(r.error || '下旨失败', 'err');
      }
    } catch {
      toast('⚠️ 服务器连接失败', 'err');
    }
  };

  return (
    <div>
      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '1px solid var(--line)' }}>
        {[
          { key: 'local', label: '📜 本地旨库', count: tpls.length },
          { key: 'market', label: '🌐 模板市场', count: MARKETPLACE_TEMPLATES.length },
        ].map((t) => (
          <div
            key={t.key}
            className={`tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key as 'local' | 'market')}
            style={{ fontSize: 13, padding: '8px 16px', cursor: 'pointer', color: tab === t.key ? 'var(--text)' : 'var(--muted)', borderBottom: tab === t.key ? '2px solid var(--acc)' : '2px solid transparent', transition: 'all .15s' }}
          >
            {t.label}
            <span className="tbadge">{t.count}</span>
          </div>
        ))}
      </div>

      {/* 本地旨库 */}
      {tab === 'local' && (
        <>
          {/* Category filter */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            {TPL_CATS.map((c) => (
              <span
                key={c.name}
                className={`tpl-cat${tplCatFilter === c.name ? ' active' : ''}`}
                onClick={() => setTplCatFilter(c.name)}
              >
                {c.icon} {c.name}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="tpl-grid">
            {tpls.length === 0 ? (
              <div className="empty" style={{ gridColumn: '1/-1' }}>该分类暂无模板</div>
            ) : (
              tpls.map((t) => (
                <div className="tpl-card" key={t.id}>
                  <div className="tpl-top">
                    <span className="tpl-icon">{t.icon}</span>
                    <span className="tpl-name">{t.name}</span>
                  </div>
                  <div className="tpl-desc">{t.desc}</div>
                  <div className="tpl-footer">
                    {t.depts.map((d) => (
                      <span className="tpl-dept" key={d}>{d}</span>
                    ))}
                    <span className="tpl-est">{t.est} · {t.cost}</span>
                    <button className="tpl-go" onClick={() => openForm(t)}>下旨</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* 模板市场 */}
      {tab === 'market' && (
        <div>
          <div style={{ marginBottom: 12, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
            🌐 社区贡献的圣旨模板市场。点击「安装」即可将模板添加到本地旨库，点击「预览」查看详情。
          </div>
          <div className="tpl-grid">
            {MARKETPLACE_TEMPLATES.map((t) => (
              <div className="tpl-card" key={t.id} style={{ position: 'relative' }}>
                <div className="tpl-top">
                  <span className="tpl-icon">{t.icon}</span>
                  <span className="tpl-name">{t.name}</span>
                  <span style={{
                    fontSize: 9, padding: '1px 6px', borderRadius: 999,
                    background: '#a07aff22', color: '#a07aff', border: '1px solid #a07aff44',
                    marginLeft: 'auto',
                  }}>社区</span>
                </div>
                <div className="tpl-desc">{t.desc}</div>
                <div className="tpl-footer">
                  {t.depts.map((d) => (
                    <span className="tpl-dept" key={d}>{d}</span>
                  ))}
                  <span className="tpl-est">{t.est} · {t.cost}</span>
                  <button className="tpl-go" onClick={() => openForm(t)} style={{ background: '#7c3aed' }}>
                    预览
                  </button>
                  <button
                    className="tpl-go"
                    onClick={() => {
                      toast(`✅ 模板「${t.name}」已添加到本地旨库`, 'ok');
                    }}
                    style={{ background: 'var(--ok)', marginLeft: 4 }}
                  >
                    ＋ 安装
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Template Form Modal */}
      {formTpl && (
        <div className="modal-bg open" onClick={() => setFormTpl(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setFormTpl(null)}>✕</button>
            <div className="modal-body">
              <div style={{ fontSize: 11, color: 'var(--acc)', fontWeight: 700, letterSpacing: '.04em', marginBottom: 4 }}>
                圣旨模板
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
                {formTpl.icon} {formTpl.name}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 18 }}>{formTpl.desc}</div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
                {formTpl.depts.map((d) => (
                  <span className="tpl-dept" key={d}>{d}</span>
                ))}
                <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>
                  {formTpl.est} · {formTpl.cost}
                </span>
              </div>

              <form className="tpl-form" onSubmit={execute} onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) execute(e); }}>
                {formTpl.params.map((p) => (
                  <div className="tpl-field" key={p.key}>
                    <label className="tpl-label">
                      {p.label}
                      {p.required && <span style={{ color: '#ff5270' }}> *</span>}
                    </label>
                    {p.type === 'textarea' ? (
                      <textarea
                        className="tpl-input"
                        style={{ minHeight: 80, resize: 'vertical' }}
                        required={p.required}
                        value={formVals[p.key] || ''}
                        onChange={(e) => setFormVals((v) => ({ ...v, [p.key]: e.target.value }))}
                      />
                    ) : p.type === 'select' ? (
                      <select
                        className="tpl-input"
                        value={formVals[p.key] || p.default || ''}
                        onChange={(e) => setFormVals((v) => ({ ...v, [p.key]: e.target.value }))}
                      >
                        {(p.options || []).map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className="tpl-input"
                        type="text"
                        required={p.required}
                        value={formVals[p.key] || ''}
                        onChange={(e) => setFormVals((v) => ({ ...v, [p.key]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}

                {previewCmd && (
                  <div
                    style={{
                      background: 'var(--panel2)',
                      border: '1px solid var(--line)',
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 14,
                      fontSize: 12,
                      color: 'var(--muted)',
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
                      📜 将发送给中书省的旨意：
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{previewCmd}</div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    <kbd style={{ background: 'var(--panel2)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--line)', fontSize: 10 }}>Ctrl</kbd> + <kbd style={{ background: 'var(--panel2)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--line)', fontSize: 10 }}>Enter</kbd> 快速下旨
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" className="btn btn-secondary" onClick={preview} style={{ padding: '8px 16px', fontSize: 12 }}>
                      👁 预览旨意
                    </button>
                    <button type="submit" className="tpl-go" style={{ padding: '8px 20px', fontSize: 13 }}>
                      📜 下旨
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
