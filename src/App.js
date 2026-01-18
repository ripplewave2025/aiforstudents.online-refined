import React, { useState } from 'react';
import { Hero } from './components/landing/Hero';
import { Problem } from './components/landing/Problem';
import { Shift } from './components/landing/Shift';
import { Cycle } from './components/landing/Cycle';
import { Roles } from './components/landing/Roles';
import { Philosophy } from './components/landing/Philosophy';
import { Login } from './components/auth/Login';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { ParentDashboard } from './components/dashboards/ParentDashboard';

import { ConceptIntro } from './components/landing/ConceptIntro';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [view, setView] = useState('landing');
  const [showIntro, setShowIntro] = useState(true);

  const handleLogin = (role) => {
    if (role === 'student') setView('student');
    else if (role === 'teacher') setView('teacher');
    else if (role === 'parent') setView('parent');
    else setView('login');
  };

  if (view === 'student') return <StudentDashboard onLogout={() => setView('landing')} />;
  if (view === 'teacher') return <TeacherDashboard onLogout={() => setView('landing')} />;
  if (view === 'parent') return <ParentDashboard onLogout={() => setView('landing')} />;
  if (view === 'login') return <Login onBack={() => setView('landing')} onLogin={handleLogin} />;

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <ConceptIntro key="intro" onResolved={() => setShowIntro(false)} />
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Navbar onLogin={() => setView('login')} />
            <Hero onStart={() => setView('login')} />
            <Problem />
            <Shift />
            <Cycle />
            <div id="roles">
              <Roles />
            </div>
            <Philosophy />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;