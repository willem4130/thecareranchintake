# The Care Ranch Intake - Implementation Plan

**Last Updated:** October 22, 2025
**Status:** Phase 1 Foundation Complete ✅ | Ready to Build Frontend

---

## 📋 Project Context

**What:** Transform a Word document intake form into a beautiful, full-featured web questionnaire with admin dashboard.

**Client:** The Care Ranch - Leadership Retreat program
**Users:**

- **Participants:** Fill out 72-question intake form (8 pages)
- **Admin:** View submissions, manage deadlines, export data, invite users

---

## ✅ Completed Work

### Phase 1: Foundation (DONE)

**Database (Prisma + PostgreSQL):**

- ✅ Comprehensive schema with 10+ models
- ✅ User roles (ADMIN, PARTICIPANT)
- ✅ Dynamic form structure (Form → Page → Section → Question)
- ✅ FormSubmission + Response tracking
- ✅ Deadline management
- ✅ Invitation system
- ✅ Media asset storage
- ✅ 14 question types supported

**Seeded Data:**

- ✅ Complete 8-page intake form (72 questions)
- ✅ Admin user: `admin@thecareranch.com`
- ✅ All questions organized by sections

**Dependencies:**

- ✅ All required packages installed
- ✅ react-hook-form, framer-motion, jspdf, exceljs, uploadthing, resend, etc.

**Design System:**

- ✅ Extracted from client-provided reference
- ✅ Editorial/magazine aesthetic documented
- ✅ Colors, typography, components specified
- ✅ See DESIGN_SYSTEM.md

---

## 🎯 Key Decisions Made

### 1. Authentication: Email Magic Links via Resend ✅

**Chosen because:**

- Safest (no OAuth credentials)
- Easiest (just email)
- Cheapest (3,000 emails/month free)
- Professional user experience
- No friction for participants

**Implementation:** Use NextAuth.js v5 with Email provider + Resend

### 2. Design Strategy: Build with Branding from Start ✅

**Chosen because:**

- Editorial style fits the introspective nature of the questionnaire
- Creates trust and comfort for deep personal questions
- Reusable components prevent refactoring later
- Sets the right professional tone immediately

**Reference:** Sophisticated editorial/magazine design (see DESIGN_SYSTEM.md)

### 3. Build Order: Sequential (NOT Parallel) ✅

**Order:**

1. Design system + Questionnaire (Days 1-3)
2. tRPC + Authentication (Days 4-5)
3. Admin Dashboard (Days 6-8)

**Why sequential:**

- Admin needs working questionnaire to have data to view
- Clearer progress milestones
- Faster feedback loop
- Less context switching

---

## 🚀 Implementation Roadmap

### **Phase 2: Core Questionnaire Experience** (Current Phase)

**Estimated Time:** 2-3 days

#### Step 1: Design System Setup (0.5 day)

**File:** `src/styles/globals.css`, `tailwind.config.ts`

**Tasks:**

- [ ] Configure Tailwind with editorial color palette
- [ ] Set up Miller Text / Georgia serif fonts
- [ ] Create CSS variables for design tokens
- [ ] Add custom Tailwind classes for editorial style

**Deliverable:** Foundation styles ready for components

---

#### Step 2: Base UI Components (0.5 day)

**Files:** `src/components/ui/*`

**Tasks:**

- [ ] Update shadcn Button with editorial style
- [ ] Update shadcn Input with refined borders
- [ ] Create Card component with subtle shadow
- [ ] Create Label component with serif typography

**Deliverable:** Reusable styled components

---

#### Step 3: Questionnaire Layout Components (0.5 day)

**Files:** `src/components/questionnaire/*`

**Tasks:**

- [ ] `<ProgressTimeline>` - Visual stepper showing 8 pages
- [ ] `<AutoSaveIndicator>` - Shows "Saving...", "Saved at HH:MM"
- [ ] `<QuestionCard>` - Wrapper with white bg, shadow, padding
- [ ] `<PageContainer>` - Max-width, centered layout

**Deliverable:** Layout structure ready

---

#### Step 4: Question Type Components (1 day)

**Files:** `src/components/questionnaire/questions/*`

**Tasks:**

- [ ] `<ShortTextQuestion>` - Single-line input
- [ ] `<LongTextQuestion>` - Textarea for reflections
- [ ] `<EmailQuestion>` - Email input with validation
- [ ] `<PhoneQuestion>` - Phone input with formatting
- [ ] `<DateQuestion>` - Date picker
- [ ] `<RatingQuestion>` - 0-10 scale with visual
- [ ] `<ScaleQuestion>` - 1-5 scale
- [ ] `<YesNoQuestion>` - Radio buttons
- [ ] `<SingleChoiceQuestion>` - Radio group
- [ ] `<MultipleChoiceQuestion>` - Checkboxes

