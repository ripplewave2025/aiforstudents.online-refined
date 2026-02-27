# AIforStudents Development Workflow

> 📋 **Quick Reference** for developing on the AIforStudents.online platform

---

## 🎯 Workflow Overview

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   START     │    │   DEVELOP   │    │   BUILD     │    │   DEPLOY    │
│  Dev Server │───▶│   Changes   │───▶│  Production │───▶│  to Vercel  │
│  npm start  │    │  Hot Reload │    │  npm build  │    │  git push   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## 🚀 Phase 1: Start Development

### Step 1: Launch Dev Server
```bash
cd c:\Users\FaradaysCage007\Desktop\2_PROJECTS\AIforStudents
npm start
```
- Opens at `http://localhost:3000`
- Hot reload enabled (changes appear instantly)

### Step 2: Verify App Running
- [ ] Browser shows landing page
- [ ] No console errors
- [ ] All sections load correctly

---

## 🛠️ Phase 2: Development

### Project Structure Quick Reference

```
src/
├── components/
│   ├── landing/          # Landing page sections
│   │   ├── Cycle.jsx     # "How It Works" 4-step cycle
│   │   └── ...
│   ├── layout/           # Sidebar, nav, layout
│   ├── ui/               # Reusable UI components
│   └── animations/       # Scroll animations, transitions
├── pages/
│   ├── student/          # 9 student pages
│   ├── teacher/          # 4 teacher pages
│   ├── parent/           # 2 parent pages
│   └── admin/            # 3 admin pages
├── contexts/             # Auth & state management
└── lib/                  # Supabase & utilities
```

### Making Changes
1. Edit the relevant component/page
2. Save → Browser auto-updates
3. Check terminal for errors
4. Test in browser

### Key Technologies
| Tech | Purpose |
|------|---------|
| React 19 | Frontend framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| Recharts | Charts/graphs |
| React Router | Navigation |

---

## 📦 Phase 3: Build for Production

### Step 1: Create Build
```bash
npm run build
```

### Step 2: Verify Build
- [ ] Build completes without errors
- [ ] Output: ~313KB gzipped
- [ ] Build folder created/updated

---

## 🚢 Phase 4: Deploy to Production

### Quick Deploy (3 Commands)
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

### Deployment Flow
```
Local Changes → GitHub → Vercel (Auto Deploy) → Live Site
```

### Verify Deployment
- [ ] Check Vercel dashboard
- [ ] Visit live URL
- [ ] Test critical functionality

---

## 🧪 Testing Checklist

### Demo Accounts
| Role | Login | Test Route |
|------|-------|------------|
| 🎓 Student | `demo@student` | `/student` |
| 👩‍🏫 Teacher | `demo@teacher` | `/teacher` |
| 👨‍👩‍👧 Parent | `demo@parent` | `/parent` |
| 🛡️ Admin | `demo@admin` | `/admin` |

### Pre-Deployment Tests
- [ ] Landing page loads
- [ ] All 4 roles can login
- [ ] Key features work per role
- [ ] Mobile responsive
- [ ] No console errors

---

## ⚡ Quick Commands Cheat Sheet

| Task | Command |
|------|---------|
| Start dev server | `npm start` |
| Create prod build | `npm run build` |
| Run tests | `npm test` |
| Install package | `npm install <pkg>` |
| Deploy | `git add . && git commit -m "msg" && git push` |

---

## 🔧 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Build fails | Check terminal for specific error, fix imports |
| Component not rendering | Verify import path and export |
| Styles not applying | Check Tailwind class names |
| Deploy fails | Check Vercel logs, verify env vars |
| Hot reload not working | Stop server, clear cache, restart |

### Clear Cache & Restart
```bash
# Stop server (Ctrl+C)
rm -rf node_modules/.cache
npm start
```

### Reset Node Modules (Nuclear Option)
```bash
rm -rf node_modules
npm install
npm start
```

---

## 📝 Files to Know

| File | What It Does |
|------|--------------|
| `App.js` | All routes defined here |
| `AuthContext.jsx` | Login/auth logic |
| `tailwind.config.js` | Theme colors, fonts |
| `vercel.json` | Deployment config |
| `.env.example` | Required env vars |

---

## 🔄 Automation Alias (For Future)

Use `/dev-workflow` in AI assistant to trigger this workflow automatically.

---

*Last Updated: February 2026*
