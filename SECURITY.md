# Security Documentation

## Form Submission Security

This application implements multiple layers of security to protect against XSS (Cross-Site Scripting) and other injection attacks.

### Client-Side Protection

1. **Input Sanitization** (Real-time)
   - All form inputs are sanitized in real-time as users type
   - HTML tags are stripped: `<script>`, `<iframe>`, `<object>`, etc.
   - JavaScript protocols are removed: `javascript:`
   - Event handlers are removed: `onclick=`, `onload=`, etc.

2. **Validation**
   - Email format validation
   - Phone number validation (min 10 digits)
   - Required field checks
   - Minimum length requirements

### Server-Side Protection

1. **XSS Detection**
   - Automatic detection of common XSS patterns
   - Requests containing XSS patterns are rejected with 400 status
   - All attempts are logged for monitoring

2. **Input Sanitization**
   - All string inputs are sanitized before saving
   - Specialized sanitization for:
     - Names: Only letters, spaces, dots, hyphens
     - Emails: Only valid email characters
     - Phone: Only digits, spaces, +, -, (, )
     - Other text: HTML/script tags removed

3. **File Upload Validation**
   - Allowed types: PDF, DOC, DOCX only
   - Maximum file size: 10MB
   - MIME type validation

### Protected Against

✅ HTML tag injection
✅ JavaScript injection
✅ Event handler injection (onclick, onload, etc.)
✅ iframe/embed/object injection
✅ eval() and expression() injections
✅ SQL injection (via parameter sanitization)
✅ Path traversal
✅ Malicious file uploads

### Security Layers

1. **Client-side**: Immediate sanitization on input
2. **Server-side**: Deep validation and sanitization
3. **File system**: JSON storage (no code execution)
4. **Logging**: All suspicious attempts are logged

### Best Practices Implemented

- Never trust client-side validation alone
- Always sanitize on server-side
- Use parameterized data (no eval, no dynamic code execution)
- Store data as JSON (no executable code)
- Implement Content Security Policy (recommended)
- Use HTTPS in production
- Regular security audits

### Example: What Gets Blocked

**Blocked Inputs:**
- `<script>alert('XSS')</script>`
- `<img src=x onerror=alert(1)>`
- `javascript:alert('XSS')`
- `<iframe src="malicious.com">`
- `eval('malicious code')`
- `<style>body{display:none}</style>`

**Allowed Inputs:**
- Normal text: "John Doe"
- Valid emails: "john@example.com"
- Valid phone: "+91 98765 43210"
- Regular messages without HTML/scripts

### Monitoring

Check server logs for XSS attempts:
```
⚠️ XSS attempt detected in field: message
```

All form submissions are saved to: `/public/submissions/`

### Recommendations

1. Enable Content Security Policy (CSP) headers
2. Implement rate limiting
3. Add CAPTCHA for public forms
4. Regular security updates
5. Monitor logs for suspicious activity