**Deliverable:** All question types render beautifully

---

#### Step 5: Dynamic Form Renderer (0.5 day)

**File:** `src/components/questionnaire/QuestionRenderer.tsx`

**Tasks:**

- [ ] Switch statement to render correct question type
- [ ] Pass props (question data, value, onChange)
- [ ] Handle validation rules
- [ ] Show required indicators

**Deliverable:** Can render any question type dynamically

---

#### Step 6: Main Questionnaire Page (1 day)

**File:** `src/app/(participant)/questionnaire/[pageId]/page.tsx`

**Tasks:**

- [ ] Fetch page data from tRPC (mock for now)
- [ ] Use react-hook-form for state management
- [ ] Render all questions for current page
- [ ] Progress timeline at top
- [ ] Auto-save indicator
- [ ] Previous/Next navigation buttons
- [ ] Handle page transitions
- [ ] Mobile-responsive layout

**Deliverable:** Working questionnaire page (without backend yet)

---

### **Phase 3: tRPC API & Authentication** (2 days)

#### Step 1: tRPC Routes (0.5 day)

**Files:** `src/server/api/routers/questionnaire.ts`

**Tasks:**

- [ ] `getForm()` - Get full form structure
- [ ] `getPage(pageId)` - Get specific page with questions
- [ ] `getSubmission(userId)` - Get user's current submission
- [ ] `saveResponses({ pageId, responses })` - Auto-save
- [ ] `submitForm()` - Mark as complete

**Deliverable:** Type-safe API routes

---

#### Step 2: Auto-save Hook (0.5 day)

**File:** `src/hooks/useAutoSave.ts`

**Tasks:**

- [ ] Debounce changes (30 seconds)
- [ ] Call tRPC `saveResponses` mutation
- [ ] Track status (idle, saving, saved, error)
- [ ] Show last saved timestamp
- [ ] Handle errors gracefully

**Deliverable:** Auto-save works seamlessly

---

#### Step 3: Email Authentication Setup (1 day)

**Files:** `src/server/auth.ts`, email templates

**Tasks:**

- [ ] Install Resend SDK
- [ ] Configure NextAuth Email provider
- [ ] Create email template for magic links
- [ ] Test login flow
- [ ] Add sign-in page with Care Ranch branding
- [ ] Protect questionnaire routes (middleware)

**Deliverable:** Users can log in via email

---

### **Phase 4: Admin Dashboard** (3 days)

#### Step 1: Admin Layout & Navigation (0.5 day)

**Files:** `src/app/(admin)/admin/layout.tsx`

**Tasks:**

- [ ] Sidebar navigation
- [ ] Role-based access check (ADMIN only)
- [ ] Dashboard, Submissions, Users, Media sections
- [ ] Styled with editorial design

**Deliverable:** Admin shell ready

---

#### Step 2: Submissions Table (1 day)

**File:** `src/app/(admin)/admin/submissions/page.tsx`

**Tasks:**

- [ ] Create tRPC route `admin.listSubmissions()`
- [ ] Use @tanstack/react-table
- [ ] Columns: User, Status, Progress %, Deadline, Last Saved
- [ ] Filters: Status dropdown, search by name
- [ ] Pagination
- [ ] Click to view detail
- [ ] Export button (Excel/CSV)

**Deliverable:** Admin can view all submissions

---

#### Step 3: View Single Submission (0.5 day)

**File:** `src/app/(admin)/admin/submissions/[id]/page.tsx`

**Tasks:**

- [ ] Fetch submission with all responses
- [ ] Display organized by sections
- [ ] Export to PDF button
- [ ] Send reminder email button
- [ ] Elegant, printable layout

**Deliverable:** Admin can review responses

---

#### Step 4: User Management (1 day)

**File:** `src/app/(admin)/admin/users/page.tsx`

**Tasks:**

- [ ] Create tRPC routes:
  - `admin.inviteUser({ email, deadline })`
  - `admin.setDeadline({ userId, deadline })`
  - `admin.listUsers()`
- [ ] Invite form (email + deadline picker)
- [ ] Send invitation email via Resend
- [ ] User table with deadlines
- [ ] Bulk deadline updates
- [ ] Edit/delete users

**Deliverable:** Admin can invite users & set deadlines

---

### **Phase 5: Email Reminders & Export** (2 days)

#### Step 1: Reminder System (1 day)

**Files:** `src/app/api/cron/send-reminders/route.ts`

**Tasks:**

- [ ] Create Vercel cron job (daily at 9am)
- [ ] Query users with approaching deadlines
- [ ] Check if reminder already sent
- [ ] Send email via Resend
- [ ] Update reminder flags in database
- [ ] Create email templates (7 days, 3 days, 1 day)

**Deliverable:** Automated deadline reminders

