'use client';

import { useState, useRef } from 'react';
import Toast from '@/components/Toast';

interface FormData {
  // Page 1
  email: string;
  applyingFor: string;
  applyingForOther: string;
  jobSearchStatus: string; // Format: "Not Resigned - No Offers" or "Resigned - Offers In Pipeline"
  jobType: string;

  // Page 2
  fullName: string;
  gender: string;
  genderOther: string;
  mobile: string;
  totalExperience: string;
  currentCTC: string;
  expectedCTC: string;
  currentLocation: string;
  preferredLocations: string[];
  preferredLocationsOther: string;
  noticePeriod: string;
  noticePeriodNegotiable: string;
  earliestJoinDate: string;
  recentEmployer: string;
  recentJobTitle: string;
  workplacePreference: string;

  // Page 3
  profileSummary: string;
  cloudExperience: {
    azure: string;
    aws: string;
    gcp: string;
    oracle: string;
  };
  certifications: string;
  industries: string[];
  industriesOther: string;
  functionalDomains: string[];
  functionalDomainsOther: string;
  workedAtGCC: string;
  workedAtStartup: string;
  underGraduateDegree: string;
  underGraduateDegreeOther: string;
  graduateDegree: string;
  graduateDegreeOther: string;
  shiftTimings: string[];
  resume: File | null;
}

