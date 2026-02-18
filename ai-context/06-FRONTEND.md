# Frontend Documentation

## Overview

This document serves as the entry point for all frontend-related documentation for the VROlympics landing page application. The frontend provides a professional "Coming Soon" landing page with email waitlist capture for a VR exercise simulator platform.

> **Status**: Sprint 02 Complete (Ivory Clinic Design Overhaul)

## Frontend Documents

All detailed frontend documentation resides in the `frontend/` subfolder:

| File | Focus | Description |
|------|-------|-------------|
| [01-VISUAL-DESIGN.md](frontend/01-VISUAL-DESIGN.md) | UI | VR/tech theme, color palette, typography, layout patterns |
| [02-USER-EXPERIENCE.md](frontend/02-USER-EXPERIENCE.md) | UX | User flows, mobile-first patterns, accessibility, form UX |
| [03-INTEGRATION-LAYER.md](frontend/03-INTEGRATION-LAYER.md) | API | Google Sheets integration, form submission, error handling |
| [04-DATA-FLOW.md](frontend/04-DATA-FLOW.md) | State | Form state management, validation, success/error states |

## Reading Order

For agents working on frontend:

1. **Read this file first** - Understand frontend scope and philosophy
2. **Read `01-VISUAL-DESIGN.md`** - Understand VR theme, colors, typography, component patterns
3. **Read `02-USER-EXPERIENCE.md`** - Understand mobile-first UX, user flows, form patterns
4. **Read `03-INTEGRATION-LAYER.md`** - Understand Google Sheets integration
5. **Read `04-DATA-FLOW.md`** - Understand form state, validation, and data lifecycle

## Frontend Philosophy

### Design Principles

1. **Mobile-First**: Primary viewing device is mobile phone (social media referrals)
2. **Fast Load**: Minimal dependencies, optimized assets, < 3 second load time
3. **Visual Impact**: Modern, futuristic aesthetic that conveys innovation
4. **Brand Consistency**: VROlympics brand colors used throughout
5. **Clear CTA**: Email form is prominent and easy to use
6. **Accessible**: Touch targets minimum 44px, clear contrast, keyboard navigation

## Technology Stack

| Category | Technology | Notes |
|----------|------------|-------|
| HTML | HTML5 | Semantic markup, SEO-friendly |
| CSS | CSS3 (Vanilla) | No framework, custom responsive design |
| JavaScript | Vanilla JS | No framework, minimal dependencies |
| Form Integration | Google Sheets API | Email collection and storage |
| Deployment | Vercel/Netlify | Static hosting, automatic HTTPS |

## Application Structure

### Page Sections

```
┌─────────────────────────────────────────────────────────────┐
│  Hero Section                                                │
│  • Headline (VROlympics branding)                           │
│  • Tagline (VR fitness + electricity concept)              │
│  • Hero visual placeholder                                  │
│  • Primary CTA (Join Waitlist button)                      │
├─────────────────────────────────────────────────────────────┤
│  Concept Section                                            │
│  • Brief explanation (2-3 sentences)                        │
│  • Key benefits or features                                 │
│  • Supporting visual placeholders                           │
├─────────────────────────────────────────────────────────────┤
│  Waitlist Form Section                                      │
│  • Email input field                                        │
│  • Submit button                                            │
│  • Form validation (client-side)                            │
│  • Success/error message display                            │
├─────────────────────────────────────────────────────────────┤
│  Footer                                                      │
│  • VROlympics branding                                      │
│  • Copyright notice                                         │
│  • Social media placeholders (optional)                     │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| Hero Section | First impression, branding | HTML semantic elements |
| Concept Cards | Explain VR fitness + electricity | Responsive grid/flex layout |
| Email Form | Waitlist collection | HTML form + JS validation |
| Success Modal | Confirmation feedback | JS-powered overlay |
| Error Messages | Form validation feedback | Dynamic DOM manipulation |

## Sprint Status

### ⏳ Sprint 01: Core Landing Page Implementation (In Progress)

- [ ] Task 1.1: Project setup and structure
- [ ] Task 1.2: HTML structure (semantic, all sections)
- [ ] Task 1.3: CSS styling - Base and layout (mobile-first)
- [ ] Task 1.4: CSS styling - Responsive and polish (tablet/desktop)
- [ ] Task 1.5: Form validation JavaScript
- [ ] Task 1.6: Google Sheets integration
- [ ] Task 1.7: Content and copy
- [ ] Task 1.8: Testing, validation, deployment

See [../sprints/sprint-01.md](../sprints/sprint-01.md) for detailed task breakdown.

## Connection to Backend

The frontend integrates with Google Sheets for email collection:

### Integration Approach

**Chosen Method** (to be decided in Task 1.6):
- **Option A**: Google Forms submission (simplest)
- **Option B**: Google Sheets API with service account

### Data Contract

```javascript
// Email Submission
POST to Google Sheets/Forms
Body: {
  email: string,        // Required: Valid email format
  timestamp: datetime,  // Auto-generated
  source?: string       // Optional: UTM tracking
}

