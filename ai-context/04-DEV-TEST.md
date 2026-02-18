# Development and Testing - VROlympics

This file describes how to develop and test the VROlympics landing page.

## Project Type: Web App (Static Landing Page)

This is a static landing page with minimal JavaScript for form submission to Google Sheets.

**Stack**:
- HTML5
- CSS3 (no framework, vanilla CSS)
- JavaScript (vanilla, no frameworks)
- Google Sheets API for form submission

## How to Run the Application

### Local Development

Since this is a static site, you can run it locally with any simple HTTP server:

**Option 1: Using Python**
```bash
cd public
python -m http.server 8000
# Visit http://localhost:8000
```

**Option 2: Using Node.js**
```bash
cd public
npx http-server -p 8000
# Visit http://localhost:8000
```

**Option 3: Using VS Code Live Server**
- Install "Live Server" extension
- Right-click `public/index.html`
- Select "Open with Live Server"

### Production Build

For static hosting (Vercel/Netlify/GitHub Pages):
- No build step required
- Deploy `public/` directory directly
- Configure environment variables in hosting platform

## Development Setup

### Prerequisites
- Text editor (VS Code recommended)
- Modern web browser (Chrome, Firefox, Safari)
- Git (for version control)
- Google account (for Sheets API setup)

### Environment Variables

Create `.env` file (not committed to git):
```bash
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id_here
```

Or for simpler approach, use Google Forms:
```bash
GOOGLE_FORM_ACTION_URL=your_form_url_here
```

### Google Sheets Setup

**Option 1: Google Forms (Simplest)**
1. Create Google Form with email field
2. Link form to Google Sheet
3. Use form submission URL in `script.js`

**Option 2: Google Sheets API**
1. Create Google Cloud project
2. Enable Google Sheets API
3. Create service account
4. Share sheet with service account email
5. Configure credentials in `config/google-sheets.config.js`

See `05-DECISIONS.md` for chosen approach.

## Testing Approach

### Manual Testing Checklist

**Visual/Layout Tests**:
- [ ] Page loads without errors
- [ ] All sections display correctly
- [ ] Brand colors match design (#0056B3, #4FC3F7, #2C3E50, #FFB74D)
- [ ] Typography is readable
- [ ] Images/placeholders display correctly

**Responsive Tests**:
- [ ] Mobile (375px width) - looks good
- [ ] Tablet (768px width) - looks good
- [ ] Desktop (1200px+ width) - looks good
- [ ] Test on real devices (iPhone, Android, iPad)

**Form Tests**:
- [ ] Email input accepts valid emails
- [ ] Email input rejects invalid emails
- [ ] Submit button triggers validation
- [ ] Success message displays after valid submission
- [ ] Error message displays for invalid email
- [ ] Form submits to Google Sheets successfully
- [ ] Data appears correctly in sheet (Email, Timestamp)

**Browser Tests**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Automated Tests

**HTML Validation**:
```bash
# Use W3C Validator
# Visit: https://validator.w3.org/
# Upload or paste index.html
```

**CSS Validation**:
```bash
# Use W3C CSS Validator
# Visit: https://jigsaw.w3.org/css-validator/
# Upload or paste styles.css
```

**JavaScript Linting** (optional):
```bash
npx eslint script.js
```

### Form Validation Tests

Test in `tests/validation.test.js`:
- Valid email formats accepted
- Invalid email formats rejected
- Empty email rejected
- Special characters handled
- Success callback triggered
- Error callback triggered

### Integration Tests

**Google Sheets Integration**:
1. Submit test email through form
2. Verify email appears in Google Sheet
3. Verify timestamp is recorded
4. Test with multiple rapid submissions
5. Test error handling when API fails

## Test Requirements

For MVP completion, these tests must pass:

- ✅ HTML validates (W3C Validator)
- ✅ CSS validates (W3C CSS Validator)
- ✅ Form validation works (valid/invalid emails)
- ✅ Form submits to Google Sheets successfully
- ✅ Responsive layout works on mobile/tablet/desktop
- ✅ Page loads in < 3 seconds
- ✅ All links work (if any)
- ✅ Success message displays correctly
- ✅ Error handling works gracefully

## Development Workflow

1. **Read** sprint task from `sprints/sprint-01.md`
2. **Implement** feature (edit HTML/CSS/JS)
3. **Test locally** (open in browser, test functionality)
4. **Validate** (HTML/CSS validators)
5. **Test responsive** (resize browser, test on devices)
6. **Test form** (if form-related task)
7. **Update** sprint status when complete
8. **Commit** changes with descriptive message

## Debugging

### Browser DevTools
- **Console**: Check for JavaScript errors
- **Network**: Verify API calls to Google Sheets
- **Elements**: Inspect HTML/CSS
- **Responsive Mode**: Test different screen sizes

### Common Issues

**Form not submitting**:
- Check console for JavaScript errors
- Verify Google Sheets API credentials
- Check CORS settings
- Test with simpler Google Forms approach

**Styling issues**:
- Check CSS syntax
- Verify selectors match HTML
- Test in different browsers
- Check for CSS conflicts

**Responsive issues**:
- Verify viewport meta tag in HTML
- Check media queries in CSS
- Test actual devices, not just browser resize

## Deployment

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=public

# Set environment variables in Netlify dashboard
```

### GitHub Pages
```bash
# Push public/ directory to gh-pages branch
git subtree push --prefix public origin gh-pages

# Or use GitHub Actions for automatic deployment
```

## Performance Checklist

- [ ] Images optimized (if using real images)
- [ ] CSS minified (for production)
- [ ] JavaScript minified (for production)
- [ ] No render-blocking resources
- [ ] Page loads in < 3 seconds

## Accessibility Checklist (Optional for MVP, Good Practice)

- [ ] Semantic HTML elements
- [ ] Alt text for images
- [ ] Form labels present
- [ ] Keyboard navigation works
- [ ] Color contrast sufficient

---

**For this MVP**: Focus on core functionality over perfect optimization. Working > perfect.
