-- datavruti Recruitment System Database Schema
-- Database: PostgreSQL (recommended) or MySQL
-- Created for comprehensive recruitment management system

-- ============================================
-- 1. CANDIDATES TABLE (Main Candidate Records)
-- ============================================
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,

    -- Basic Information
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    gender VARCHAR(50),
    gender_other VARCHAR(100),
    mobile VARCHAR(20) NOT NULL,

    -- Professional Information
    applying_for VARCHAR(255),
    applying_for_other TEXT,
    total_experience DECIMAL(4,1), -- E.g., 3.5 years
    current_ctc DECIMAL(10,2), -- in LPA
    expected_ctc DECIMAL(10,2), -- in LPA

    -- Location & Work Preferences
    current_location VARCHAR(255),
    preferred_locations JSON, -- Array of locations
    preferred_locations_other TEXT,
    workplace_preference VARCHAR(50), -- Remote/Hybrid/WFO/Anything

    -- Employment Status
    job_search_status VARCHAR(100), -- E.g., "Not Resigned - No Offers"
    job_type VARCHAR(100), -- Permanent/Contract/Both
    notice_period INTEGER, -- in days
    notice_period_negotiable VARCHAR(10), -- Yes/No/Maybe
    earliest_join_date DATE,

    -- Recent Employment
    recent_employer VARCHAR(255),
    recent_job_title VARCHAR(255),

    -- Professional Details
    profile_summary TEXT,
    certifications TEXT,

    -- Cloud Experience (JSON for flexibility)
    cloud_experience JSON, -- { azure: "3+ to 5 years", aws: "1+ to 3 years", ... }

    -- Industry & Domain Experience
    industries JSON, -- Array of industries
    industries_other TEXT,
    functional_domains JSON, -- Array of domains
    functional_domains_other TEXT,

    -- Work Experience Flags
    worked_at_gcc BOOLEAN,
    worked_at_startup BOOLEAN,

    -- Education
    undergraduate_degree VARCHAR(100),
    undergraduate_degree_other VARCHAR(255),
    graduate_degree VARCHAR(100),
    graduate_degree_other VARCHAR(255),

    -- Work Preferences
    shift_timings JSON, -- Array: ['IST - Only', 'US', 'UK', ...]

    -- Resume & Documents
    resume_filename VARCHAR(500),
    resume_url TEXT,
    resume_uploaded_at TIMESTAMP,

    -- Source & Tracking
    source VARCHAR(100) DEFAULT 'website', -- website/referral/linkedin/etc
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),

    -- Status & Stage
    status VARCHAR(50) DEFAULT 'new', -- new/screening/interview/offered/placed/rejected
    stage VARCHAR(100), -- Initial Screening/Technical Round/Client Interview/etc

    -- Assignment & Tags
    assigned_recruiter_id INTEGER REFERENCES users(id),
    tags JSON, -- Array of tags for quick filtering

    -- Ratings & Notes
    internal_rating INTEGER CHECK (internal_rating >= 1 AND internal_rating <= 5),
    internal_notes TEXT,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_contacted_at TIMESTAMP,

    -- Soft Delete
    is_active BOOLEAN DEFAULT true,
    deleted_at TIMESTAMP,

    -- Indexes for performance
    INDEX idx_email (email),
    INDEX idx_mobile (mobile),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_assigned_recruiter (assigned_recruiter_id)
);

