import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { 
  Brain, ArrowRight, User, Lock, Video, CheckCircle, Clock, ShieldCheck, 
  Play, BookOpen, MessageCircle, BarChart, Menu, X, Target, Key, LogOut, 
  Bell, AlertCircle, Trash2, ChevronDown, ChevronUp, Award, TrendingUp, 
  TrendingDown, BarChart2, Activity, Mic, Users, Search, Plus, Zap, Eye, Lightbulb,
  Calendar, Star
} from 'lucide-react';

// ==========================================
// 1. LANDING PAGE
// ==========================================
const LandingPage = ({ setCurrentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth selection:bg-blue-200 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">LearnFlow</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#problem" className="hover:text-blue-600 transition hover:-translate-y-0.5">Problem</a>
            <a href="#solution" className="hover:text-blue-600 transition hover:-translate-y-0.5">Solution</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition hover:-translate-y-0.5">Process</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setCurrentView('student-login')} className="px-5 py-2.5 text-slate-700 font-bold hover:bg-slate-100 rounded-xl transition">
              Log In
            </button>
            <button onClick={() => setCurrentView('student-login')} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0">
              Get Started
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-700 p-2 hover:bg-slate-100 rounded-lg">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 p-4 space-y-2 shadow-xl animate-in slide-in-from-top-5">
            <button onClick={() => { setCurrentView('student-login'); setIsMenuOpen(false); }} className="w-full text-left font-bold py-3 px-4 rounded-lg bg-blue-50 text-blue-700 flex items-center gap-2"><User className="w-4 h-4"/> Student</button>
            <button onClick={() => { setCurrentView('parent-login'); setIsMenuOpen(false); }} className="w-full text-left font-bold py-3 px-4 rounded-lg bg-green-50 text-green-700 flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Parent</button>
            <button onClick={() => { setCurrentView('teacher-login'); setIsMenuOpen(false); }} className="w-full text-left font-bold py-3 px-4 rounded-lg bg-indigo-50 text-indigo-700 flex items-center gap-2"><BookOpen className="w-4 h-4"/> Teacher</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-bold text-slate-600 mb-8 shadow-sm hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Welcome to the Era of Invention
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight text-slate-900">
            Education Hasn't Changed.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              But the World Has.
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Students memorize. Parents wonder. Teachers manage busywork. In an era of AI, traditional education is obsolete. <span className="text-slate-900 font-bold bg-blue-50 px-1 rounded">We fixed it.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => setCurrentView('student-login')} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:scale-105 transition duration-200 flex items-center justify-center gap-2 group">
              Start Learning Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => document.getElementById('problem').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-slate-700" /> See How It Works
            </button>
          </div>

          {/* Feature Grid Floating */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-80">
            {[
              { label: "Syllabus Locked", icon: Lock },
              { label: "Video Proof", icon: Video },
              { label: "Parent Verified", icon: ShieldCheck },
              { label: "Exam Focused", icon: Target }
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/50 border border-slate-100 backdrop-blur-sm">
                <f.icon className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-700">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="bg-white py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">The "Black Box" Problem</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Everyone is working hard, but the connection is broken.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-red-100 hover:bg-red-50/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Students</h3>
              <p className="text-slate-600 mb-6">Confused about what matters. Drowning in busywork. No feedback on real mastery.</p>
              <div className="h-1 w-12 bg-red-200 rounded-full"></div>
            </div>

            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-orange-100 hover:bg-orange-50/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Parents</h3>
              <p className="text-slate-600 mb-6">No idea if their child understands. Can't verify learning. Powerless to help effectively.</p>
              <div className="h-1 w-12 bg-orange-200 rounded-full"></div>
            </div>

            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Teachers</h3>
              <p className="text-slate-600 mb-6">Teaching to the average. Lost in grading papers. No real data on retention.</p>
              <div className="h-1 w-12 bg-blue-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Roles */}
      <section id="solution" className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">One System. Empowered Roles.</h2>
            <p className="text-xl text-slate-400">Connecting the ecosystem around actual growth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700 hover:border-blue-500/50 transition duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">Students</h3>
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-slate-300 mb-8 h-20">Receive clear "Missions" based on exam probability. Prove mastery by recording explanations.</p>
              <button onClick={() => setCurrentView('student-login')} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition flex items-center justify-center gap-2 group-hover:shadow-lg shadow-blue-900/20">
                Student Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700 hover:border-green-500/50 transition duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">Parents</h3>
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-slate-300 mb-8 h-20">Become the gatekeeper. Verify your child's video explanations before they can level up.</p>
              <button onClick={() => setCurrentView('parent-login')} className="w-full py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold transition flex items-center justify-center gap-2 group-hover:shadow-lg shadow-green-900/20">
                Parent Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-slate-700 hover:border-indigo-500/50 transition duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold">Teachers</h3>
                <Lightbulb className="w-6 h-6 text-indigo-400" />
              </div>
              <p className="text-slate-300 mb-8 h-20">Assign missions once. Let AI and Parents handle the repetition and verification.</p>
              <button onClick={() => setCurrentView('teacher-login')} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition flex items-center justify-center gap-2 group-hover:shadow-lg shadow-indigo-900/20">
                Teacher Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-6 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
             <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
             </div>
             <span className="font-extrabold text-slate-900 tracking-tight">LearnFlow</span>
          </div>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            © 2025 LearnFlow AI.<br/>
            "In the Era of Invention, tedious work is history."
          </p>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// 2. LOGIN COMPONENTS
// ==========================================
const LoginLayout = ({ title, subtitle, icon: Icon, colorClass, buttonClass, bgClass, onSubmit, onBack }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
    {/* Decorative BG */}
    <div className={`absolute -top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full blur-3xl opacity-10 ${bgClass}`}></div>
    <div className={`absolute -bottom-[20%] -left-[20%] w-[80%] h-[80%] rounded-full blur-3xl opacity-10 ${bgClass}`}></div>

    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-300">
      <div className={`p-10 text-center text-white ${colorClass}`}>
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Icon className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold mb-2">{title}</h2>
        <p className="text-white/80 font-medium">{subtitle}</p>
      </div>
      
      <form onSubmit={onSubmit} className="p-10 space-y-6 bg-white">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Email / ID</label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input type="text" defaultValue="demo@user.com" className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-opacity-50 outline-none transition-all font-medium text-slate-900 hover:bg-white focus:bg-white" required />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
            <input type="password" defaultValue="password" className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-opacity-50 outline-none transition-all font-medium text-slate-900 hover:bg-white focus:bg-white" required />
          </div>
        </div>
        
        <button type="submit" className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 ${buttonClass}`}>
          Enter Portal <ArrowRight className="w-5 h-5" />
        </button>
      </form>
      
      <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
        <button onClick={onBack} className="text-slate-500 font-bold hover:text-slate-800 text-sm transition flex items-center justify-center gap-2 mx-auto">
          ← Back to Home
        </button>
      </div>
    </div>
  </div>
);

// ==========================================
// 3. STUDENT DASHBOARD
// ==========================================
const StudentDashboard = ({ setCurrentView, setLoggedInUser }) => {
  const [activeTab, setActiveTab] = useState('todo');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [recording, setRecording] = useState(false);

  const missions = [
    { id: 1, subject: 'Physics', topic: "Newton's Third Law", question: "State the law and give 2 real-life examples.", status: 'todo', priority: 'High', color: 'bg-purple-100 text-purple-700' },
    { id: 2, subject: 'Biology', topic: "Photosynthesis", question: "Explain the Light Dependent reaction steps.", status: 'pending', timestamp: '2 hrs ago', color: 'bg-emerald-100 text-emerald-700' },
    { id: 3, subject: 'Math', topic: "Quadratic Equations", question: "Derive the Quadratic Formula.", status: 'verified', completedDate: 'Oct 12', color: 'bg-blue-100 text-blue-700' },
    { id: 4, subject: 'Geography', topic: "Tectonic Plates", question: "List the 3 types of plate boundaries.", status: 'todo', priority: 'Medium', color: 'bg-orange-100 text-orange-700' },
  ];

  const filteredMissions = missions.filter(m => {
    if (activeTab === 'todo') return m.status === 'todo';
    if (activeTab === 'pending') return m.status === 'pending';
    if (activeTab === 'completed') return m.status === 'verified';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 text-white p-6 md:fixed md:h-full flex flex-col z-20">
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Brain className="w-5 h-5"/></div>
          <span className="font-extrabold text-xl tracking-tight">LearnFlow</span>
        </div>
        
        <div className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('todo')} className={`w-full text-left px-4 py-3.5 rounded-xl font-bold transition flex justify-between items-center group ${activeTab === 'todo' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <span className="flex items-center gap-3"><Target className="w-5 h-5" /> Active Missions</span>
            <span className={`px-2 py-0.5 rounded text-xs transition ${activeTab === 'todo' ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'}`}>{missions.filter(m => m.status === 'todo').length}</span>
          </button>
          
          <button onClick={() => setActiveTab('pending')} className={`w-full text-left px-4 py-3.5 rounded-xl font-bold transition flex justify-between items-center group ${activeTab === 'pending' ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <span className="flex items-center gap-3"><Clock className="w-5 h-5" /> Pending</span>
            <span className={`px-2 py-0.5 rounded text-xs transition ${activeTab === 'pending' ? 'bg-yellow-700 text-yellow-100' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'}`}>{missions.filter(m => m.status === 'pending').length}</span>
          </button>
          
          <button onClick={() => setActiveTab('completed')} className={`w-full text-left px-4 py-3.5 rounded-xl font-bold transition flex justify-between items-center group ${activeTab === 'completed' ? 'bg-green-600 text-white shadow-lg shadow-green-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <span className="flex items-center gap-3"><Award className="w-5 h-5" /> Mastered</span>
            <span className={`px-2 py-0.5 rounded text-xs transition ${activeTab === 'completed' ? 'bg-green-800 text-green-100' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'}`}>{missions.filter(m => m.status === 'verified').length}</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
           <div className="flex items-center gap-3 mb-6 px-2">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold border-2 border-slate-800">RK</div>
             <div>
               <p className="font-bold text-sm">Rahul Kumar</p>
               <p className="text-xs text-slate-500">Student ID: 8824</p>
             </div>
           </div>
           <button onClick={() => { setLoggedInUser(null); setCurrentView('landing'); }} className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-xl transition flex items-center gap-3 text-slate-400 hover:text-white font-bold">
             <LogOut className="w-5 h-5" /> Sign Out
           </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-72 p-6 md:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'todo' && '🎯 Active Missions'}
              {activeTab === 'pending' && '⏳ Awaiting Verification'}
              {activeTab === 'completed' && '🏆 Mastered Topics'}
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              {activeTab === 'todo' && 'Prioritize these probable questions for your exam.'}
              {activeTab === 'pending' && 'Ask your parent to verify your submission.'}
              {activeTab === 'completed' && 'Great job! These topics are secured.'}
            </p>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-200 transition relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <button onClick={() => setCurrentView('ai-assistant')} className="px-6 py-2.5 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition shadow-lg shadow-purple-500/30">AI Tutor</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMissions.map(mission => (
            <div key={mission.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 relative overflow-hidden">
               {/* Status Line */}
               <div className={`absolute top-0 left-0 w-1.5 h-full ${mission.status === 'verified' ? 'bg-green-500' : mission.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-600'}`}></div>
               
               <div className="flex justify-between items-start mb-4 pl-2">
                 <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${mission.color}`}>{mission.subject}</span>
                 {mission.status === 'todo' && <span className="text-[10px] font-bold bg-red-50 text-red-600 border border-red-100 px-2 py-1 rounded uppercase flex items-center gap-1"><Zap className="w-3 h-3 fill-red-600"/> High Priority</span>}
                 {mission.status === 'verified' && <span className="text-green-500"><CheckCircle className="w-6 h-6 fill-green-100"/></span>}
               </div>

               <h3 className="text-xl font-bold text-slate-900 mb-2 pl-2 group-hover:text-blue-600 transition-colors">{mission.topic}</h3>
               
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 mx-2 relative">
                 <div className="absolute -left-1 top-4 w-1 h-8 bg-slate-300 rounded-r"></div>
                 <p className="text-slate-600 font-medium italic">"{mission.question}"</p>
               </div>
               
               <div className="pl-2">
                 {mission.status === 'todo' && (
                   <button onClick={() => { setSelectedTask(mission); setShowUploadModal(true); }} className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 group-hover:shadow-blue-600/30">
                     <Video className="w-5 h-5" /> Start Mission
                   </button>
                 )}
                 {mission.status === 'pending' && (
                   <button disabled className="w-full bg-yellow-50 text-yellow-700 font-bold py-3.5 rounded-xl border border-yellow-200 cursor-not-allowed flex items-center justify-center gap-2 opacity-80">
                     <Clock className="w-5 h-5" /> Verification Pending...
                   </button>
                 )}
                 {mission.status === 'verified' && (
                   <button disabled className="w-full bg-green-50 text-green-700 font-bold py-3.5 rounded-xl border border-green-200 flex items-center justify-center gap-2">
                     <Lock className="w-5 h-5" /> Locked & Mastered
                   </button>
                 )}
               </div>
            </div>
          ))}
          
          {filteredMissions.length === 0 && (
            <div className="col-span-full py-20 text-center">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Target className="w-10 h-10 text-slate-400" />
               </div>
               <h3 className="text-lg font-bold text-slate-600">No missions found here.</h3>
               <p className="text-slate-400">Check another tab!</p>
            </div>
          )}
        </div>
      </main>

      {/* Video Upload Modal */}
      {showUploadModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Mission Recording</span>
                <h3 className="text-xl font-bold text-slate-900">{selectedTask.topic}</h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-slate-200 rounded-full transition"><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            
            <div className="p-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                 <p className="text-xs font-bold text-blue-600 uppercase mb-1">Teacher's Question:</p>
                 <p className="text-blue-900 font-medium text-lg">"{selectedTask.question}"</p>
              </div>

              <div 
                className={`border-2 border-dashed rounded-2xl h-56 flex flex-col items-center justify-center gap-4 cursor-pointer transition duration-300 group relative overflow-hidden ${recording ? 'border-red-400 bg-red-50' : 'border-slate-300 hover:border-blue-500 hover:bg-slate-50'}`}
                onClick={() => setRecording(!recording)}
              >
                 {recording && <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>}
                 
                 <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${recording ? 'bg-red-100 scale-110' : 'bg-blue-100 group-hover:scale-110'}`}>
                   {recording ? <div className="w-8 h-8 bg-red-600 rounded-sm"></div> : <Video className="w-10 h-10 text-blue-600" />}
                 </div>
                 
                 <div className="text-center">
                   <p className={`font-bold ${recording ? 'text-red-600' : 'text-slate-700'}`}>{recording ? 'Recording... (Tap to stop)' : 'Tap to Record Video'}</p>
                   {!recording && <p className="text-sm text-slate-400">or drag and drop file</p>}
                 </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button onClick={() => setShowUploadModal(false)} className="flex-1 py-3.5 border border-slate-200 font-bold text-slate-600 rounded-xl hover:bg-white hover:border-slate-300 transition">Cancel</button>
              <button onClick={() => { setShowUploadModal(false); alert("Video Sent to Parent!"); }} className="flex-1 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition">Submit for Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. PARENT DASHBOARD
// ==========================================
const ParentDashboard = ({ setCurrentView, setLoggedInUser }) => {
  const [activeTab, setActiveTab] = useState('verify');
  const [missions, setMissions] = useState([
    { id: 1, subject: 'Physics', topic: "Newton's Third Law", question: "State the law and give examples.", status: 'pending_verification', timestamp: '10 mins ago', student: "Rahul" },
    { id: 2, subject: 'Biology', topic: "Photosynthesis", question: "Explain Light Dependent reaction.", status: 'verified', verifiedAt: 'Yesterday', student: "Rahul" },
  ]);

  const [verifyModal, setVerifyModal] = useState(null); // stores task ID
  const [verifyMode, setVerifyMode] = useState('video'); // 'video' or 'manual'

  const handleVerify = (id) => {
    setMissions(missions.map(m => m.id === id ? { ...m, status: 'verified', verifiedAt: 'Just now' } : m));
    setVerifyModal(null);
  };

  const pendingCount = missions.filter(m => m.status === 'pending_verification').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      <aside className="w-full md:w-72 bg-slate-900 text-white p-6 md:fixed md:h-full flex flex-col z-20">
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center"><ShieldCheck className="w-5 h-5"/></div>
          <span className="font-extrabold text-xl tracking-tight">Parent Hub</span>
        </div>
        
        <div className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('verify')} className={`w-full text-left px-4 py-3.5 rounded-xl font-bold transition flex justify-between items-center group ${activeTab === 'verify' ? 'bg-green-600 text-white shadow-lg shadow-green-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <span className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> Verify</span>
            {pendingCount > 0 && <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold animate-pulse">{pendingCount}</span>}
          </button>
          <button onClick={() => setActiveTab('performance')} className={`w-full text-left px-4 py-3.5 rounded-xl font-bold transition flex justify-between items-center group ${activeTab === 'performance' ? 'bg-green-600 text-white shadow-lg shadow-green-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <span className="flex items-center gap-3"><BarChart2 className="w-5 h-5" /> Performance</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
           <div className="flex items-center gap-3 mb-6 px-2">
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">MK</div>
             <div>
               <p className="font-bold text-sm">Mrs. Kumar</p>
               <p className="text-xs text-slate-500">Guardian</p>
             </div>
           </div>
           <button onClick={() => { setLoggedInUser(null); setCurrentView('landing'); }} className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-xl transition flex items-center gap-3 text-slate-400 hover:text-white font-bold">
             <LogOut className="w-5 h-5" /> Sign Out
           </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-72 p-6 md:p-10">
        {activeTab === 'verify' && (
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Pending Verifications</h1>
            
            {pendingCount === 0 ? (
               <div className="bg-white p-16 rounded-3xl text-center border border-slate-200 shadow-sm">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">All Caught Up!</h3>
                  <p className="text-slate-500 mt-2 text-lg">No pending videos from your child.</p>
               </div>
            ) : (
              <div className="space-y-6">
                {missions.filter(m => m.status === 'pending_verification').map(mission => (
                  <div key={mission.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row gap-8 items-center hover:shadow-md transition">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 relative">
                      <Video className="w-10 h-10 text-slate-400" />
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full border-2 border-white">NEW</div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wide">{mission.subject}</span>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {mission.timestamp}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{mission.topic}</h3>
                      <p className="text-slate-500 font-medium mt-1">"{mission.question}"</p>
                    </div>
                    <button onClick={() => setVerifyModal(mission)} className="w-full md:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition flex items-center justify-center gap-2 hover:-translate-y-0.5">
                      <Play className="w-5 h-5 fill-white" /> Review
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Verification Modal */}
        {verifyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-200">
             <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="bg-slate-900 p-6 flex justify-between items-center text-white shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center"><User className="w-6 h-6"/></div>
                    <div>
                      <h3 className="font-bold text-lg">Verify {verifyModal.student}</h3>
                      <p className="text-slate-400 text-xs">Mission: {verifyModal.topic}</p>
                    </div>
                  </div>
                  <button onClick={() => setVerifyModal(null)} className="p-2 hover:bg-white/10 rounded-full transition"><X className="w-6 h-6"/></button>
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 shrink-0">
                  <button onClick={() => setVerifyMode('video')} className={`flex-1 py-3 font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition ${verifyMode === 'video' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Video className="w-4 h-4" /> Watch Video
                  </button>
                  <button onClick={() => setVerifyMode('manual')} className={`flex-1 py-3 font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition ${verifyMode === 'manual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Mic className="w-4 h-4" /> In-Person Check
                  </button>
                </div>

                {/* Content */}
                <div className="bg-black aspect-video shrink-0 relative flex items-center justify-center group cursor-pointer">
                   {verifyMode === 'video' ? (
                     <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300">
                           <Play className="w-6 h-6 fill-white text-white ml-1" />
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                           <p className="font-bold text-sm">Rahul's Explanation</p>
                           <p className="text-xs text-white/70">00:45 / 01:20</p>
                        </div>
                     </>
                   ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mic className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-slate-400 max-w-sm font-medium">Ask your child: <br/><span className="text-white text-lg">"{verifyModal.question}"</span></p>
                      </div>
                   )}
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200">
                  <div className="flex gap-4">
                    <button onClick={() => setVerifyModal(null)} className="flex-1 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-white hover:text-red-600 hover:border-red-100 transition">Reject</button>
                    <button onClick={() => handleVerify(verifyModal.id)} className="flex-[2] py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-xl shadow-green-500/20 transition flex items-center justify-center gap-2">
                      <ShieldCheck className="w-5 h-5" /> Verify & Lock Progress
                    </button>
                  </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Performance Report</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Mastered</p>
                 <p className="text-4xl font-extrabold text-green-600 mt-2">{missions.filter(m => m.status === 'verified').length}</p>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending</p>
                 <p className="text-4xl font-extrabold text-yellow-500 mt-2">{pendingCount}</p>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Class Rank</p>
                 <p className="text-4xl font-extrabold text-blue-600 mt-2">Top 15%</p>
               </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h3 className="font-bold text-xl mb-6">Learning Timeline</h3>
              <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:h-full before:w-0.5 before:bg-slate-100">
                 {missions.filter(m => m.status === 'verified').map(m => (
                    <div key={m.id} className="flex gap-4 relative">
                       <div className="w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-sm flex-shrink-0 relative z-10"></div>
                       <div>
                         <p className="font-bold text-slate-900 text-lg leading-none">{m.topic}</p>
                         <p className="text-sm text-slate-500 mt-1">{m.subject} • Verified {m.verifiedAt}</p>
                       </div>
                    </div>
                 ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ==========================================
// 5. TEACHER DASHBOARD
// ==========================================
const TeacherDashboard = ({ setCurrentView, setLoggedInUser }) => {
  const [activeTab, setActiveTab] = useState('missions');
  const [showAddModal, setShowAddModal] = useState(false);
  const [missions, setMissions] = useState([
    { id: 1, subject: 'Physics', topic: "Newton's Third Law", assignedTo: 24, completed: 18 },
    { id: 2, subject: 'Math', topic: "Quadratic Equations", assignedTo: 24, completed: 5 },
  ]);

  const handleAddMission = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newMission = {
      id: missions.length + 1,
      subject: formData.get('subject'),
      topic: formData.get('topic'),
      assignedTo: 24, 
      completed: 0
    };
    setMissions([...missions, newMission]);
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      <aside className="w-full md:w-72 bg-slate-900 text-white p-6 md:fixed md:h-full flex flex-col z-20">
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center"><Lightbulb className="w-5 h-5"/></div>
          <span className="font-extrabold text-xl tracking-tight">Teacher Hub</span>
        </div>
        
        <div className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('missions')} className={`w-full text-left px-4 py-3.5 rounded-xl font-bold transition flex justify-between items-center group ${activeTab === 'missions' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <span className="flex items-center gap-3"><Target className="w-5 h-5" /> Mission Control</span>
          </button>
          <button onClick={() => setActiveTab('students')} className={`w-full text-left px-4 py-3.5 rounded-xl font-bold transition flex justify-between items-center group ${activeTab === 'students' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <span className="flex items-center gap-3"><Users className="w-5 h-5" /> Class Progress</span>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-800">
           <div className="flex items-center gap-3 mb-6 px-2">
             <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white border-2 border-slate-600">MR</div>
             <div>
               <p className="font-bold text-sm">Mr. Sharma</p>
               <p className="text-xs text-slate-500">Senior Physics</p>
             </div>
           </div>
           <button onClick={() => { setLoggedInUser(null); setCurrentView('landing'); }} className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-xl transition flex items-center gap-3 text-slate-400 hover:text-white font-bold">
             <LogOut className="w-5 h-5" /> Sign Out
           </button>
        </div>
      </aside>

      <main className="flex-1 md:ml-72 p-6 md:p-10">
        {activeTab === 'missions' && (
          <div>
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Mission Control</h1>
                <p className="text-slate-500 mt-1">Manage Probable Questions & Assignments</p>
              </div>
              <button onClick={() => setShowAddModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2 transition hover:-translate-y-0.5">
                <Plus className="w-5 h-5" /> New Mission
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Active Missions</p>
                    <Target className="w-5 h-5 text-indigo-500" />
                 </div>
                 <p className="text-4xl font-extrabold text-slate-900">{missions.length}</p>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Class Mastery</p>
                    <Activity className="w-5 h-5 text-green-500" />
                 </div>
                 <p className="text-4xl font-extrabold text-green-600">48%</p>
               </div>
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Verify</p>
                    <Clock className="w-5 h-5 text-yellow-500" />
                 </div>
                 <p className="text-4xl font-extrabold text-yellow-500">12</p>
               </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                 <h3 className="font-bold text-slate-700">Active Assignments</h3>
               </div>
               <div className="divide-y divide-slate-100">
                 {missions.map(m => (
                   <div key={m.id} className="p-6 hover:bg-slate-50 transition group">
                     <div className="flex justify-between items-start mb-4">
                       <div>
                         <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-1 rounded uppercase tracking-wide border border-indigo-100">{m.subject}</span>
                         <h3 className="text-lg font-bold text-slate-900 mt-2">{m.topic}</h3>
                       </div>
                       <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                     </div>
                     <div className="flex items-center gap-4">
                       <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                         <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(m.completed/m.assignedTo)*100}%` }}></div>
                       </div>
                       <span className="text-xs font-bold text-slate-600 min-w-[80px] text-right">{m.completed}/{m.assignedTo} Done</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
           <div>
             <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Class Progress</h1>
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-50 border-b border-slate-200">
                     <tr>
                       <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                       <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Mastered</th>
                       <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pending</th>
                       <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {[
                       { name: 'Rahul Kumar', mastered: 12, pending: 2, status: 'On Track' },
                       { name: 'Sneha Gupta', mastered: 8, pending: 5, status: 'Needs Help' },
                       { name: 'Amit Patel', mastered: 15, pending: 0, status: 'Advanced' },
                       { name: 'Priya Sharma', mastered: 11, pending: 1, status: 'On Track' },
                     ].map((s, i) => (
                       <tr key={i} className="hover:bg-slate-50 transition">
                         <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}>{s.name.charAt(0)}</div>
                           {s.name}
                         </td>
                         <td className="px-6 py-4 font-bold text-green-600">{s.mastered}</td>
                         <td className="px-6 py-4 font-bold text-yellow-500">{s.pending}</td>
                         <td className="px-6 py-4">
                           <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${s.status === 'On Track' ? 'bg-green-100 text-green-700' : s.status === 'Advanced' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                             {s.status}
                           </span>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                </table>
             </div>
           </div>
        )}
      </main>

      {/* Add Mission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Assign Probable Question</h3>
            <form onSubmit={handleAddMission} className="space-y-5">
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Subject</label>
                 <select name="subject" className="w-full border border-slate-300 rounded-xl p-3.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 font-medium text-slate-900 transition hover:bg-white focus:bg-white">
                   <option>Physics</option><option>Math</option><option>Chemistry</option><option>Biology</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Topic</label>
                 <input name="topic" type="text" placeholder="e.g. Thermodynamics" className="w-full border border-slate-300 rounded-xl p-3.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 font-medium text-slate-900 transition hover:bg-white focus:bg-white" required />
               </div>
               <div>
                 <label className="block text-sm font-bold text-slate-700 mb-1.5">Question to Memorize</label>
                 <textarea name="question" rows="3" className="w-full border border-slate-300 rounded-xl p-3.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 font-medium text-slate-900 transition hover:bg-white focus:bg-white" required></textarea>
               </div>
               <div className="flex gap-4 pt-4">
                 <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3.5 border border-slate-200 font-bold text-slate-600 rounded-xl hover:bg-slate-50 transition">Cancel</button>
                 <button type="submit" className="flex-1 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition">Assign Mission</button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 5. AI ASSISTANT
// ==========================================
const AIAssistant = ({ setCurrentView }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI tutor. How can I help you with your studies today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "That's a great question! Let me break it down for you.",
          "I can help you understand that concept. Here's how it works:",
          "Let me explain this step by step.",
          "Good thinking! Here's the answer:",
          "I see you're working on this topic. Let me provide some guidance."
        ];
        const aiResponse = { id: messages.length + 2, text: responses[Math.floor(Math.random() * responses.length)], sender: 'ai' };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">AI Tutor</h1>
        </div>
        <button onClick={() => setCurrentView('student-dashboard')} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition">Back to Dashboard</button>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-900'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-6">
        <div className="max-w-4xl mx-auto flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about your studies..."
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button onClick={handleSend} className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition">Send</button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 6. MAIN APP CONTROLLER
// ==========================================
const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Reusing Login Styles for consistency
  const LoginView = ({ type, icon: Icon, color, bgGradient, onSubmit }) => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className={`absolute -top-24 -right-24 w-96 h-96 bg-${color}-400/20 rounded-full blur-3xl`}></div>
        <div className={`absolute -bottom-24 -left-24 w-96 h-96 bg-${color}-600/20 rounded-full blur-3xl`}></div>

        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-300">
          <div className={`bg-gradient-to-r ${bgGradient} p-10 text-center text-white`}>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Icon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold">{type} Portal</h2>
            <p className="text-white/80 font-medium mt-2">Welcome back to LearnFlow</p>
          </div>
          <form onSubmit={onSubmit} className="p-10 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email / ID</label>
              <input type="text" defaultValue="demo@user.com" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-opacity-50 outline-none transition-all font-medium text-slate-900 hover:bg-white focus:bg-white focus:ring-current" style={{color: 'inherit'}} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input type="password" defaultValue="password" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-opacity-50 outline-none transition-all font-medium text-slate-900 hover:bg-white focus:bg-white focus:ring-current" required />
            </div>
            <button type="submit" className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r ${bgGradient}`}>
              Enter Portal <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
            <button onClick={() => setCurrentView('landing')} className={`text-sm font-bold hover:underline opacity-60 hover:opacity-100 transition text-slate-600`}>← Back to Home</button>
          </div>
        </div>
    </div>
  );

  return (
    <>
      <Analytics />
      {currentView === 'landing' && <LandingPage setCurrentView={setCurrentView} />}
      
      {currentView === 'student-login' && (
        <LoginView 
          type="Student" 
          icon={Brain} 
          color="blue" 
          bgGradient="from-blue-600 to-indigo-600"
          onSubmit={(e) => { e.preventDefault(); setLoggedInUser('Student'); setCurrentView('student-dashboard'); }} 
        />
      )}
      {currentView === 'student-dashboard' && <StudentDashboard setCurrentView={setCurrentView} setLoggedInUser={setLoggedInUser} />}
      
      {currentView === 'ai-assistant' && <AIAssistant setCurrentView={setCurrentView} />}
      
      {currentView === 'parent-login' && (
        <LoginView 
          type="Parent" 
          icon={ShieldCheck} 
          color="green" 
          bgGradient="from-green-600 to-emerald-600"
          onSubmit={(e) => { e.preventDefault(); setLoggedInUser('Parent'); setCurrentView('parent-dashboard'); }} 
        />
      )}
      {currentView === 'parent-dashboard' && <ParentDashboard setCurrentView={setCurrentView} setLoggedInUser={setLoggedInUser} />}
      
      {currentView === 'teacher-login' && (
        <LoginView 
          type="Teacher" 
          icon={BookOpen} 
          color="indigo" 
          bgGradient="from-indigo-600 to-purple-600"
          onSubmit={(e) => { e.preventDefault(); setLoggedInUser('Teacher'); setCurrentView('teacher-dashboard'); }} 
        />
      )}
      {currentView === 'teacher-dashboard' && <TeacherDashboard setCurrentView={setCurrentView} setLoggedInUser={setLoggedInUser} />}
    </>
  );
};

export default App;