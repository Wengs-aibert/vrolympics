# Architectural Decisions - VROlympics

This file documents architectural and process decisions made during development.

Format: **Date | Decision | Reason**

---

## Initial Decisions (from Control Tower)

### February 15, 2026 | Project Type: Web App (Static Landing Page) | Best fit for MVP

**Decision**: Classified this project as a Web App, specifically a static landing page with minimal backend integration.

**Reason**: 
- Primary interface is browser-based
- Deployment target is web hosting
- Simple enough to not require complex framework
- Fits "Coming Soon" landing page pattern
- Google Sheets provides sufficient backend for email collection

**Alternatives considered**:
- Sheets-Backed App: Too complex for simple form submission
- Custom backend: Overkill for MVP, would slow down development

---

### February 15, 2026 | Tech Stack: Vanilla HTML/CSS/JS | Simplicity and speed

**Decision**: Use vanilla HTML, CSS, and JavaScript without frameworks.

**Reason**:
- MVP timeline is 1-2 days - no time for framework setup
- Single page application - no routing needed
- No complex state management required
- Faster page load without framework overhead
- Easier for future agents to understand (no framework-specific patterns)

**Alternatives considered**:
- React: Overkill for single static page
- Next.js: Too complex for MVP needs
- Tailwind CSS: Adds dependency, vanilla CSS sufficient

---

### February 15, 2026 | Email Collection: Google Sheets | Simplest integration

**Decision**: Use Google Sheets for email storage with Google Forms or Sheets API.

**Reason**:
- No database setup required
- Non-technical team members can access data directly
- Free and reliable
- Easy to export data later
- Sufficient for MVP scale (hundreds/thousands of signups)

**Implementation approach**: Google Forms (chosen during Sprint 1 Task 1.6)

**Why Google Forms over Sheets API**:
- No API keys or OAuth setup required
- Works with CORS restrictions (no-cors mode)
- Simpler to set up (5-10 minutes vs hours)
- Automatic timestamp capture
- Built-in email validation
- Built-in spam protection
- No rate limits for form submissions

**Setup**: See `config/SETUP-GUIDE.md` for complete setup instructions

**Alternatives considered**:
- Database (PostgreSQL, Firebase): Too complex for MVP
- Email marketing tool (Mailchimp, ConvertKit): Can integrate later, sheets sufficient for MVP
- Local file storage: Not persistent, doesn't work with static hosting
- Google Sheets API: More complex, requires authentication, CORS issues

---

### February 15, 2026 | Hosting: Free Static Hosting | Cost and simplicity

**Decision**: Deploy to Vercel, Netlify, or GitHub Pages (to be decided during deployment).

**Reason**:
- All offer free tier sufficient for MVP
- All support static site deployment
- All provide HTTPS by default
- All have simple deployment process
- No server maintenance required

**Choice will depend on**: Ease of environment variable configuration for Google Sheets credentials

---

### February 15, 2026 | Design Approach: Mobile-First | User behavior

**Decision**: Design and code mobile-first, enhance for desktop.

**Reason**:
- Most landing page traffic comes from mobile/social shares
- Ensures core experience works on smallest screens
- Progressive enhancement is more robust than graceful degradation
- CSS is simpler when building up from mobile

---

### February 15, 2026 | Brand Colors Documented | Design consistency

**Decision**: Document exact brand colors in all relevant files.

**Colors**:
- Primary Blue: #0056B3
- Sky Blue: #4FC3F7
- Dark Navy: #2C3E50
- Highlight Orange: #FFB74D

**Reason**: Ensures consistency across implementation and prevents color drift.

---

### February 15, 2026 | Image Strategy: Placeholders for MVP | Speed over perfection

**Decision**: Use placeholder images/divs for MVP, not custom graphics.

**Reason**:
- Creating custom graphics would exceed 1-2 day timeline
- Placeholders sufficient to demonstrate layout and concept
- Real graphics can be added in post-MVP iteration
- Focus on working functionality over perfect visuals

---

### February 15, 2026 | Copy Strategy: Draft Copy Acceptable | Iteration over perfection

**Decision**: Use draft/suggested copy in implementation, refine later.

**Reason**:
- Wordsmithing would slow down MVP delivery
- Copy can be easily updated without code changes
- Important to ship working page quickly
- User testing will inform better copy

---

### February 15, 2026 | Testing Strategy: Manual + Validation | Appropriate for static site

**Decision**: Rely primarily on manual testing and HTML/CSS validation for MVP.

**Reason**:
- Static site has limited logic to test
- Manual testing faster than setting up automated test framework
- HTML/CSS validators catch most structural issues
- Form validation is simple enough for manual testing
- Can add automated tests post-MVP if needed

---

### February 15, 2026 | Sprint Structure: 1-2 Sprints | Tight timeline

**Decision**: Plan for 1-2 short sprints to complete MVP.

**Reason**:
- Scope is small enough for 1-2 sprints
- Sprint 1: Core structure and functionality
- Sprint 2 (if needed): Polish and deployment
- Matches 1-2 day timeline constraint

---

## Development Decisions

### February 16, 2026 | Design Overhaul: Ivory Clinic Inspiration | Premium aesthetic

**Decision**: Completely rewrote CSS and restructured HTML to follow Ivory Clinic (dental landing page) design principles, while keeping VROlympics brand colors and energy.

**Key changes**:
- Mixed-weight typography system (font-weight 100/300/700 within same headlines)
- Generous white space (up to 128px section padding)
- Hero visual changed to 3:4 portrait aspect ratio with floating badges
- Pill-shaped dark CTA buttons
- Scroll indicator: styled circle with SVG arrow
- New "Experience" section (full-screen mixed-weight text block)
- Subtle fade-in animations (CSS + IntersectionObserver)
- `prefers-reduced-motion` support
- Comprehensive mobile refinements (320px–374px, 375px–767px breakpoints)
- All touch targets ≥ 44px

**Reason**: User wanted a more premium, sophisticated feel inspired by the Ivory Clinic website. The original Sprint 01 design was functional but lacked the visual polish of a world-class landing page.

**Alternatives considered**:
- Keeping original design with minor tweaks: Would not achieve the desired premium feel
- Using a CSS framework (Tailwind): Adds dependency, vanilla CSS gives full control over the Ivory-inspired details
- Web fonts (Google Fonts): System fonts already provide the weight range needed (100–800) and load faster

---

## Decision Evolution

When decisions change, document the change:

**YYYY-MM-DD | Updated: [Original Decision] | New Reason**

Explain what changed and why.

---

**This file grows over time. Keep it current.**
