import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  GraduationCap, Wifi, Smartphone, ArrowRight,
  Mail, FileSpreadsheet, Palette, Bot,
  Eye, Building2, Github, Twitter, Instagram,
  Youtube, MapPin, ExternalLink
} from 'lucide-react';

/* ─── Translations ─── */
const translations = {
  en: {
    nav: { about: "About", apply: "Apply Now" },
    hero: {
      badge: "School Digital Infrastructure · 2026",
      title1: "No school should be",
      titleHighlight: " left behind",
      title2: " in the",
      title3: "age of AI.",
      desc: "We're unlocking free world-class digital tools for every rural school — one domain, one decision, and everything activates.",
      btnActivate: "Activate Your School",
      btnLearn: "Learn More",
      schoolsLabel: "Schools",
      schoolsDesc: "Across districts"
    },
    vision: {
      overline: "Vision & Core Goals",
      title: "Five pillars of AI-ready schools.",
      pillars: [
        { num: '01', title: 'Offload Teachers', desc: 'Offload repetitive tasks to AI so teachers reclaim time to think deeply and improve education quality.' },
        { num: '02', title: 'Empower Students', desc: 'Give students AI study tools with visual progress tracking and teacher oversight — creativity and critical thinking, measured.' },
        { num: '03', title: 'Equip Leadership', desc: 'Give principals digital resources and global connections — grants, scholarships, competitions, and discovery, all at their fingertips.' },
        { num: '04', title: 'Rural AI Readiness', desc: 'Deliver world-class digital infrastructure for full AI readiness in every rural school, regardless of location.' },
        { num: '05', title: 'Mobile-First Staff', desc: 'Equip teachers with the tools to go where the students already are — right in their smartphones.' },
      ]
    },
    starting: {
      overline: "Starting Point",
      title1: "What your school already has —",
      title2: "and that is enough.",
      box1Title: "Internet Connection",
      box1Desc: "Any speed works",
      box2Title: "2 Devices",
      box2Desc: "Computers or smartphones",
      footer: "Nothing else is needed to get started."
    },
    problem: {
      overline: "The Problem",
      title: "The best tools for teachers are free — but locked behind a door.",
      p1: "Today's students live on screens, accessing AI tools freely. Meanwhile, teachers are left without oversight or resources. The tools that fix this are completely free — but trapped behind a technical \"domain wall.\"",
      p2A: "A school domain works exactly like an ",
      p2Bold: "Aadhaar card.",
      p2B: " Without it, the tools exist and are free — but you simply cannot access them.",
      quote: "\"One domain. One decision. Everything activates.\"",
      quoteSub: "Setting up this foundational IT infrastructure is the fastest way to bridge the gap between elite and rural schools."
    },
    unlocked: {
      overline: "What Gets Unlocked",
      title: "Free. Forever.",
      subtitle: "Once the domain is registered, these elite tools activate for every teacher and every student — at zero cost.",
      tools: [
        { title: 'Google Workspace', desc: 'Gmail, Classroom, Drive, Meet. Unlimited accounts. Teacher sees every student\'s progress live.', accent: '#4285F4', Icon: Mail },
        { title: 'Microsoft 365', desc: 'Word, Teams, OneNote, Excel. Free for every teacher in the school.', accent: '#00A4EF', Icon: FileSpreadsheet },
        { title: 'Canva for Education', desc: 'Posters, worksheets, presentations. Free for every teacher to create beautiful content.', accent: '#7C3AED', Icon: Palette },
        { title: 'AI Learning Tools', desc: 'AI tutors natively in Nepali and Hindi. Every student gets a private tutor at home.', accent: '#0891B2', Icon: Bot, images: ['/classroom.jpg'] },
        { title: 'Student Visibility', desc: 'See who submitted, who didn\'t, who is falling behind. In real time.', accent: '#059669', Icon: Eye },
        { title: 'Official School Identity', desc: 'Every teacher gets name@schoolname.in — a permanent professional email identity.', accent: '#45474c', Icon: Building2 }
      ],
      footer: "Many other possibilities. This is just the beginning."
    },
    process: {
      overline: "Timeline",
      title: "From decision to independence.",
      subtitle: "We handle the complex setup so your school can focus on teaching.",
      steps: [
        { title: "Headmaster Signs", desc: "One authorization letter + school registration certificate. Takes 10 minutes. (Requires an internet connection and 2 devices at the school)." },
        { title: "Domain Registered", desc: "Google Workspace for Education applied. Zero cost to school." },
        { title: "Teachers Onboarded", desc: "One 2-hour training session. Teachers onboarded. First assignment posted on Classroom." },
        { title: "School Owns Everything", desc: "One teacher becomes permanent admin. School is independent forever." }
      ]
    },
    founder: {
      overline: "The Person Behind It",
      title1: "Made with love,",
      title2: "from the hills of Lamahatta.",
      location: "Lamahatta, Darjeeling",
      role: "Founder",
      name: "Upesh Bishwakarma",
      tags: "Creative Technologist · AI Builder · Lamahatta",
      motivationOverline: "Motivation",
      m1: "\"When I find out the schools in Darjeeling doesn't have access to the top tools of education which is bascially free. This kept me up at night.\"",
      m2: "I accidently found when i was curious and search on the internet didn't plan to work on this project so soon but I felt this is important.",
      m3: "I plan to do this prototype with 'Lamahatta High School' and opensource the blueprint to all the rural areas of schools around the world.",
      m4: "\"I truly believe that in the entire schools there will be a tech guy who figure things out will be able to set this up. I promise the blueprint I will make will be super easy so that your grandma will be able to do it with her eyes closed.\"",
      focusOverline: "Current Focus",
      focusTags: ['aiforstudents.online', 'Multi-agent swarm', 'Hyper-personalised digital assistant', 'Helping SMBs automate their business']
    },
    cta: {
      overline: "The First Step",
      title: "This is the first step.",
      desc: "Like registering for Aadhaar before everything else became possible. Within one year, what teachers and students do with these tools will speak for itself.",
      btn: "Activate Your School",
      footer: "Zero risk. Full ownership."
    },
    footer: {
      operator: "Operator Panel",
      quote: "\"No school should be left behind in the age of AI.\"",
      madeWith: "Made with love by",
      in: "in"
    }
  },

  ne: {
    nav: { about: "हाम्रो बारेमा", apply: "आवेदन दिनुहोस्" },
    hero: {
      badge: "विद्यालय डिजिटल पूर्वाधार · २०२६",
      title1: "एआईको युगमा कुनै पनि",
      titleHighlight: " विद्यालय",
      title2: " पछि पर्नु",
      title3: "हुँदैन।",
      desc: "हामी हरेक ग्रामीण विद्यालयको लागि नि:शुल्क विश्व-स्तरीय डिजिटल उपकरणहरू अनलक गर्दैछौं — एउटा डोमेन, एउटा निर्णय, र सबै कुरा सक्रिय हुन्छ।",
      btnActivate: "विद्यालय सक्रिय गर्नुहोस्",
      btnLearn: "थप जान्नुहोस्",
      schoolsLabel: "विद्यालयहरू",
      schoolsDesc: "जिल्लाहरूभरि"
    },
    vision: {
      overline: "दृष्टिकोण र मुख्य लक्ष्यहरू",
      title: "एआई-तयार विद्यालयका पाँच स्तम्भहरू।",
      pillars: [
        { num: '०१', title: 'शिक्षकहरूको कार्यभार घटाउने', desc: 'दोहोरिने कार्यहरू एआईलाई दिनुहोस् ताकि शिक्षकहरूले गहिरो रूपमा सोच्न र शिक्षाको गुणस्तर सुधार गर्न समय पाऊन्।' },
        { num: '०२', title: 'विद्यार्थीहरूलाई सशक्त बनाउने', desc: 'विद्यार्थीहरूलाई एआई अध्ययन उपकरणहरू दिनुहोस् जसमा दृश्य प्रगति ट्र्याकिङ र शिक्षकको निगरानी होस् — रचनात्मकता र आलोचनात्मक सोचाइको मापन।' },
        { num: '०३', title: 'नेतृत्वलाई सुसज्जित गर्ने', desc: 'प्रधानाध्यापकहरूलाई डिजिटल स्रोतहरू र विश्वव्यापी जडानहरू दिनुहोस् — अनुदान, छात्रवृत्ति, प्रतियोगिताहरू, औंलाको टुप्पामै।' },
        { num: '०४', title: 'ग्रामीण एआई तयारी', desc: 'कुनै पनि ग्रामीण विद्यालयमा पूर्ण एआई तयारीको लागि विश्व-स्तरीय डिजिटल पूर्वाधार रूपान्तरण गर्ने।' },
        { num: '०५', title: 'मोबाइल-फर्स्ट स्टाफ', desc: 'शिक्षकहरूलाई ती उपकरणहरू सुसज्जित गर्नुहोस् जसबाट उनीहरू विद्यार्थीहरू भएकै ठाउँमा — स्मार्टफोनमै जान सकून्।' },
      ]
    },
    starting: {
      overline: "सुरुवात बिन्दु",
      title1: "तपाईंको विद्यालयसँग जे छ —",
      title2: "त्यही पर्याप्त छ।",
      box1Title: "इन्टरनेट जडान",
      box1Desc: "जुनसुकै स्पिडमा चल्ने",
      box2Title: "२ उपकरणहरू",
      box2Desc: "कम्प्युटर वा स्मार्टफोन",
      footer: "सुरु गर्न अरू केही चाहिन्न।"
    },
    problem: {
      overline: "समस्या",
      title: "शिक्षकहरूका लागि उत्कृष्ट उपकरणहरू नि:शुल्क छन् — तर ढोका पछाडि बन्द छन्।",
      p1: "आजका विद्यार्थीहरू स्क्रिनमा बस्छन् र एआई उपकरणहरू नि:शुल्क प्रयोग गर्छन्। यता शिक्षकहरू निगरानी वा स्रोतबिना नै छुटिरहेका छन्। यी समस्या समाधान गर्ने उपकरणहरू नि:शुल्क छन् — तर प्राविधिक 'डोमेन वाल' पछाडि थुनिएका छन्।",
      p2A: "विद्यालयको डोमेन ठ्याक्कै ",
      p2Bold: "आधार कार्ड ",
      p2B: "जस्तै काम गर्छ। यो बिना, उपकरणहरू उपलब्ध त छन् नि:शुल्क पनि छन् — तर तपाईं तिनीहरूलाई पहुँच गर्न सक्नुहुन्न।",
      quote: "\"एउटा डोमेन। एउटा निर्णय। सबै कुरा सक्रिय हुन्छ।\"",
      quoteSub: "यो आधारभूत आईटी पूर्वाधार स्थापना गर्नु नै एलिट र ग्रामीण विद्यालयहरू बीचको खाडल पुर्ने सबैभन्दा छिटो तरिका हो।"
    },
    unlocked: {
      overline: "के खुल्छ",
      title: "नि:शुल्क। सधैंका लागि।",
      subtitle: "डोमेन दर्ता भएपछि, यी एलिट उपकरणहरू हरेक शिक्षक र हरेक विद्यार्थीका लागि सक्रिय हुन्छन् — शून्य लागतमा।",
      tools: [
        { title: 'गुगल वर्कस्पेस (Google Workspace)', desc: 'Gmail, Classroom, Drive, Meet. असीमित खाताहरू। शिक्षकले हरेक विद्यार्थीको प्रगति प्रत्यक्ष हेर्न सक्छन्।', accent: '#4285F4', Icon: Mail },
        { title: 'माइक्रोसफ्ट ३६५ (Microsoft 365)', desc: 'Word, Teams, OneNote, Excel. विद्यालयका हरेक शिक्षकका लागि नि:शुल्क।', accent: '#00A4EF', Icon: FileSpreadsheet },
        { title: 'क्यान्भा (Canva for Education)', desc: 'पोस्टर, वर्कसिट, प्रस्तुतिहरू। हरेक शिक्षकलाई सुन्दर सामग्री बनाउन नि:शुल्क।', accent: '#7C3AED', Icon: Palette },
        { title: 'एआई अध्ययन उपकरण (AI Tools)', desc: 'नेपाली र हिन्दीमा एआई ट्युटरहरू। हरेक विद्यार्थीले घरमै निजी ट्युटर पाउनेछन्।', accent: '#0891B2', Icon: Bot, images: ['/classroom.jpg'] },
        { title: 'विद्यार्थी निगरानी', desc: 'कसले बुझायो, कसले बुझाएन, को पछि पर्दैछ भनेर वास्तविक समयमा हेर्नुहोस्।', accent: '#059669', Icon: Eye },
        { title: 'आधिकारिक विद्यालय पहिचान', desc: 'हरेक शिक्षकले name@schoolname.in प्राप्त गर्छन् — स्थायी व्यावसायिक इमेल पहिचान।', accent: '#45474c', Icon: Building2 }
      ],
      footer: "अरू धेरै सम्भावनाहरू। यो त केवल सुरुवात हो।"
    },
    process: {
      overline: "समयरेखा",
      title: "निर्णयदेखि स्वतन्त्रतासम्म।",
      subtitle: "हामी जटिल सेटअप सम्हाल्छौं ताकि तपाईंको विद्यालयले पढाउनमा ध्यान दिन सकोस्।",
      steps: [
        { title: "प्रधानाध्यापकको हस्ताक्षर", desc: "एउटा अधिकार पत्र + विद्यालय दर्ता प्रमाणपत्र। जम्मा १० मिनेट लाग्छ। (इन्टरनेट जडान र विद्यालयमा २ उपकरणहरू आवश्यक)।" },
        { title: "डोमेन दर्ता", desc: "Google Workspace for Education लागू गरिन्छ। विद्यालयलाई शून्य लागत।" },
        { title: "शिक्षकहरू अनबोर्ड", desc: "एउटा २ घण्टाको प्रशिक्षण सत्र। शिक्षकहरू अनबोर्ड गरियो। पहिलो कार्य कक्षामा राखियो।" },
        { title: "विद्यालयको सम्पूर्ण स्वामित्व", desc: "एक शिक्षक स्थायी प्रशासक बन्छन्। विद्यालय सधैंको लागि स्वतन्त्र।" }
      ]
    },
    founder: {
      overline: "यसको पछाडिको व्यक्ति",
      title1: "मायाको साथ निर्मित,",
      title2: "लामहट्टाको पहाडबाट।",
      location: "लामहट्टा, दार्जिलिङ",
      role: "संस्थापक",
      name: "उपेश विश्वकर्मा",
      tags: "क्रिएटिभ टेक्नोलोजीस्ट · एआई बिल्डर · लामहट्टा",
      motivationOverline: "प्रेरणा",
      m1: "\"जब मैले थाहा पाएँ कि दार्जिलिङका विद्यालयहरूसँग उत्तम शिक्षा उपकरणहरूमा पहुँच छैन जुन वास्तवमा नि:शुल्क छ। यसले मलाई रातभर सुत्न दिएन।\"",
      m2: "मैले उत्सुकताले इन्टरनेटमा खोज्दा यो अचानक फेला पारेको थिएँ। यो प्रजेक्टमा यति छिट्टै काम गर्ने योजना थिएन तर मलाई यो महत्त्वपूर्ण लाग्यो।",
      m3: "म यो प्रोटोटाइप 'लामहट्टा हाई स्कूल' सँग गर्ने योजना गर्दैछु र यसको ब्लुप्रिन्ट संसारभरका सबै ग्रामीण विद्यालयहरूको लागि ओपनसोर्स गर्नेछु।",
      m4: "\"मलाई पक्का विश्वास छ कि प्रत्येक विद्यालयमा एक प्राविधिक व्यक्ति हुनेछ जसले यसलाई सजिलै सेटअप गर्न सक्नेछ। म बाचा गर्छु कि मैले बनाउने ब्लुप्रिन्ट यति सजिलो हुनेछ कि तपाईंको हजुरआमाले पनि आँखा बन्द गरेर गर्न सक्नुहुनेछ।\"",
      focusOverline: "हालको ध्यान",
      focusTags: ['aiforstudents.online', 'मल्टि-एजेन्ट स्वार्म (Multi-agent swarm)', 'अति-व्यक्तिगत डिजिटल सहायक', 'साना व्यवसायहरूलाई स्वचालित गर्न मद्दत गर्दै']
    },
    cta: {
      overline: "पहिलो कदम",
      title: "यो पहिलो कदम हो।",
      desc: "अरू सबै कुरा सम्भव हुनुभन्दा अघि आधार कार्डको लागि दर्ता गरे जस्तै। एक वर्षभित्र शिक्षक र विद्यार्थीहरूले यी उपकरणहरूसँग के गर्छन् भन्ने कुरा आफै प्रस्ट हुनेछ।",
      btn: "विद्यालय सक्रिय गर्नुहोस्",
      footer: "शून्य जोखिम। पूर्ण अधिकार।"
    },
    footer: {
      operator: "अपरेटर प्यानल",
      quote: "\"एआईको युगमा कुनै पनि विद्यालय पछि पर्नु हुँदैन।\"",
      madeWith: "मायाको साथ निर्मित",
      in: "मा"
    }
  }
};