-- ============================================
-- 2. CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,

    -- Form Type
    submission_type VARCHAR(50) NOT NULL, -- contact/candidate

    -- Basic Fields
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    message TEXT NOT NULL,

    -- Candidate-specific
    skills TEXT,
    resume_filename VARCHAR(500),
    resume_url TEXT,

    -- Source Tracking
    page_url TEXT,
    referrer_url TEXT,
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,

    -- Status
    status VARCHAR(50) DEFAULT 'new', -- new/contacted/converted/spam
    assigned_to INTEGER REFERENCES users(id),

    -- Follow-up
    followed_up BOOLEAN DEFAULT false,
    followed_up_at TIMESTAMP,
    follow_up_notes TEXT,

    -- Conversion
    converted_to_candidate_id INTEGER REFERENCES candidates(id),

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- 3. TALENT POOL APPLICATIONS TABLE
-- ============================================
CREATE TABLE talent_pool_applications (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES candidates(id),

    -- All form data (comprehensive tracking)
    form_data JSON NOT NULL, -- Stores complete form submission

    -- Application Status
    status VARCHAR(50) DEFAULT 'pending', -- pending/reviewed/approved/rejected
    reviewed_by INTEGER REFERENCES users(id),
    reviewed_at TIMESTAMP,
    review_notes TEXT,

    -- Timestamps
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_candidate_id (candidate_id),
    INDEX idx_status (status),
    INDEX idx_submitted_at (submitted_at)
);

-- ============================================
-- 4. JOBS/POSITIONS TABLE
-- ============================================
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,

    -- Job Details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirements TEXT,
    responsibilities TEXT,

    -- Job Specifications
    experience_min DECIMAL(4,1),
    experience_max DECIMAL(4,1),
    ctc_min DECIMAL(10,2),
    ctc_max DECIMAL(10,2),

    -- Location & Type
    locations JSON, -- Array of locations
    job_type VARCHAR(50), -- Permanent/Contract/Both
    workplace_type VARCHAR(50), -- Remote/Hybrid/Office

    -- Client Information
    client_id INTEGER REFERENCES clients(id),
    client_contact_person VARCHAR(255),
    client_contact_email VARCHAR(255),
    client_contact_phone VARCHAR(50),

    -- Job Settings
    priority VARCHAR(50) DEFAULT 'medium', -- low/medium/high/urgent
    is_confidential BOOLEAN DEFAULT false,
    no_of_positions INTEGER DEFAULT 1,

    -- Assignment
    assigned_recruiter_id INTEGER REFERENCES users(id),

    -- Status
    status VARCHAR(50) DEFAULT 'open', -- open/on-hold/filled/closed

    -- Skills & Requirements
    required_skills JSON,
    preferred_skills JSON,
    industries JSON,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline DATE,
    filled_at TIMESTAMP,

    -- Soft Delete
    is_active BOOLEAN DEFAULT true,

    INDEX idx_status (status),
    INDEX idx_client_id (client_id),
    INDEX idx_assigned_recruiter (assigned_recruiter_id)
);

-- ============================================
-- 5. CLIENTS TABLE
-- ============================================
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,

    -- Company Details
    company_name VARCHAR(255) NOT NULL,
    company_website VARCHAR(500),
    industry VARCHAR(255),
    company_size VARCHAR(50), -- startup/small/medium/large/enterprise

    -- Primary Contact
    primary_contact_name VARCHAR(255),
    primary_contact_email VARCHAR(255),
    primary_contact_phone VARCHAR(50),
    primary_contact_designation VARCHAR(255),

    -- Additional Contacts
    secondary_contacts JSON, -- Array of contact objects

    -- Location
    headquarters_location VARCHAR(255),
    office_locations JSON,

    -- Business Details
    engagement_model VARCHAR(100), -- Permanent/Contract/RPO/Project-based
    payment_terms VARCHAR(255),
    contract_start_date DATE,
    contract_end_date DATE,

    -- Account Management
    account_manager_id INTEGER REFERENCES users(id),
    relationship_status VARCHAR(50) DEFAULT 'active', -- active/inactive/prospect

    -- Client Rating
    client_rating INTEGER CHECK (client_rating >= 1 AND client_rating <= 5),

    -- Notes
    notes TEXT,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Soft Delete
    is_active BOOLEAN DEFAULT true,

    INDEX idx_company_name (company_name),
    INDEX idx_account_manager (account_manager_id)
);

