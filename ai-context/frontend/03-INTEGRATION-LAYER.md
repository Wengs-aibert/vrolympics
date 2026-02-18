# Integration Layer - VROlympics Landing Page

## Overview

This document defines how the VROlympics frontend integrates with Google Sheets for email collection. It covers API contracts, JavaScript implementation, error handling, and deployment configuration.

**Integration Goal**: Seamlessly capture email signups and store them in Google Sheets with minimal latency and clear user feedback.

## Integration Architecture

```
┌─────────────────────┐
│  VROlympics         │
│  Landing Page       │
│  (Static HTML/JS)   │
└──────────┬──────────┘
           │
           │ Form Submission
           │ (HTTP POST)
           ↓
┌─────────────────────┐
│  Google Sheets API  │
│  or                 │
│  Google Forms       │
└──────────┬──────────┘
           │
           │ Store Data
           ↓
┌─────────────────────┐
│  Google Sheet       │
│  (Email Storage)    │
└─────────────────────┘
```

## Integration Options

### Option A: Google Forms (Recommended for MVP)

**Pros**:
- ✅ Simplest setup (no API keys)
- ✅ No authentication required
- ✅ Built-in spam protection
- ✅ Google manages infrastructure
- ✅ Auto-linked to Google Sheet

**Cons**:
- ❌ Less control over response format
- ❌ Form URL visible in code
- ❌ Cannot customize validation messages

**Setup Steps**:
1. Create Google Form with email field
2. Link form to Google Sheet
3. Get form action URL
4. Use form URL in JavaScript POST request

### Option B: Google Sheets API

**Pros**:
- ✅ Full control over data format
- ✅ Custom error messages
- ✅ Direct sheet access

**Cons**:
- ❌ Requires service account setup
- ❌ API credentials management
- ❌ More complex implementation
- ❌ Need to handle authentication

**Setup Steps**:
1. Create Google Cloud project
2. Enable Google Sheets API
3. Create service account
4. Share sheet with service account email
5. Generate and securely store credentials

### Chosen Approach (To Be Decided in Task 1.6)

**Decision criteria**:
- MVP speed (favor simplicity)
- Maintenance burden
- Error handling needs
- Privacy/security requirements

## Data Contract

### Email Submission Request

```javascript
// POST to Google Forms or Sheets API
{
  email: string,        // Required: Valid email format
  timestamp: datetime,  // Auto-generated (YYYY-MM-DD HH:MM:SS)
  source?: string       // Optional: UTM parameter or referrer
}
```

**Validation Rules**:
- Email format: RFC 5322 compliant
- Max length: 254 characters
- Required field: Yes
- Unique: Not enforced (allow duplicate signups)

### Success Response

**Google Forms**:
```javascript
// HTTP 200 OK
// No JSON response (redirect to confirmation page)
// Detect success by HTTP status
```

**Google Sheets API**:
```javascript
// HTTP 200 OK
{
  success: true,
  message: "Email added successfully",
  rowNumber: 42  // Sheet row number
}
```

### Error Response

**Google Forms**:
```javascript
// HTTP 400/500
// No structured error (text/html)
// Generic error handling required
```

**Google Sheets API**:
```javascript
// HTTP 400 Bad Request
{
  success: false,
  error: "Invalid email format"
}

// HTTP 500 Server Error
{
  success: false,
  error: "Server error. Please try again."
}

// HTTP 401 Unauthorized
{
  success: false,
  error: "Authentication failed"
}
```

## JavaScript Implementation

### Form Validation Function

```javascript
/**
 * Validates email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
  // RFC 5322 simplified regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
```

### Form Submission Function (Option A: Google Forms)

```javascript
/**
 * Submits email to Google Forms
 * @param {string} email - Validated email address
 * @returns {Promise<{success: boolean, message: string}>}
 */
async function submitToGoogleForms(email) {
  const FORM_URL = 'https://docs.google.com/forms/d/e/FORM_ID/formResponse';
  const ENTRY_ID = 'entry.123456789'; // Email field entry ID
  
  try {
    // Create FormData
    const formData = new FormData();
    formData.append(ENTRY_ID, email);
    formData.append('timestamp', new Date().toISOString());
    
    // Submit via fetch (no-cors mode)
    const response = await fetch(FORM_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Forms
    });
    
    // no-cors doesn't return response, assume success
    return {
      success: true,
      message: 'Thank you for joining the waitlist!'
    };
    
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Unable to submit. Please try again.'
    };
  }
}
```

