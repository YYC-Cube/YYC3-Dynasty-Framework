/**
 * Dynasty Framework 国际化 — 轻量独立实现
 *
 * 翻译模式参考 @yyc3/i18n-core v2.4.0
 * 无外部依赖，零构建负担
 */

const STORAGE_KEY = 'dynasty_locale';

// ── 支持语言 ──
export const LOCALES = ['zh-CN', 'en', 'ja', 'ko', 'fr', 'de', 'es', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

const LANG_META: Record<Locale, { label: string; native: string; flag: string }> = {
  'zh-CN': { label: '中文', native: '简体中文', flag: '🇨🇳' },
  en: { label: 'English', native: 'English', flag: '🇺🇸' },
  ja: { label: '日本語', native: '日本語', flag: '🇯🇵' },
  ko: { label: '한국어', native: '한국어', flag: '🇰🇷' },
  fr: { label: 'Français', native: 'Français', flag: '🇫🇷' },
  de: { label: 'Deutsch', native: 'Deutsch', flag: '🇩🇪' },
  es: { label: 'Español', native: 'Español', flag: '🇪🇸' },
  ar: { label: 'العربية', native: 'العربية', flag: '🇸🇦' },
};

// ── 翻译表 ──
type TranslationValue = string | Record<string, unknown>;
type TranslationMap = Record<string, TranslationValue>;

const zhCN: TranslationMap = {
  'dynasty.title': '三省六部 · 总控台',
  'dynasty.subtitle': 'OpenClaw Sansheng-Liubu Dashboard',
  'sync.ok': '同步正常',
  'sync.error': '服务器未启动',
  'sync.connecting': '连接中…',
  'sync.polling': '轮询',
  'sync.realtime': '实时',
  'edict.count': '{count} 道旨意',
  'edict.active': '活跃',
  'edict.archived': '归档',
  'edict.all': '全部',
  'edict.none': '暂无旨意',
  'edict.hint': '通过飞书向太子发送任务',
  'tab.edicts': '旨意看板',
  'tab.court': '朝堂议政',
  'tab.monitor': '省部调度',
  'tab.officials': '官员总览',
  'tab.models': '模型配置',
  'tab.skills': '技能配置',
  'tab.sessions': '小任务',
  'tab.memorials': '奏折阁',
  'tab.templates': '旨库',
  'tab.morning': '天下要闻',
  'action.stop': '叫停',
  'action.cancel': '取消',
  'action.resume': '恢复',
  'action.approve': '准奏',
  'action.reject': '封驳',
  'action.advance': '推进',
  'action.refresh': '刷新',
  'action.search': '搜索',
  'msg.serverError': '服务器连接失败',
  'msg.opSuccess': '操作成功',
  'msg.loading': '加载中…',
  'msg.noData': '暂无数据',
  'time.justNow': '刚刚',
  'time.minutesAgo': '{n}分钟前',
  'time.hoursAgo': '{n}小时前',
  'time.daysAgo': '{n}天前',
};

const en: TranslationMap = {
  'dynasty.title': 'Sansheng-Liubu · Dashboard',
  'dynasty.subtitle': 'OpenClaw Control Center',
  'sync.ok': 'Sync OK',
  'sync.error': 'Server Offline',
  'sync.connecting': 'Connecting…',
  'sync.polling': 'Polling',
  'sync.realtime': 'Realtime',
  'edict.count': '{count} edicts',
  'edict.active': 'Active',
  'edict.archived': 'Archived',
  'edict.all': 'All',
  'edict.none': 'No edicts yet',
  'edict.hint': 'Send tasks via Feishu',
  'tab.edicts': 'Edict Board',
  'tab.court': 'Court',
  'tab.monitor': 'Monitor',
  'tab.officials': 'Officials',
  'tab.models': 'Models',
  'tab.skills': 'Skills',
  'tab.sessions': 'Sessions',
  'tab.memorials': 'Memorials',
  'tab.templates': 'Templates',
  'tab.morning': 'Morning Brief',
  'action.stop': 'Stop',
  'action.cancel': 'Cancel',
  'action.resume': 'Resume',
  'action.approve': 'Approve',
  'action.reject': 'Reject',
  'action.advance': 'Advance',
  'action.refresh': 'Refresh',
  'action.search': 'Search',
  'msg.serverError': 'Server connection failed',
  'msg.opSuccess': 'Success',
  'msg.loading': 'Loading…',
  'msg.noData': 'No data',
  'time.justNow': 'just now',
  'time.minutesAgo': '{n} min ago',
  'time.hoursAgo': '{n}h ago',
  'time.daysAgo': '{n}d ago',
};

const TRANSLATIONS: Record<Locale, TranslationMap> = {
  'zh-CN': zhCN,
  en,
  ja: en, // fallback to English for now
  ko: en,
  fr: en,
  de: en,
  es: en,
  ar: en,
};

// ── i18n 引擎 ──
function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LOCALES.includes(stored as Locale)) return stored as Locale;
  } catch { /* */ }
  const nav = navigator.language?.toLowerCase() || '';
  if (nav.startsWith('zh')) return 'zh-CN';
  if (nav.startsWith('ja')) return 'ja';
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('fr')) return 'fr';
  if (nav.startsWith('de')) return 'de';
  if (nav.startsWith('es')) return 'es';
  if (nav.startsWith('ar')) return 'ar';
  return 'zh-CN';
}

let _locale: Locale = detectLocale();
const _subscribers = new Set<(locale: Locale) => void>();

function persistLocale(locale: Locale) {
  try { localStorage.setItem(STORAGE_KEY, locale); } catch { /* */ }
}

/** 获取翻译 */
export function t(key: string, params?: Record<string, string | number>): string {
  const map = TRANSLATIONS[_locale] || zhCN;
  let val = map[key] as string | undefined;
  if (!val) {
    // fallback to zh-CN
    val = zhCN[key] as string | undefined;
    if (!val) return key; // key not found, return as-is
  }
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      val = val.replace(`{${k}}`, String(v));
    }
  }
  return val;
}

/** 获取当前语言 */
export function getLocale(): Locale {
  return _locale;
}

/** 设置语言 */
export function setLocale(locale: Locale) {
  if (_locale === locale) return;
  _locale = locale;
  persistLocale(locale);
  _subscribers.forEach((fn) => fn(locale));
}

/** 订阅语言变化 */
export function onLocaleChange(fn: (locale: Locale) => void) {
  _subscribers.add(fn);
  return () => _subscribers.delete(fn);
}

/** 获取可用语言列表 */
export function getAvailableLocales() {
  return LOCALES.map((loc) => ({ ...LANG_META[loc], id: loc }));
}

/** React Hook */
export function useLocale() {
  return {
    locale: getLocale(),
    setLocale,
    t,
    available: getAvailableLocales(),
    localeMeta: LANG_META[getLocale()],
  };
}

export { LANG_META };