// Success Response
Status: 200 OK
Body: {
  success: true,
  message: "Thank you for joining the waitlist!"
}

// Error Response
Status: 400/500
Body: {
  success: false,
  error: "Error message"
}
```

See [03-INTEGRATION-LAYER.md](frontend/03-INTEGRATION-LAYER.md) for complete integration details.

## Deployment

### Current Setup

- **Platform**: To be decided (Vercel/Netlify/GitHub Pages)
- **Domain**: Default hosting domain initially
- **Build**: No build step required (static HTML/CSS/JS)
- **Output**: `public/` directory
- **Environment Variables**: Google Sheets credentials

### Deployment Workflow

1. Complete Sprint 01 tasks
2. Choose hosting platform
3. Configure environment variables
4. Deploy `public/` directory
5. Verify form submission works
6. Test on mobile devices

### Environment-Specific URLs

| Environment | Frontend URL | Backend Integration |
|-------------|-------------|---------------------|
| Local Dev | http://localhost:8000 | Google Sheets (test) |
| Production | TBD | Google Sheets (production) |

## File Structure

```
vrolympics/
├── public/                  # Static site files (to be created)
│   ├── index.html          # Main landing page
│   ├── styles.css          # Stylesheet (mobile-first)
│   ├── script.js           # Form validation & submission
│   └── assets/             # Static assets
│       ├── images/         # Image placeholders
│       │   └── hero.svg    # Hero section placeholder
│       └── icons/          # Icon files (if needed)
├── config/                  # Configuration (to be created)
│   └── google-sheets.config.js  # Google Sheets setup
├── tests/                   # Testing (to be created)
│   └── validation.test.js  # Form validation tests
└── ai-context/
    └── 06-FRONTEND.md      # This file
```

## Development Workflow

### Running Locally

```bash
# Navigate to public directory
cd public

# Start simple HTTP server
python -m http.server 8000
# Visit http://localhost:8000

# Or with Node.js
npx http-server -p 8000
```

### Development Best Practices

1. **Mobile-First**: Write CSS for mobile (375px), enhance for larger screens
2. **Semantic HTML**: Use appropriate HTML5 elements (header, main, section, form)
3. **Progressive Enhancement**: Core functionality works without JS, enhanced with JS
4. **Form Validation**: Client-side validation before submission
5. **Error Handling**: Clear, user-friendly error messages
6. **Performance**: Optimize images, minimize CSS/JS, lazy load if needed

## Visual Design Highlights

From [01-VISUAL-DESIGN.md](frontend/01-VISUAL-DESIGN.md):

- **Brand Colors**:
  - Primary Blue: #0056B3
  - Sky Blue: #4FC3F7
  - Dark Navy: #2C3E50
  - Highlight Orange: #FFB74D
- **Typography**: Clean, modern system fonts
- **Layout**: Centered content, generous whitespace
- **Animations**: Subtle hover effects, smooth transitions
- **Visuals**: Placeholder divs for hero and concept images

## User Experience Highlights

From [02-USER-EXPERIENCE.md](frontend/02-USER-EXPERIENCE.md):

- **Primary User**: General public (fitness/VR enthusiasts)
- **Key Flow**: Land on page → Read content → Enter email → Join waitlist
- **Form UX**: Simple email input, clear submit button, immediate feedback
- **Touch Targets**: Minimum 44px for buttons and inputs
- **Accessibility**: WCAG 2.1 AA compliance for color contrast

## Evolution

This documentation evolves as frontend development progresses:

- **Visual changes** → Update `01-VISUAL-DESIGN.md`
- **UX changes** → Update `02-USER-EXPERIENCE.md`
- **Integration changes** → Update `03-INTEGRATION-LAYER.md`
- **State patterns** → Update `04-DATA-FLOW.md`
- **Architectural decisions** → Update `../05-DECISIONS.md`

When making frontend changes:
- Update relevant frontend docs
- Update sprint files if feature scope changes
- Update `01-DESIGN.md` if MVP scope changes
- Update `03-REPO-MAP.md` if structure changes

**Last Updated**: February 15, 2026 (Sprint 01 - Project Initialization)