### Form Submission Function (Option B: Google Sheets API)

```javascript
/**
 * Submits email to Google Sheets API
 * @param {string} email - Validated email address
 * @returns {Promise<{success: boolean, message: string}>}
 */
async function submitToGoogleSheets(email) {
  const API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID/values/A:C:append';
  const API_KEY = 'YOUR_API_KEY'; // Store in environment variable
  
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [[
          email,
          new Date().toISOString(),
          document.referrer || 'direct'
        ]]
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      message: 'Thank you for joining the waitlist!'
    };
    
  } catch (error) {
    console.error('API submission error:', error);
    return {
      success: false,
      message: 'Unable to submit. Please check your connection and try again.'
    };
  }
}
```

### Form Event Handler

```javascript
/**
 * Handles form submission event
 */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('waitlist-form');
  const emailInput = document.getElementById('email');
  const submitButton = document.getElementById('submit-button');
  const messageContainer = document.getElementById('message');
  
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get and trim email
    const email = emailInput.value.trim();
    
    // Clear previous messages
    messageContainer.textContent = '';
    messageContainer.className = '';
    
    // Validate email format
    if (!isValidEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }
    
    // Disable form during submission
    setFormLoading(true);
    
    // Submit to backend (Google Forms or Sheets API)
    const result = await submitToGoogleForms(email); // or submitToGoogleSheets
    
    // Re-enable form
    setFormLoading(false);
    
    // Show result
    if (result.success) {
      showSuccess(result.message);
      form.reset(); // Clear form on success
    } else {
      showError(result.message);
    }
  });
  
  /**
   * Shows success message
   */
  function showSuccess(message) {
    messageContainer.textContent = message;
    messageContainer.className = 'message success';
  }
  
  /**
   * Shows error message
   */
  function showError(message) {
    messageContainer.textContent = message;
    messageContainer.className = 'message error';
  }
  
  /**
   * Sets form loading state
   */
  function setFormLoading(isLoading) {
    submitButton.disabled = isLoading;
    emailInput.disabled = isLoading;
    submitButton.textContent = isLoading ? 'Submitting...' : 'Join Waitlist';
  }
});
```

## Error Handling

### Client-Side Error Scenarios

| Scenario | Detection | User Message |
|----------|-----------|--------------|
| Empty email | `email.trim() === ''` | "Please enter your email address" |
| Invalid format | `!isValidEmail(email)` | "Please enter a valid email address" |
| Network error | `fetch` throws | "Unable to connect. Please check your internet." |
| Timeout | Request > 10s | "Request timed out. Please try again." |
| Server error | HTTP 500 | "Something went wrong. Please try again." |
| Rate limit | HTTP 429 | "Too many requests. Please wait a moment." |

### Error Message Guidelines

**Good Error Messages**:
- ✅ "Please enter a valid email address"
- ✅ "Unable to submit. Please check your connection and try again."
- ✅ "Something went wrong. Please try again in a moment."

**Bad Error Messages**:
- ❌ "Error 400: Bad Request"
- ❌ "Invalid input"
- ❌ "Submission failed"

**Principles**:
- User-friendly language (no technical jargon)
- Actionable (tell user what to do)
- Non-judgmental tone
- Specific when possible

### Retry Logic

```javascript
/**
 * Submits with retry on network failure
 * @param {string} email - Email to submit
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {Promise}
 */
async function submitWithRetry(email, maxRetries = 2) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await submitToGoogleForms(email);
      if (result.success) {
        return result;
      }
      // If not success but no exception, don't retry
      return result;
    } catch (error) {
      if (attempt === maxRetries) {
        // Last attempt failed
        return {
          success: false,
          message: 'Unable to submit after multiple attempts. Please try again later.'
        };
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }
}
```

## Google Sheet Structure

### Sheet Configuration

**Sheet Name**: "Waitlist"

**Columns**:
| Column | Header | Type | Description |
|--------|--------|------|-------------|
| A | Email | text | User email address |
| B | Timestamp | datetime | Submission time (ISO 8601) |
| C | Source | text | Referrer or UTM parameter |

