import React, { useState } from 'react';
import { Brain, ArrowRight, User, Lock, Video, CheckCircle, Clock, ShieldCheck, Play, BookOpen, MessageCircle, BarChart, Menu, X, Target, Key, LogOut, Bell, AlertCircle, Trash2, ChevronDown, ChevronUp, Award, TrendingUp, TrendingDown, BarChart2, Activity, Mic, Users, Search, Plus } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'student-login', 'parent-login', 'teacher-login', 'student-dashboard', 'parent-dashboard', 'teacher-dashboard'
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ===== LANDING PAGE =====
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="font-bold text-xl">LearnFlow AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <button onClick={() => setCurrentView('student-login')} className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition">
              Sign In
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-4 space-y-3">
            <button onClick={() => setCurrentView('student-login')} className="w-full text-left text-slate-300 hover:text-white py-2">Student Sign In</button>
            <button onClick={() => setCurrentView('parent-login')} className="w-full text-left text-slate-300 hover:text-white py-2">Parent Sign In</button>
            <button onClick={() => setCurrentView('teacher-login')} className="w-full text-left text-slate-300 hover:text-white py-2">Teacher Sign In</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Your Dream. <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Your Path. Your Future.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            In the Era of Invention, personalized learning isn't optional—it's essential. LearnFlow AI connects students, parents, and teachers to unlock every student's full potential.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={() => setCurrentView('student-login')} className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/50 transition transform hover:-translate-y-1">
              Student Dashboard
            </button>
            <button onClick={() => setCurrentView('parent-login')} className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/50 transition transform hover:-translate-y-1">
              Parent Portal
            </button>
            <button onClick={() => setCurrentView('teacher-login')} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/50 transition transform hover:-translate-y-1">
              Teacher Hub
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: '🎯', title: 'Vision-First', desc: 'Define dreams' },
              { icon: '📱', title: 'Portfolio Ready', desc: 'Showcase work' },
              { icon: '👨‍🏫', title: 'Expert Mentors', desc: 'Learn from pros' },
              { icon: '🌍', title: 'Global Network', desc: 'Connect worldwide' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition">
                <span className="text-4xl mb-2 block">{item.icon}</span>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-slate-300 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-8 text-center text-slate-400 text-sm">
        <p>© 2025 LearnFlow AI. Empowering the Era of Invention.</p>
      </footer>
    </div>
  );

  // ===== STUDENT LOGIN =====
  const StudentLogin = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
          <Brain className="w-8 h-8 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Student Portal</h2>
          <p className="text-blue-100 text-sm mt-2">Complete your missions & master your subjects</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setLoggedInUser('Student'); setCurrentView('student-dashboard'); }} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Student ID</label>
            <input type="text" placeholder="Enter your ID" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
            Sign In
          </button>
        </form>
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center text-sm text-slate-600">
          <button onClick={() => setCurrentView('landing')} className="text-blue-600 hover:underline">← Back to Home</button>
        </div>
      </div>
    </div>
  );

  // ===== PARENT LOGIN =====
  const ParentLogin = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center text-white">
          <Brain className="w-8 h-8 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Parent Portal</h2>
          <p className="text-green-100 text-sm mt-2">Verify missions & track your child's progress</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setLoggedInUser('Parent'); setCurrentView('parent-dashboard'); }} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Parent Email</label>
            <input type="email" placeholder="parent@example.com" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required />
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
            Access Portal
          </button>
        </form>
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center text-sm text-slate-600">
          <button onClick={() => setCurrentView('landing')} className="text-green-600 hover:underline">← Back to Home</button>
        </div>
      </div>
    </div>
  );

  // ===== TEACHER LOGIN =====
  const TeacherLogin = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
          <Brain className="w-8 h-8 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Teacher Portal</h2>
          <p className="text-blue-100 text-sm mt-2">Manage missions & track class progress</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setLoggedInUser('Teacher'); setCurrentView('teacher-dashboard'); }} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Teacher Email</label>
            <input type="email" placeholder="teacher@school.com" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
            Enter Hub
          </button>
        </form>
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center text-sm text-slate-600">
          <button onClick={() => setCurrentView('landing')} className="text-blue-600 hover:underline">← Back to Home</button>
        </div>
      </div>
    </div>
  );

  // ===== STUDENT DASHBOARD =====
  const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('todo');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const missions = [
      { id: 1, subject: 'Physics', topic: "Newton's Third Law", question: "State the law and give 2 examples.", status: 'todo', priority: 'High' },
      { id: 2, subject: 'Biology', topic: "Photosynthesis", question: "Explain the Light Dependent reaction steps.", status: 'pending', timestamp: '2 hrs ago' },
      { id: 3, subject: 'Math', topic: "Quadratic Equations", question: "Derive the Quadratic Formula.", status: 'verified', completedDate: 'Oct 12' },
    ];

    const filteredMissions = missions.filter(m => {
      if (activeTab === 'todo') return m.status === 'todo';
      if (activeTab === 'pending') return m.status === 'pending';
      if (activeTab === 'completed') return m.status === 'verified';
      return true;
    });

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 text-white p-6 md:fixed md:h-full md:flex md:flex-col">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg">LearnFlow</span>
          </div>
          <nav className="space-y-2 flex-1">
            <button onClick={() => setActiveTab('todo')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'todo' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              📋 To Do ({missions.filter(m => m.status === 'todo').length})
            </button>
            <button onClick={() => setActiveTab('pending')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'pending' ? 'bg-yellow-600' : 'hover:bg-slate-800'}`}>
              ⏳ Pending ({missions.filter(m => m.status === 'pending').length})
            </button>
            <button onClick={() => setActiveTab('completed')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'completed' ? 'bg-green-600' : 'hover:bg-slate-800'}`}>
              ✅ Mastered ({missions.filter(m => m.status === 'verified').length})
            </button>
          </nav>
          <button onClick={() => { setLoggedInUser(null); setCurrentView('landing'); }} className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-lg transition flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">
            {activeTab === 'todo' && '🎯 Active Missions'}
            {activeTab === 'pending' && '⏳ Waiting for Parents'}
            {activeTab === 'completed' && '✅ Mastered Topics'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMissions.map(mission => (
              <div key={mission.id} className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-600 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded">{mission.subject}</span>
                  {mission.status === 'todo' && <span className="text-xs text-red-600 font-bold">HIGH PRIORITY</span>}
                  {mission.status === 'pending' && <span className="text-xs text-yellow-600 font-bold">PENDING</span>}
                  {mission.status === 'verified' && <span className="text-xs text-green-600 font-bold">✓ LOCKED</span>}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{mission.topic}</h3>
                <p className="text-slate-600 text-sm mb-4">"{mission.question}"</p>
                {mission.status === 'todo' && (
                  <button onClick={() => { setSelectedTask(mission); setShowUploadModal(true); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition">
                    Start Mission
                  </button>
                )}
                {mission.status === 'pending' && <button disabled className="w-full bg-slate-200 text-slate-400 font-bold py-2 rounded-lg cursor-not-allowed">Awaiting Verification</button>}
                {mission.status === 'verified' && <button disabled className="w-full bg-green-100 text-green-700 font-bold py-2 rounded-lg">Secured!</button>}
              </div>
            ))}
          </div>

          {/* Upload Modal */}
          {showUploadModal && selectedTask && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{selectedTask.topic}</h3>
                  <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                </div>
                <p className="text-slate-600 mb-6">"{selectedTask.question}"</p>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:bg-blue-50 transition">
                  <Video className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-700">Record Your Answer</p>
                  <p className="text-sm text-slate-500">or drag video file</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowUploadModal(false)} className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 rounded-lg transition">Cancel</button>
                  <button onClick={() => { alert('Video submitted! Parents will verify soon.'); setShowUploadModal(false); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition">Submit</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  };

  // ===== PARENT DASHBOARD =====
  const ParentDashboard = () => {
    const [activeTab, setActiveTab] = useState('verify');
    const [missions, setMissions] = useState([
      { id: 1, subject: 'Physics', topic: "Newton's Third Law", status: 'pending_verification', timestamp: '10 mins ago' },
      { id: 2, subject: 'Biology', topic: "Photosynthesis", status: 'verified', verifiedAt: 'Yesterday' },
    ]);

    const handleVerify = (id) => {
      setMissions(missions.map(m => m.id === id ? { ...m, status: 'verified', verifiedAt: 'Just now' } : m));
    };

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-slate-900 text-white p-6 md:fixed md:h-full md:flex md:flex-col">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-6 h-6 text-green-400" />
            <span className="font-bold text-lg">Parent Hub</span>
          </div>
          <nav className="space-y-2 flex-1">
            <button onClick={() => setActiveTab('verify')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'verify' ? 'bg-green-600' : 'hover:bg-slate-800'}`}>
              ✅ Verify Missions
            </button>
            <button onClick={() => setActiveTab('performance')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'performance' ? 'bg-green-600' : 'hover:bg-slate-800'}`}>
              📊 Performance
            </button>
          </nav>
          <button onClick={() => { setLoggedInUser(null); setCurrentView('landing'); }} className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-lg transition flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </aside>

        <main className="flex-1 md:ml-64 p-6">
          {activeTab === 'verify' && (
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-8">Verify Your Child's Work</h1>
              <div className="space-y-4">
                {missions.filter(m => m.status === 'pending_verification').map(mission => (
                  <div key={mission.id} className="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-400">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-3 py-1 rounded">{mission.subject}</span>
                        <h3 className="text-lg font-bold text-slate-900 mt-2">{mission.topic}</h3>
                        <p className="text-sm text-slate-500 mt-1">{mission.timestamp}</p>
                      </div>
                    </div>
                    <button onClick={() => handleVerify(mission.id)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition">
                      Watch & Verify ✓
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Child's Progress</h1>
              <div className="bg-white rounded-xl shadow p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-slate-500 text-sm">Total Mastered</p>
                    <p className="text-3xl font-bold text-green-600">{missions.filter(m => m.status === 'verified').length}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600">{missions.filter(m => m.status === 'pending_verification').length}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Completion Rate</p>
                    <p className="text-3xl font-bold text-blue-600">67%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  };

  // ===== TEACHER DASHBOARD =====
  const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState('missions');
    const [showAddModal, setShowAddModal] = useState(false);
    const [missions, setMissions] = useState([
      { id: 1, subject: 'Physics', topic: "Newton's Third Law", assignedTo: 24, completed: 18 },
      { id: 2, subject: 'Math', topic: "Quadratic Equations", assignedTo: 24, completed: 5 },
    ]);

    const handleAddMission = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      setMissions([...missions, { id: missions.length + 1, subject: formData.get('subject'), topic: formData.get('topic'), assignedTo: 24, completed: 0 }]);
      setShowAddModal(false);
    };

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-slate-900 text-white p-6 md:fixed md:h-full md:flex md:flex-col">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-lg">Teacher Hub</span>
          </div>
          <nav className="space-y-2 flex-1">
            <button onClick={() => setActiveTab('missions')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'missions' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              🎯 Manage Missions
            </button>
            <button onClick={() => setActiveTab('students')} className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${activeTab === 'students' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              👥 Class Progress
            </button>
          </nav>
          <button onClick={() => { setLoggedInUser(null); setCurrentView('landing'); }} className="w-full text-left px-4 py-3 hover:bg-slate-800 rounded-lg transition flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </aside>

        <main className="flex-1 md:ml-64 p-6">
          {activeTab === 'missions' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Mission Control</h1>
                <button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition flex items-center gap-2">
                  <Plus className="w-4 h-4" /> New Mission
                </button>
              </div>
              <div className="space-y-4">
                {missions.map(mission => (
                  <div key={mission.id} className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded">{mission.subject}</span>
                        <h3 className="text-lg font-bold text-slate-900 mt-2">{mission.topic}</h3>
                      </div>
                    </div>
                    <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-blue-600 h-3" style={{ width: `${(mission.completed / mission.assignedTo) * 100}%` }}></div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{mission.completed}/{mission.assignedTo} students completed</p>
                  </div>
                ))}
              </div>

              {/* Add Mission Modal */}
              {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Add New Mission</h3>
                    <form onSubmit={handleAddMission} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                        <select name="subject" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                          <option>Physics</option>
                          <option>Math</option>
                          <option>Chemistry</option>
                          <option>Biology</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Topic</label>
                        <input type="text" name="topic" placeholder="Topic name..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-slate-200 text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-300 transition">Cancel</button>
                        <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">Add</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-8">Class Overview</h1>
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Student</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Completed</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Rahul Kumar', 'Sneha Gupta', 'Amit Patel', 'Priya Singh'].map((name, i) => (
                      <tr key={i} className="border-b hover:bg-slate-50">
                        <td className="px-6 py-3">{name}</td>
                        <td className="px-6 py-3">
                          <div className="w-32 bg-slate-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                          </div>
                        </td>
                        <td className="px-6 py-3"><span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded">On Track</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  };

  // ===== ROUTE RENDERER =====
  return (
    <>
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'student-login' && <StudentLogin />}
      {currentView === 'parent-login' && <ParentLogin />}
      {currentView === 'teacher-login' && <TeacherLogin />}
      {currentView === 'student-dashboard' && <StudentDashboard />}
      {currentView === 'parent-dashboard' && <ParentDashboard />}
      {currentView === 'teacher-dashboard' && <TeacherDashboard />}
    </>
  );
};

export default App;