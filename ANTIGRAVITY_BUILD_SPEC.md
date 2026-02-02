# ANTIGRAVITY BUILD SPECIFICATION
## AIforStudents.online - Complete Ecosystem
## Build Date: February 2026

---

## CRITICAL CONTEXT

You are building a complete education ecosystem for schools in Darjeeling, India, aligned with NEP 2020.

This is NOT a typical education platform. This system:
- Prioritizes **curiosity over achievement**
- Tracks **learning vectors** (direction + change), not scores
- Integrates school learning + vocational training + peer help
- Makes **confusion safe** and **revision prestigious**
- Helps students **pass exams WITHOUT killing curiosity**

### Core Philosophy
> "Education is teaching humans to explore reality with curiosity, thinking, and tools — before certainty kills discovery."

### Pragmatic Addition
> "Then giving them strategies to succeed in the current system."

### Design Mantras
- **No scores. No rankings. No surveillance.**
- **AI assists humans, never replaces human voice.**
- **Uncertainty is a feature, not a bug.**
- **Understanding first, memory tricks second.**

---

## EXISTING CODEBASE

The Learning Vector Model platform already includes:

| Feature | Status | Location |
|---------|--------|----------|
| Student/Teacher/Parent/Admin roles | ✅ Built | `src/pages/*/DashboardPage.jsx` |
| Question Log + AI Gate | ✅ Built | `src/pages/student/ReasoningLogPage.jsx` |
| Thinking Trajectory (replaced CTI) | ✅ Built | `src/pages/student/MyProgressPage.jsx` |
| Weekly Meaning Reflection | ✅ Built | `src/pages/student/ReflectionLogPage.jsx` |
| Teacher Sensemaking Panels | ✅ Built | `src/pages/teacher/ArtifactReviewPage.jsx` |
| Class Learning Patterns | ✅ Built | `src/pages/teacher/ClassInsightsPage.jsx` |
| Parent growth narratives | ✅ Built | `src/pages/parent/DashboardPage.jsx` |
| ThinkingContext (trajectory functions) | ✅ Built | `src/contexts/ThinkingContext.jsx` |

**Codebase Location:** `c:\Users\FaradaysCage007\Desktop\2_PROJECTS\AIforStudents`

**Tech Stack:** React 19, Supabase, Tailwind CSS, Framer Motion, Recharts

---

## BUILD SEQUENCE (6 Weeks)

```
Week 1: Foundation + Database
Week 2: Complete Learning Vector Model  
Week 3: Memory Techniques + Exam Prep
Week 4: Peer Help Network
Week 5: Vocational Integration
Week 6: Unification + Polish
```

---

## WEEK 1: FOUNDATION + DATABASE

**Goal:** Schema deployed, auth working, existing features stable

### Tasks

#### 1.1 Database Schema Deployment
- [ ] Create `aiforstudents-full-schema.sql` with all 30+ tables
- [ ] Deploy to Supabase dev project
- [ ] Verify all tables created correctly
- [ ] Test RLS policies for each role

#### 1.2 Auth Enhancement
- [ ] Add `vocational_partner` role to profiles table
- [ ] Update `AuthContext.jsx` to handle new role
- [ ] Create role-based route guards
- [ ] Add role switcher for dev/testing

#### 1.3 Seed Data
- [ ] Create seed script with test users (1 per role)
- [ ] Add sample questions, reflections, sessions
- [ ] Add sample vocational institution + programs
- [ ] Verify existing features work with new schema

#### 1.4 Migration Safety
- [ ] Backup current localStorage data structure
- [ ] Create migration script if needed
- [ ] Test backward compatibility

### Schema Preview (Key Tables)

```sql
-- Core Learning
profiles, thinking_sessions, question_refinements, 
belief_revisions, reflections, portfolios, portfolio_artifacts

-- Memory & Exams
memory_techniques, technique_ratings, technique_bookmarks,
exam_preparations, exam_topics, daily_study_tasks

-- Peer Help
help_requests, help_responses, help_ratings,
study_groups, group_members, group_messages

-- Vocational
vocational_institutions, vocational_programs,
school_partnerships, vocational_enrollments, vocational_sessions

-- Admin
reality_signals, platform_metrics, nep_compliance_logs
```

