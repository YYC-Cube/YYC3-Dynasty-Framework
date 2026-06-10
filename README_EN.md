# YYC³ Dynasty Project Overview — Introduction, Quick Start, Architecture & Deployment

<div align="center">

<img src="public/YYC3-Family-001.png" alt="YYC³ Dynasty Framework" width="100%">

</div>

<div align="center">

# YYC³ Dynasty Framework

**Three Departments and Six Ministries · AI Multi-Agent Collaboration Architecture**

[![Website](https://img.shields.io/badge/Website-dynasty.yyc3.vip-blue?style=flat-square&logo=globe&logoColor=white)](https://dynasty.yyc3.vip)
[![GitHub](https://img.shields.io/badge/GitHub-YYC3--Dynasty--Framework-181717?style=flat-square&logo=github)](https://github.com/YYC-Cube/YYC3-Dynasty-Framework)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://hub.docker.com/r/yyc3/dynasty-demo)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=flat-square&logo=githubactions&logoColor=white)](https://dynasty.yyc3.vip)

[![CI](https://img.shields.io/github/actions/workflow/status/YYC-Cube/YYC3-Dynasty-Framework/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/YYC-Cube/YYC3-Dynasty-Framework/actions/workflows/ci.yml)
[![Docker Build](https://img.shields.io/github/actions/workflow/status/YYC-Cube/YYC3-Dynasty-Framework/docker-publish.yml?branch=main&style=flat-square&label=Docker)](https://github.com/YYC-Cube/YYC3-Dynasty-Framework/actions/workflows/docker-publish.yml)
[![Pages Deploy](https://img.shields.io/github/actions/workflow/status/YYC-Cube/YYC3-Dynasty-Framework/pages-deploy.yml?branch=main&style=flat-square&label=Pages)](https://github.com/YYC-Cube/YYC3-Dynasty-Framework/actions/workflows/pages-deploy.yml)
[![Stars](https://img.shields.io/github/stars/YYC-Cube/YYC3-Dynasty-Framework?style=flat-square&logo=starship&logoColor=white)](https://github.com/YYC-Cube/YYC3-Dynasty-Framework/stargazers)
[![Issues](https://img.shields.io/github/issues/YYC-Cube/YYC3-Dynasty-Framework?style=flat-square)](https://github.com/YYC-Cube/YYC3-Dynasty-Framework/issues)
[![PRs](https://img.shields.io/github/issues-pr/YYC-Cube/YYC3-Dynasty-Framework?style=flat-square)](https://github.com/YYC-Cube/YYC3-Dynasty-Framework/pulls)

**中文** | [English](README_EN.md)

</div>

<div align="center">

> ***YanYuCloudCube***
> *Words Initiate Quadrants, Language Serves as Core for Future*
> *言启象限 | 语枢未来*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

</div>

> 🐳 **No OpenClaw?** Run `docker run -p 7891:7891 yyc3/dynasty-demo` to try the full Kanban demo with mock data.
> 🌐 **Live Demo**: [dynasty.yyc3.vip](https://dynasty.yyc3.vip)

---

## 🤔 Why Three Departments & Six Ministries?

Most Multi-Agent frameworks follow this pattern:

> *"Here, you AIs chat amongst yourselves, then give me the result."*

Then you get a blob of output with no idea how it was processed — impossible to reproduce, audit, or intervene.

**YYC³ Dynasty takes a completely different approach** — inspired by a governance system that existed in China for over 1,400 years:

```
You (Emperor) → Crown Prince (Sorting) → Secretariat (Planning) → Chancellery (Review) → Department of State Affairs (Dispatch) → Six Ministries (Execution) → Report
```

This isn't a fancy metaphor — it's **genuine checks and balances**:

| | CrewAI | MetaGPT | AutoGen | **YYC³ Dynasty** |
|---|:---:|:---:|:---:|:---:|
| **Review Mechanism** | ❌ None | ⚠️ Optional | ⚠️ Human-in-loop | **✅ Dedicated Chancellery Review · Can Reject** |
| **Live Dashboard** | ❌ | ❌ | ❌ | **✅ Grand Council Kanban + Timeline** |
| **Task Intervention** | ❌ | ❌ | ❌ | **✅ Pause / Cancel / Resume** |
| **Workflow Audit** | ⚠️ | ⚠️ | ❌ | **✅ Complete Memorial Archive** |
| **Agent Health Monitor** | ❌ | ❌ | ❌ | **✅ Heartbeat + Activity Detection** |
| **Hot-Swap Models** | ❌ | ❌ | ❌ | **✅ One-Click LLM Switch** |
| **Skills Management** | ❌ | ❌ | ❌ | **✅ View / Add Skills** |
| **News Aggregation** | ❌ | ❌ | ❌ | **✅ Daily Briefing + Feishu Push** |
| **Deploy Difficulty** | Medium | High | Medium | **Low · One-Click Install / Docker** |

> **Core Differentiator: Institutional Review + Full Observability + Real-Time Intervention**

<details>
<summary><b>🔍 Why is "Chancellery Review" a Killer Feature? (Click to expand)</b></summary>

<br>

CrewAI and AutoGen's collaboration model is **"finish and submit"** — no one checks output quality. Like a company without a QA department, engineers push code directly to production.

The **Chancellery (Menxia)** in YYC³ Dynasty is specifically designed for this:

- 📋 **Review plan quality** — Is the Secretariat's plan complete? Are subtasks well-decomposed?
- 🚫 **Reject subpar outputs** — Not a warning, but a direct rejection with mandatory rework
- 🔄 **Enforced rework loop** — Plans don't proceed until they meet quality standards

This isn't an optional plugin — **it's part of the architecture**. Every edict must pass through the Chancellery, no exceptions.

This is why YYC³ Dynasty handles complex tasks reliably: there's a mandatory quality gate before anything reaches the execution layer. Emperor Taizong figured this out 1,300 years ago — **unchecked power inevitably makes mistakes**.

</details>

---

## ✨ Feature Overview

### 🏛️ Twelve-Agent Architecture

- **Crown Prince** message sorting — auto-reply for casual chat, create tasks for edicts
- **Three Departments** (Secretariat · Chancellery · Department of State Affairs) for planning, review, and dispatch
- **Seven Ministries** (Revenue · Rites · War · Justice · Works · Personnel + Morning Herald) for specialized execution
- Strict permission matrix — who can message whom, clearly defined
- **State transition validation** — kanban_update.py enforces legal transition paths, illegal state jumps are rejected
- Each Agent has independent Workspace · Skills · Model
- **Edict data cleaning** — auto-strip file paths, metadata, invalid prefixes from titles/notes

### 📋 Grand Council Dashboard (11 Feature Panels)

<table>
<tr><td width="50%">

**📋 Edict Kanban**

- All tasks displayed by status columns
- Department filter + full-text search
- Heartbeat badges (🟢Active 🟡Stalled 🔴Alert)
- Task details + complete workflow chain
- Pause / Cancel / Resume actions

</td><td width="50%">

**🔭 Department Monitor**

- Visualize task counts by status
- Department distribution bar chart
- Agent health status real-time cards

</td></tr>
<tr><td>

**📜 Memorial Archive**

- Completed edicts auto-archived as memorials
- Five-stage timeline: Edict→Secretariat→Chancellery→Ministries→Report
- One-click copy as Markdown
- Filter by status

</td><td>

**📜 Edict Templates**

- 9 preset edict templates
- Category filter · Parameter forms · Estimated time & cost
- Preview edict → One-click dispatch

</td></tr>
<tr><td>

**👥 Officials Overview**

- Token consumption leaderboard
- Activity · Completions · Session stats

</td><td>

**📰 Daily Briefing**

- Auto-collect tech/finance news daily
- Category subscription management + Feishu push

</td></tr>
<tr><td>

**⚙️ Model Config**

- Switch LLM independently for each Agent
- Auto-restart Gateway on apply (~5s)

</td><td>

**🛠️ Skills Config**

- View installed Skills per department
- View details + add new skills

</td></tr>
<tr><td>

**💬 Sessions**

- OC-* session real-time monitoring
- Source channel · Heartbeat · Message preview

</td><td>

**🎬 Court Ceremony**

- Opening animation on first visit each day
- Today's stats · 3.5s auto-dismiss

</td></tr>
<tr><td>

**🏛️ Court Discussion**

- Multi-official debate on topics from department perspectives
- LLM-driven multi-role debate (each ministry speaks from its expertise)
- Multi-round progression · Summary conclusions · Discussion records preserved

</td><td>

**🔍 Global Search**

- Ctrl+K search all edicts/officials
- Real-time filtering · One-click navigation

</td></tr>
<tr><td>

**🌐 i18n · 10 Languages**

- Chinese/English/Japanese/Korean/French/German/Spanish/Portuguese/Russian/Arabic
- Flag emoji one-click switch · Auto-detect

</td><td>

**📐 Panel Layout**

- Drag-to-resize panels
- Show/hide · Maximize/restore
- Persistent layout (localStorage)

</td></tr>
</table>

---

## 🖼️ Screenshots

### Edict Kanban

![Edict Kanban](docs/screenshots/01-kanban-main.png)

<details>
<summary>📸 Click to view more screenshots</summary>

### Department Monitor

![Department Monitor](docs/screenshots/02-monitor.png)

### Task Flow Details

![Task Flow Details](docs/screenshots/03-task-detail.png)

### Model Config

![Model Config](docs/screenshots/04-model-config.png)

### Skills Config

![Skills Config](docs/screenshots/05-skills-config.png)

### Officials Overview

![Officials Overview](docs/screenshots/06-official-overview.png)

### Sessions

![Sessions](docs/screenshots/07-sessions.png)

### Memorial Archive

![Memorial Archive](docs/screenshots/08-memorials.png)

### Edict Templates

![Edict Templates](docs/screenshots/09-templates.png)

### Daily Briefing

![Daily Briefing](docs/screenshots/10-morning-briefing.png)

### Court Ceremony

![Court Ceremony](docs/screenshots/11-ceremony.png)

</details>

---

## 🚀 Quick Start in 30 Seconds

### Live Demo

Open [dynasty.yyc3.vip](https://dynasty.yyc3.vip) to try the Grand Council Dashboard.

### Docker One-Click Launch

```bash
docker run -p 7891:7891 yyc3/dynasty-demo
```

Open <http://localhost:7891> to experience the Grand Council Dashboard.

<details>
<summary><b>⚠️ Getting <code>exec format error</code>? (Click to expand)</b></summary>

If you see this on an **x86/amd64** machine (e.g., Ubuntu, WSL2):

```
exec /usr/local/bin/python3: exec format error
```

This is due to image architecture mismatch. Use the `--platform` flag:

```bash
docker run --platform linux/amd64 -p 7891:7891 yyc3/dynasty-demo
```

Or use docker-compose (with built-in `platform: linux/amd64`):

```bash
docker compose up
```

</details>

### Full Installation

#### Prerequisites

- [OpenClaw](https://openclaw.ai) installed
- Python 3.9+
- macOS / Linux

#### Install

```bash
git clone https://github.com/YYC-Cube/YYC3-Dynasty-Framework.git
cd YYC3-Dynasty-Framework
chmod +x install.sh && ./install.sh
```

The install script automatically:

- ✅ Creates all Agent Workspaces (including Crown Prince, Personnel, Morning Herald, compatible with legacy main)
- ✅ Writes SOUL.md for each department (persona + workflow rules + data cleaning specs)
- ✅ Registers Agents and permission matrix to `openclaw.json`
- ✅ **Symlinks unified data** (each Workspace's data/scripts → project directory)
- ✅ **Sets inter-Agent communication visibility** (`sessions.visibility all`)
- ✅ **Syncs API Key to all Agents** (auto-copy from configured Agent)
- ✅ Builds React frontend (requires Node.js 18+, skipped if not installed)
- ✅ Initializes data directory + first data sync (including officials stats)
- ✅ Restarts Gateway to apply configuration

> ⚠️ **First-time install**: Configure API Key first: `openclaw agents add taizi`, then re-run `./install.sh` to sync to all Agents.

#### Start

```bash
# Option 1: One-click start (recommended)
chmod +x start.sh && ./start.sh

# Option 2: Start separately (edict backend + frontend)
cd edict/backend && uvicorn app.main:app --port 8000 &
cd edict/frontend && npx vite dev --port 5173 &

# Or legacy kanban (data sync mode)
bash scripts/run_loop.sh &

# Open browser
open http://localhost:5173              # New edict frontend
```

<details>
<summary><b>🖥️ Production Deployment (systemd)</b></summary>

```bash
# Install systemd service
sudo cp edict.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable edict
sudo systemctl start edict

# Or use management script
bash edict.sh start    # Start
bash edict.sh status   # Check status
bash edict.sh restart  # Restart
bash edict.sh stop     # Stop
```

</details>

> 💡 See the [Getting Started Guide](docs/getting-started.md) for detailed instructions

---

## 🏛️ Architecture

```
                           ┌───────────────────────────────────┐
                           │          👑 Emperor (You)          │
                           │     Feishu · Telegram · Signal     │
                           └─────────────────┬─────────────────┘
                                             │ Edict
                           ┌─────────────────▼─────────────────┐
                           │       👑 Crown Prince (taizi)      │
                           │    Sort: chat reply / task create    │
                           └─────────────────┬─────────────────┘
                                             │ Forward
                           ┌─────────────────▼─────────────────┐
                           │     📜 Secretariat (zhongshu)       │
                           │     Receive → Plan → Decompose       │
                           └─────────────────┬─────────────────┘
                                             │ Submit Review
                           ┌─────────────────▼─────────────────┐
                           │      🔍 Chancellery (menxia)        │
                           │     Review → Approve / Reject 🚫    │
                           └─────────────────┬─────────────────┘
                                             │ Approved ✅
                           ┌─────────────────▼─────────────────┐
                           │    📮 Dept. of State (shangshu)     │
                           │   Dispatch → Coordinate → Report    │
                           └───┬──────┬──────┬──────┬──────┬───┘
                               │      │      │      │      │
                         ┌─────▼┐ ┌───▼───┐ ┌▼─────┐ ┌───▼─┐ ┌▼─────┐
                         │💰Rev.│ │📝Rites│ │⚔️ War│ │⚖️Just│ │🔧Work│
                         │ Data │ │  Docs │ │ Eng. │ │Compl.│ │ Infra│
                         └──────┘ └──────┘ └──────┘ └─────┘ └──────┘
                                                               ┌──────┐
                                                               │📋Pers.│
                                                               │  HR  │
                                                               └──────┘
```

### Department Responsibilities

| Department | Agent ID | Responsibility | Expertise |
| ---| ---| ---| ---|
| 👑 **Crown Prince** | `taizi` | Message sorting, requirement organization | Chat detection, edict extraction, title summarization |
| 📜 **Secretariat** | `zhongshu` | Receive edicts, plan, decompose | Requirement understanding, task decomposition, solution design |
| 🔍 **Chancellery** | `menxia` | Review, vet, reject | Quality assessment, risk identification, standards enforcement |
| 📮 **Dept. of State** | `shangshu` | Dispatch, coordinate, aggregate | Task scheduling, progress tracking, result integration |
| 💰 **Revenue** | `hubu` | Data, resources, accounting | Data processing, report generation, cost analysis |
| 📝 **Rites** | `libu` | Documentation, standards, reports | Technical docs, API docs, standards development |
| ⚔️ **War** | `bingbu` | Code, algorithms, inspection | Feature development, bug fixes, code review |
| ⚖️ **Justice** | `xingbu` | Security, compliance, audit | Security scanning, compliance checks, red line management |
| 🔧 **Works** | `gongbu` | CI/CD, deployment, tooling | Docker configuration, pipelines, automation |
| 📋 **Personnel** | `libu_hr` | HR, Agent management | Agent registration, permission maintenance, training |
| 🌅 **Morning Herald** | `zaochao` | Daily briefing, news aggregation | Scheduled broadcasting, data summary |

### Permission Matrix

> Can't just message anyone — genuine checks and balances

| From ↓ \ To → | Prince | Secretariat | Chancellery | State | Rev. | Rites | War | Justice | Works | Pers. |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Prince** | — | ✅ | | | | | | | | |
| **Secretariat** | ✅ | — | ✅ | ✅ | | | | | | |
| **Chancellery** | | ✅ | — | ✅ | | | | | | |
| **Dept. of State** | | ✅ | ✅ | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Ministries+Pers.** | | | | ✅ | | | | | | |

### Task State Flow

```
Emperor → Prince Sort → Secretariat Plan → Chancellery Review → Dispatched → Executing → Review → ✅ Completed
                          ↑          │                                      │
                          └── Rejected ─┘                           Blocked
```

> ⚡ **State transitions are protected**: `kanban_update.py` has built-in `_VALID_TRANSITIONS` state machine validation.
> Illegal jumps (e.g., Doing→Taizi) are rejected and logged.
>
> 🔄 **Async event-driven**: Services communicate via Redis Streams EventBus, Outbox Relay ensures reliable event delivery.
> All state changes are automatically written to audit logs (`audit.py`), supporting full traceability.

---

## 📁 Project Structure

```
YYC3-Dynasty-Framework/
├── agents/                     # 12 Agent persona templates
│   ├── taizi/SOUL.md           # Crown Prince · Message sorting
│   ├── zhongshu/SOUL.md        # Secretariat · Planning hub
│   ├── menxia/SOUL.md          # Chancellery · Review gate
│   ├── shangshu/SOUL.md        # Dept. of State · Dispatch brain
│   ├── hubu/SOUL.md            # Revenue · Data resources
│   ├── libu/SOUL.md            # Rites · Documentation standards
│   ├── bingbu/SOUL.md          # War · Engineering
│   ├── xingbu/SOUL.md          # Justice · Compliance audit
│   ├── gongbu/SOUL.md          # Works · Infrastructure
│   ├── libu_hr/                # Personnel · HR management
│   └── zaochao/SOUL.md         # Morning Herald · Intelligence hub
├── edict/backend/              # Async backend service (FastAPI + SQLAlchemy + Redis)
│   ├── app/
│   │   ├── api/                # API routes (tasks/agents/events/admin/websocket)
│   │   ├── channels/           # 9 notification channels (Feishu/WeCom/Telegram/etc)
│   │   ├── models/             # ORM models (task/audit/outbox/thought/todo)
│   │   ├── services/           # Business services (TaskService / EventBus)
│   │   └── workers/            # Background workers (dispatch/orchestrator/outbox)
│   └── app/main.py             # FastAPI entry
├── edict/frontend/             # React + TypeScript frontend (Vite)
│   ├── src/
│   │   ├── components/         # 18 React components
│   │   │   ├── App.tsx         # Main app entry
│   │   │   ├── store.ts        # Zustand state management
│   │   │   ├── api.ts          # HTTP/WebSocket API layer
│   │   │   ├── i18n.ts         # i18n engine (10 languages)
│   │   │   ├── useWebSocket.ts # WebSocket real-time push
│   │   │   └── index.css       # Unified styles (3864 lines)
│   │   └── components/
│   │       ├── DashboardLayout.tsx  # Drag-resizable panel layout
│   │       ├── GlobalSearch.tsx     # Ctrl+K global search
│   │       ├── MarkdownRenderer.tsx # Markdown rendering
│   │       ├── LanguageSwitcher.tsx # Language switcher
│   │       ├── EdictBoard.tsx       # Edict Kanban
│   │       ├── TaskModal.tsx        # Task detail modal
│   │       ├── CourtDiscussion.tsx  # Court discussion
│   │       ├── MonitorPanel.tsx     # Department monitor
│   │       ├── OfficialPanel.tsx    # Officials + merit ranking
│   │       └── ...                  # Other 8 panels
│   └── dist/                   # Build output
├── scripts/
│   ├── run_loop.sh             # Data refresh loop (every 15s)
│   ├── kanban_update.py        # Kanban CLI (edict data cleaning + title validation + state machine)
│   ├── skill_manager.py        # Skill management tool (remote/local add, update, remove)
│   └── ...                     # More utility scripts
├── tests/
│   ├── test_e2e_kanban.py      # End-to-end tests (17 assertions)
│   └── test_state_machine_consistency.py  # State machine consistency tests
├── docs/
│   ├── task-dispatch-architecture.md  # Detailed architecture documentation
│   ├── getting-started.md             # Quick start guide
│   └── screenshots/                   # Feature screenshots (11 images)
├── install.sh                  # One-click install script
├── start.sh                    # One-click start (Dashboard + data refresh)
├── CONTRIBUTING.md             # Contribution guide
└── LICENSE                     # MIT License
```

---

## 🎯 Usage

### Issue an Edict to AI

Send a message to the Secretariat via Feishu / Telegram / Signal:

```
Design a user registration system with:
1. RESTful API (FastAPI)
2. PostgreSQL database
3. JWT authentication
4. Complete test cases
5. Deployment documentation
```

**Then sit back and watch:**

1. 📜 Secretariat receives the edict, plans subtask allocation
2. 🔍 Chancellery reviews, approves / rejects for re-planning
3. 📮 Dept. of State dispatches to War + Works + Rites ministries
4. ⚔️ Ministries execute in parallel, progress visible in real-time
5. 📮 Dept. of State aggregates results, reports back to you

The entire process is monitored in real-time on the **Grand Council Dashboard**, with the ability to **pause, cancel, or resume** at any time.

### Use Edict Templates

> Dashboard → 📜 Templates → Select template → Fill parameters → Dispatch

9 preset templates: Weekly Report · Code Review · API Design · Competitive Analysis · Data Report · Blog Post · Deployment Plan · Email Draft · Standup Summary

### Customize Agents

Edit `agents/<id>/SOUL.md` to modify an Agent's persona, responsibilities, and output standards.

### Add Skills (Connect from Web)

**Three ways to add Skills:**

#### 1️⃣ Dashboard UI (Simplest)

```
Dashboard → 🛠️ Skills Config → ➕ Add Remote Skill
→ Enter Agent + Skill name + GitHub URL
→ Confirm → ✅ Done
```

#### 2️⃣ CLI Command (Most Flexible)

```bash
# Add code_review skill to Secretariat from GitHub
python3 scripts/skill_manager.py add-remote \
  --agent zhongshu \
  --name code_review \
  --source https://raw.githubusercontent.com/openclaw-ai/skills-hub/main/code_review/SKILL.md \
  --description "Code review skill"

# Import official skills hub to specified agents
python3 scripts/skill_manager.py import-official-hub \
  --agents zhongshu,menxia,shangshu,bingbu,xingbu

# List all remote skills
python3 scripts/skill_manager.py list-remote

# Update a skill to latest version
python3 scripts/skill_manager.py update-remote \
  --agent zhongshu \
  --name code_review
```

#### 3️⃣ API Request (Automation Integration)

```bash
# Add remote skill
curl -X POST http://localhost:7891/api/add-remote-skill \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "zhongshu",
    "skillName": "code_review",
    "sourceUrl": "https://raw.githubusercontent.com/...",
    "description": "Code review"
  }'

# View all remote skills
curl http://localhost:7891/api/remote-skills-list
```

**Official Skills Hub:** <https://github.com/openclaw-ai/skills-hub>

See [🎓 Remote Skills Management Guide](docs/remote-skills-guide.md) for details.

---

## 🔧 Technical Highlights

| Feature | Description |
|---------|-------------|
| **React 18 Frontend** | TypeScript + Vite + Zustand state management, 13 feature components |
| **Pure stdlib Backend** | `server.py` based on `http.server`, zero dependencies, serves both API + static files |
| **EventBus** | Redis Streams pub/sub for decoupled inter-service communication |
| **Outbox Relay** | Transactional Outbox pattern for reliable event delivery (at-least-once semantics) |
| **State Machine Audit** | Strict lifecycle state transitions + complete audit logs (`audit.py`) |
| **Parallel Dispatch Engine** | Dispatch Worker supports parallel execution, exponential backoff retry, resource locks |
| **DAG Orchestrator** | DAG-based task decomposition and dependency resolution |
| **Agent Thinking Visualization** | Real-time display of Agent thinking process, tool calls, and results |
| **One-Click Install/Start** | `install.sh` auto-configures, `start.sh` launches all services |
| **systemd Production Deploy** | `edict.service` supports systemd daemon, auto-start on boot |
| **15s Sync** | Auto data refresh, countdown displayed on dashboard |
| **Dashboard Auth** | `auth.py` provides dashboard login authentication |
| **Daily Ceremony** | Opening animation on first visit each day |
| **Remote Skills Ecosystem** | One-click import from GitHub/URL, version management + CLI + API + UI |

---

## 📚 Documentation

- **[📖 Task Dispatch Architecture](docs/task-dispatch-architecture.md)** — **Must Read**
  - Detailed explanation of how YYC³ Dynasty handles complex tasks
  - Covers: 9-state task machine / Permission matrix / 4-stage dispatch (retry→escalate→rollback) / Session JSONL data fusion
  - Comparison with CrewAI/AutoGen: why institutional > free collaboration
  - **Reading this doc explains why YYC³ Dynasty is so powerful** (9,500+ words)

- **[🎓 Remote Skills Management Guide](docs/remote-skills-guide.md)** — Skills Ecosystem
- **[⚡ Remote Skills Quickstart](docs/remote-skills-quickstart.md)** — Get started in 5 minutes
- **[🚀 Getting Started Guide](docs/getting-started.md)** — New user onboarding
- **[🤝 Contributing Guide](CONTRIBUTING.md)** — Want to contribute? Start here

---

## 🗺️ Roadmap

> Full roadmap and how to participate: [ROADMAP.md](ROADMAP.md)

### Phase 1 — Core Architecture ✅

- [x] Twelve-Agent architecture (Crown Prince + 3 Departments + 7 Ministries) + Permission matrix
- [x] Grand Council real-time dashboard (10 feature panels)
- [x] Task pause / cancel / resume
- [x] Memorial system (auto-archive + five-stage timeline)
- [x] Edict template library (9 presets + parameter forms)
- [x] Court ceremony animation
- [x] Daily briefing + Feishu push + subscription management
- [x] Model hot-swap + skills management
- [x] Officials overview + Token consumption stats
- [x] Sessions monitoring
- [x] Crown Prince message sorting
- [x] Edict data cleaning
- [x] Duplicate task prevention
- [x] E2E test coverage (17 assertions)
- [x] React 18 frontend refactor (TypeScript + Vite + Zustand · 13 components)
- [x] Agent thinking visualization
- [x] Integrated frontend/backend deployment

### Phase 2 — Institutional Deepening 🚧

- [ ] Imperial Review mode (human approval + one-click approve/reject)
- [x] Merit & Demerit Register (Agent performance scoring + model recommendation)
- [x] EventBus (Redis Streams decoupled communication)
- [x] Outbox Relay (transactional event delivery)
- [x] State machine audit
- [x] Parallel dispatch engine
- [x] DAG orchestrator
- [x] Dashboard authentication
- [x] One-click start / systemd production deployment
- [ ] Express Courier (real-time inter-Agent message flow visualization)
- [ ] Imperial Archives (knowledge base retrieval + citation tracing)

### Phase 3 — Ecosystem Expansion

- [ ] Docker Compose + Demo image
- [ ] Notion / Linear adapters
- [ ] Annual Review (Agent annual performance report)
- [ ] Mobile adaptation + PWA
- [ ] ClawHub marketplace listing

---

## 🤝 Contributing

All forms of contribution are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

Special areas of interest:

- 🎨 **UI Enhancement**: Dark/light themes, responsive design, animation optimization
- 🤖 **New Agents**: Specialized agent roles for specific scenarios
- 📦 **Skills Ecosystem**: Department-specific skill packages
- 🔗 **Integration Extensions**: Notion · Jira · Linear · GitHub Issues
- 🌐 **Internationalization**: Japanese · Korean · Spanish
- 📱 **Mobile**: Responsive adaptation, PWA

---

## 📂 Examples

The `examples/` directory contains real end-to-end use cases:

| Case | Edict | Departments Involved |
|------|-------|---------------------|
| [Competitive Analysis](examples/competitive-analysis.md) | "Analyze CrewAI vs AutoGen vs LangGraph" | Secretariat→Chancellery→Revenue+War+Rites |
| [Code Review](examples/code-review.md) | "Review the security of this FastAPI code" | Secretariat→Chancellery→War+Justice |
| [Weekly Report](examples/weekly-report.md) | "Generate this week's engineering team report" | Secretariat→Chancellery→Revenue+Rites |

---

## ⭐ Star History

If this project makes you smile, please give it a Star ⚔️

[![Star History Chart](https://api.star-history.com/svg?repos=YYC-Cube/YYC3-Dynasty-Framework&type=Date)](https://star-history.com/#YYC-Cube/YYC3-Dynasty-Framework&Date)

---

## 📄 License

[MIT](LICENSE) · Built by the [OpenClaw](https://openclaw.ai) community

---

**Thank you for your trust and support! Marching forward with intelligence ❤️**

<div align="center">

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***」

**© 2025-2026 YYC³ Team. All Rights Reserved.**
</div>
