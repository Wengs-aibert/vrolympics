# Start Here - VROlympics Landing Page

## What This Repository Is

This is the VROlympics landing page application - a professional "Coming Soon" website for a VR exercise simulator platform that generates electricity through physical activity.

**Purpose**: Establish credibility, communicate the concept, and capture waitlist signups.

**MVP Timeline**: 1-2 days

This repository contains:
- **Application code** - Static landing page with Google Sheets integration
- **AI-context** - All context needed for stateless AI agents
- **Sprint system** - Task planning and tracking
- **Retro system** - Process improvement and learning
- **Debug tracking** - Debugging sessions and code investigations

## Reading Order for Agents

If you are an AI agent operating this repository:

1. **Read this file first** (`00-START-HERE.md`)
2. **Read `01-DESIGN.md`** - Understand the MVP design and scope
3. **Read `02-RULES.md`** - Understand the rules you must follow
4. **Read `03-REPO-MAP.md`** - Understand the repository structure
5. **Read `04-DEV-TEST.md`** - Understand how to run and test
6. **Read `05-DECISIONS.md`** - Understand past architectural decisions

Then proceed to `MASTER_PROMPT.md` to understand your operating model.

## Where Sprint Plans Live

Sprint plans are in the `sprints/` directory:

- `sprints/00-sprint-plan.md` - Overview of all sprints
- `sprints/sprint-01.md` - First sprint tasks and status

**Always check the sprint plan before starting work.**

## Where Retros Live

Retrospectives are in the `retro/` directory:

- `retro/latest.md` - Latest retro summary and learnings
- `retro/sprint-01.md` - Retro for sprint 01 (if created)
- `retro/evaluation-*.md` - Evaluation retros (if exists)

**Create retros only if there are notable learnings. Use evaluation mode to analyze patterns across sprints.**

## Where Debug Sessions Live

Debug sessions are in the `debug/` directory:

- `debug/debug-YYYY-MM-DD-<summary>.md` - Individual debug sessions
- `debug/README.md` - Debug session documentation

**Debug sessions track issues, questions, and code investigations. Important findings feed back into design, decisions, and sprints.**

## How Agents Should Operate

### One Task Per Session

- Work on **one task** at a time
- Tasks come from sprint files
- Update sprint status when complete
- Don't start new tasks until current one is done

### Stateless Operation

- **Every session starts fresh** - no conversation memory
- **All context is in files** - read `ai-context/` first
- **Update files** when you make changes that affect context

### Mandatory Testing

- Every feature must have tests (HTML validation, form validation, responsive tests)
- Tests are part of acceptance criteria
- Run tests before marking task complete

### Mandatory Updates

When you make changes:
- **Structure changes** → Update `03-REPO-MAP.md`
- **Design changes** → Update `01-DESIGN.md`
- **New decisions** → Update `05-DECISIONS.md`
- **Sprint complete** → Optionally create/update retro (only if notable learnings)

## Key Principles

- **MVP first**: Stay within MVP scope (see `01-DESIGN.md`)
- **Stateless agents**: All context in files
- **AI-context is source of truth**: If it's not documented, it doesn't exist
- **Retro-driven improvement**: Learn from each iteration
- **Debugging tracked**: All debugging sessions documented and findings fed back to context
- **Evaluation mode**: Periodically analyze retros to improve process and structure

## Project Specifics

**Application Type**: Web App (Static Landing Page)
**Stack**: HTML/CSS/JavaScript (minimal dependencies)
**Integration**: Google Sheets API for email collection
**Deployment**: Vercel/Netlify/GitHub Pages
**Brand Colors**: 
- Primary Blue: #0056B3
- Sky Blue: #4FC3F7
- Dark Navy: #2C3E50
- Highlight Orange: #FFB74D

## Boundaries

- **This app is autonomous** - Control Tower created it, but you operate it independently
- **NEVER edit Control Tower** - You cannot modify files in `control-tower/` or `../control-tower/` for any reason
- **Suggestions for Control Tower** - Document in retros; Control Tower reviews during evaluation mode