### Deliverable
- [ ] Schema deployed to Supabase
- [ ] All 5 roles can authenticate
- [ ] Existing features still functional
- [ ] Seed data available for testing

---

## WEEK 2: COMPLETE LEARNING VECTOR MODEL

**Goal:** Core philosophical layer is complete and production-ready

### Tasks

#### 2.1 Enhanced Question Refinement
- [ ] Track multiple refinement steps per question
- [ ] Show "what changed" diff between versions
- [ ] Store refinement initiator: `user` | `ai` | `peer` | `teacher`
- [ ] Add refinement timeline visualization

**Component:**
```jsx
<QuestionRefinementTimeline
  original={rawQuestion}
  refinements={[
    { version: 2, text: "...", initiatedBy: "ai", timestamp: "..." },
    { version: 3, text: "...", initiatedBy: "user", timestamp: "..." }
  ]}
  showDiff={true}
/>
```

#### 2.2 Thinking Sessions Enhancement
- [ ] Add structured evidence notes field
- [ ] Add counter-arguments collection
- [ ] Belief revision comparison (before/after side-by-side)
- [ ] Uncertainty expression toggle with encouraging copy

**UI Update to ThinkingWorkspace:**
```jsx
<ThinkingSession>
  <QuestionSection />
  <InitialBeliefSection uncertaintyToggle />
  <AssumptionsSection optional />
  <EvidenceNotesSection />        {/* NEW */}
  <CounterArgumentsSection />      {/* NEW */}
  <BeliefRevisionComparison />     {/* NEW */}
  <AIGate />
</ThinkingSession>
```

#### 2.3 Teacher Warm Message System
- [ ] Weekly AI summary generation (internal, teacher-only view)
- [ ] Message composition interface with student context
- [ ] Message delivery to student (no AI attribution visible)
- [ ] Message history per student

**Teacher View:**
```
┌─────────────────────────────────────────────────┐
│ Weekly Summary for Tenzin (AI-Generated)        │
│ ─────────────────────────────────────────────── │
│ • Asked 5 questions about climate this week     │
│ • Revised thinking 2 times                      │
│ • Expressed uncertainty on 3 occasions          │
│ • Confusion cluster: carbon cycle               │
├─────────────────────────────────────────────────┤
│ Your Message to Tenzin:                         │
│ ┌─────────────────────────────────────────────┐ │
│ │ I noticed you became more comfortable       │ │
│ │ saying "I'm not sure" this week. That's     │ │
│ │ real growth...                              │ │
│ └─────────────────────────────────────────────┘ │
│                                    [Send] 💌    │
└─────────────────────────────────────────────────┘
```

**Student Receives:**
```
┌─────────────────────────────────────────────────┐
│ 💌 Message from Ms. Sharma                      │
│ ─────────────────────────────────────────────── │
│ "I noticed you became more comfortable saying   │
│  'I'm not sure' this week. That's real growth." │
│                                                 │
│                              January 28, 2026   │
└─────────────────────────────────────────────────┘
```

#### 2.4 Portfolio v1
- [ ] Question evolution timeline
- [ ] Belief revision log (anonymized)
- [ ] Selected reflections (student chooses)
- [ ] Visibility controls: `private` | `school` | `public`
- [ ] Generate shareable link

**Portfolio Structure:**
```
My Portfolio
├── Question Evolution
│   └── How my questions changed over 3 months
├── Belief Revisions
│   └── 5 times I changed my mind (and why)
├── Reflections
│   └── 3 selected weekly reflections
└── Visibility: Private 🔒
    [Change] [Generate Link]
```

### Deliverable
- [ ] Question refinement tracking complete
- [ ] Thinking sessions fully functional
- [ ] Warm message system tested end-to-end
- [ ] Portfolio v1 viewable and shareable

---

## WEEK 3: MEMORY TECHNIQUES + EXAM PREP

**Goal:** Students can prepare for exams strategically without losing curiosity

### Philosophy Guard
> Memory techniques are tools, not shortcuts. They come AFTER understanding.

### Tasks

#### 3.1 Memory Technique Library

