/**
 * Sanitize user input to prevent XSS attacks
 * Removes HTML tags, scripts, and dangerous characters
 */

export function sanitizeInput(input: string): string {
  if (!input) return '';

  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove common XSS patterns
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove dangerous characters
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
}

export function sanitizeEmail(email: string): string {
  if (!email) return '';

  // Only allow valid email characters
  return email
    .replace(/[^a-zA-Z0-9@._+-]/g, '')
    .toLowerCase()
    .trim();
}

export function sanitizePhoneNumber(phone: string): string {
  if (!phone) return '';

  // Only allow digits, spaces, +, -, (, )
  return phone
    .replace(/[^\d\s+()-]/g, '')
    .trim();
}

export function sanitizeName(name: string): string {
  if (!name) return '';

  // Only allow letters, spaces, dots, hyphens, and apostrophes
  return name
    .replace(/[^a-zA-Z\s.-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function validateAndSanitizeObject(obj: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      sanitized[key] = value;
      continue;
    }

    // Handle different types of values
    if (typeof value === 'string') {
      // Apply different sanitization based on key name
      if (key.toLowerCase().includes('email')) {
        sanitized[key] = sanitizeEmail(value);
      } else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('mobile')) {
        sanitized[key] = sanitizePhoneNumber(value);
      } else if (key.toLowerCase().includes('name')) {
        sanitized[key] = sanitizeName(value);
      } else {
        sanitized[key] = sanitizeInput(value);
      }
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item =>
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else if (typeof value === 'object') {
      sanitized[key] = validateAndSanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (min 10 digits)
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

/**
 * Check for common XSS attack patterns
 */
export function containsXSS(input: string): boolean {
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<embed/i,
    /<object/i,
    /eval\s*\(/i,
    /expression\s*\(/i,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Strip HTML tags from text
 */
export function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
