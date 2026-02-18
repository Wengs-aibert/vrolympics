# VROlympics Repository Map

This file describes the structure and organization of the VROlympics landing page repository.

## Current Structure

```
vrolympics/
  ai-context/              # AI agent context and documentation
    00-START-HERE.md       # Entry point for agents
    01-DESIGN.md           # MVP design document
    02-RULES.md            # Rules for agents
    03-REPO-MAP.md         # This file - repository structure
    04-DEV-TEST.md         # Development and testing guide
    05-DECISIONS.md        # Architectural decisions log
    06-FRONTEND.md         # Frontend documentation index
    frontend/              # Detailed frontend docs
      01-VISUAL-DESIGN.md  # Ivory Clinic-inspired visual design
      02-USER-EXPERIENCE.md
      03-INTEGRATION-LAYER.md
      04-DATA-FLOW.md
      CONTENT.md           # Copy and content reference
  
  sprints/                 # Sprint planning and tracking
    00-sprint-plan.md      # Sprint overview
    sprint-01.md           # Sprint 1: Project setup and core structure (COMPLETE)
    sprint-02.md           # Sprint 2: Ivory Clinic design overhaul (COMPLETE)
  
  retro/                   # Retrospectives
    latest.md              # Latest retro summary
    evaluation-template.md # Template for evaluations
  
  debug/                   # Debug sessions
    README.md              # Debug documentation
    debug-template.md      # Template for debug sessions
  
  public/                  # Static frontend (deployed)
    index.html             # Main landing page (194 lines)
    styles.css             # Ivory Clinic-inspired stylesheet (1039 lines)
    script.js              # Form validation & Google Sheets submission (294 lines)
    assets/                # Images, icons, etc.
      images/              # Image placeholders
  
  config/                  # Configuration files
    google-sheets.config.js  # Google Sheets API configuration
    SETUP-GUIDE.md         # Integration setup guide
  
  tests/                   # Testing
    TESTING-CHECKLIST.md   # Manual testing checklist
  
  MASTER_PROMPT.md         # App operator instructions
  README.md                # Project README
  DEPLOYMENT.md            # Deployment guide
```

## Major Folders/Modules

### `/public` - Frontend Files
The main landing page application lives here:
- **index.html** - Main HTML file with semantic structure
- **styles.css** - All styling, mobile-first responsive design
- **script.js** - Form validation and Google Sheets submission
- **assets/** - Images, icons, and other static resources

### `/config` - Configuration
Configuration files for integrations:
- **google-sheets.config.js** - Google Sheets API setup and credentials

### `/tests` - Testing
Test files for validation:
- **validation.test.js** - Form validation unit tests
- **responsive.test.html** - Visual responsive design tests
- Manual testing checklists

### `/ai-context` - AI Documentation
All context for AI agents (read-only reference, update as needed)

### `/sprints` - Sprint Planning
Sprint tasks and tracking (update as tasks complete)

### `/retro` - Retrospectives
Process learnings (create only if notable issues/learnings)

### `/debug` - Debug Sessions
Issue investigation and code exploration

## File Organization Principles

- **Static site structure** - Simple HTML/CSS/JS organization
- **Mobile-first** - Styles written mobile-first, enhanced for desktop
- **Separation of concerns** - HTML structure, CSS presentation, JS behavior
- **Config separation** - API keys and config in separate files
- **Test co-location** - Tests in dedicated directory

## Intended Application Structure

### HTML Structure (index.html)
```
- Nav (fixed, translucent with backdrop-blur)
- Hero Section (soft-gray bg, Ivory Clinic-inspired)
  - Mixed-weight headline (thin/bold/light spans)
  - Hero visual placeholder (3:4 portrait, floating badges)
  - CTA button (pill-shaped)
  - Scroll indicator (circle + SVG arrow)
- Stats Section ("2026 Beta Launch")
- Experience Section (full-screen mixed-weight text block)
- Concept Section (heading + 3 numbered feature cards)
- Waitlist Form Section (email input + submit)
- Footer (brand + copyright)
```
- Concept Section
  - Description
  - Key features/benefits
- Waitlist Form Section
  - Email input
  - Submit button
  - Success/error messages
- Footer
  - Copyright
  - Social placeholders (optional)
```

### CSS Organization (styles.css)
```
- Reset/base styles
- Typography
- Layout (mobile-first)
- Components (button, form, sections)
- Responsive breakpoints (tablet, desktop)
- Brand colors and variables
```

### JavaScript (script.js)
```
- Form validation
- Google Sheets submission
- Error handling
- Success message display
```

## Evolution

This file will evolve as the application is built. Update it when:
- New directories are added
- Structure changes significantly
- File organization changes

## Current State

**Sprint 01**: COMPLETE — Core structure, form validation, Google Sheets integration.
**Sprint 02**: COMPLETE — Ivory Clinic-inspired design overhaul: mixed-weight typography, generous spacing, animations, experience section, mobile refinements.

All application code is implemented and functional. Hero image is a placeholder (awaiting real VR headset + Simone Biles visual).

## Deployment Structure

When deployed to Vercel/Netlify/GitHub Pages:
- `/public` contents served as static site
- Environment variables configured in hosting platform
- Google Sheets API credentials configured securely