**Database Table:**
```sql
CREATE TABLE memory_techniques (
  id UUID PRIMARY KEY,
  subject TEXT,
  topic TEXT,
  concept TEXT,                    -- The actual concept
  understanding_explanation TEXT,  -- Why/how it works
  memory_trick TEXT,               -- The mnemonic/trick
  trick_type TEXT,                 -- mnemonic, visual, story, rhythm, acronym
  practice_questions JSONB,        -- Array of practice items
  exam_patterns TEXT,              -- Where this appears in exams
  submitted_by UUID REFERENCES profiles(id),
  verified_by UUID REFERENCES profiles(id),
  is_verified BOOLEAN DEFAULT false,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Features:**
- [ ] Browse/search by subject, topic, trick type
- [ ] Submit new technique (student or teacher)
- [ ] Teacher verification workflow
- [ ] Upvote system (no downvotes — positive only)
- [ ] Bookmark for personal collection
- [ ] Report inappropriate content

**Component:**
```jsx
<MemoryTechniqueCard
  subject="Math"
  topic="Quadratic Formula"
  concept="x = (-b ± √(b²-4ac)) / 2a"
  understanding="The formula finds where a parabola crosses the x-axis..."
  memoryTrick="🎵 Negative Boy couldn't decide (±) to go to the radical party..."
  trickType="song"
  practiceQuestions={[
    { q: "Solve x² + 5x + 6 = 0", hint: "Factor first, then verify" }
  ]}
  examPatterns="Often hidden in word problems about projectile motion"
  upvotes={47}
  isVerified={true}
  verifiedBy="Ms. Sharma"
  onUpvote={handleUpvote}
  onBookmark={handleBookmark}
/>
```

#### 3.2 Memory Technique Submission Flow

```
Step 1: What concept are you capturing?
        [Subject] [Topic] [Concept]

Step 2: Explain it first (understanding before memory)
        [Why does this work? How do you understand it?]