-- ============================================
-- 6. APPLICATIONS TABLE (Candidate-Job Mapping)
-- ============================================
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,

    -- References
    candidate_id INTEGER NOT NULL REFERENCES candidates(id),
    job_id INTEGER NOT NULL REFERENCES jobs(id),

    -- Application Details
    application_source VARCHAR(100), -- internal/referred/applied
    referred_by INTEGER REFERENCES users(id),

    -- Status & Stage
    status VARCHAR(50) DEFAULT 'submitted', -- submitted/screening/interview/offered/hired/rejected
    current_stage VARCHAR(100),

    -- Assessment
    technical_score INTEGER CHECK (technical_score >= 0 AND technical_score <= 100),
    cultural_fit_score INTEGER CHECK (cultural_fit_score >= 0 AND cultural_fit_score <= 100),
    overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),

    -- Interview Process
    screening_notes TEXT,
    interview_feedback TEXT,

    -- Offer Details
    offered_ctc DECIMAL(10,2),
    offered_at TIMESTAMP,
    offer_accepted BOOLEAN,
    offer_accepted_at TIMESTAMP,
    joining_date DATE,

    -- Rejection Details
    rejection_reason TEXT,
    rejected_at TIMESTAMP,
    rejected_by INTEGER REFERENCES users(id),

    -- Timestamps
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Unique constraint: One candidate can apply to same job only once
    UNIQUE(candidate_id, job_id),

    INDEX idx_candidate_id (candidate_id),
    INDEX idx_job_id (job_id),
    INDEX idx_status (status)
);

-- ============================================
-- 7. INTERVIEWS TABLE
-- ============================================
CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,

    -- References
    application_id INTEGER NOT NULL REFERENCES applications(id),
    candidate_id INTEGER NOT NULL REFERENCES candidates(id),
    job_id INTEGER NOT NULL REFERENCES jobs(id),

    -- Interview Details
    interview_type VARCHAR(100), -- phone-screen/technical/hr/client/final
    interview_round INTEGER,
    scheduled_at TIMESTAMP NOT NULL,
    duration_minutes INTEGER,

    -- Participants
    interviewer_name VARCHAR(255),
    interviewer_email VARCHAR(255),
    panel_members JSON, -- Array of interviewer objects

    -- Location/Link
    interview_mode VARCHAR(50), -- video/phone/in-person
    meeting_link TEXT,
    meeting_location VARCHAR(255),

    -- Status
    status VARCHAR(50) DEFAULT 'scheduled', -- scheduled/completed/cancelled/no-show

    -- Feedback
    feedback TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    recommendation VARCHAR(50), -- hire/maybe/no-hire

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT,

    INDEX idx_application_id (application_id),
    INDEX idx_scheduled_at (scheduled_at),
    INDEX idx_status (status)
);

-- ============================================
-- 8. PLACEMENTS TABLE
-- ============================================
CREATE TABLE placements (
    id SERIAL PRIMARY KEY,

    -- References
    candidate_id INTEGER NOT NULL REFERENCES candidates(id),
    job_id INTEGER NOT NULL REFERENCES jobs(id),
    client_id INTEGER NOT NULL REFERENCES clients(id),
    application_id INTEGER REFERENCES applications(id),

    -- Placement Details
    placement_type VARCHAR(50), -- permanent/contract
    designation VARCHAR(255),
    department VARCHAR(255),

    -- Compensation
    final_ctc DECIMAL(10,2),
    billing_amount DECIMAL(10,2),
    payment_terms VARCHAR(255),

    -- Dates
    joining_date DATE NOT NULL,
    end_date DATE, -- for contract placements

    -- Status
    status VARCHAR(50) DEFAULT 'active', -- active/completed/terminated
    termination_reason TEXT,
    termination_date DATE,

    -- Guarantee Period
    guarantee_period_months INTEGER,
    guarantee_end_date DATE,
    replacement_needed BOOLEAN DEFAULT false,
    replacement_candidate_id INTEGER REFERENCES candidates(id),

    -- Performance Tracking
    probation_period_months INTEGER,
    probation_cleared BOOLEAN,
    performance_rating INTEGER CHECK (performance_rating >= 1 AND performance_rating <= 5),

    -- Notes
    notes TEXT,

    -- Assigned Recruiter
    recruiter_id INTEGER REFERENCES users(id),

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_candidate_id (candidate_id),
    INDEX idx_job_id (job_id),
    INDEX idx_client_id (client_id),
    INDEX idx_status (status),
    INDEX idx_joining_date (joining_date)
);

