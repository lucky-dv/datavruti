'use client';

import { useState } from 'react';
import Toast from './Toast';

interface ContactFormProps {
  type?: 'contact' | 'candidate';
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  skills?: string;
  resume?: string;
}

export default function ContactForm({ type = 'contact' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    skills: '',
    resume: null as File | null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\d\s()+-]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10;
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (!validateName(value)) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (value && !validatePhone(value)) return 'Please enter a valid phone number (min 10 digits)';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (!validateMessage(value)) return 'Message must be at least 10 characters';
        break;
      case 'skills':
        if (type === 'candidate' && !value.trim()) return 'Please list your skills';
        break;
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        setErrors((prev) => ({ ...prev, resume: 'File size must be less than 5MB' }));
        setToast({ message: 'File size must be less than 5MB', type: 'error' });
        return;
      }

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, resume: 'Only PDF, DOC, and DOCX files are allowed' }));
        setToast({ message: 'Only PDF, DOC, and DOCX files are allowed', type: 'error' });
        return;
      }

      setFormData((prev) => ({ ...prev, resume: file }));
      setErrors((prev) => ({ ...prev, resume: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'resume') {
        const error = validateField(key, formData[key as keyof typeof formData] as string);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setToast({ message: 'Please fix the errors before submitting', type: 'error' });
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, replace with actual API call:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, type }),
      // });

      setStatus('success');
      setToast({
        message: type === 'candidate'
          ? 'Registration successful! We\'ll be in touch soon.'
          : 'Message sent successfully! We\'ll get back to you soon.',
        type: 'success'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        skills: '',
        resume: null,
      });
      setErrors({});
      setTouched({});

      // Reset file input
      const fileInput = document.getElementById('resume') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      setStatus('error');
      setToast({
        message: 'Something went wrong. Please try again later.',
        type: 'error'
      });
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const getInputClassName = (fieldName: string) => {
    const baseClasses = "w-full px-5 py-3.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2";
    const hasError = touched[fieldName] && errors[fieldName as keyof FormErrors];

    if (hasError) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50/50`;
    }

    return `${baseClasses} border-neutral-200 focus:border-accent-500 focus:ring-accent-100 hover:border-neutral-300 bg-white`;
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Field */}
        <div className="group">
          <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-accent-600 transition-colors">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('name')}
            placeholder="Amit Shah"
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {touched.name && errors.name && (
            <p id="name-error" className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="group">
          <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-accent-600 transition-colors">
            Company Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('email')}
            placeholder="amit@companyname.com"
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {touched.email && errors.email && (
            <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="group">
          <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-accent-600 transition-colors">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('phone')}
            placeholder="+91 9876543210"
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {touched.phone && errors.phone && (
            <p id="phone-error" className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.phone}
            </p>
          )}
        </div>

        {/* Company Field (Contact form only) */}
        {type === 'contact' && (
          <div className="group">
            <label htmlFor="company" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-accent-600 transition-colors">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName('company')}
              placeholder="Your Company"
            />
          </div>
        )}

        {/* Candidate-specific fields */}
        {type === 'candidate' && (
          <>
            <div className="group">
              <label htmlFor="skills" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-accent-600 transition-colors">
                Skills & Technologies <span className="text-red-500">*</span>
              </label>
              <textarea
                id="skills"
                name="skills"
                rows={3}
                value={formData.skills}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., Python, SQL, Spark, Machine Learning, etc."
                className={`${getInputClassName('skills')} resize-none`}
                aria-invalid={touched.skills && !!errors.skills}
                aria-describedby={errors.skills ? 'skills-error' : undefined}
              />
              {touched.skills && errors.skills && (
                <p id="skills-error" className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.skills}
                </p>
              )}
            </div>

            <div className="group">
              <label htmlFor="resume" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-accent-600 transition-colors">
                Upload Resume <span className="text-neutral-500 text-xs">(PDF, DOC, DOCX - Max 5MB)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-5 py-3.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-100 focus:border-accent-500 transition-all duration-300 hover:border-neutral-300 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-secondary-600 file:to-secondary-700 file:text-white hover:file:from-secondary-700 hover:file:to-secondary-800 file:cursor-pointer file:transition-all file:duration-300 file:shadow-md hover:file:shadow-lg"
                />
              </div>
              {formData.resume && (
                <p className="mt-2 text-sm text-secondary-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formData.resume.name}
                </p>
              )}
              {errors.resume && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.resume}
                </p>
              )}
            </div>
          </>
        )}

        {/* Message Field */}
        <div className="group">
          <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2 group-focus-within:text-accent-600 transition-colors">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${getInputClassName('message')} resize-none`}
            placeholder={type === 'candidate' ? 'Tell us about your experience and what you\'re looking for...' : 'Tell us about your requirements...'}
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          <div className="flex justify-between items-center mt-1">
            {touched.message && errors.message ? (
              <p id="message-error" className="text-sm text-red-600 flex items-center gap-1 animate-shake">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors.message}
              </p>
            ) : (
              <div></div>
            )}
            <span className="text-xs text-neutral-400">
              {formData.message.length} characters
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full relative bg-primary text-white px-8 py-4 text-lg rounded-xl hover:bg-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-2xl hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-5 w-5 relative" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="relative">Sending...</span>
            </>
          ) : (
            <>
              <span className="relative">{type === 'candidate' ? 'Register Now' : 'Send Requirements'}</span>
              <svg className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>
    </>
  );
}
