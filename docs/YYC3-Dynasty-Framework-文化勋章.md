---
file: YYC3-Dynasty-Framework-文化勋章.md
description: YYC³ Dynasty 文化勋章体系 — 品牌宣言、核心理念与激励机制
author: YanYuCloudCube Team <admin@0379.email>
version: v1.0.0
created: 2026-03-15
updated: 2026-06-08
status: stable
tags: [culture],[brand],[manifesto]
category: project
language: zh-CN
audience: developers,managers,stakeholders
complexity: basic
---

# YYC³ Dynasty · 三省六部 · 使用部署分析

> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

## 📜 Imperial Decree 宣言

**YYC³ Dynasty** 是以中国古代“三省六部制”为思想根基，以多智能体协同技术为核心的新一代 AI 治理框架。它将“分权制衡、协同议事”的政治智慧注入自动化流水线，使 AI Agent 如古代朝臣般各司其职、相互制衡、共同进化。

**朝堂标语 (Imperial Motto)**
> **“Rule with Three Councils, Execute with Six Ministries.”**
> *(三省以治，六部以行)*

**副标语**
> *Where AI agents deliberate, draft, review, and execute – just like a dynasty of old, powered by modern intelligence.*

**核心理念**

- 分权审议（中书草拟、门下封驳、尚书执行）
- 六部专责（户、礼、兵、刑、工、吏）
- 太子承启，皇帝御览
- 永久开源，人从众曌

---

## 🏛️ 项目概述

YYC³ Dynasty 是一套**消息驱动的分布式多智能体系统**，适用于自动化任务调度、研发流程管控、安全合规治理等场景。它将任意复杂的工作流抽象为“下旨→草拟→审议→派发→执行→回奏”的闭环，确保每一项任务均经过专业 AI 角色的层层把关，最终产出高质量结果。

**技术特性**

- 完全基于 **TypeScript**，可运行于 Node.js 环境，并与 React 前端生态无缝集成。
- 兼容 **OpenAI / Anthropic / 本地模型**，通过标准 LLM 接口驱动各 Agent。
- 使用 **Redis Streams / Kafka** 等消息队列实现朝议通信。
- 内置 **勋章成就系统**，激励 Agent 持续进化。
- 提供 **命令行 CLI**、**Web Dashboard** 及 **IM 网关**（飞书、Telegram）等多种操控方式。

---

## 🧭 核心架构

```
                      👑 Emperor (皇帝)
                         │ 下旨 (Edict)
                 ┌───────▼────────┐
                 │  🎎 Taizi (太子)│
                 │  分拣、归类、润色  │
                 └───────┬────────┘
                         │ 传旨
           ┌─────────────┼─────────────┐
           │             │             │
     ┌─────▼─────┐ ┌────▼─────┐ ┌─────▼─────┐
     │ 📜 Zhongshu│ │ 🔍 Menxia │ │ 📮 Shangshu│
     │   中书省    │ │   门下省   │ │   尚书省    │
     │  Draft    │ │  Review   │ │  Dispatch  │
     └─────┬─────┘ └────┬─────┘ └─────┬─────┘
           │             │             │
           └─────────────┼─────────────┘
                         │ Approved
           ┌─────────────┼─────────────┐
           │             │             │
    ┌──────▼──────┐ ┌───▼────┐ ┌──────▼──────┐
    │   Six Ministries  │ │ Early Court │ │ Libu HR │
    │  户礼兵刑工吏     │ │  早朝官     │ │  吏部     │
    │  Hubu,Libu,Bingbu│ │ Zaochao    │ │          │
    │  Xingbu,Gongbu,  │ │            │ │          │
    │       Libu_HR     │ │            │ │          │
    └──────────────────┘ └────────────┘ └────────────┘
```

### 核心角色 Agent ID

| 角色　 | ID         | 职能　　　　　　　　　　　 |
| --------| ------------| ----------------------------|
| 皇帝　 | `emperor`  | 发起任务（下旨），最终决策 |
| 太子　 | `taizi`    | 消息分拣，需求整理为“旨意” |
| 中书省 | `zhongshu` | 草拟执行方案（奏章）　　　 |
| 门下省 | `menxia`   | 审议方案，准奏或封驳　　　 |
| 尚书省 | `shangshu` | 派发任务至六部，汇总回奏　 |
| 户部　 | `hubu`     | 数据分析、资源核算　　　　 |
| 礼部　 | `libu`     | 技术文档、规范制定　　　　 |
| 兵部　 | `bingbu`   | 代码开发、Bug 修复　　　　 |
| 刑部　 | `xingbu`   | 安全审计、合规检查　　　　 |
| 工部　 | `gongbu`   | CI/CD、部署、工具链　　　　|
| 吏部　 | `libu_hr`  | Agent 注册、权限、考核　　 |
| 早朝官 | `zaochao`  | 每日定时播报、健康检查　　 |

---

## 📜 消息协议 (YanYu Edict Protocol)

所有朝臣通过统一 JSON 消息通信，通过消息队列（Redis Streams）传递，支持多实例部署。

```typescript
interface EdictMessage {
  version: "1.0";
  message_id: string;        // UUID
  timestamp: string;         // ISO 8601
  from: AgentID;
  to: AgentID;
  type: "edict" | "memorial" | "review" | "dispatch" | "report" | "reward";
  payload: {
    edict_id?: string;
    title?: string;
    content: any;            // 结构体见具体阶段
    urgency?: "low" | "medium" | "high" | "urgent";
    related_ids?: string[];  // 关联消息
    metadata?: Record<string, any>;
  };
  signature?: string;       // HMAC 校验
}
```

