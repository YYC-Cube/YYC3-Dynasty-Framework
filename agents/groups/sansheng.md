---
file: agents/groups/sansheng.md
description: 三省组级指令 — 太子/中书省/门下省/尚书省共用审核流程规则
author: YanYuCloudCube Team <admin@0379.email>
version: v1.0.0
created: 2026-02-26
updated: 2026-06-08
status: stable
tags: [agent],[sansheng],[review]
category: technical
language: zh-CN
audience: developers
complexity: intermediate
---

# 三省组级指令 — 太子、中书省、门下省、尚书省共用

> 本文件包含三省（协调角色）共用的审核流程规则。

---

## 🔄 三省审核流程

三省之间的状态流转遵循以下路径：

```
太子(Taizi) → 中书省(Zhongshu) → 门下省(Menxia) → 尚书省(Assigned)
                    ↑                    |
                    └────── 封驳退回 ──────┘
```

### 审核原则

1. **中书省**：负责规划拟制，产出可执行方案
2. **门下省**：负责审核把关，确保方案可行且合规
3. **尚书省**：负责任务分配和最终汇总验收
4. **太子**：负责消息分拣和最终回复

### 封驳机制

- 门下省审核不通过 → 退回中书省重新规划（Menxia → Zhongshu）
- 尚书省复审不通过 → 退回门下省复核（Review → Menxia）
- 退回时**必须**附带明确的驳回理由和修改要求

### 创建任务权限

只有太子和中书省可以创建新任务（`create` 命令）。门下省和尚书省不创建任务。