-- ============================================
-- 9. ACTIVITIES/INTERACTIONS TABLE
-- ============================================
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,

    -- Activity Type
    entity_type VARCHAR(50) NOT NULL, -- candidate/client/job/application
    entity_id INTEGER NOT NULL,

    -- Activity Details
    activity_type VARCHAR(100) NOT NULL, -- call/email/meeting/note/status_change/interview
    title VARCHAR(255),
    description TEXT,

    -- Communication
    direction VARCHAR(20), -- inbound/outbound
    medium VARCHAR(50), -- email/phone/whatsapp/linkedin/in-person

    -- User
    performed_by INTEGER REFERENCES users(id),

    -- Outcome
    outcome VARCHAR(100), -- successful/unsuccessful/follow-up-needed
    next_action TEXT,
    next_action_date DATE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_activity_date (activity_date),
    INDEX idx_performed_by (performed_by)
);

-- ============================================
-- 10. USERS TABLE (Internal Team)
-- ============================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    -- User Details
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),

    -- Authentication
    password_hash VARCHAR(500),

    -- Role & Permissions
    role VARCHAR(50) NOT NULL, -- admin/recruiter/manager/sales
    permissions JSON,

    -- Status
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,

    -- Profile
    designation VARCHAR(255),
    department VARCHAR(100),
    profile_picture_url TEXT,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- ============================================
-- 11. CHATBOT CONVERSATIONS TABLE
-- ============================================
CREATE TABLE chatbot_conversations (
    id SERIAL PRIMARY KEY,

    -- Session Tracking
    session_id VARCHAR(255) UNIQUE NOT NULL,

    -- User Information (optional - anonymous users)
    user_email VARCHAR(255),
    user_name VARCHAR(255),
    user_phone VARCHAR(50),

    -- Tracking
    ip_address VARCHAR(45),
    user_agent TEXT,
    page_url TEXT,
    referrer_url TEXT,

    -- Conversation Data
    messages JSON NOT NULL, -- Array of message objects: [{ role: 'user/assistant', content: '...', timestamp: '...' }]

    -- Classification
    intent VARCHAR(100), -- hiring/job-seeking/general-inquiry
    tags JSON, -- Array of tags for categorization

    -- Lead Quality
    is_qualified_lead BOOLEAN,
    lead_score INTEGER,

    -- Follow-up
    requires_followup BOOLEAN DEFAULT false,
    followed_up BOOLEAN DEFAULT false,
    assigned_to INTEGER REFERENCES users(id),

    -- Conversion
    converted_to_contact BOOLEAN DEFAULT false,
    converted_to_candidate BOOLEAN DEFAULT false,
    contact_id INTEGER REFERENCES contact_submissions(id),
    candidate_id INTEGER REFERENCES candidates(id),

    -- Timestamps
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,

    INDEX idx_session_id (session_id),
    INDEX idx_user_email (user_email),
    INDEX idx_started_at (started_at),
    INDEX idx_intent (intent)
);

-- ============================================
-- 12. DOCUMENTS TABLE
-- ============================================
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,

    -- Document Details
    document_type VARCHAR(100) NOT NULL, -- resume/offer-letter/contract/certificate
    filename VARCHAR(500) NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT,
    file_size INTEGER, -- in bytes
    mime_type VARCHAR(100),

    -- Associated Entity
    entity_type VARCHAR(50), -- candidate/client/job/placement
    entity_id INTEGER NOT NULL,

    -- Metadata
    uploaded_by INTEGER REFERENCES users(id),
    description TEXT,
    tags JSON,

    -- Timestamps
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Soft Delete
    is_active BOOLEAN DEFAULT true,
    deleted_at TIMESTAMP,

    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_document_type (document_type)
);