Step 3: Now share your memory trick
        [What's the trick?]
        [Type: Mnemonic / Visual / Story / Song / Acronym]

Step 4: Add practice questions (optional)
        [Question 1] [Hint 1]
        [+ Add another]

Step 5: Exam patterns (optional)
        [Where does this appear in exams?]

                              [Submit for Review]
```

#### 3.3 Exam Preparation System

**Exam Entry:**
```jsx
<ExamEntryForm
  onSubmit={handleCreateExam}
  fields={[
    { name: 'subject', type: 'select', options: subjects },
    { name: 'examDate', type: 'date' },
    { name: 'topics', type: 'multi-select', options: topicsForSubject },
    { name: 'selfAssessment', type: 'topic-confidence-rating' }
  ]}
/>
```

**4-Week Strategy Generator:**
```
Week 1: UNDERSTAND
├── Focus on weakest topics
├── Use AI to explore concepts
├── Ask questions freely
└── Don't memorize yet

Week 2: CONNECT + REMEMBER
├── Link memory techniques to concepts
├── Practice speed (timed questions)
├── Create your own memory tricks
└── Share and learn from peers

Week 3: PRACTICE
├── Past papers and patterns
├── Identify remaining gaps
├── Peer help for stuck areas
└── Simulate exam conditions

Week 4: REVISE
├── Quick review using bookmarked tricks
├── Focus on high-frequency topics
├── Light practice, no new learning
└── Rest and confidence building
```

**Daily Study Dashboard:**
```
┌───────────────────────────────────────────────────┐
│ Math Exam: March 15 (21 days away)               │
├───────────────────────────────────────────────────┤
│ Today's Focus: Algebra - Quadratic Equations     │
│                                                   │
│ □ Step 1: Understand (15 min)                    │
│   "Why do we get two solutions?"                 │
│   [Start Exploration →]                          │
│                                                   │
│ □ Step 2: Memory Trick (5 min)                   │
│   🎵 Quadratic Formula Song                      │
│   [Practice Trick →]                             │
│                                                   │
│ □ Step 3: Practice (20 min)                      │
│   5 problems • 4 min each                        │
│   [Start Practice →]                             │
│                                                   │
│ Progress: ████████░░░░░░░░ 2/3                   │
└───────────────────────────────────────────────────┘
```

#### 3.4 Weak Topic Detection
- [ ] Analyze past questions and belief revisions
- [ ] Identify topics with high hesitation/confusion
- [ ] Suggest focus areas automatically
- [ ] Integrate with exam prep strategy

### Deliverable
- [ ] Memory technique library functional
- [ ] Techniques can be submitted, verified, upvoted
- [ ] Exam prep creates personalized 4-week plan
- [ ] Daily tasks generate correctly
- [ ] Weak topics auto-detected

---

## WEEK 4: PEER HELP NETWORK

**Goal:** Students help each other, teachers are amplified (not replaced)

### Philosophy Guard
> Peer help is about mutual growth, not popularity contests. Light reputation, no leaderboards.

### Tasks

#### 4.1 Help Request System

**Request Form:**
```jsx
<HelpRequestForm
  fields={[
    { name: 'subject', required: true },
    { name: 'topic', required: true },
    { name: 'question', required: true, minLength: 20 },
    { name: 'whatTried', required: true, hint: "What have you already tried?" },
    { name: 'stuckOn', required: true, hint: "Specifically, where are you stuck?" },
    { name: 'urgency', options: ['low', 'medium', 'high'] },
    { name: 'anonymous', type: 'checkbox', default: false }
  ]}
/>
```

**Request Card:**
```
┌───────────────────────────────────────────────────┐
│ 🆘 Help Needed: Science → Photosynthesis         │
│ ─────────────────────────────────────────────────│
│ "Why do plants need sunlight specifically?       │
│  Can they use other light sources?"              │
│                                                   │
│ What I Tried: Read textbook Ch 4, watched video  │
│ Stuck On: Why sunlight and not lamplight?        │
│                                                   │
│ Urgency: 🟡 Medium • Posted 2 hours ago          │
│                                                   │
│ Suggested Helpers:                               │
│ ├── 👤 Anjali (helped 7 students, 4.8★)          │
│ ├── 👨‍🏫 Mr. Kumar (available 4-5pm)              │
│ └── 💡 Memory Trick: "Light = Photo..."         │
│                                                   │
│                           [Respond] [Bookmark]   │
└───────────────────────────────────────────────────┘
```

#### 4.2 Matching Algorithm

```javascript
async function findHelpers(request) {
  const helpers = [];
  
  // 1. Peers who answered this topic well before
  const peers = await db.query(`
    SELECT responder_id, avg_rating, response_count
    FROM help_responses
    WHERE topic = $1 AND avg_rating >= 4.0
    ORDER BY avg_rating DESC, response_count DESC
    LIMIT 5
  `, [request.topic]);
  
  // 2. Available teachers with expertise
  const teachers = await db.query(`
    SELECT teacher_id, available_slots
    FROM teacher_availability
    WHERE subjects @> $1
    AND available_slots && $2
  `, [request.subject, next24Hours]);
  
  // 3. Relevant memory techniques
  const techniques = await db.query(`
    SELECT * FROM memory_techniques
    WHERE topic = $1 AND is_verified = true
    ORDER BY upvotes DESC
    LIMIT 3
  `, [request.topic]);
  
  // 4. Vocational connections (if relevant)
  const vocational = await findVocationalConnections(request.topic);
  
  return { peers, teachers, techniques, vocational };
}
```

#### 4.3 Response Thread

```
┌───────────────────────────────────────────────────┐
│ Help Thread: Photosynthesis                       │
├───────────────────────────────────────────────────┤
│ Original Question by Student A                    │
│ "Why do plants need sunlight specifically?"       │
├───────────────────────────────────────────────────┤
│ Response by Anjali • 1 hour ago                   │
│ "Great question! So, plants need specific        │
│  wavelengths of light. Red and blue work best    │
│  because chlorophyll absorbs these..."           │
│                                                   │
│         [👍 Helpful] [Reply] [Flag]              │
├───────────────────────────────────────────────────┤
│ Follow-up by Student A • 45 min ago              │
│ "So LEDs would work if they have right colors?"  │
├───────────────────────────────────────────────────┤
│ Response by Anjali • 30 min ago                   │
│ "Exactly! That's why indoor farms use purple     │
│  lights - they combine red and blue..."          │
├───────────────────────────────────────────────────┤
│                                                   │
│ [Mark as Resolved ✓]                             │
│                                                   │
│ Rate this help:                                  │
│ ⭐⭐⭐⭐⭐                                        │
│ [Submit Rating]                                  │
└───────────────────────────────────────────────────┘
```

#### 4.4 Teacher Availability

```jsx
<TeacherAvailabilityScheduler
  weeklySchedule={[
    { day: 'Monday', slots: ['4:00-5:00 PM', '5:00-6:00 PM'] },
    { day: 'Thursday', slots: ['4:00-5:00 PM'] }
  ]}
  subjects={['Science', 'Math']}
  maxStudentsPerSlot={3}
  onSave={handleSaveAvailability}
/>

<StudentBookingInterface
  teacher={teacher}
  availableSlots={slots}
  onBook={handleBookSlot}
/>
```

#### 4.5 Study Groups

```jsx
<StudyGroupCard
  name="Algebra Warriors"
  subject="Math"
  topic="Quadratic Equations"
  schedule="Tuesdays 5pm"
  members={[{ name: 'Tenzin', avatar: '...' }, /* ... */]}
  maxMembers={6}
  isOpen={true}
  onJoin={handleJoin}
/>
```

#### 4.6 Reputation (Lightweight)

```
┌───────────────────────────────────────────────────┐
│ Your Help Impact                                  │
├───────────────────────────────────────────────────┤
│ Helped 7 students                                │
│ Average rating: 4.8/5 ⭐                          │
│ Topics: Photosynthesis, Cell Division, Genetics  │
│                                                   │
│ 💬 "You can help others with Photosynthesis"     │
└───────────────────────────────────────────────────┘
```

**Rules:**
- ✅ Show personal stats only
- ✅ Quiet recognition, no badges
- ❌ No leaderboards
- ❌ No comparing to others
- ❌ No gamification streaks

### Deliverable
- [ ] Help requests can be created and viewed
- [ ] Matching algorithm suggests helpers
- [ ] Response threads work with follow-ups
- [ ] Teachers can set availability and be booked
- [ ] Study groups functional
- [ ] Lightweight reputation displays

---

## WEEK 5: VOCATIONAL INTEGRATION

**Goal:** Connect schools with real-world skill providers while maintaining philosophy

### Tasks

#### 5.1 Vocational Institution Onboarding

**Registration Flow:**
```
Step 1: Institution Details
├── Name, Description
├── Category (Agriculture, Technology, Crafts, Hospitality, etc.)
├── Location, Contact
└── Skills offered

Step 2: Philosophy Alignment
├── How do you integrate critical thinking?
├── Do you allow questioning of methods?
├── How do you handle student mistakes?
└── [This is a filter, not just a form]

Step 3: Verification
├── Documents upload
├── Reference from existing school partner (optional)
└── Admin review pending

Status: Pending Verification ⏳
```

#### 5.2 Vocational Programs

**Program Structure:**
```sql
CREATE TABLE vocational_programs (
  id UUID PRIMARY KEY,
  institution_id UUID REFERENCES vocational_institutions(id),
  name TEXT,
  category TEXT,
  skill_focus TEXT[],
  basics_developed TEXT[], -- Which of 10 basics this develops
  duration_weeks INTEGER,
  sessions_per_week INTEGER,
  description TEXT,
  prerequisites TEXT[],
  max_enrollment INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**Program Card:**
```
┌───────────────────────────────────────────────────┐
│ 🌿 Organic Farming Fundamentals                  │
│ by Sunrise Cooperative                           │
├───────────────────────────────────────────────────┤
│ Category: Agriculture                            │
│ Duration: 12 weeks • 2 sessions/week             │
│                                                   │
│ Skills: Soil testing, Composting, Crop rotation │
│                                                   │
│ Builds These Basics:                             │
│ ✓ Observation & Pattern Recognition              │
│ ✓ Hypothesis Testing (crop experiments)          │
│ ✓ Documentation (field journals)                 │
│                                                   │
│ Prerequisites: None                              │
│ Enrollment: 12/20 spots                         │
│                                                   │
│           [Express Interest 🌱]                  │
└───────────────────────────────────────────────────┘
```

#### 5.3 School-Vocational Partnerships

```jsx
<PartnershipManager
  school={school}
  view="school_admin"
>
  <BrowseInstitutions
    onSendRequest={handleSendRequest}
    filterBy={['category', 'location', 'skills']}
  />
  <PendingRequests
    requests={outgoingRequests}
  />
  <ActivePartnerships
    partners={partners}
    onManage={handleManagePartnership}
  />
</PartnershipManager>
```

#### 5.4 Student Enrollment Flow

```
1. Student browses vocational catalog
2. Clicks "Express Interest" on a program
3. School admin receives notification
4. School admin reviews and approves/denies
5. If approved → Vocational institution notified
6. Vocational institution confirms enrollment
7. Student sees program in dashboard
8. Sessions begin tracking
```

#### 5.5 Session Tracking

**Instructor View:**
```jsx
<VocationalSessionView
  program={program}
  session={currentSession}
>
  <AttendanceRoster
    students={enrolledStudents}
    onMarkAttendance={handleAttendance}
  />
  <SessionNotes
    onSave={handleSaveNotes}
  />
  <LinkedQuestions
    questions={questionsFromSession}
    hint="Did any student ask a good question today?"
    onAdd={handleAddQuestion}
  />
</VocationalSessionView>
```

**Student View:**
```
┌───────────────────────────────────────────────────┐
│ 🌿 Organic Farming Fundamentals                  │
│ Session 5 of 24                                  │
├───────────────────────────────────────────────────┤
│ Today: Composting Methods                        │
│ Attendance: ✓ Present                            │
│                                                   │
│ My Questions This Session:                       │
│ • "Why does the pile need to be turned?"         │
│ • "What happens if it gets too wet?"             │
│                                                   │
│ Instructor's Note:                               │
│ "Good observations about moisture levels. Try    │
│  to document the temperature changes next week." │
│                                                   │
│ [Ask Another Question] [Write Reflection]        │
└───────────────────────────────────────────────────┘
```

#### 5.6 Cross-Context Linking

**Question Contexts:**
```javascript
const questionContexts = [
  'school',      // Regular classroom learning
  'vocational',  // Vocational session
  'peer_help',   // While helping another student
  'self'         // Independent exploration
];

// Questions tagged with context flow into unified portfolio
```

### Deliverable
- [ ] Vocational institutions can register
- [ ] Admin approval workflow functional
- [ ] Programs can be created with critical thinking elements
- [ ] School partnerships work end-to-end
- [ ] Students can enroll (with approval)
- [ ] Sessions track attendance and questions
- [ ] Cross-context questions appear in Question Log

---

## WEEK 6: UNIFICATION + POLISH

**Goal:** Everything works together, production-ready

### Tasks

#### 6.1 Unified Portfolio

```
┌───────────────────────────────────────────────────┐
│ 📁 My Portfolio                                   │
│ Tenzin Dorji • Class 8A                          │
├───────────────────────────────────────────────────┤
│                                                   │
│ 📚 SCHOOL LEARNING                               │
│ ├── Question Evolution (12 questions tracked)   │
│ ├── Belief Revisions (5 moments of growth)      │
│ └── Weekly Reflections (selected: 4)            │
│                                                   │
│ 🌿 VOCATIONAL LEARNING                           │
│ ├── Organic Farming (8/12 weeks complete)       │
│ ├── Skills: Composting, Soil Testing            │
│ └── Vocational Questions (3)                    │
│                                                   │
│ 🤝 PEER TEACHING                                 │
│ ├── Helped 7 students                           │
│ └── Topics: Photosynthesis, Cell Division       │
│                                                   │
│ 📈 CRITICAL THINKING GROWTH                      │
│ ├── [Chart: Question Depth Over Time]           │
│ ├── [Chart: Hesitation Trend]                   │
│ └── [Chart: Revision Frequency]                 │
│                                                   │
├───────────────────────────────────────────────────┤
│ 🔒 Visibility: Private                           │
│ [Select Artifacts] [Change Visibility] [Share]  │
└───────────────────────────────────────────────────┘
```

#### 6.2 Reality Signal Log (Admin-Only)

```jsx
<RealitySignalLog>
  <LogEntry
    source="Parent Feedback"
    channel="WhatsApp"
    rawQuote="My child seems less stressed about exams now"
    observedEmotion="relief"
    signalTag="reduced_anxiety"
    capturedBy="admin_1"
    timestamp="2026-02-15"
  />
  <LogEntry
    source="Teacher Observation"
    channel="Platform Feedback"
    rawQuote="Students asking better questions in class"
    observedEmotion="surprise"
    signalTag="curiosity_increase"
    capturedBy="admin_1"
    timestamp="2026-02-18"
  />
</RealitySignalLog>

<MonthlyReview
  signals={monthlySignals}
  patterns={detectedPatterns}
  actionsToTake={suggestedActions}
/>
```

#### 6.3 Platform Metrics Dashboard (Admin)

```
┌───────────────────────────────────────────────────┐
│ 📊 Platform Overview                              │
│ January 2026                                     │
├───────────────────────────────────────────────────┤
│                                                   │
│ Active Users                                     │
│ Students: 245 │ Teachers: 18 │ Parents: 89      │
│                                                   │
│ Learning Activity                                │
│ Questions Asked: 1,247                           │
│ Belief Revisions: 312                            │
│ Peer Help Given: 89                              │
│                                                   │
│ Vocational Integration                           │
│ Active Enrollments: 45                           │
│ Partner Institutions: 3                          │
│                                                   │
│ Teacher Engagement                               │
│ Warm Messages Sent: 156                          │
│ Avg Response Time: 2.3 days                      │
│                                                   │
│ NEP 2020 Compliance                              │
│ Holistic Development: ✓                          │
│ Skill-Based Learning: ✓                          │
│ Multiple Assessment Modes: ✓                     │
│                                                   │
│ [Export Report: CSV] [Export Report: PDF]       │
└───────────────────────────────────────────────────┘
```

#### 6.4 Enhanced Parent Dashboard

```
┌───────────────────────────────────────────────────┐
│ 💝 Tenzin's Learning Journey                     │
├───────────────────────────────────────────────────┤
│                                                   │
│ 🔭 What They're Exploring                        │
│ ├── Current interests: Climate, Biology         │
│ ├── Vocational: Organic Farming (Week 8)        │
│ └── Peer teaching: Helped 3 students this month │
│                                                   │
│ 🌱 Signs of Growth                               │
│ ├── Questions getting deeper                    │
│ ├── More comfortable with uncertainty           │
│ ├── Revised thinking 5 times (learning!)        │
│ └── Teaching others (retention boost)           │
│                                                   │
│ 💌 Messages from Teachers                        │
│ └── Ms. Sharma: "Tenzin showed great curiosity  │
│     about carbon cycles this week..."           │
│                                                   │
│ 🎯 Exam Preparation (if active)                  │
│ ├── Math: March 15 (focused on Algebra)         │
│ └── Progress: On track ✓                        │
│                                                   │
│ 💡 How to Support                                │
│ ├── Ask: "What surprised you today?"            │
│ ├── Praise effort, not results                  │
│ └── Let them struggle a little                  │
└───────────────────────────────────────────────────┘
```

#### 6.5 UI/UX Polish Checklist

- [ ] Consistent navigation across all roles
- [ ] Mobile-responsive (test on phone)
- [ ] Loading states for all async operations
- [ ] Error handling with helpful messages
- [ ] Empty states with actionable prompts
- [ ] Onboarding tooltips for new users
- [ ] Keyboard navigation support
- [ ] ARIA labels for accessibility
- [ ] Focus management for modals
- [ ] Consistent color system (dark theme)

#### 6.6 Integration Testing

**Student Flow:**
```
Login → Dashboard → Ask Question → Think First → 
Unlock AI → Explore → Revise Belief → Reflect → 
Portfolio → Share
```

**Teacher Flow:**
```
Login → Class Patterns → Identify Confusion → 
View Student Journey → Write Warm Message → 
Check Help Requests → Respond → Track Impact
```

**Parent Flow:**
```
Login → Growth Narrative → Read Teacher Messages → 
View Vocational Progress → Access Guidance → 
(No drilling into raw data)
```

**Vocational Flow:**
```
Register → Get Approved → Create Programs → 
Accept Partnerships → Enroll Students → 
Track Sessions → Link Questions
```

### Deliverable
- [ ] Unified portfolio complete
- [ ] Reality signal log functional
- [ ] Platform metrics accurate
- [ ] Parent view comprehensive
- [ ] All 5 roles work end-to-end
- [ ] Mobile responsive
- [ ] Accessibility compliant
- [ ] Performance optimized

---

## USER ROLES & PERMISSIONS

| Role | Can Do | Cannot Do |
|------|--------|-----------|
| **Student** | Ask questions, reflect, submit techniques, request/give help, enroll in vocational | See others' private data, assign scores, approve institutions |
| **Teacher** | View class patterns, write warm messages, verify techniques, respond to help, set availability | Assign scores/grades, see other schools' data |
| **Parent** | View own child's growth narrative, see teacher messages, access guidance | See raw questions/reflections, see other children, contact through platform |
| **School Admin** | View school analytics, manage teachers, partner with vocational, approve enrollments | See individual student details, modify content |
| **Vocational Partner** | Create programs, track sessions, provide feedback, see enrolled students (limited) | Access school academic data, see non-partner students |

---

## CRITICAL RULES

### 1. NO SCORES OR RANKINGS
```jsx
// ❌ NEVER
<StudentRank position={3} />
<CTIScore score={72} />
<Leaderboard />

// ✅ ALWAYS
<ThinkingTrajectory
  questionDepth={depthOverTime}
  hesitation={hesitationTrend}
  revision={revisionFrequency}
/>
```

### 2. AI ASSISTS, NEVER SPEAKS TO STUDENT
```jsx
// ❌ NEVER
<Message from="AI" to="student">Good job!</Message>

// ✅ ALWAYS
<TeacherView>
  <AISummary visible="teacher_only" />
  <ComposeMessage from="teacher" to="student" />
</TeacherView>
```

### 3. PRIVACY BY DEFAULT
```javascript
const defaultVisibility = 'private';
// Student must explicitly choose to share
```

### 4. UNDERSTANDING BEFORE MEMORY
```jsx
<MemoryTechniqueSubmission>
  <Step1_Understanding required />
  <Step2_MemoryTrick enabled={understandingComplete} />
</MemoryTechniqueSubmission>
```

### 5. UNCERTAINTY IS CELEBRATED
```jsx
<UncertaintyToggle
  label="Are you sure?"
  helpText="It's perfectly fine to say 'I'm not sure' — that's where learning begins."
/>
// Never penalize uncertainty
```

---

## TESTING CHECKPOINTS

### After Each Week

| Week | Critical Tests |
|------|----------------|
| 1 | All roles can auth, schema deployed, existing features work |
| 2 | Question refinement tracks, warm messages deliver, portfolio viewable |
| 3 | Techniques can be submitted/verified, exam prep generates plan |
| 4 | Help requests match, teachers bookable, study groups work |
| 5 | Vocational onboarding works, enrollments track, cross-context links |
| 6 | Full end-to-end flows, mobile works, performance acceptable |

---

## DEPLOYMENT

```
Week 1-2: Development only
Week 3-4: Staging + internal testing
Week 5:   Production Beta (1 school)
Week 6:   Production (ready for scaling)
```

---

## SUCCESS CRITERIA

After 6 weeks, verify:

- [ ] Students can explore AND prepare for exams
- [ ] Peer help scales without teacher bottleneck
- [ ] Schools partner with vocational institutions
- [ ] Learning tracks across contexts
- [ ] Teachers feel supported, not burdened
- [ ] Parents trust the platform
- [ ] NEP 2020 compliance demonstrated
- [ ] 100+ concurrent users without issues
- [ ] Mobile-first design works
- [ ] Philosophy intact (no scores, no surveillance)

---

## FINAL NOTES

1. **Preserve existing work** — Everything built in Week 0 must continue working
2. **Sequential discipline** — Each week must pass tests before moving on
3. **Philosophy guard** — Any feature that adds scores/rankings → reject
4. **Mobile-first** — Every screen must work on phone
5. **Performance** — Large datasets must load in < 2 seconds
6. **Accessibility** — WCAG 2.1 AA compliance
7. **Security** — RLS policies bulletproof

---

*Let's build something that changes education.*
