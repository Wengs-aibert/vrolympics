# VROlympics MVP Design

## Purpose

Create a professional "Coming Soon" landing page that establishes credibility for VROlympics - a VR exercise simulator platform that generates electricity through physical activity. The page captures waitlist signups and validates market interest.

## Primary User

General public interested in fitness, VR technology, or innovative sustainability concepts. Users land on the page and decide whether to join the waitlist.

**Secondary audience**: Potential partners, investors, and collaborators who need to see that the project exists and is legitimate.

## MVP Scope (Must-Haves)

### Visual Design
- **Layout Philosophy**: Ivory Clinic-inspired minimalism with VROlympics energy
  - Generous white space and breathable sections
  - Mixed-weight typography (ultra-thin + bold in headlines)
  - Large, impactful hero visual (VR headset zooming into Simone Biles)
  - Centered, elegant composition
- Responsive layout (mobile + desktop)
- Brand color scheme (unchanged):
  - Primary Blue: #0056B3
  - Sky Blue: #4FC3F7
  - Dark Navy: #2C3E50
  - Highlight Orange: #FFB74D
- Sophisticated, modern aesthetic with premium feel
- Soft backgrounds (light gray, white alternating)
- Rounded CTA buttons (pill-shaped, dark)

### Content Sections
- **Hero section**: 
  - Mixed-weight headline (e.g., "Virtual Reality **OLYMPICS** for Energy Generation")
  - Hero visual: Large VR headset zooming into Simone Biles photo (60-70% viewport)
  - Floating badge: "Beta Coming 2026"
  - Rounded CTA button (dark, pill-shaped)
  - Scroll indicator (down arrow)
- **Concept explanation**:
  - Brief description of VR fitness + electricity generation concept
  - 2-3 key benefits or features
- **Email waitlist form**:
  - Email input field
  - Submit button
  - Connected to Google Sheets
  - Form validation (valid email format)
  - Confirmation message after submission
- **Footer**:
  - Project name
  - Copyright/year
  - Optional: social media placeholders

### Technical Requirements
- Static HTML/CSS/JavaScript site
- Google Sheets integration for email capture (via Google Sheets API or form submission)
- Deployable to free hosting (Vercel/Netlify/GitHub Pages)
- Mobile-responsive design (works on phones, tablets, desktop)
- Fast page load (<3 seconds)
- Basic form validation (client-side)

## Explicit Non-Goals

❌ No VR simulator integration  
❌ No real electricity tracking or dashboards  
❌ No user accounts or authentication  
❌ No leaderboards or social features  
❌ No payment processing  
❌ No admin interface (Google Sheets access is sufficient)  
❌ No multi-language support  
❌ No detailed multi-page "How It Works" section  
❌ No blog or content management system  
❌ No analytics dashboard (basic page analytics via hosting platform is sufficient)  
❌ No email marketing integration beyond Google Sheets  
❌ No custom graphics or illustrations (placeholders sufficient for MVP)  

## Core User Flows

### Flow 1: Landing & Reading
1. User arrives at homepage (direct link, social media, etc.)
2. Sees hero section with headline and visual
3. Reads tagline and concept explanation
4. Scrolls through page content
5. Decides whether to join waitlist

### Flow 2: Waitlist Signup
1. User scrolls to email form
2. Enters email address
3. Clicks submit button
4. Form validates email format
5. If valid: Data sent to Google Sheets
6. User sees confirmation message
7. If invalid: User sees error message

## Data Model / Interfaces

### Waitlist Entry (Google Sheets)
Each row in the Google Sheet represents one signup:
- **Email** (string, required) - User's email address
- **Timestamp** (datetime, auto-generated) - When they signed up
- **Source/Referrer** (string, optional) - Where they came from (if trackable via URL parameter)

### Google Sheets Integration
- **Method**: POST request to Google Sheets API or Google Forms
- **Authentication**: Service account or public form submission
- **Sheet structure**: Simple flat table with columns: Email, Timestamp, Source
- **Error handling**: Graceful failure if submission fails (show user-friendly error)

## Success Criteria for Iteration 1

✅ Page loads quickly on mobile and desktop browsers  
✅ Professional visual design that feels legitimate and polished  
✅ Clear, compelling communication of VROlympics concept  
✅ Email form successfully captures emails to Google Sheets  
✅ Form validation prevents invalid email submissions  
✅ User receives clear confirmation after successful signup  
✅ Page is deployed and accessible via public URL  
✅ Mobile responsive layout works on phones and tablets  
✅ Friend/stakeholder feedback: "This looks real, I'd sign up"  

## Assumptions / Open Questions

### Assumptions
- Google Sheets API setup will be straightforward (or use Google Forms as fallback)
- Free hosting tier will be sufficient for initial traffic volume
- Draft copy will be refined during implementation (placeholder text is acceptable)
- Image placeholders are sufficient for MVP (no custom graphics needed initially)
- Basic color scheme and typography will convey the right aesthetic
- 1-2 day timeline is realistic for this scope

### Open Questions
- **Headline/tagline copy**: Will use draft copy initially - can be refined later
- **Google Sheets credentials**: Need to set up service account or form link - documented in dev/test
- **Hosting platform**: Preference between Vercel, Netlify, or GitHub Pages?
- **Domain name**: Will use default hosting domain initially or custom domain ready?
- **Analytics**: Any specific tracking requirements beyond basic page views?
- **Referral tracking**: Do we need to track where users come from (UTM parameters)?

## Future Iterations (Post-MVP)

These are explicitly out of scope for MVP but may be considered later:
- Custom logo and brand graphics
- Video or animated hero section
- Detailed "How It Works" explainer with diagrams
- Team/About section
- Press mentions or testimonials
- Social proof (signup counter)
- Blog or news section
- Email confirmation/welcome email
- Multiple language support
- Advanced analytics and A/B testing