---

#### Step 2: PDF Export (1 day)

**File:** `src/app/api/export/pdf/[submissionId]/route.ts`

**Tasks:**

- [ ] Use jspdf + html2canvas
- [ ] Create printable HTML template
- [ ] Include branding, all responses
- [ ] Format with editorial style
- [ ] Download as PDF

**Deliverable:** Export submissions to PDF

---

### **Phase 6: Polish & Media Features** (2-3 days)

#### Step 1: Background Media Support (1 day)

**Tasks:**

- [ ] Add background image per page
- [ ] Add background video support (optional)
- [ ] Create media picker in admin
- [ ] Optimize loading performance

---

#### Step 2: Audio Player (0.5 day)

**Tasks:**

- [ ] Create custom audio player component
- [ ] Add to questionnaire layout
- [ ] Admin can upload audio files
- [ ] User can play/pause

---

#### Step 3: Animations & Transitions (0.5 day)

**Tasks:**

- [ ] Page transitions with Framer Motion
- [ ] Button hover animations
- [ ] Smooth form interactions
- [ ] Loading states

---

#### Step 4: Mobile Optimization (1 day)

**Tasks:**

- [ ] Test on mobile devices
- [ ] Optimize touch targets
- [ ] Responsive typography
- [ ] Mobile-friendly navigation

---

## 📅 Timeline Summary

| Phase                       | Duration    | Status     |
| --------------------------- | ----------- | ---------- |
| Phase 1: Foundation         | 1 day       | ✅ DONE    |
| Phase 2: Questionnaire      | 3 days      | 🔜 NEXT    |
| Phase 3: tRPC + Auth        | 2 days      | ⏳ Pending |
| Phase 4: Admin Dashboard    | 3 days      | ⏳ Pending |
| Phase 5: Reminders + Export | 2 days      | ⏳ Pending |
| Phase 6: Polish + Media     | 3 days      | ⏳ Pending |
| **Total**                   | **14 days** |            |

---

## 🎯 Immediate Next Actions

**To continue development right now:**

```bash
cd /Users/willemvandenberg/Documents/agent-girl/thecareranchintake

# Start dev server
npm run dev

# In another terminal, open Prisma Studio to see seeded data
npm run db:studio
```

**First task:**

1. Update `tailwind.config.ts` with design system colors
2. Configure fonts (Miller Text / Georgia)
3. Update `src/styles/globals.css` with base styles

**Files to create:**

```
src/components/questionnaire/
├── ProgressTimeline.tsx
├── AutoSaveIndicator.tsx
├── QuestionCard.tsx
└── questions/
    ├── ShortTextQuestion.tsx
    ├── LongTextQuestion.tsx
    ├── RatingQuestion.tsx
    └── ... (more question types)
```

---

## 🔑 Key Files Reference

**Database:**

- Schema: `prisma/schema.prisma`
- Seed script: `prisma/seed.ts`
- Run seed: `npm run db:seed`

**Authentication:**

- Config: `src/server/auth.ts`
- Middleware: `src/middleware.ts`

**Styling:**

- Design system: `DESIGN_SYSTEM.md` (this file)
- Tailwind config: `tailwind.config.ts`
- Global CSS: `src/styles/globals.css`

**API:**

- tRPC routers: `src/server/api/routers/`
- Root router: `src/server/api/root.ts`

**Database Access:**

```bash
npm run db:studio  # Opens http://localhost:5555
```

**Admin Credentials:**

- Email: `admin@thecareranch.com`
- Password: Set up when configuring auth provider

---

## 📝 Notes & Considerations

### Email Service (Resend)

- Free tier: 3,000 emails/month
- Need to add verified domain for production
- Test with dev mode first

### Database

- Local PostgreSQL for development
- Vercel Postgres for production (recommended)
- Connection pooling configured

### Deployment

- Vercel recommended (optimized for Next.js)
- Set `output: 'standalone'` in `next.config.js` (already done)
- Environment variables to configure in Vercel dashboard

### Testing Strategy

1. Manual testing during development
2. Vitest for unit tests (later)
3. Playwright for E2E (later)
4. Focus on working features first

---

## 🤔 Open Questions / Decisions Needed

- [ ] Should deadlines be per-user or global for all participants?
  - **Current assumption:** Per-user deadlines (admin can customize)

- [ ] What happens after deadline passes?
  - **Current assumption:** Form locks, but admin can extend deadline

- [ ] How many reminder emails?
  - **Current plan:** 3 reminders (7 days, 3 days, 1 day before)

- [ ] Should participants see other participants?
  - **Current assumption:** No, each user only sees their own form

- [ ] Can participants edit after submission?
  - **Current assumption:** No, submission is final (but admin can unlock)

---

**All documentation is now saved. Ready to continue development! 🚀**