/* ─── animation helpers ─── */
const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ─── Decorative Arc SVG ─── */
const ArcDecor = ({ className = '' }) => (
  <svg viewBox="0 0 600 300" className={`absolute pointer-events-none ${className}`} fill="none">
    <path
      d="M 0 250 Q 300 -50 600 250"
      className="arc-line animate-draw-line"
    />
  </svg>
);

/* ─── Glow Orb ─── */
const GlowOrb = ({ size = 400, color = 'rgba(9,20,38,0.06)', className = '' }) => (
  <div
    className={`glow-orb animate-ambient absolute pointer-events-none ${className}`}
    style={{ width: size, height: size, background: color }}
  />
);

/* ─── Timeline step ─── */
const TimelineStep = ({ number, title, description, isLast }) => (
  <motion.div variants={fadeUp} className="flex gap-6 relative">
    <div className="flex flex-col items-center shrink-0">
      <div className="w-11 h-11 rounded-full bg-white shadow-card flex items-center justify-center text-primary font-bold text-base z-10 border border-[rgba(9,20,38,0.08)]">
        {number}
      </div>
      {!isLast && (
        <div className="absolute top-11 bottom-0 left-[21px] w-px bg-gradient-to-b from-[rgba(9,20,38,0.15)] to-transparent" />
      )}
    </div>
    <div className="pb-12 pt-1">
      <h4 className="font-heading text-slate-900 font-semibold text-xl mb-2 tracking-tight">{title}</h4>
      <p className="text-[#45474c] leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

/* ─── Floating Image Card ─── */
const FloatingCard = ({ rotate = 0, delay = 0, className = '', style = {}, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    style={{ rotate, ...style }}
    whileHover={{ rotate: 0, scale: 1.02, transition: { duration: 0.4 } }}
    className={`absolute rounded-2xl shadow-float cursor-pointer ${className}`}
  >
    {children}
  </motion.div>
);

/* ─── Section wrapper ─── */
const Section = ({ children, className = '', alt = false, id }) => (
  <section
    id={id}
    className={`relative py-28 md:py-36 px-6 overflow-hidden ${alt ? 'bg-[#f3f4f5]' : 'bg-[#f8f9fa]'} ${className}`}
  >
    <div className="max-w-6xl mx-auto relative z-10">{children}</div>
  </section>
);

/* ─── Light sweep shimmer ─── */
const LightSweep = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute top-0 h-full w-[60px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
      style={{ animation: 'lightSweep 5s 2s ease-in-out infinite' }}
    />
  </div>
);

/* ══════════════════════════════════════════════
   LANDING PAGE
   ══════════════════════════════════════════════ */
export const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef  = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -120]);
  const y2 = useTransform(scrollY, [0, 800], [0, -60]);
  const y3 = useTransform(scrollY, [0, 800], [0, -180]);

  // Translation state
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] overflow-x-hidden font-sans">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-[rgba(9,20,38,0.06)]" style={{ backdropFilter: 'blur(24px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-glow-sm" style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}>
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-[#191c1d] hidden sm:block">
              aiforstudents<span className="text-[#45474c] font-light">.online</span>
            </span>
          </div>

          <div className="flex items-center">
            {/* Glowing Toggle */}
            <div className="flex items-center justify-center p-1 rounded-full bg-[#191c1d]/90 shadow-float border border-white/10 mr-4">
              <button 
                onClick={() => setLang('en')} 
                className={`relative px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'en' ? 'text-[#eab308]' : 'text-white/50 hover:text-white/80'}`}
              >
                {lang === 'en' && <div className="absolute inset-0 rounded-full border border-[#eab308]/50 shadow-[0_0_15px_rgba(234,179,8,0.3)] pointer-events-none" />}
                EN
              </button>
              <span className="text-white/20 mx-1">|</span>
              <button 
                onClick={() => setLang('ne')} 
                className={`relative px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${lang === 'ne' ? 'text-[#eab308]' : 'text-white/50 hover:text-white/80'}`}
              >
                {lang === 'ne' && <div className="absolute inset-0 rounded-full border border-[#eab308]/50 shadow-[0_0_15px_rgba(234,179,8,0.3)] pointer-events-none" />}
                नेपाली
              </button>
            </div>

            <button
              onClick={() => document.getElementById('founder')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden sm:inline-flex text-sm font-medium text-[#45474c] hover:text-[#191c1d] transition-colors mr-6"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => navigate('/apply')}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              {t.nav.apply}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#f8f9fa]">
        <GlowOrb size={600} color="rgba(9,20,38,0.07)" className="-top-40 -right-40" />
        <GlowOrb size={500} color="rgba(30,41,59,0.05)" className="-bottom-20 -left-20" />
        <ArcDecor className="top-0 left-0 w-full h-48 opacity-60" />

        <div className="max-w-6xl mx-auto w-full relative z-10 px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center lg:items-start text-center lg:text-left mt-10 lg:mt-0">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass shadow-card mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#091426] animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c]">
                  {t.hero.badge}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-[2.75rem] leading-[1.1] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.05] font-semibold tracking-tight mb-7 text-[#191c1d]"
              >
                {t.hero.title1}<br className="hidden sm:block" />
                <span className="text-[#45474c] font-light">{t.hero.titleHighlight}</span>{t.hero.title2}<br className="hidden sm:block" />
                {t.hero.title3}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-[#45474c] max-w-xl mb-10 leading-relaxed font-light mx-auto lg:mx-0"
              >
                {t.hero.desc}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/apply')}
                  className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group"
                >
                  {t.hero.btnActivate}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 glass rounded-xl text-[#191c1d] font-medium hover:shadow-card transition-all"
                >
                  {t.hero.btnLearn}
                </button>
              </motion.div>
            </motion.div>

            <motion.div className="relative h-[320px] sm:h-[450px] lg:h-[600px] w-full pointer-events-none select-none mt-4 lg:mt-0">
              <FloatingCard rotate={-3} delay={0.3} style={{ y: y1 }} className="w-[60%] lg:w-[65%] top-[5%] lg:top-[12%] right-[5%] lg:right-[10%] z-10 shadow-[0_20px_40px_rgba(9,20,38,0.15)] bg-white p-2 sm:p-3 overflow-hidden">
                <div className="w-full h-full relative rounded-xl sm:rounded-[20px] overflow-hidden aspect-[4/3] shadow-inner bg-[#f3f4f5]">
                  <LightSweep />
                  <img src="/schoolyard.jpg" alt="Local School" className="w-full h-full object-cover shadow-inner pointer-events-none" />
                </div>
              </FloatingCard>
              
              <FloatingCard rotate={2} delay={0.5} style={{ y: y2 }} className="w-[45%] lg:w-[45%] top-[50%] lg:top-[42%] left-[5%] lg:left-[10%] z-20 shadow-[0_20px_40px_rgba(30,41,59,0.15)] overflow-hidden rounded-[24px] sm:rounded-[36px]">
                <div className="w-full aspect-[1/1] sm:aspect-[4/3] bg-gradient-to-br from-[#091426] to-[#1e293b] flex items-center justify-center relative shadow-inner">
                  <LightSweep />
                  <GraduationCap className="w-10 lg:w-16 h-10 lg:h-16 text-white/30" />
                </div>
              </FloatingCard>
              
              <FloatingCard rotate={-1.5} delay={0.7} style={{ y: y3 }} className="w-[48%] lg:w-[40%] bottom-[5%] lg:bottom-[8%] right-[5%] z-30 shadow-[0_20px_40px_rgba(9,20,38,0.12)] bg-white/50 backdrop-blur-3xl overflow-hidden shadow-inner border border-white/40">
                <div className="w-full h-full bg-white/50 flex flex-col items-center justify-center gap-1.5 p-5 text-center relative pointer-events-none">
                  <LightSweep />
                  <p className="text-[10px] lg:text-xs uppercase tracking-widest text-[#45474c] font-semibold mt-1">{t.hero.schoolsLabel}</p>
                  <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#091426]">400+</p>
                  <p className="text-[9px] lg:text-[10px] text-[#45474c] leading-tight mt-1 mb-1">{t.hero.schoolsDesc}</p>
                </div>
              </FloatingCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <Section alt id="vision">
        <GlowOrb size={400} color="rgba(9,20,38,0.04)" className="top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">{t.vision.overline}</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-[#191c1d]">
              {t.vision.title}
            </motion.h2>
          </div>
          <motion.div variants={stagger} className="grid md:grid-cols-2 gap-5">
            {t.vision.pillars.map((item, i) => (
              <motion.div
                key={item.num}
                variants={fadeUp}
                custom={i}
                className="card-hover bg-white rounded-2xl p-8 shadow-card group relative overflow-hidden"
              >
                <LightSweep />
                <p className="font-heading text-5xl font-bold text-[#f3f4f5] mb-4 select-none group-hover:text-[#edeeef] transition-colors">{item.num}</p>
                <h3 className="font-heading text-xl font-semibold text-[#191c1d] mb-3">{item.title}</h3>
                <p className="text-[#45474c] leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ── WHAT YOU ALREADY HAVE ── */}
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="text-center">
          <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">{t.starting.overline}</motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-[#191c1d]">
            {t.starting.title1}<br />{t.starting.title2}
          </motion.h2>
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mt-12">
            {[
              { Icon: Wifi,       label: t.starting.box1Title, sub: t.starting.box1Desc },
              { Icon: Smartphone, label: t.starting.box2Title, sub: t.starting.box2Desc },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="card-hover glass rounded-2xl p-8 shadow-card text-left group">
                <div className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-heading font-semibold text-lg text-[#191c1d] mb-1">{label}</p>
                <p className="text-[#45474c] font-light text-sm">{sub}</p>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="text-[#45474c] mt-8 font-light">{t.starting.footer}</motion.p>
        </motion.div>
      </Section>

      {/* ── THE PROBLEM ── */}
      <Section alt id="problem">
        <GlowOrb size={500} color="rgba(9,20,38,0.05)" className="-right-40 top-0" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">{t.problem.overline}</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-8 tracking-tight leading-[1.1] text-[#191c1d]">
              {t.problem.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#45474c] text-lg leading-relaxed font-light mb-5">
              {t.problem.p1}
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#45474c] text-lg leading-relaxed font-light">
              {t.problem.p2A}<strong className="text-[#191c1d] font-semibold">{t.problem.p2Bold}</strong>{t.problem.p2B}
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="relative">
            <div
              className="card-hover glass rounded-[28px] p-10 shadow-float relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(9,20,38,0.97) 0%, rgba(30,41,59,0.97) 100%)' }}
            >
              <LightSweep />
              <p className="text-white/80 text-lg leading-relaxed mb-6 font-light">
                {t.problem.quote}
              </p>
              <div className="w-8 h-px bg-white/30 mb-4" />
              <p className="text-white/50 text-sm uppercase tracking-[0.15em] font-light">
                {t.problem.quoteSub}
              </p>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-[28px] -z-10 opacity-30"
              style={{ background: 'linear-gradient(135deg, #091426, #1e293b)' }} />
          </motion.div>
        </motion.div>
      </Section>

      {/* ── WHAT GETS UNLOCKED ── */}
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">{t.unlocked.overline}</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-5 tracking-tight text-[#191c1d]">{t.unlocked.title}</motion.h2>
            <motion.p variants={fadeUp} className="text-[#45474c] text-lg font-light leading-relaxed">
              {t.unlocked.subtitle}
            </motion.p>
          </div>
          <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.unlocked.tools.map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className={`card-hover bg-white rounded-2xl p-7 shadow-card group relative overflow-hidden ${item.images ? 'md:col-span-2' : ''}`}>
                <LightSweep />
                <div className={`flex flex-col h-full ${item.images ? 'md:flex-row gap-6 items-center' : ''}`}>
                  <div className={item.images ? 'flex-1' : ''}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${item.accent}15` }}>
                      <item.Icon className="w-5 h-5" style={{ color: item.accent }} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-[#191c1d] mb-2">{item.title}</h3>
                    <p className="text-[#45474c] leading-relaxed font-light text-sm">{item.desc}</p>
                  </div>
                  
                  {item.images && (
                    <div className="flex-1 flex gap-3 mt-5 md:mt-0 w-full">
                      {item.images.map((img, idx) => (
                        <div key={idx} className="flex-1 rounded-xl overflow-hidden aspect-[4/3] shadow-inner relative group-hover:shadow-float transition-all bg-[#f3f4f5]">
                           <img src={img} alt="School setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#091426]/20 to-transparent pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="text-center mt-10">
            <p className="text-[#45474c] font-light italic">{t.unlocked.footer}</p>
          </motion.div>
        </motion.div>
      </Section>

      {/* ── 30-DAY PROCESS ── */}
      <Section alt id="process">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid md:grid-cols-2 gap-16 items-start">
          <div className="md:sticky md:top-32">
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">{t.process.overline}</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-5 tracking-tight text-[#191c1d]">
              {t.process.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#45474c] text-lg font-light leading-relaxed">
              {t.process.subtitle}
            </motion.p>
          </div>
          <div className="pl-2">
            {t.process.steps.map((step, i) => (
              <TimelineStep key={i} number={i + 1} title={step.title} description={step.desc} isLast={i === t.process.steps.length - 1} />
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ── FOUNDER SECTION ── */}
      <Section id="founder">
        <GlowOrb size={500} color="rgba(9,20,38,0.05)" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-4">{t.founder.overline}</motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold tracking-tight text-[#191c1d]">{t.founder.title1}<br /><span className="text-[#45474c] font-light">{t.founder.title2}</span></motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <motion.div variants={fadeUp} className="relative z-10 w-full max-w-sm mx-auto md:max-w-none">
              <div className="card-hover bg-white rounded-[28px] overflow-hidden shadow-float p-2 sm:p-3 pb-8">
                <div className="relative overflow-hidden rounded-[20px] shadow-inner mb-6 flex bg-[#f3f4f5]">
                  <img src="/founder.jpg" alt={t.founder.name} className="w-full aspect-[4/3] sm:aspect-[16/9] object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091426]/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-white/90" />
                      <span className="text-white text-xs font-medium tracking-wide">{t.founder.location}</span>
                    </div>
                  </div>
                </div>
                <div className="px-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-2">{t.founder.role}</p>
                  <h3 className="font-heading text-2xl font-bold text-[#191c1d] mb-1">{t.founder.name}</h3>
                  <p className="text-[#45474c] text-sm font-light mb-5">{t.founder.tags}</p>
                  <div className="flex items-center gap-3 flex-wrap mt-6">
                    <a href="mailto:contacts@aiforstudents.online" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Official Email">
                      <Mail className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://github.com/ripplewave2025" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="GitHub">
                      <Github className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://x.com/upeshinmars" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Twitter / X">
                      <Twitter className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://www.instagram.com/hotbpoison" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Instagram">
                      <Instagram className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://www.youtube.com/@techinahurry-A" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="YouTube">
                      <Youtube className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                    <a href="https://www.threads.com/@hotbpoison" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Threads">
                      <span className="font-bold text-[15px] text-[#45474c] group-hover:text-[#191c1d]">@</span>
                    </a>
                    <a href="https://portfolio2026feb.vercel.app" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass shadow-card flex items-center justify-center hover:shadow-float transition-all group" title="Portfolio">
                      <ExternalLink className="w-4 h-4 text-[#45474c] group-hover:text-[#191c1d]" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -left-3 w-full h-full rounded-[28px] -z-10 bg-[#edeeef]" />
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <div className="glass rounded-2xl p-7 shadow-card">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-3">{t.founder.motivationOverline}</p>
                <p className="text-[#191c1d] text-lg leading-relaxed font-light">
                  {t.founder.m1}
                </p>
              </div>
              <div className="glass rounded-2xl p-7 shadow-card space-y-4">
                <p className="text-[#191c1d] text-lg leading-relaxed font-light">
                  {t.founder.m2}
                </p>
                <p className="text-[#191c1d] text-base leading-relaxed font-light">
                  {t.founder.m3}
                </p>
              </div>
              <div
                className="rounded-2xl p-7 shadow-float relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}
              >
                <LightSweep />
                <p className="text-white/90 text-lg font-light leading-relaxed italic">
                  {t.founder.m4}
                </p>
                <p className="text-white/40 text-xs uppercase tracking-widest mt-4 font-light">— Upesh</p>
              </div>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#45474c] mb-3">{t.founder.focusOverline}</p>
                <div className="grid gap-3">
                  {t.founder.focusTags.map((p) => (
                    <div key={p} className="card-hover glass rounded-xl px-5 py-3.5 shadow-card text-[15px] text-[#191c1d] font-medium tracking-wide border border-white/60">{p}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* ── CTA ── */}
      <section
        className="relative py-32 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}
      >
        <GlowOrb size={600} color="rgba(255,255,255,0.04)" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <ArcDecor className="top-0 left-0 w-full opacity-20 [&_path]:stroke-white" />
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center text-white relative z-10"
        >
          <motion.p variants={fadeUp} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">{t.cta.overline}</motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-semibold mb-6 tracking-tight">
            {t.cta.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 text-lg font-light mb-10 leading-relaxed">
            {t.cta.desc}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/apply')}
              className="px-8 py-4 bg-white text-[#091426] font-semibold rounded-xl hover:shadow-float hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              {t.cta.btn}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/30 font-light tracking-widest mt-8 uppercase text-xs">
            {t.cta.footer}
          </motion.p>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#f3f4f5] py-10 px-6 border-t border-[rgba(9,20,38,0.06)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #091426 0%, #1e293b 100%)' }}>
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#45474c] font-medium text-sm">aiforstudents<span className="text-[#75777d]">.online</span></span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center">
            <button onClick={() => navigate('/login')} className="text-[#45474c] hover:text-[#191c1d] text-sm font-light transition-colors">
              {t.footer.operator}
            </button>
            <p className="text-[#75777d] font-light italic text-sm">
              {t.footer.quote}
            </p>
          </div>
          <p className="text-[#75777d] text-xs font-light">
            {t.footer.madeWith}{' '}
            <a href="https://portfolio2026feb.vercel.app" target="_blank" rel="noreferrer" className="text-[#45474c] hover:text-[#191c1d] transition-colors">
              Upesh
            </a>{' '}
            {t.footer.in}{' '}
            <a href="https://lamahatta.vercel.app/" target="_blank" rel="noreferrer" className="text-[#45474c] hover:text-[#191c1d] transition-colors">
              Lamahatta 🏔️
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
};