export default function TalentPoolForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const formRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    email: '',
    applyingFor: '',
    applyingForOther: '',
    jobSearchStatus: '',
    jobType: '',
    fullName: '',
    gender: '',
    genderOther: '',
    mobile: '',
    totalExperience: '',
    currentCTC: '',
    expectedCTC: '',
    currentLocation: '',
    preferredLocations: [],
    preferredLocationsOther: '',
    noticePeriod: '',
    noticePeriodNegotiable: '',
    earliestJoinDate: '',
    recentEmployer: '',
    recentJobTitle: '',
    workplacePreference: '',
    profileSummary: '',
    cloudExperience: {
      azure: '',
      aws: '',
      gcp: '',
      oracle: '',
    },
    certifications: '',
    industries: [],
    industriesOther: '',
    functionalDomains: [],
    functionalDomainsOther: '',
    workedAtGCC: '',
    workedAtStartup: '',
    underGraduateDegree: '',
    underGraduateDegreeOther: '',
    graduateDegree: '',
    graduateDegreeOther: '',
    shiftTimings: [],
    resume: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setToastMessage('Please upload a PDF or Word document');
        setToastType('error');
        setShowToast(true);
        return;
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setToastMessage('File size must be less than 10MB');
        setToastType('error');
        setShowToast(true);
        return;
      }
      setFormData({ ...formData, resume: file });
    }
  };

  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    const currentValues = formData[name] as string[];
    if (currentValues.includes(value)) {
      setFormData({
        ...formData,
        [name]: currentValues.filter((v) => v !== value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: [...currentValues, value],
      });
    }
  };

  const handleCloudExperienceChange = (platform: keyof FormData['cloudExperience'], value: string) => {
    setFormData({
      ...formData,
      cloudExperience: {
        ...formData.cloudExperience,
        [platform]: value,
      },
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Email validation
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
      }

      // Applying for validation
      if (!formData.applyingFor) {
        newErrors.applyingFor = 'Please select a job role';
      }

      // Job search status validation
      if (!formData.jobSearchStatus) {
        newErrors.jobSearchStatus = 'Please select your current job search status';
      }

      // Job type validation
      if (!formData.jobType) {
        newErrors.jobType = 'Please select the type of job you are open to';
      }
    } else if (step === 2) {
      // Full name validation
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters';
      }

      // Gender validation
      if (!formData.gender) {
        newErrors.gender = 'Please select your gender';
      }

      // Mobile validation
      if (!formData.mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (formData.mobile.length !== 10) {
        newErrors.mobile = 'Mobile number must be exactly 10 digits';
      } else if (!/^\d+$/.test(formData.mobile)) {
        newErrors.mobile = 'Mobile number must contain only digits';
      }

      // Total experience validation
      if (!formData.totalExperience) {
        newErrors.totalExperience = 'Total experience is required';
      } else if (parseFloat(formData.totalExperience) < 0) {
        newErrors.totalExperience = 'Experience cannot be negative';
      } else if (parseFloat(formData.totalExperience) > 50) {
        newErrors.totalExperience = 'Please enter a valid experience (max 50 years)';
      }

      // Current CTC validation
      if (!formData.currentCTC) {
        newErrors.currentCTC = 'Current CTC is required';
      } else if (parseFloat(formData.currentCTC) < 0) {
        newErrors.currentCTC = 'CTC cannot be negative';
      } else if (parseFloat(formData.currentCTC) > 1000) {
        newErrors.currentCTC = 'Please enter a valid CTC (max 1000 LPA)';
      }

      // Expected CTC validation
      if (!formData.expectedCTC) {
        newErrors.expectedCTC = 'Expected CTC is required';
      } else if (parseFloat(formData.expectedCTC) < 0) {
        newErrors.expectedCTC = 'CTC cannot be negative';
      } else if (parseFloat(formData.expectedCTC) > 1000) {
        newErrors.expectedCTC = 'Please enter a valid CTC (max 1000 LPA)';
      }

      // Current location validation
      if (!formData.currentLocation) {
        newErrors.currentLocation = 'Current location is required';
      } else if (formData.currentLocation.length < 2) {
        newErrors.currentLocation = 'Please enter a valid location';
      }

      // Preferred locations validation
      if (formData.preferredLocations.length === 0) {
        newErrors.preferredLocations = 'Please select at least one preferred location';
      }

      // Notice period validation
      if (!formData.noticePeriod) {
        newErrors.noticePeriod = 'Notice period is required';
      } else if (parseInt(formData.noticePeriod) < 0) {
        newErrors.noticePeriod = 'Notice period cannot be negative';
      } else if (parseInt(formData.noticePeriod) > 365) {
        newErrors.noticePeriod = 'Please enter a valid notice period (max 365 days)';
      }

      // Notice period negotiable validation
      if (!formData.noticePeriodNegotiable) {
        newErrors.noticePeriodNegotiable = 'Please select if notice period is negotiable';
      }

      // Earliest join date validation
      if (!formData.earliestJoinDate) {
        newErrors.earliestJoinDate = 'Earliest join date is required';
      } else {
        const selectedDate = new Date(formData.earliestJoinDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors.earliestJoinDate = 'Join date cannot be in the past';
        }
      }

      // Recent employer validation
      if (!formData.recentEmployer) {
        newErrors.recentEmployer = 'Recent employer is required';
      } else if (formData.recentEmployer.length < 2) {
        newErrors.recentEmployer = 'Please enter a valid employer name';
      }

      // Recent job title validation
      if (!formData.recentJobTitle) {
        newErrors.recentJobTitle = 'Recent job title is required';
      } else if (formData.recentJobTitle.length < 2) {
        newErrors.recentJobTitle = 'Please enter a valid job title';
      }

      // Workplace preference validation
      if (!formData.workplacePreference) {
        newErrors.workplacePreference = 'Please select your workplace preference';
      }
    } else if (step === 3) {
      // Profile summary validation
      if (!formData.profileSummary) {
        newErrors.profileSummary = 'Profile summary is required';
      } else if (formData.profileSummary.length < 20) {
        newErrors.profileSummary = 'Profile summary should be at least 20 characters';
      } else if (formData.profileSummary.length > 500) {
        newErrors.profileSummary = 'Profile summary should not exceed 500 characters';
      }

      // Cloud experience validation
      if (!formData.cloudExperience.azure) {
        newErrors.cloudAzure = 'Please select your Azure experience';
      }
      if (!formData.cloudExperience.aws) {
        newErrors.cloudAws = 'Please select your AWS experience';
      }
      if (!formData.cloudExperience.gcp) {
        newErrors.cloudGcp = 'Please select your GCP experience';
      }
      if (!formData.cloudExperience.oracle) {
        newErrors.cloudOracle = 'Please select your Oracle experience';
      }

      // Industries validation
      if (formData.industries.length === 0) {
        newErrors.industries = 'Please select at least one industry';
      }

      // Functional domains validation
      if (formData.functionalDomains.length === 0) {
        newErrors.functionalDomains = 'Please select at least one functional domain';
      }

      // GCC validation
      if (!formData.workedAtGCC) {
        newErrors.workedAtGCC = 'Please select if you have worked at GCC';
      }

      // Startup validation
      if (!formData.workedAtStartup) {
        newErrors.workedAtStartup = 'Please select if you have worked at startups';
      }

      // Shift timings validation
      if (formData.shiftTimings.length === 0) {
        newErrors.shiftTimings = 'Please select at least one shift timing preference';
      }

      // Resume validation
      if (!formData.resume) {
        newErrors.resume = 'Please upload your resume';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setToastMessage('Please fix the errors in the form');
      setToastType('error');
      setShowToast(true);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setToastMessage('Application submitted successfully! We\'ll be in touch soon.');
    setToastType('success');
    setShowToast(true);

    // Reset form after successful submission
    setTimeout(() => {
      setCurrentStep(1);
      setFormData({
        email: '',
        applyingFor: '',
        applyingForOther: '',
        jobSearchStatus: '',
        jobType: '',
        fullName: '',
        gender: '',
        genderOther: '',
        mobile: '',
        totalExperience: '',
        currentCTC: '',
        expectedCTC: '',
        currentLocation: '',
        preferredLocations: [],
        preferredLocationsOther: '',
        noticePeriod: '',
        noticePeriodNegotiable: '',
        earliestJoinDate: '',
        recentEmployer: '',
        recentJobTitle: '',
        workplacePreference: '',
        profileSummary: '',
        cloudExperience: {
          azure: '',
          aws: '',
          gcp: '',
          oracle: '',
        },
        certifications: '',
        industries: [],
        industriesOther: '',
        functionalDomains: [],
        functionalDomainsOther: '',
        workedAtGCC: '',
        workedAtStartup: '',
        underGraduateDegree: '',
        underGraduateDegreeOther: '',
        graduateDegree: '',
        graduateDegreeOther: '',
        shiftTimings: [],
        resume: null,
      });
    }, 2000);
  };

  const jobRoles = [
    'DevOps Engineers (AWS / Azure / GCP - Junior to Mid level)',
    'DevOps Architects (12 yrs+)',
    'MLOps (AWS / Azure / GCP - Across Levels)',
    'Data Engineering (Big Data / Data Engineers / ML Engineers)',
    'Data Engineering - Lead Architect (12yrs+ Azure / AWS / GCP)',
    'Data Scientists - Junior (Classic ML / NLP / CV / GenAI)',
    'Data Scientists - Senior (Advanced ML / DL / NLP / CV / GenAI)',
    'Decision Sciences (Advanced PL/SQL, Python, R Developers)',
    'Data Architects (Datalakes, Data Warehouse, Lakehouse)',
    'Platform / Cloud Architect (Infra / DevOps / MLOps)',
    'Business Architect / Solution Architect',
    'Data Visualization',
    'Other',
  ];

  const locations = [
    'Ahmedabad',
    'Bengaluru',
    'Chennai',
    'Coimbatore',
    'Delhi NCR',
    'Hyderabad',
    'Kolkata',
    'Mumbai',
    'Pune',
    'Other',
  ];

  const cloudPlatforms = ['azure', 'aws', 'gcp', 'oracle'] as const;
  const cloudExperienceLevels = [
    'No Experience',
    'Less than 1 year',
    '1+ to 3 years',
    '3+ to 5 years',
    'More than 5 years',
  ];

  const industries = [
    'BFSI',
    'Retail',
    'Manufacturing / Automotive / Chemicals',
    'eCommerce',
    'Telecom',
    'Healthcare',
    'Other',
  ];

  const functionalDomains = [
    'Sales',
    'Marketing',
    'Advertising',
    'Finance',
    'Supply Chain / Logistics',
    'Human Resources',
    'Other',
  ];

  const shiftTimings = ['IST - Only', 'US', 'UK', 'APAC', 'Anything is fine'];

  return (
    <>
      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
      )}
      <div ref={formRef}>
        <form onSubmit={handleSubmit} className="space-y-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (step < currentStep) {
                    setCurrentStep(step);
                    if (formRef.current) {
                      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }
                }}
                disabled={step > currentStep}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= step
                    ? 'bg-accent text-white'
                    : 'bg-gray-200 text-gray-600'
                } ${
                  step < currentStep
                    ? 'cursor-pointer hover:scale-110 hover:shadow-lg'
                    : step > currentStep
                    ? 'cursor-not-allowed'
                    : ''
                }`}
                title={step < currentStep ? `Go back to step ${step}` : ''}
              >
                {step}
              </button>
              {step < 3 && (
                <div
                  className={`w-20 h-1 mx-2 ${
                    currentStep > step ? 'bg-accent' : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-center mb-6">
          <p className="text-sm text-neutral-600">
            Step {currentStep} of 3: {currentStep === 1 ? 'Job Information' : currentStep === 2 ? 'Basic Information' : 'Professional Details'}
          </p>
        </div>

        {/* Step 1: Job Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Job Information</h3>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                  errors.email ? 'border-red-500' : 'border-neutral-300'
                }`}
                placeholder="you@email.com"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="applyingFor" className="block text-sm font-medium text-neutral-700 mb-2">
                Applying for (select closest relevant job role) <span className="text-red-500">*</span>
              </label>
              <select
                id="applyingFor"
                name="applyingFor"
                value={formData.applyingFor}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                  errors.applyingFor ? 'border-red-500' : 'border-neutral-300'
                }`}
                required
              >
                <option value="">Select a role</option>
                {jobRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.applyingFor && <p className="mt-1 text-sm text-red-600">{errors.applyingFor}</p>}
            </div>

            {formData.applyingFor === 'Other' && (
              <div>
                <label htmlFor="applyingForOther" className="block text-sm font-medium text-neutral-700 mb-2">
                  Please specify
                </label>
                <input
                  type="text"
                  id="applyingForOther"
                  name="applyingForOther"
                  value={formData.applyingForOther}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Current Job Search Status <span className="text-red-500">*</span>
              </label>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="border border-neutral-300 px-4 py-3 text-left text-sm font-medium text-neutral-700">

                      </th>
                      <th className="border border-neutral-300 px-3 py-3 text-center text-sm font-medium text-neutral-700">
                        Not Looking
                      </th>
                      <th className="border border-neutral-300 px-3 py-3 text-center text-sm font-medium text-neutral-700">
                        No Offers
                      </th>
                      <th className="border border-neutral-300 px-3 py-3 text-center text-sm font-medium text-neutral-700">
                        Offers In Pipeline
                      </th>
                      <th className="border border-neutral-300 px-3 py-3 text-center text-sm font-medium text-neutral-700">
                        Offer Received
                      </th>
                      <th className="border border-neutral-300 px-3 py-3 text-center text-sm font-medium text-neutral-700">
                        Offer Accepted
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3 text-sm font-medium text-neutral-700 bg-neutral-50">
                        Not Resigned
                      </td>
                      {['Not Looking', 'No Offers', 'Offers In Pipeline', 'Offer Received', 'Offer Accepted'].map(
                        (status) => (
                          <td key={status} className="border border-neutral-300 px-3 py-3 text-center">
                            <input
                              type="radio"
                              name="jobSearchStatus"
                              value={`Not Resigned - ${status}`}
                              checked={formData.jobSearchStatus === `Not Resigned - ${status}`}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-accent-600 focus:ring-accent-500 cursor-pointer"
                            />
                          </td>
                        )
                      )}
                    </tr>
                    <tr>
                      <td className="border border-neutral-300 px-4 py-3 text-sm font-medium text-neutral-700 bg-neutral-50">
                        Resigned
                      </td>
                      {['Not Looking', 'No Offers', 'Offers In Pipeline', 'Offer Received', 'Offer Accepted'].map(
                        (status) => (
                          <td key={status} className="border border-neutral-300 px-3 py-3 text-center">
                            <input
                              type="radio"
                              name="jobSearchStatus"
                              value={`Resigned - ${status}`}
                              checked={formData.jobSearchStatus === `Resigned - ${status}`}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-accent-600 focus:ring-accent-500 cursor-pointer"
                            />
                          </td>
                        )
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
              {formData.jobSearchStatus && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, jobSearchStatus: '' })}
                  className="mt-3 text-sm text-neutral-600 hover:text-accent-600 underline"
                >
                  Clear selection
                </button>
              )}
              {errors.jobSearchStatus && <p className="mt-2 text-sm text-red-600">{errors.jobSearchStatus}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                What kind of jobs are you open to? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {['Permanent (direct company payroll)', 'Contract (3rd party payroll)', 'Open to Both'].map(
                  (type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value={type}
                        checked={formData.jobType === type}
                        onChange={handleInputChange}
                        className="mr-3 w-4 h-4 text-accent-600 focus:ring-accent-500"
                      />
                      <span className="text-neutral-700">{type}</span>
                    </label>
                  )
                )}
              </div>
              {errors.jobType && <p className="mt-2 text-sm text-red-600">{errors.jobType}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Basic Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Basic Information</h3>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                  errors.fullName ? 'border-red-500' : 'border-neutral-300'
                }`}
                required
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Gender <span className="text-red-500">*</span>
                <span className="text-xs text-neutral-500 ml-2">(Used only to verify identity)</span>
              </label>
              <div className="space-y-3">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700">{gender}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
            </div>

            {formData.gender === 'Other' && (
              <div>
                <label htmlFor="genderOther" className="block text-sm font-medium text-neutral-700 mb-2">
                  Please specify
                </label>
                <input
                  type="text"
                  id="genderOther"
                  name="genderOther"
                  value={formData.genderOther}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-neutral-700 mb-2">
                Mobile <span className="text-red-500">*</span>
                <span className="text-xs text-neutral-500 ml-2">(Enter 10 digit number without +91)</span>
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
                  errors.mobile ? 'border-red-500' : 'border-neutral-300'
                }`}
                placeholder="9822773478"
                maxLength={10}
                required
              />
              {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
            </div>

            <div>
              <label htmlFor="totalExperience" className="block text-sm font-medium text-neutral-700 mb-2">
                Total years of experience <span className="text-red-500">*</span>
                <span className="text-xs text-neutral-500 ml-2">(E.g. For 3 years and 6 months, enter 3.5)</span>
              </label>
              <input
                type="number"
                step="0.5"
                id="totalExperience"
                name="totalExperience"
                value={formData.totalExperience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentCTC" className="block text-sm font-medium text-neutral-700 mb-2">
                  Current CTC (LPA) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="currentCTC"
                  name="currentCTC"
                  value={formData.currentCTC}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="15"
                  required
                />
              </div>

              <div>
                <label htmlFor="expectedCTC" className="block text-sm font-medium text-neutral-700 mb-2">
                  Expected CTC (LPA) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="expectedCTC"
                  name="expectedCTC"
                  value={formData.expectedCTC}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="20"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="currentLocation" className="block text-sm font-medium text-neutral-700 mb-2">
                Current location (city) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="currentLocation"
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Preferred locations for relocation <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {locations.map((location) => (
                  <label key={location} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.preferredLocations.includes(location)}
                      onChange={() => handleCheckboxChange('preferredLocations', location)}
                      className="mr-2 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700 text-sm">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.preferredLocations.includes('Other') && (
              <div>
                <label htmlFor="preferredLocationsOther" className="block text-sm font-medium text-neutral-700 mb-2">
                  Please specify other locations
                </label>
                <input
                  type="text"
                  id="preferredLocationsOther"
                  name="preferredLocationsOther"
                  value={formData.preferredLocationsOther}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
              </div>
            )}

            <div>
              <label htmlFor="noticePeriod" className="block text-sm font-medium text-neutral-700 mb-2">
                Official notice period in DAYS <span className="text-red-500">*</span>
                <span className="text-xs text-neutral-500 ml-2">(E.g. 0, 15, 30, 45, 60, 90)</span>
              </label>
              <input
                type="number"
                id="noticePeriod"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Is your notice period NEGOTIABLE? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {['Yes', 'No', 'Maybe'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="noticePeriodNegotiable"
                      value={option}
                      checked={formData.noticePeriodNegotiable === option}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="earliestJoinDate" className="block text-sm font-medium text-neutral-700 mb-2">
                Earliest you can JOIN <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="earliestJoinDate"
                name="earliestJoinDate"
                value={formData.earliestJoinDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required
              />
            </div>

            <div>
              <label htmlFor="recentEmployer" className="block text-sm font-medium text-neutral-700 mb-2">
                Most recent Employer <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="recentEmployer"
                name="recentEmployer"
                value={formData.recentEmployer}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required
              />
            </div>

            <div>
              <label htmlFor="recentJobTitle" className="block text-sm font-medium text-neutral-700 mb-2">
                Most recent Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="recentJobTitle"
                name="recentJobTitle"
                value={formData.recentJobTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Workplace preference <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {['Remote', 'Hybrid', 'Work From Office', 'Anything is fine'].map((pref) => (
                  <label key={pref} className="flex items-center">
                    <input
                      type="radio"
                      name="workplacePreference"
                      value={pref}
                      checked={formData.workplacePreference === pref}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700">{pref}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Professional Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Professional Details</h3>

            <div>
              <label htmlFor="profileSummary" className="block text-sm font-medium text-neutral-700 mb-2">
                One line pitch / profile summary <span className="text-red-500">*</span>
                <span className="text-xs text-neutral-500 ml-2">
                  (E.g. 7+ years in Data Engineering, AWS, built pipelines, SaaS in BFSI)
                </span>
              </label>
              <textarea
                id="profileSummary"
                name="profileSummary"
                value={formData.profileSummary}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Cloud platform experience <span className="text-red-500">*</span>
              </label>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-neutral-50">
                      <th className="border border-neutral-300 px-4 py-2 text-left text-sm font-medium text-neutral-700">
                        Platform
                      </th>
                      {cloudExperienceLevels.map((level) => (
                        <th
                          key={level}
                          className="border border-neutral-300 px-2 py-2 text-center text-xs font-medium text-neutral-700"
                        >
                          {level}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cloudPlatforms.map((platform) => (
                      <tr key={platform}>
                        <td className="border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 uppercase">
                          {platform}
                        </td>
                        {cloudExperienceLevels.map((level) => (
                          <td key={level} className="border border-neutral-300 px-2 py-2 text-center">
                            <input
                              type="radio"
                              name={`cloud-${platform}`}
                              value={level}
                              checked={formData.cloudExperience[platform] === level}
                              onChange={() => handleCloudExperienceChange(platform, level)}
                              className="w-4 h-4 text-accent-600 focus:ring-accent-500"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <label htmlFor="certifications" className="block text-sm font-medium text-neutral-700 mb-2">
                Relevant CERTIFICATIONS
                <span className="text-xs text-neutral-500 ml-2">(One per line)</span>
              </label>
              <textarea
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                placeholder="AWS Certified Solutions Architect&#10;Google Cloud Professional Data Engineer&#10;..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Industries you have experience in <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {industries.map((industry) => (
                  <label key={industry} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.industries.includes(industry)}
                      onChange={() => handleCheckboxChange('industries', industry)}
                      className="mr-2 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700 text-sm">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.industries.includes('Other') && (
              <div>
                <label htmlFor="industriesOther" className="block text-sm font-medium text-neutral-700 mb-2">
                  Please specify other industries
                </label>
                <input
                  type="text"
                  id="industriesOther"
                  name="industriesOther"
                  value={formData.industriesOther}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Functional domains <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {functionalDomains.map((domain) => (
                  <label key={domain} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.functionalDomains.includes(domain)}
                      onChange={() => handleCheckboxChange('functionalDomains', domain)}
                      className="mr-2 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700 text-sm">{domain}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.functionalDomains.includes('Other') && (
              <div>
                <label htmlFor="functionalDomainsOther" className="block text-sm font-medium text-neutral-700 mb-2">
                  Please specify other domains
                </label>
                <input
                  type="text"
                  id="functionalDomainsOther"
                  name="functionalDomainsOther"
                  value={formData.functionalDomainsOther}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Have you worked at a Global Captive Center (GCC)? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {['No', 'Yes'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="workedAtGCC"
                      value={option}
                      checked={formData.workedAtGCC === option}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Have you worked at STARTUPS? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="workedAtStartup"
                      value={option}
                      checked={formData.workedAtStartup === option}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Undergraduate Degree</label>
              <div className="space-y-3">
                {['B.E.', 'B.Tech', 'B.Com', 'B.Sc.', 'BBA', 'Other'].map((degree) => (
                  <label key={degree} className="flex items-center">
                    <input
                      type="radio"
                      name="underGraduateDegree"
                      value={degree}
                      checked={formData.underGraduateDegree === degree}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700">{degree}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.underGraduateDegree === 'Other' && (
              <div>
                <label htmlFor="underGraduateDegreeOther" className="block text-sm font-medium text-neutral-700 mb-2">
                  Please specify
                </label>
                <input
                  type="text"
                  id="underGraduateDegreeOther"
                  name="underGraduateDegreeOther"
                  value={formData.underGraduateDegreeOther}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Graduate Degree</label>
              <div className="space-y-3">
                {['M.Tech', 'MBA', 'PGDM', 'M.S.', 'Other'].map((degree) => (
                  <label key={degree} className="flex items-center">
                    <input
                      type="radio"
                      name="graduateDegree"
                      value={degree}
                      checked={formData.graduateDegree === degree}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700">{degree}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.graduateDegree === 'Other' && (
              <div>
                <label htmlFor="graduateDegreeOther" className="block text-sm font-medium text-neutral-700 mb-2">
                  Please specify
                </label>
                <input
                  type="text"
                  id="graduateDegreeOther"
                  name="graduateDegreeOther"
                  value={formData.graduateDegreeOther}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Comfortable with shift timings <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {shiftTimings.map((timing) => (
                  <label key={timing} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.shiftTimings.includes(timing)}
                      onChange={() => handleCheckboxChange('shiftTimings', timing)}
                      className="mr-2 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-neutral-700">{timing}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-neutral-700 mb-2">
                Upload Resume <span className="text-red-500">*</span>
                <span className="text-xs text-neutral-500 ml-2">(PDF or Word document, max 10MB)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-neutral-700 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-600 file:cursor-pointer border border-neutral-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  required
                />
              </div>
              {formData.resume && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-green-800">{formData.resume.name}</p>
                      <p className="text-xs text-green-600">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, resume: null })}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-neutral-200">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors font-medium"
            >
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-600 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-600 transition-all font-medium shadow-lg hover:shadow-xl"
            >
              Submit Application
            </button>
          )}
        </div>
      </form>
      </div>
    </>
  );
}