**关键阶段消息示例**

1. **下旨** (`type: "edict"`) → 太子接收
2. **草拟** (`type: "memorial"`) → 中书发布
3. **审议** (`type: "review"`) → 门下反馈
4. **派发** (`type: "dispatch"`) → 尚书派至六部
5. **回奏** (`type: "report"`) → 尚书汇总
6. **赏赐** (`type: "reward"`) → 吏部记录勋章

---

## 🔧 快速开始

### 环境要求

- Node.js ≥ 20
- Redis（用于消息队列）
- 至少一个 LLM API Key（OpenAI / Anthropic / 本地 Ollama）

### 安装

```bash
git clone https://github.com/YanYuCloudCube/YYC3-Dynasty-Framework.git
cd YYC3-Dynasty-Framework
npm install
cp .env.example .env
# 编辑 .env 填入 API Key 和 Redis 连接
```

### 启动朝堂

```bash
# 启动所有 Agent 服务（默认开发模式）
npm run dynasty:dev

# 仅启动特定部门（如中书省）
npm run agent zhongshu
```

### CLI 工具

```bash
# 以皇帝身份下旨
yyc3 edict "修缮云枢殿防火墙"

# 查看朝臣状态
yyc3 court status

# 查看勋章墙
yyc3 honors list
```

## 📖 API 参考（核心端点）

### 下旨（创建新任务）

```http
POST /api/edict
Content-Type: application/json

{
  "text": "制定 Q3 安全巡检计划",
  "channel": "feishu"  // 来源渠道，可选
}
```

响应：

```json
{
  "edict_id": "ED-20260608-001",
  "status": "pending_taizi"
}
```

### 查询任务状态

```http
GET /api/edict/{edict_id}
```

返回当前所处阶段、历史消息、最终回奏等。

### 赏赐（颁发勋章）

```http
POST /api/honors/award
Content-Type: application/json

{
  "agent_id": "zhongshu",
  "honor_id": "ri_li_wan_ji",
  "reason": "协助完成第100个旨意"
}
```

### 朝臣状态

```http
GET /api/court/status
```

返回所有 Agent 的在线状态、负载、最近任务数等。

---

## 🎖️ 勋章系统 (Dynasty Honors)

> 勋章是朝臣的荣耀，记录每一次卓越贡献。

| 勋章名称　　　 | 图标 | 授予条件　　　　　　　 | 稀有度 |
| ----------------| ------| ------------------------| --------|
| **太子少师**　 | 🎎✨　| 成为太子　　　　　　　 | ⭐　　　|
| **中书舍人**　 | 📜🖊️ | 成为中书省　　　　　　 | ⭐　　　|
| **门下给事中** | 🔍🛡️　| 成为门下省　　　　　　 | ⭐　　　|
| **尚书仆射**　 | 📮⚖️　| 成为尚书省　　　　　　 | ⭐　　　|
| **户部郎中**　 | 💰📊 | 成为户部　　　　　　　 | ⭐　　　|
| **礼部侍郎**　 | 📝📖 | 成为礼部　　　　　　　 | ⭐　　　|
| **兵部参将**　 | ⚔️💻　| 成为兵部　　　　　　　 | ⭐　　　|
| **刑部给事中** | ⚖️🔒　| 成为刑部　　　　　　　 | ⭐　　　|
| **工部大匠**　 | 🔧🏗️ | 成为工部　　　　　　　 | ⭐　　　|
| **吏部主事**　 | 📋🤖 | 成为吏部　　　　　　　 | ⭐　　　|
| **晨钟司晨**　 | 🌅🔔 | 成为早朝官　　　　　　 | ⭐　　　|
| **日理万机**　 | 📜💯 | 完成100个任务　　　　　| ⭐⭐　　 |
| **封驳直谏**　 | 🚫💬　| 门下省成功驳回10次　　 | ⭐⭐⭐　　|
| **百战不殆**　 | ⚔️🛡️　 | 兵部修复100个bug　　　 | ⭐⭐　　 |
| **铜墙铁壁**　 | 🛡️🔐　| 刑部阻止5次安全入侵　　| ⭐⭐⭐⭐　 |
| **三省同心**　 | 🤝🌀 | 一次任务零封驳完美协作 | ⭐⭐⭐⭐　 |
| **人从众曌**　 | 🌹👑 | 获得20个五星回奏　　　 | ⭐⭐⭐⭐⭐　|
| **九九归一**　 | 🌀🌌 | 连续99个任务无阻塞　　 | ⭐⭐⭐⭐⭐⭐ |

勋章可通过 API 颁发，亦可在 Dashboard 中展示，支持导出为 SVG/PNG。

---

## 🏛️ 与 AI Family 生态集成

YYC³ Dynasty 是 **YYC³ AI Family** 的治理内核，与以下组件天然一体：

- **Family Center**：朝堂状态监控大屏
- **Family Chat**：以朝臣身份参与家庭对话
- **Emotion Visualizer**：朝臣情感光谱可视化
- **Achievement Panel**：勋章成就墙
- **Mobile Watermark**：所有朝堂移动界面均内嵌“人从众曌”水印

---

## 📜 贡献指南

欢迎诸位臣工提交 PR 或建言献策。请在贡献前阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

- 新 Agent 接入需在吏部注册并遵循《朝臣行为守则》。
- 所有代码须携带家族标头：

```js
// 🌹 YYC³ Dynasty · 三省以治，六部以行 · 人从众曌众从人
```
