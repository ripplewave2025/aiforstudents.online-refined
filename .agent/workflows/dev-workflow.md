---
description: Standard development workflow for AIforStudents React platform
---

# AIforStudents Development Workflow

This workflow documents the standard development cycle for the AIforStudents.online platform.

---

## 🚀 Starting Development

### 1. Start the Development Server
```bash
cd c:\Users\FaradaysCage007\Desktop\2_PROJECTS\AIforStudents
npm start
```
// turbo
This runs the React dev server on `http://localhost:3000`

### 2. Verify the App is Running
- Open browser to `http://localhost:3000`
- Check for any console errors
- Verify the landing page loads correctly

---

## 🛠️ Making Changes

### 3. Component Development

#### Landing Page Components
Located in: `src/components/landing/`
- `Cycle.jsx` - How It Works section
- Other landing components

#### Page Development
Located in: `src/pages/`
- `student/` - 9 student pages
- `teacher/` - 4 teacher pages
- `parent/` - 2 parent pages
- `admin/` - 3 admin pages

### 4. Test Changes Locally
- Save your changes (hot reload will update the browser)
- Check for React errors in terminal
- Verify UI in browser at `http://localhost:3000`

---

## 📦 Building for Production

### 5. Create Production Build
```bash
npm run build
```
// turbo
This creates an optimized build in the `build/` folder

### 6. Verify Build Success
- Check that build completes without errors
- Verify build size is acceptable (~313KB gzipped expected)

---

## 🚢 Deployment

### 7. Stage All Changes
```bash
git add .
```
// turbo

### 8. Commit Changes
```bash
git commit -m "your commit message here"
```
Replace "your commit message here" with a descriptive commit message

### 9. Push to GitHub (Triggers Vercel Deploy)
```bash
git push origin main
```
// turbo

### 10. Verify Deployment
- Check Vercel dashboard for deployment status
- Verify live site at `aiforstudents.online` (or your Vercel URL)

---

## 🧪 Testing Roles

### Demo Credentials
| Role | Email | Route |
|------|-------|-------|
| Student | `demo@student` | `/student` |
| Teacher | `demo@teacher` | `/teacher` |
| Parent | `demo@parent` | `/parent` |
| Admin | `demo@admin` | `/admin` |

### Test Each Role
1. Navigate to login page
2. Enter demo credentials
3. Verify dashboard loads correctly
4. Test key features for each role

---

## 🔧 Common Tasks

### Install New Dependencies
```bash
npm install <package-name>
```

### Clear Cache and Restart
```bash
# Stop the server (Ctrl+C)
rm -rf node_modules/.cache
npm start
```

### Check for Lint Errors
```bash
npm run build
```
// turbo
(Build will fail if there are critical errors)

---

## 📁 Key Files Reference

| File | Purpose |
|------|---------|
| `src/App.js` | All routes configuration |
| `src/contexts/AuthContext.jsx` | Multi-role authentication |
| `src/contexts/ThinkingContext.jsx` | Reasoning state management |
| `tailwind.config.js` | Tailwind CSS configuration |
| `vercel.json` | Vercel deployment config |
| `.env.example` | Environment variables template |

---

## ⚠️ Troubleshooting

### Build Errors
1. Check terminal for specific error messages
2. Fix any import/export issues
3. Ensure all dependencies are installed (`npm install`)

### Deployment Issues
1. Verify all changes are committed
2. Check Vercel logs for build errors
3. Ensure environment variables are set in Vercel dashboard

### Component Not Rendering
1. Check console for React errors
2. Verify component is imported in parent
3. Check for syntax errors in JSX