**Example Data**:
```
Email                    | Timestamp            | Source
-------------------------|----------------------|------------------
user@example.com         | 2026-02-15T10:30:00Z | direct
jane@email.com           | 2026-02-15T11:45:00Z | twitter
tech@startup.io          | 2026-02-15T14:20:00Z | reddit
```

### Sheet Permissions

**For Google Forms**:
- Form owner has full access
- Sheet auto-created and linked
- Responses append automatically

**For Google Sheets API**:
- Service account email must have Editor access
- Share sheet with service account email
- Verify permissions before going live

## Configuration Management

### Environment Variables

**Local Development** (`.env`):
```bash
# Google Forms
GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/FORM_ID/formResponse
GOOGLE_FORM_EMAIL_ENTRY=entry.123456789

# OR Google Sheets API
GOOGLE_SHEETS_API_KEY=your_api_key_here
GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id_here
```

**Production** (Hosting Platform):
- Vercel: Environment Variables in dashboard
- Netlify: Environment Variables in site settings
- GitHub Pages: Use placeholder values in code, configure via GitHub Secrets

### Configuration File

```javascript
// config/google-sheets.config.js

/**
 * Google Sheets/Forms configuration
 * Load from environment variables in production
 */
const config = {
  // Google Forms (Option A)
  forms: {
    url: process.env.GOOGLE_FORM_URL || '',
    emailEntryId: process.env.GOOGLE_FORM_EMAIL_ENTRY || ''
  },
  
  // Google Sheets API (Option B)
  sheets: {
    apiKey: process.env.GOOGLE_SHEETS_API_KEY || '',
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID || '',
    range: 'Waitlist!A:C'
  }
};

export default config;
```

## Security Considerations

### API Key Protection

**Do NOT**:
- ❌ Commit API keys to git
- ❌ Hardcode credentials in JavaScript
- ❌ Expose keys in client-side code

**Do**:
- ✅ Use environment variables
- ✅ Restrict API key to specific domains (Google Cloud Console)
- ✅ Use Google Forms if possible (no keys needed)
- ✅ Monitor API usage for abuse

### CORS Configuration

**Google Forms**: No CORS issues (use `mode: 'no-cors'`)

**Google Sheets API**: 
- Enable CORS if using custom backend
- Or use API key restricted to your domain

### Spam Prevention

**Strategies**:
- Rate limiting (max 5 submissions per IP per hour)
- Honeypot field (hidden input, reject if filled)
- reCAPTCHA (if spam becomes issue post-MVP)
- Email validation (format check)

**Honeypot Example**:
```html
<input type="text" name="website" 
       style="display:none" 
       tabindex="-1" 
       autocomplete="off">
```

```javascript
// Reject if honeypot filled
if (form.website.value !== '') {
  return; // Silent failure for bots
}
```

## Testing

### Manual Testing Checklist

- [ ] Valid email submits successfully
- [ ] Success message displays
- [ ] Email appears in Google Sheet
- [ ] Timestamp is correct
- [ ] Invalid email shows error
- [ ] Empty email shows error
- [ ] Network error handled gracefully
- [ ] Form disables during submission
- [ ] Form re-enables after error
- [ ] Success clears form

### Test Emails

```
Valid:
- test@example.com
- user+tag@domain.co.uk
- name.surname@company.com

Invalid:
- notanemail
- @example.com
- user@
- user @example.com (space)
```

## Monitoring & Analytics

### Key Metrics

- Total signups (count rows in sheet)
- Signup rate over time
- Error rate (failed submissions)
- Average form completion time

### Tracking Setup (Optional)

```javascript
// Track form submission
function trackFormSubmission(success) {
  if (window.gtag) {
    gtag('event', 'form_submit', {
      'event_category': 'waitlist',
      'event_label': success ? 'success' : 'error'
    });
  }
}
```

## Deployment Checklist

- [ ] Choose integration method (Forms or Sheets API)
- [ ] Set up Google Form or Sheet
- [ ] Configure environment variables
- [ ] Test on staging environment
- [ ] Verify emails appear in sheet
- [ ] Test error scenarios
- [ ] Set up monitoring
- [ ] Document credentials (securely)

**Last Updated**: February 15, 2026
