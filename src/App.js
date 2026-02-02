import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThinkingProvider } from './contexts/ThinkingContext';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Student Pages
import { LoginPage } from './pages/LoginPage';
import { StudentDashboardPage } from './pages/student/DashboardPage';
import { ReasoningLogPage } from './pages/student/ReasoningLogPage';
import { ThinkingWorkspacePage } from './pages/student/ThinkingWorkspacePage';
import { SpeakingPracticePage } from './pages/student/SpeakingPracticePage';
import { MyProgressPage } from './pages/student/MyProgressPage';
import { CuriosityMapPage } from './pages/student/CuriosityMapPage';
import { ArtifactBuilderPage } from './pages/student/ArtifactBuilderPage';
import { ReflectionLogPage } from './pages/student/ReflectionLogPage';
import { MyVisionPage } from './pages/student/MyVisionPage';

// Teacher Pages
import { TeacherDashboardPage } from './pages/teacher/DashboardPage';
import { ClassInsightsPage } from './pages/teacher/ClassInsightsPage';
import { ArtifactReviewPage } from './pages/teacher/ArtifactReviewPage';
import { TeacherPlanPage } from './pages/teacher/PlanPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/DashboardPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { ParentSummariesPage } from './pages/admin/ParentSummariesPage';

// Parent Pages
import { ParentDashboardPage } from './pages/parent/DashboardPage';
import { ParentResourcesPage } from './pages/parent/ResourcesPage';

