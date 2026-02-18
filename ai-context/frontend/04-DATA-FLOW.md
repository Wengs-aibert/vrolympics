# Data Flow - VROlympics Landing Page

## Overview

This document defines how data flows through the VROlympics landing page, from user input to Google Sheets storage, including state management, validation, and user feedback.

**Data Flow Goal**: Ensure email data flows reliably from user input through validation to Google Sheets, with clear feedback at each step.

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. User enters email                                       │
│     ↓                                                       │
│  2. User clicks submit                                      │
│     ↓                                                       │
│  3. Client-side validation                                  │
│     ↓                                                       │
│  4. Form state: Loading                                     │
│     ↓                                                       │
│  5. HTTP POST to Google Sheets/Forms                        │
│     ↓                                                       │
│  6. Response handling                                       │
│     ↓                                                       │
│  7. Form state: Success or Error                            │
│     ↓                                                       │
│  8. User feedback (message display)                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Form State Management

### State Diagram

```
┌──────────┐
│  IDLE    │ ← Initial state, form ready
└─────┬────┘
      │
      │ User clicks submit
      ↓
┌──────────┐
│VALIDATING│ ← Check email format
└─────┬────┘
      │
      ├─→ Invalid email
      │   └─→ ERROR (show validation error)
      │
      │ Valid email
      ↓
┌──────────┐
│ LOADING  │ ← Disable form, show loading
└─────┬────┘
      │
      │ HTTP request
      ↓
┌──────────────┐
│ SUBMITTING   │
└─────┬────────┘
      │
      ├─→ Success (HTTP 200)
      │   └─→ SUCCESS (show success message, clear form)
      │
      ├─→ Network error
      │   └─→ ERROR (show error message, re-enable form)
      │
      └─→ Timeout
          └─→ ERROR (show timeout message, re-enable form)
```

### State Variables

```javascript
// Form state tracking
const formState = {
  status: 'idle',        // 'idle' | 'validating' | 'loading' | 'success' | 'error'
  email: '',             // Current email value
  errorMessage: '',      // Error message to display
  successMessage: '',    // Success message to display
  isSubmitting: false    // Is form currently submitting?
};
```

## Data Validation

### Client-Side Validation Flow

```
Email Input Value
      ↓
1. Trim whitespace
      ↓
2. Check if empty
      ↓ (not empty)
3. Check format (regex)
      ↓ (valid format)
4. Check length (< 254 chars)
      ↓ (valid length)
5. VALID ✓
```

### Validation Rules

| Rule | Check | Error Message |
|------|-------|---------------|
| Required | `email.trim() !== ''` | "Please enter your email address" |
| Format | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | "Please enter a valid email address" |
| Length | `email.length <= 254` | "Email address is too long" |

### Validation Function

```javascript
/**
 * Validates email with detailed error messages
 * @param {string} email - Email to validate
 * @returns {{valid: boolean, error: string}}
 */
function validateEmail(email) {
  // Trim whitespace
  const trimmedEmail = email.trim();
  
  // Check if empty
  if (trimmedEmail === '') {
    return {
      valid: false,
      error: 'Please enter your email address'
    };
  }
  
  // Check length
  if (trimmedEmail.length > 254) {
    return {
      valid: false,
      error: 'Email address is too long'
    };
  }
  
  // Check format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      valid: false,
      error: 'Please enter a valid email address'
    };
  }
  
  // Valid
  return {
    valid: true,
    error: ''
  };
}
```

## Submission Flow

### Step-by-Step Data Flow

#### 1. User Input Capture

```javascript
// Get email from input
const emailInput = document.getElementById('email');
const email = emailInput.value;
```

#### 2. Validation

```javascript
// Validate email
const validation = validateEmail(email);

if (!validation.valid) {
  // Show validation error
  showError(validation.error);
  return; // Stop submission
}
```

#### 3. Prepare Data

