# IMPLEMENTATION PLAN: Gorkha Academy Rebuild (2025 AI Integration)

This document outlines the strategic plan to integrate the best "time-saving" features from top 2025 AI education tools into the Gorkha Academy platform. The goal is to maximize teacher mentorship time and student agency while adhering to the core philosophy of **Critical Thinking First**.

## Core Philosophy: The AI Gate
> "AI handles the mechanics of learning—so humans can focus on what requires a soul."

The implementation will focus on three key pillars identified in our research:
1.  **Socratic AI Mentorship (Khanmigo-style)**: Replacing direct answers with guided questioning.
2.  **Automated Administrative Burden (MagicSchool-style)**: Freeing teachers from paperwork.
3.  **Adaptive Learning Paths (Sana/Docebo-style)**: Ensuring struggle is productive, not discouraging.

---

## Phase 1: Enhanced AI Gate (Socratic Integration)
**Goal:** Transform the "AI Gate" from a simple lock into an active Socratic mentor.

### 1.1 Implementation: The "Guide on the Side"
*   **Current State:** AI is locked until reasoning is complete.
*   **New Feature:** Even *after* unlocking, the AI will prioritize asking clarifying questions over providing direct answers.
*   **Mechanism:**
    *   Integrate a "Socratic Mode" toggle for all AI interactions.
    *   When a student asks a question, the AI analyzes the *intent*:
        *   If factual (e.g., "capital of France"), provide answer.
        *   If conceptual (e.g., "why did the revolution happen?"), ask a guiding question: "What were the economic conditions like at the time?"

### 1.2 "Struggle Detection"
*   **Inspiration:** Khanmigo's ability to detect when a student is stuck but not asking for help.
*   **Feature:** Monitor "Thinking Workspace" activity (pauses, deletions, erratic typing).
*   **Action:** If struggle is detected, AI proactively offers a *hint* or *perspective shift*, not the answer.

---

## Phase 2: Teacher Time-Saver Suite (Admin Automation)
**Goal:** Reduce administrative tasks by 80% to allow for high-impact mentorship.

### 2.1 Automated "Weekly Insights" (MagicSchool-style)
*   **Inspiration:** MagicSchool.ai's ability to generate reports.
*   **Feature:** Auto-generate weekly summaries for each student:
    *   *Input:* Question logs, belief revisions, reflection keywords.
    *   *Output:* A 3-bullet point summary for the teacher:
        *   "Tenzin is struggling with [Topic X]."
        *   "Showed great resilience in [Project Y]."
        *   "Suggested conversation starter: Ask about his view on [Concept Z]."
*   **Benefit:** Teachers start their week with actionable insights, not raw data analysis.

### 2.2 Parent Communication Generator
*   **Inspiration:** Eduaide.Ai's communication tools.
*   **Feature:** One-click generation of "Parent Update" emails/messages.
*   **Mechanism:**
    *   Teacher clicks "Generate Update" for a student.
    *   AI drafts a warm, personalized message based on the *Weekly Insights*.
    *   Teacher reviews and sends.
*   **Benefit:** Consistent, high-quality parent communication with minimal effort.

---

## Phase 3: Adaptive Content & Scenarios
**Goal:** instantly generate high-quality "Critical Thinking" prompts.

### 3.1 "Dilemma Generator" (Content Gen)
*   **Inspiration:** 360Learning's authoring tools.
*   **Feature:** Teachers can generate a "Week's Dilemma" based on current curriculum topics.
*   **Example:**
    *   *Topic:* Artificial Intelligence.
    *   *Generated Dilemma:* "A self-driving car must choose between hitting a pedestrian or swerving into a wall, injuring the passenger. What should it do? Write your initial belief."
*   **Benefit:** Keeps the curriculum fresh and relevant without hours of prep.

### 3.2 "Counter-Argument" Bot
*   **Inspiration:** Debate tools.
*   **Feature:** A dedicated AI mode where the student inputs their belief, and the AI *only* provides counter-arguments to test the strength of their reasoning.
*   **Benefit:** Directly supports the "Belief Revision" core loop.

---

## Technical Roadmap & Integration

### Week 1: Foundation Refinement
*   [ ] Review existing `ANTIGRAVITY_BUILD_SPEC.md` against new goals.
*   [ ] Set up "Socratic Mode" prompt engineering templates.
*   [ ] Design database schema extensions for "Weekly Insights" and "Parent Updates".

### Week 2: AI Gate V2 (Socratic)
*   [ ] Implement "Intent Classification" (Factual vs. Conceptual).
*   [ ] Build "Struggle Detection" hooks in `ThinkingWorkspace`.
*   [ ] Update `ReasoningLogPage` to support threaded Socratic dialogue.

### Week 3: Teacher Dashboard Automation
*   [ ] Build "Weekly Insights" generation logic (using mock AI for now or API if available).
*   [ ] Create "Parent Update" generator UI in `TeacherDashboard`.
*   [ ] Implement "Dilemma Generator" for quick content creation.

### Week 4: Polish & Verify
*   [ ] User testing with "Teacher" persona to verify time savings.
*   [ ] Verify "Student" persona doesn't feel "blocked" but "guided".
*   [ ] Ensure all data privacy standards (NEP 2020) are met.

## Success Metrics
*   **Teacher Time:** Reduce time spent on grading/reporting by 50%.
*   **Student Engagement:** Increase "Belief Revisions" by 30% (indicating active thinking).
*   **Parent Satisfaction:** Increase frequency of meaningful updates to 1/week.
