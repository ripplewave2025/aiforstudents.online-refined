import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BookOpen, Users, TrendingUp, MessageSquare, CheckCircle, AlertCircle, Play, Lock, Unlock, Brain, Target, Film, Share2, Instagram, Facebook, Zap, Award, Rocket, Star, Heart, MessageCircle, Send, Globe, Briefcase, Users2, Lightbulb, Trophy } from 'lucide-react';

export default function LearnFlowAI() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState('alex');
  const [showVisionModal, setShowVisionModal] = useState(false);
  const [studentVision, setStudentVision] = useState('');

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
      vision: '🛩️ Become an Aerospace Engineer - Design next-gen aircraft',
      visionPath: ['Physics Mastery', 'Advanced Mathematics', 'Programming', 'CAD Design', 'Internship at SpaceX'],
      strengths: ['Logical Thinking', 'Pattern Recognition'],
      improvements: ['Conceptual Understanding', 'Time Management'],
      achievements: [
        { title: 'Physics Quiz Champion', badge: '🏆', date: 'Dec 10' },
        { title: 'Perfect Attendance', badge: '⭐', date: 'Dec 5' },
        { title: '90% Math Milestone', badge: '🎯', date: 'Dec 1' },
      ],
      portfolio: [
        { project: 'Wing Aerodynamics Simulation', type: 'CAD', views: 1240, shares: 89 },
        { project: 'Rocket Launch Trajectory Calculator', type: 'Code', views: 2100, shares: 156 },
      ],
      followers: 342,
      following: 128,
    },
    sarah: {
      name: 'Sarah Smith',
      grade: '9th',
      subjects: ['Biology', 'Chemistry', 'Literature'],
      overallScore: 78,
      focus: 'Organic Chemistry Basics',
      vision: '🔬 Medical Researcher - Find cures for rare diseases',
      visionPath: ['Chemistry Excellence', 'Biology Deep Dive', 'Lab Techniques', 'Research Methodology', 'University Lab Assistant'],
      strengths: ['Memory Retention', 'Detail Oriented'],
      improvements: ['Abstract Thinking', 'Speed'],
      achievements: [
        { title: 'Science Presentation Star', badge: '🎤', date: 'Dec 8' },
        { title: 'Lab Safety Expert', badge: '🛡️', date: 'Nov 30' },
      ],
      portfolio: [
        { project: 'DNA Structure 3D Model', type: 'Visual', views: 890, shares: 45 },
      ],
      followers: 187,
      following: 92,
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
      why: 'Essential for aerospace calculations - AI detected gap based on recent quiz',
      instructor: 'Dr. Sarah Chen',
      metaphor: '🎬 Film: "The Pursuit of Happiness" → Life: How small steps compound to big success',
    },
  ];

  const mentors = [
    { name: 'Dr. James Chen', expertise: 'Aerospace Engineering', verified: true, students: 45 },
    { name: 'Prof. Elena Rodriguez', expertise: 'Advanced Physics', verified: true, students: 32 },
    { name: 'Prof. Michael Park', expertise: 'CAD & Design', verified: true, students: 28 },
  ];

  // Landing Page
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Rocket className="w-8 h-8 text-purple-400" />
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
            What's Your Dream?<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">We'll Get You There</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Whether you want to fly a plane, cure diseases, or build the next big thing - LearnFlow AI personalizes your entire learning journey. Learn from experts. Build your portfolio. Share your talents. Change the world.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => { setUserRole('student'); setCurrentView('student'); }} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
              Start Your Journey
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Lightbulb, title: 'Vision First', desc: 'Define your dream. We build the custom path to get you there.' },
            { icon: Users2, title: 'Learn from Masters', desc: 'Connect with verified mentors in your field of passion.' },
            { icon: Share2, title: 'Showcase & Inspire', desc: 'Share your hardwork on socials. Get recognition. Build influence.' },
            { icon: Rocket, title: 'Accelerated Growth', desc: 'No waiting. Start building real projects immediately.' },
            { icon: Trophy, title: 'Earn & Grow', desc: 'Certifications, badges, portfolios. Build your personal brand.' },
            { icon: Globe, title: 'Global Community', desc: 'Connect with students worldwide pursuing similar dreams.' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/50 transition">
              <item.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/30 border border-purple-500/20 rounded-xl p-12 text-center mb-20">
          <h3 className="text-2xl font-bold text-white mb-6">📱 Your Work, Everywhere</h3>
          <div className="flex justify-center gap-8 flex-wrap mb-8">
            {[
              { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
              { name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
              { name: 'Google Scholar', icon: BookOpen, color: 'text-blue-400' },
              { name: 'LinkedIn', icon: Briefcase, color: 'text-blue-700' },
              { name: 'Portfolio', icon: Globe, color: 'text-purple-400' },
            ].map((platform) => (
              <div key={platform.name} className="flex flex-col items-center gap-2">
                <platform.icon className={`w-10 h-10 ${platform.color}`} />
                <span className="text-sm text-slate-300">{platform.name}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-300">Showcase achievements, projects, and growth across all platforms. One click. Everywhere.</p>
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
            <Rocket className="w-7 h-7 text-purple-600" />
            <span className="font-bold text-lg">LearnFlow AI</span>
          </div>
          <button onClick={() => setCurrentView('landing')} className="px-4 py-2 text-slate-600 hover:text-slate-900">← Back</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 mb-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-sm mb-2">YOUR VISION</p>
              <h2 className="text-3xl font-bold mb-2">{students[selectedStudent].vision}</h2>
              <p className="text-purple-100">Powered by AI • Your custom learning path</p>
            </div>
            <button onClick={() => setShowVisionModal(true)} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition">
              Edit Vision
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Your Personalized Path to Success</h3>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {students[selectedStudent].visionPath.map((step, i) => (
              <div key={i} className="flex-shrink-0 relative">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-6 w-48 text-center">
                  <p className="font-bold mb-2">{step}</p>
                  <p className="text-sm text-purple-100">Step {i + 1} of {students[selectedStudent].visionPath.length}</p>
                </div>
                {i < students[selectedStudent].visionPath.length - 1 && (
                  <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <div className="text-purple-600 text-2xl">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Overall Score</p>
            <p className="text-3xl font-bold text-slate-900">85%</p>
            <p className="text-green-600 text-xs mt-2">↑ 7% this month</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Path Progress</p>
            <p className="text-3xl font-bold text-slate-900">40%</p>
            <p className="text-slate-600 text-xs mt-2">2 of 5 steps completed</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Portfolio Views</p>
            <p className="text-3xl font-bold text-slate-900">3.2K</p>
            <p className="text-slate-600 text-xs mt-2">245 new this week</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Followers</p>
            <p className="text-3xl font-bold text-slate-900">342</p>
            <p className="text-slate-600 text-xs mt-2">+28 this week</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">🏆 Recent Achievements</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {students[selectedStudent].achievements.map((ach, i) => (
              <div key={i} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 text-center">
                <p className="text-4xl mb-2">{ach.badge}</p>
                <p className="font-bold text-slate-900 text-sm">{ach.title}</p>
                <p className="text-xs text-slate-600 mt-2">{ach.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📁 Your Portfolio</h3>
            {students[selectedStudent].portfolio.map((proj, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4 mb-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900">{proj.project}</h4>
                    <p className="text-xs text-slate-600">{proj.type} Project</p>
                  </div>
                  <button className="text-purple-600 hover:bg-purple-50 p-2 rounded transition">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-4 text-xs text-slate-600">
                  <span>👁️ {proj.views} views</span>
                  <span>♻️ {proj.shares} shares</span>
                </div>
              </div>
            ))}
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition mt-4">
              + Upload New Project
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">📱 Share on Socials</h3>
            <div className="space-y-3 mb-6">
              {[
                { platform: 'Instagram', desc: 'Share achievement stories & project snippets', icon: Instagram, color: 'text-pink-500' },
                { platform: 'Facebook', desc: 'Post milestones to your network', icon: Facebook, color: 'text-blue-600' },
                { platform: 'Google Scholar', desc: 'Publish research & findings', icon: BookOpen, color: 'text-blue-400' },
                { platform: 'LinkedIn', desc: 'Build professional presence', icon: Briefcase, color: 'text-blue-700' },
              ].map((social, i) => (
                <button key={i} className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-start gap-3">
                  <social.icon className={`w-6 h-6 ${social.color} flex-shrink-0`} />
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{social.platform}</p>
                    <p className="text-xs text-slate-600">{social.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">👨‍🏫 Connect with Expert Mentors</h3>
          <p className="text-sm text-slate-600 mb-6">Learn directly from industry experts in your field</p>
          <div className="grid md:grid-cols-3 gap-4">
            {mentors.map((mentor, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-slate-900">{mentor.name}</p>
                    <p className="text-xs text-slate-600">{mentor.expertise}</p>
                  </div>
                  {mentor.verified && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
                <p className="text-xs text-slate-600 mb-4">{mentor.students} students learning</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-medium text-sm transition">
                  Request Mentorship
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">🌍 Learn with Others</h3>
          <p className="text-sm text-slate-600 mb-6">Collaborate with students pursuing similar dreams</p>
          <div className="space-y-3">
            {[
              { name: 'Aerospace Engineering Club', members: 234, mission: 'Design the future of flight' },
              { name: 'Physics Problem Solvers', members: 567, mission: 'Master calculus & mechanics' },
              { name: 'AI & Robotics Collective', members: 892, mission: 'Build intelligent systems' },
            ].map((group, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">{group.name}</p>
                  <p className="text-sm text-slate-600">{group.mission}</p>
                  <p className="text-xs text-slate-500 mt-1">{group.members} members</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-medium transition">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showVisionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">What's Your Dream?</h3>
            <textarea
              value={studentVision}
              onChange={(e) => setStudentVision(e.target.value)}
              placeholder="E.g., I want to become an aerospace engineer..."
              className="w-full border border-slate-300 rounded-lg p-4 mb-6 focus:outline-none focus:border-purple-600"
              rows="5"
            />
            <div className="flex gap-4">
              <button onClick={() => setShowVisionModal(false)} className="flex-1 border border-slate-300 text-slate-900 py-2 rounded-lg font-medium hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={() => { setShowVisionModal(false); }} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium">
                Save Vision
              </button>
            </div>
          </div>
        </div>
      )}
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
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Support Your Child's Dream</h2>
        <p className="text-slate-600 mb-6">Real-time insights, social reach tracking, and collaboration tools</p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-slate-900 mb-4">Your Child's Vision</h3>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300 rounded-lg p-6 text-center">
              <p className="text-3xl mb-2">🛩️</p>
              <p className="font-bold text-slate-900 mb-2">{students[selectedStudent].vision}</p>
              <p className="text-sm text-slate-600">Clear direction • Achievable • Inspiring</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-slate-900 mb-4">Engagement & Reach</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Portfolio Views</span>
                  <span className="font-bold text-slate-900">3,240</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Social Followers</span>
                  <span className="font-bold text-slate-900">342</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-pink-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-slate-900 mb-4">🚀 How You Can Support</h3>
          <div className="space-y-3">
            {[
              { action: 'Share on socials', desc: 'Help amplify your child\'s projects and achievements', icon: Share2 },
              { action: 'Connect mentors', desc: 'Know someone in the field? Refer them as a mentor', icon: Users2 },
              { action: 'Enable opportunities', desc: 'Find internships and real-world projects', icon: Briefcase },
              { action: 'Celebrate wins', desc: 'Acknowledge progress and build confidence daily', icon: Trophy },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer">
                <item.icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-900">{item.action}</p>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Empower Student Dreams</h2>
        <p className="text-slate-600 mb-6">Help students turn visions into reality</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Students with Vision</p>
            <p className="text-3xl font-bold">28</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Active Projects</p>
            <p className="text-3xl font-bold">34</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <p className="text-slate-600 text-sm font-medium mb-2">Mentorships Active</p>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-slate-900 mb-4">🎯 Student Visions</h3>
          <div className="space-y-4">
            {[
              { student: 'Alex Johnson', vision: 'Aerospace Engineer', path: 40 },
              { student: 'Sarah Smith', vision: 'Medical Researcher', path: 35 },
              { student: 'Marcus Lee', vision: 'AI Researcher', path: 55 },
            ].map((s, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-slate-900">{s.student}</p>
                    <p className="text-sm text-slate-600">{s.vision}</p>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">{s.path}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView === 'landing') return <LandingPage />;
  if (currentView === 'student') return <StudentDashboard />;
  if (currentView === 'parent') return <ParentDashboard />;
  if (currentView === 'teacher') return <TeacherDashboard />;
}