```javascript
// Prepare submission data
const submissionData = {
  email: email.trim(),
  timestamp: new Date().toISOString(),
  source: getSource() // UTM params or referrer
};
```

#### 4. Set Loading State

```javascript
// Update UI to loading state
setFormState('loading');

// Disable form inputs
emailInput.disabled = true;
submitButton.disabled = true;
submitButton.textContent = 'Submitting...';

// Clear previous messages
clearMessages();
```

#### 5. Submit to Backend

```javascript
// Submit to Google Sheets/Forms
try {
  const result = await submitToBackend(submissionData);
  
  if (result.success) {
    // Success path
    handleSuccess(result);
  } else {
    // Error path
    handleError(result.error);
  }
  
} catch (error) {
  // Network error path
  handleNetworkError(error);
}
```

#### 6. Handle Response

**Success Path**:
```javascript
function handleSuccess(result) {
  // Set success state
  setFormState('success');
  
  // Show success message
  showSuccess(result.message || 'Thank you for joining the waitlist!');
  
  // Clear form
  emailInput.value = '';
  
  // Re-enable form for another submission
  setTimeout(() => {
    setFormState('idle');
    emailInput.disabled = false;
    submitButton.disabled = false;
    submitButton.textContent = 'Join Waitlist';
  }, 3000);
}
```

**Error Path**:
```javascript
function handleError(errorMessage) {
  // Set error state
  setFormState('error');
  
  // Show error message
  showError(errorMessage || 'Something went wrong. Please try again.');
  
  // Keep user's input
  // Re-enable form immediately
  emailInput.disabled = false;
  submitButton.disabled = false;
  submitButton.textContent = 'Join Waitlist';
}
```

## User Feedback States

### Visual Feedback

#### Idle State
```
┌─────────────────────────────────────┐
│  [Email Input - Ready]              │
│  [Submit Button - Active]           │
└─────────────────────────────────────┘
```

#### Loading State
```
┌─────────────────────────────────────┐
│  [Email Input - Disabled]           │
│  [Submit Button - Submitting...]    │
└─────────────────────────────────────┘
```

#### Success State
```
┌─────────────────────────────────────┐
│  ✓ Thank you for joining the        │
│    waitlist!                         │
│  [Email Input - Cleared]            │
│  [Submit Button - Ready]            │
└─────────────────────────────────────┘
```

#### Error State
```
┌─────────────────────────────────────┐
│  ✗ Please enter a valid email       │
│    address                           │
│  [Email Input - Keeps value]        │
│  [Submit Button - Ready]            │
└─────────────────────────────────────┘
```

### CSS Classes for States

```css
/* Message container */
.message {
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  font-size: 0.875rem;
}

/* Success state */
.message.success {
  background-color: #E8F5E9; /* Light green */
  color: #2E7D32;            /* Dark green */
  border: 1px solid #4CAF50;
}

/* Error state */
.message.error {
  background-color: #FFEBEE; /* Light red */
  color: #C62828;            /* Dark red */
  border: 1px solid #F44336;
}

/* Loading state */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

input:disabled {
  background-color: #F5F5F5;
  cursor: not-allowed;
}
```

## Data Persistence

### Google Sheets Storage

**Data stored in sheet**:
```
Row | Email              | Timestamp            | Source
----|--------------------|--------------------- |----------
1   | user@example.com   | 2026-02-15T10:30:00Z | direct
2   | jane@email.com     | 2026-02-15T11:45:00Z | twitter
3   | tech@startup.io    | 2026-02-15T14:20:00Z | reddit
```

**No client-side persistence**:
- No localStorage
- No cookies
- No IndexedDB
- Form clears on success
- User must re-enter email for duplicate signups

### Source Tracking

```javascript
/**
 * Gets submission source (referrer or UTM params)
 * @returns {string} Source identifier
 */
function getSource() {
  // Check for UTM parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  
  if (utmSource) {
    return utmSource;
  }
  
  // Fall back to document referrer
  if (document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      return referrerUrl.hostname;
    } catch (e) {
      return 'unknown';
    }
  }
  
  // Direct visit
  return 'direct';
}
```