-- ============================================
-- 13. NOTES TABLE
-- ============================================
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,

    -- Associated Entity
    entity_type VARCHAR(50) NOT NULL, -- candidate/client/job/application
    entity_id INTEGER NOT NULL,

    -- Note Details
    title VARCHAR(255),
    content TEXT NOT NULL,
    note_type VARCHAR(100), -- general/important/reminder/warning

    -- Visibility
    is_private BOOLEAN DEFAULT false,
    visible_to_roles JSON, -- Array of roles who can see this note

    -- User
    created_by INTEGER REFERENCES users(id),

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created_by (created_by)
);

-- ============================================
-- 14. REMINDERS/TASKS TABLE
-- ============================================
CREATE TABLE reminders (
    id SERIAL PRIMARY KEY,

    -- Task Details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(50) DEFAULT 'medium', -- low/medium/high/urgent

    -- Associated Entity
    entity_type VARCHAR(50), -- candidate/client/job/application
    entity_id INTEGER,

    -- Assignment
    assigned_to INTEGER NOT NULL REFERENCES users(id),
    assigned_by INTEGER REFERENCES users(id),

    -- Due Date & Status
    due_date DATE NOT NULL,
    due_time TIME,
    status VARCHAR(50) DEFAULT 'pending', -- pending/in-progress/completed/cancelled

    -- Completion
    completed_at TIMESTAMP,
    completion_notes TEXT,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_assigned_to (assigned_to),
    INDEX idx_due_date (due_date),
    INDEX idx_status (status)
);

-- ============================================
-- 15. EMAIL LOGS TABLE
-- ============================================
CREATE TABLE email_logs (
    id SERIAL PRIMARY KEY,

    -- Email Details
    to_email VARCHAR(255) NOT NULL,
    cc_emails JSON,
    bcc_emails JSON,
    from_email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    body TEXT,

    -- Associated Entity
    entity_type VARCHAR(50), -- candidate/client/application
    entity_id INTEGER,

    -- Email Type
    email_type VARCHAR(100), -- application-confirmation/interview-invitation/offer-letter/etc
    template_used VARCHAR(255),

    -- Status
    status VARCHAR(50) DEFAULT 'sent', -- sent/failed/bounced/opened/clicked
    sent_at TIMESTAMP,
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP,
    bounced_at TIMESTAMP,
    error_message TEXT,

    -- Tracking
    sent_by INTEGER REFERENCES users(id),

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_to_email (to_email),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_status (status)
);

-- ============================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_placements_updated_at BEFORE UPDATE ON placements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE candidates IS 'Main table storing all candidate information from talent pool form and other sources';
COMMENT ON TABLE contact_submissions IS 'Stores all contact form submissions from website (both hiring and candidate inquiries)';
COMMENT ON TABLE talent_pool_applications IS 'Tracks applications submitted through the detailed talent pool form';
COMMENT ON TABLE jobs IS 'Job positions/openings from clients';
COMMENT ON TABLE clients IS 'Client companies and their contact information';
COMMENT ON TABLE applications IS 'Links candidates to jobs they have applied for or been submitted to';
COMMENT ON TABLE interviews IS 'Tracks all interview schedules and feedback';
COMMENT ON TABLE placements IS 'Successful placements and their tracking information';
COMMENT ON TABLE activities IS 'All interactions and activities related to candidates, clients, jobs';
COMMENT ON TABLE users IS 'Internal team members (recruiters, admins, etc.)';
COMMENT ON TABLE chatbot_conversations IS 'Stores chatbot conversation history for lead tracking and follow-up';
COMMENT ON TABLE documents IS 'File storage metadata for resumes, contracts, certificates, etc.';
COMMENT ON TABLE notes IS 'Internal notes for candidates, clients, jobs, applications';
COMMENT ON TABLE reminders IS 'Tasks and reminders for team members';
COMMENT ON TABLE email_logs IS 'Tracks all emails sent from the system';