// Landing page components
import { Hero } from './components/landing/Hero';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Landing Page
const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = React.useCallback((path) => window.location.href = path, []);
  const [enquiryForm, setEnquiryForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    role: 'parent',
    school: '',
    message: ''
  });
  const [enquirySubmitted, setEnquirySubmitted] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState(null);

  const handleEnquiryChange = (e) => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend/email service
    console.log('Enquiry submitted:', enquiryForm);
    setEnquirySubmitted(true);
    setTimeout(() => setEnquirySubmitted(false), 5000);
    setEnquiryForm({ name: '', email: '', phone: '', role: 'parent', school: '', message: '' });
  };

  const faqs = [
    {
      question: "What is AIforStudents.online?",
      answer: "AIforStudents.online is an education platform that prioritizes critical thinking over rote learning. Students must think through questions and form their own beliefs before AI assistance is unlocked. This approach builds genuine understanding rather than dependence on AI."
    },
    {
      question: "How is this different from ChatGPT?",
      answer: "Unlike ChatGPT which gives instant answers, our platform requires students to first articulate their own thinking, identify assumptions, and form initial beliefs. Only after this 'thinking workout' is AI assistance unlocked. This builds the critical thinking muscles students need."
    },
    {
      question: "Is this aligned with NEP 2020?",
      answer: "Yes! Our platform fully aligns with NEP 2020's emphasis on conceptual understanding, critical thinking, experiential learning, and holistic development. We track learning progress through portfolios rather than just test scores."
    },
    {
      question: "What age groups is this suitable for?",
      answer: "Currently, we're designed for students in Classes 6-12. The platform adapts its complexity based on the student's grade level and subject matter."
    },
    {
      question: "How do teachers and parents use the platform?",
      answer: "Teachers can track class-wide learning patterns, identify areas of confusion, and send personalized guidance to students. Parents receive friendly summaries of their child's thinking journey without overwhelming metrics or scores."
    },
    {
      question: "Is my child's data safe?",
      answer: "Absolutely. We follow strict privacy practices. Student reflections and thinking logs are private by default. We don't sell data, and parents only see summarized growth narratives, not raw student content."
    },
    {
      question: "How can my school get started?",
      answer: "Fill out the enquiry form below or email us at contact@aiforstudents.online. We offer pilot programs for schools in Darjeeling and surrounding areas, with plans to expand across India."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! Schools can request a free 30-day pilot program. Individual students can use demo mode to explore the platform's features."
    }
  ];

  // Redirect authenticated users to their dashboard
  if (isAuthenticated) {
    if (user.role === 'student') return <Navigate to="/student" replace />;
    if (user.role === 'teacher') return <Navigate to="/teacher" replace />;
    if (user.role === 'parent') return <Navigate to="/parent" replace />;
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
  }

  const handleLogin = () => navigate('/login');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar onLogin={handleLogin} />
      <Hero onStart={handleLogin} />

      {/* Quick info section */}
      <section id="how-it-works" className="py-20 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Think First. Then AI.
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            AIforStudents.online is a critical thinking-first education platform.
            Students must reason through questions before AI assistance is unlocked.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="font-bold mb-2">Students</h3>
              <p className="text-sm text-slate-400">
                Practice critical thinking before AI
              </p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-4xl mb-4">👩‍🏫</div>
              <h3 className="font-bold mb-2">Teachers</h3>
              <p className="text-sm text-slate-400">
                Track class progress and guide reasoning
              </p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-4xl mb-4">👨‍👩‍👧</div>
              <h3 className="font-bold mb-2">Parents</h3>
              <p className="text-sm text-slate-400">
                Support your child's thinking journey
              </p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="font-bold mb-2">Schools</h3>
              <p className="text-sm text-slate-400">
                NEP 2020 aligned critical thinking
              </p>
            </div>
          </div>
          <div className="mt-12">
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Get Started
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-20 px-6 bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-400 mb-12 text-center">
            Everything you need to know about AIforStudents.online
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between bg-slate-900/50 hover:bg-slate-900 transition-colors"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <span className={`text-2xl text-teal-400 transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === index && (
                  <div className="p-5 bg-slate-900/30 border-t border-slate-800">
                    <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry" className="py-20 px-6 bg-slate-900">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-400 mb-12 text-center">
            Interested in bringing AIforStudents to your school? Send us a message!
          </p>

          {enquirySubmitted ? (
            <div className="p-8 bg-teal-950/50 border border-teal-500/50 rounded-2xl text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-teal-300 mb-2">Thank You!</h3>
              <p className="text-teal-400">
                We've received your enquiry and will get back to you within 24-48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={enquiryForm.name}
                    onChange={handleEnquiryChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={enquiryForm.email}
                    onChange={handleEnquiryChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={enquiryForm.phone}
                    onChange={handleEnquiryChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    I am a... *
                  </label>
                  <select
                    name="role"
                    value={enquiryForm.role}
                    onChange={handleEnquiryChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                  >
                    <option value="parent">Parent</option>
                    <option value="teacher">Teacher</option>
                    <option value="school_admin">School Administrator</option>
                    <option value="student">Student</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  School/Institution Name
                </label>
                <input
                  type="text"
                  name="school"
                  value={enquiryForm.school}
                  onChange={handleEnquiryChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors"
                  placeholder="Enter school name (if applicable)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={enquiryForm.message}
                  onChange={handleEnquiryChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Send Enquiry
                <span>→</span>
              </button>

              <p className="text-sm text-slate-500 text-center">
                We typically respond within 24-48 hours. Your information is kept private and never shared.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><StudentDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/reasoning" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><ReasoningLogPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/workspace" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><ThinkingWorkspacePage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/speaking" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><SpeakingPracticePage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/progress" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><MyProgressPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/map" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><CuriosityMapPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/artifacts" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><ArtifactBuilderPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/reflections" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><ReflectionLogPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/student/vision" element={
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout><MyVisionPage /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Teacher Routes */}
      <Route path="/teacher" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <AppLayout><TeacherDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/class" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <AppLayout><ClassInsightsPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/artifacts" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <AppLayout><ArtifactReviewPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/teacher/plans" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <AppLayout><TeacherPlanPage /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Parent Routes */}
      <Route path="/parent" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <AppLayout><ParentDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/parent/resources" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <AppLayout><ParentResourcesPage /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AppLayout><AdminDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AppLayout><ReportsPage /></AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/parents" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AppLayout><ParentSummariesPage /></AppLayout>
        </ProtectedRoute>
      } />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThinkingProvider>
          <AppRoutes />
        </ThinkingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;