## Error Recovery

### Retry Strategy

```javascript
/**
 * Submit with exponential backoff retry
 * @param {Object} data - Submission data
 * @param {number} maxRetries - Max retry attempts
 * @returns {Promise}
 */
async function submitWithRetry(data, maxRetries = 2) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Attempt submission
      const result = await submitToBackend(data);
      
      if (result.success) {
        return result; // Success!
      }
      
      // If not success but no exception, don't retry
      return result;
      
    } catch (error) {
      lastError = error;
      
      // If last attempt, throw error
      if (attempt === maxRetries) {
        throw new Error('Failed after ' + (maxRetries + 1) + ' attempts');
      }
      
      // Wait before retry (exponential backoff)
      const delay = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, delay));
      
      console.log(`Retrying... (attempt ${attempt + 2}/${maxRetries + 1})`);
    }
  }
  
  throw lastError;
}
```

### Offline Detection

```javascript
/**
 * Checks if user is online
 * @returns {boolean}
 */
function isOnline() {
  return navigator.onLine;
}

// Check before submission
if (!isOnline()) {
  showError('No internet connection. Please check your connection and try again.');
  return;
}

// Listen for online/offline events
window.addEventListener('offline', () => {
  console.log('User went offline');
  // Optionally disable form
});

window.addEventListener('online', () => {
  console.log('User came back online');
  // Optionally re-enable form
});
```

## Performance Considerations

### Debouncing (Optional)

For real-time validation (if implemented):

```javascript
/**
 * Debounces a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function}
 */
function debounce(func, wait) {
  let timeout;
  
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Usage: Validate email after 500ms of no typing
const debouncedValidation = debounce(validateEmailRealtime, 500);
emailInput.addEventListener('input', debouncedValidation);
```

### Request Timeout

```javascript
/**
 * Fetch with timeout
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeout - Timeout in ms
 * @returns {Promise}
 */
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}
```

## Testing Data Flows

### Test Scenarios

| Scenario | Input | Expected State | Expected Output |
|----------|-------|----------------|-----------------|
| Valid submission | `test@example.com` | SUCCESS | Email in sheet, success message |
| Empty email | `` | ERROR | "Please enter your email address" |
| Invalid format | `notanemail` | ERROR | "Please enter a valid email address" |
| Network error | (disconnect) | ERROR | "Unable to connect..." |
| Duplicate email | `test@example.com` (2nd time) | SUCCESS | Email added again (no duplicate check) |
| Very long email | `a@b.c...` (255+ chars) | ERROR | "Email address is too long" |

### Manual Testing Flow

1. **Open page in browser**
2. **Submit empty form** → Should see error
3. **Enter invalid email** (`test`) → Should see error
4. **Enter valid email** (`test@example.com`) → Should see loading state
5. **Wait for response** → Should see success message
6. **Check Google Sheet** → Email should appear
7. **Disconnect internet**
8. **Try to submit** → Should see network error
9. **Reconnect internet**
10. **Submit again** → Should succeed

## Data Privacy

### Data Collected

- **Email address**: Required for waitlist
- **Timestamp**: When signup occurred
- **Source**: Where user came from (referrer/UTM)

### Data NOT Collected

- No IP addresses (unless Google logs them)
- No device fingerprinting
- No tracking pixels
- No third-party analytics (optional)

### Privacy Compliance

- **GDPR**: Email collection requires consent (privacy policy)
- **CCPA**: Users can request deletion from sheet
- **CAN-SPAM**: Include unsubscribe in launch emails

## Evolution Path

**Post-MVP Enhancements**:
- Real-time email validation (as user types)
- Email confirmation (double opt-in)
- Duplicate detection (check if email exists)
- Multi-field form (name, interests)
- Referral tracking (share links)
- A/B testing different form layouts

**Last Updated**: February 15, 2026
