import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BookOpen, Users, TrendingUp, MessageSquare, CheckCircle, AlertCircle, Play, Lock, Unlock, Brain, Target, Film } from 'lucide-react';

export default function LearningPlatform() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState('alex');

  // Student Performance Data
  const performanceData = [
    { week: 'Week 1', score: 65, goal: 75 },
    { week: 'Week 2', score: 72, goal: 75 },
    { week: 'Week 3', score: 78, goal: 75 },
    { week: 'Week 4', score: 82, goal: 80 },
    { week: 'Week 5', score: 85, goal: 85 },
  ];

  const students = {
    alex: {
      name: 'Alex Johnson',
      grade: '10th',
      subjects: ['Mathematics', 'Physics', 'English'],
      overallScore: 85,
      focus: 'Calculus & Problem Solving',
      strengths: ['Logical Thinking', 'Pattern Recognition'],
      improvements: ['Conceptual Understanding', 'Time Management'],
    },
    sarah: {
      name: 'Sarah Smith',
      grade: '9th',
      subjects: ['Biology', 'Chemistry', 'Literature'],
      overallScore: 78,
      focus: 'Organic Chemistry Basics',
      strengths: ['Memory Retention', 'Detail Oriented'],
      improvements: ['Abstract Thinking', 'Speed'],
    },
  };

  const recommendations = [
    {
      id: 1,
      type: 'video',
      title: 'Calculus: Limits & Continuity',
      subject: 'Mathematics',
      duration: '24 min',
      difficulty: 'Advanced',
      approved: true,
      why: 'AI detected gap in limit concepts based on recent quiz (72%)',
      instructor: 'Dr. Sarah Chen',
      metaphor: '🎬 Film: "The Pursuit of Happiness" → Life: How small steps compound to big success',
    },
    {
      id: 2,
      type: 'practice',
      title: 'Problem Set: Derivatives',
      subject: 'Mathematics',
      difficulty: 'Intermediate',
      approved: false,
      why: 'Build confidence before tackling advanced problems',
      instructor: 'AI Tutor',
      metaphor: '🎬 Film: "Inception" → Life: Going deeper to understand core principles',
    },
    {
      id: 3,
      type: 'concept',
      title: 'Conceptual Review: Rate of Change',
      subject: 'Mathematics',
      difficulty: 'Beginner',
      approved: true,
      why: 'Foundation review recommended by parent meeting',
      instructor: 'Prof. James Miller',
      metaphor: '🎬 Film: "The Butterfly Effect" → Life: How small changes impact outcomes',
    },
  ];

  const subjectProgress = [
    { name: 'Mathematics', progress: 85, target: 90, topics: 12, completed: 10 },
    { name: 'Physics', progress: 78, target: 85, topics: 8, completed: 6 },
    { name: 'English', progress: 88, target: 90, topics: 15, completed: 13 },
  ];

  // Landing Page
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-white">LearnFlow AI</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => { setUserRole('student'); setCurrentView('student'); }} className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium transition">Student</button>
            <button onClick={() => { setUserRole('parent'); setCurrentView('parent'); }} className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition">Parent</button>
            <button onClick={() => { setUserRole('teacher'); setCurrentView('teacher'); }} className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition">Teacher</button>
          </div>
        </div>
      </nav>

      <div className="pt-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            AI-Powered Learning<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Personalized for Everyone</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Intelligent recommendations for students. Real-time insights for parents. Complete oversight for teachers. One platform powering 360° education.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => { setUserRole('student'); setCurrentView('student'); }} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
              Explore Student Dashboard
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Target, title: 'Goal-Driven Learning', desc: 'AI identifies gaps & recommends personalized paths' },
            { icon: TrendingUp, title: 'Real-Time Progress', desc: 'Parents & teachers see detailed analytics instantly' },
            { icon: Brain, title: 'Smart Recommendations', desc: 'Metaphor-mapping connects learning to real life' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/50 transition">
              <item.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Student Dashboard
  const StudentDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Brain className="w-7 h-7 text-purple-600" />
            <span className="font-bold text-lg">LearnFlow AI</span>
          </div>
          <button onClick={() => setCurrentView('landing')} className="px-4 py-2 text-slate-600 hover:text-slate-900">← Back</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Alex! 👋</h2>
          <p className="text-slate-600">Your AI tutor has analyzed your recent performance and prepared personalized recommendations.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Overall Score</p>
            <p className="text-3xl font-bold text-slate-900">85%</p>
            <p className="text-green-600 text-xs mt-2">↑ 7% this month</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Streak</p>
            <p className="text-3xl font-bold text-slate-900">12 days</p>
            <p className="text-slate-600 text-xs mt-2">Keep it going!</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Active Goals</p>
            <p className="text-3xl font-bold text-slate-900">5</p>
            <p className="text-slate-600 text-xs mt-2">2 at risk</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Learning Hours</p>
            <p className="text-3xl font-bold text-slate-900">18h</p>
            <p className="text-slate-600 text-xs mt-2">This week</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Your Progress Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#9333ea" strokeWidth={2} dot={{ fill: '#9333ea' }} />
              <Line type="monotone" dataKey="goal" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#64748b' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Progress */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Subject Progress</h3>
          {subjectProgress.map((subject, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-900">{subject.name}</span>
                <span className="text-sm text-slate-600">{subject.progress}% / {subject.target}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full" style={{ width: `${subject.progress}%` }}></div>
              </div>
              <p className="text-xs text-slate-600 mt-2">{subject.completed}/{subject.topics} topics completed</p>
            </div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">🤖 AI-Powered Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {rec.type === 'video' && <Play className="w-5 h-5 text-purple-600" />}
                      {rec.type === 'practice' && <AlertCircle className="w-5 h-5 text-amber-600" />}
                      {rec.type === 'concept' && <BookOpen className="w-5 h-5 text-emerald-600" />}
                      <h4 className="font-bold text-slate-900">{rec.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{rec.why}</p>
                    <p className="text-sm font-medium text-slate-700 mb-2 bg-slate-50 p-3 rounded border border-slate-200">
                      {rec.metaphor}
                    </p>
                    <div className="flex gap-4 text-xs text-slate-600 mt-3">
                      <span>📚 {rec.subject}</span>
                      <span>⏱ {rec.duration || 'Variable'}</span>
                      <span>👨‍🏫 {rec.instructor}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {rec.approved ? (
                      <div className="bg-green-50 px-3 py-1 rounded-full flex items-center gap-2 text-green-700 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" /> Approved
                      </div>
                    ) : (
                      <div className="bg-yellow-50 px-3 py-1 rounded-full flex items-center gap-2 text-yellow-700 text-sm font-medium">
                        <AlertCircle className="w-4 h-4" /> Pending
                      </div>
                    )}
                  </div>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition">
                  Start Learning
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Parent Dashboard
  const ParentDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Users className="w-7 h-7 text-blue-600" />
            <span className="font-bold text-lg">Parent Portal</span>
          </div>
          <button onClick={() => setCurrentView('landing')} className="px-4 py-2 text-slate-600 hover:text-slate-900">← Back</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Monitor Your Child's Progress</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Student Selection */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-slate-900 mb-4">Your Students</h3>
            {Object.entries(students).map(([key, student]) => (
              <button
                key={key}
                onClick={() => setSelectedStudent(key)}
                className={`w-full text-left p-4 rounded-lg mb-3 border-2 transition ${
                  selectedStudent === key ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="font-bold text-slate-900">{student.name}</p>
                <p className="text-sm text-slate-600">Grade {student.grade} • {student.subjects.length} subjects</p>
              </button>
            ))}
          </div>

          {/* Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-slate-900 mb-4">{students[selectedStudent].name} - Overview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-2">Overall Performance</p>
                <p className="text-3xl font-bold text-blue-600">{students[selectedStudent].overallScore}%</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-2">Current Focus</p>
                <p className="font-semibold text-slate-900">{students[selectedStudent].focus}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-2">Subjects</p>
                <div className="flex flex-wrap gap-2">
                  {students[selectedStudent].subjects.map((s) => (
                    <span key={s} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-600">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" /> Strengths
            </h3>
            {students[selectedStudent].strengths.map((s) => (
              <div key={s} className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-slate-700">{s}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-amber-600">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" /> Areas for Improvement
            </h3>
            {students[selectedStudent].improvements.map((i) => (
              <div key={i} className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                <span className="text-slate-700">{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations to Approve */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">📋 Pending Content Approvals</h3>
          <p className="text-sm text-slate-600 mb-4">AI recommends these resources. Review and approve for your child:</p>
          {recommendations.filter(r => !r.approved).map((rec) => (
            <div key={rec.id} className="border border-slate-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-slate-900">{rec.title}</h4>
                  <p className="text-sm text-slate-600">{rec.why}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-medium">Pending</span>
              </div>
              <p className="text-sm text-slate-700 mb-4 bg-slate-50 p-3 rounded">
                {rec.metaphor}
              </p>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium transition">
                ✓ Approve
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Teacher Dashboard
  const TeacherDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-emerald-600" />
            <span className="font-bold text-lg">Teacher Dashboard</span>
          </div>
          <button onClick={() => setCurrentView('landing')} className="px-4 py-2 text-slate-600 hover:text-slate-900">← Back</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Class Overview</h2>
        <p className="text-slate-600 mb-6">Monitor all students, verify AI recommendations, and guide personalized learning paths.</p>

        {/* Class Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Total Students</p>
            <p className="text-3xl font-bold">28</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Avg Performance</p>
            <p className="text-3xl font-bold">81%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <p className="text-slate-600 text-sm font-medium mb-2">At Risk</p>
            <p className="text-3xl font-bold text-amber-600">5</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Recommendations Today</p>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>

        {/* Student Performance Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Class Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { range: '90-100%', students: 8 },
              { range: '80-89%', students: 12 },
              { range: '70-79%', students: 5 },
              { range: 'Below 70%', students: 3 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Bar dataKey="students" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Content Verification */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">✓ Verify AI-Generated Content</h3>
          <p className="text-sm text-slate-600 mb-4">Review authenticity and align with curriculum standards:</p>
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-slate-200 rounded-lg p-4 mb-4 bg-slate-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-slate-900">{rec.title}</h4>
                  <p className="text-sm text-slate-600">by {rec.instructor} • {rec.subject}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  rec.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {rec.approved ? '✓ Verified' : 'Pending Verification'}
                </span>
              </div>
              <p className="text-sm text-slate-700 mb-3 p-3 bg-white rounded border border-slate-200">
                {rec.metaphor}
              </p>
              {!rec.approved && (
                <div className="flex gap-3">
                  <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded font-medium transition">
                    ✓ Verify as Accurate
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-medium transition">
                    ✗ Request Revision
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render current view
  if (currentView === 'landing') return <LandingPage />;
  if (currentView === 'student') return <StudentDashboard />;
  if (currentView === 'parent') return <ParentDashboard />;
  if (currentView === 'teacher') return <TeacherDashboard />;
}