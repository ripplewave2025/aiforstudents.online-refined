# _future/ — Preserved Features

These are ambitious features that are **not currently active** in the app but are preserved for future use. Nothing in this directory is imported by the live app — zero bundle impact.

## How to Activate a Feature

1. Move the file(s) from `_future/` → `src/pages/` (or `src/components/`)
2. Add the route in `App.js`
3. Re-add any needed dependencies (`npm install <package>`)
4. Wire up nav links in `AppLayout.jsx`

## Contents

### Role Pages
| Folder | Pages | Dependencies Needed |
|--------|-------|---------------------|
| `student/` | 9 pages (Dashboard, ReasoningLog, ThinkingWorkspace, SpeakingPractice, MyProgress, CuriosityMap, ArtifactBuilder, ReflectionLog, MyVision) | `recharts` for MyProgress |
| `teacher/` | 4 pages (Dashboard, ClassInsights, ArtifactReview, PlanPage) | `recharts` for ClassInsights |
| `parent/` | 2 pages (Dashboard, Resources) | — |
| `admin/` | 3 pages (Dashboard, Reports, ParentSummaries) | — |
| `creator/` | 3 pages (Dashboard, ContentStudio, MyContent) | — |

### Components
| Folder | Contents | Dependencies Needed |
|--------|----------|---------------------|
| `components/backgrounds/` | CosmicScene.jsx (3D starfield) | `three`, `@react-three/fiber`, `@react-three/drei` |
| `components/dashboards/` | CharacterMetrics, ParentDashboard, StudentDashboard, TeacherDashboard | — |
| `components/landing/` | Hero, Problem, ConceptIntro, Shift, Cycle, Philosophy, Roles | — |

### Docs
| File | Description |
|------|-------------|
| `docs/ANTIGRAVITY_BUILD_SPEC.md` | Original 6-week build spec |
| `docs/Core_beliefs.txt` | Core philosophy text |
