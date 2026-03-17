import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, Shield, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';

const roles = [
    {
        id: 'teachers',
        icon: GraduationCap,
        title: 'For Teachers',
        subtitle: 'From Lecturer to Mentor',
        color: 'blue',
        content: {
            intro: "The modern teacher is often a delivery mechanism for a curriculum someone else wrote. Gorkha Academy changes that.",
            roles: [
                { title: "Project Guide", desc: "You manage the quality and execution of student builds." },
                { title: "System Navigator", desc: "You teach students how to apply for grants, navigate university systems, and understand professional fields." },
                { title: "Portfolio Manager", desc: "You help students curate their best work into a professional presence." },
                { title: "Mentor", desc: "You provide the emotional and intellectual guidance that an algorithm cannot." },
            ],
            closing: "Because AI handles the grading of drills and the repetition of lectures, you are no longer a content repeater. You are a high-level strategist for your students' lives."
        }
    },
    {
        id: 'students',
        icon: Users,
        title: 'For Students',
        subtitle: 'You are the lead, not the audience',
        color: 'purple',
        content: {
            intro: "At Gorkha Academy, you don't sit and listen. You learn, you explain, and you build.",
            roles: [
                { title: "The Reverse Lecture", desc: "Your assessment isn't a silent exam. You lead sessions, record briefings, and prove knowledge by teaching others." },
                { title: "Build Your Future", desc: "Every module ends in an artifact. Instead of tests: grant proposals, financial models, prototypes." },
                { title: "Career Access", desc: "From day one, learn how to find scholarships, write professional communications, and understand industries." },
            ],
            closing: "This is how leaders are made."
        }
    },
    {
        id: 'parents',
        icon: Shield,
        title: 'For Parents',
        subtitle: 'A partnership, not a black box',
        color: 'emerald',
        content: {
            intro: "We believe parents should be informed supporters of their child's progress, not enforcers of homework.",
            roles: [
                { title: "Clear Visibility", desc: "See exactly what they're building, struggling with, and how their portfolio grows in real-time." },
                { title: "System Literacy", desc: "Teaching them how the world actually works—applications, finance, grants." },
                { title: "Tangible Proof", desc: "A digital portfolio that speaks louder than a GPA." },
            ],
            closing: "Gorkha Academy is designed to solve the 'what now?' problem."
        }
    }
];

const RoleTab = ({ role, active, onClick }) => (
    <motion.button
        onClick={onClick}
        className={`flex items-center gap-3 px-6 py-4 rounded-xl text-left transition-all w-full ${active
                ? 'bg-slate-800 border border-slate-700'
                : 'hover:bg-slate-900/50'
            }`}
        whileHover={{ x: active ? 0 : 5 }}
        whileTap={{ scale: 0.98 }}
    >
        <role.icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-slate-500'}`} />
        <div className="flex-1">
            <div className={`font-semibold ${active ? 'text-white' : 'text-slate-400'}`}>{role.title}</div>
            <div className="text-xs text-slate-500">{role.subtitle}</div>
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${active ? 'text-blue-400 rotate-90' : 'text-slate-600'}`} />
    </motion.button>
);

const RoleContent = ({ role }) => (
    <motion.div
        key={role.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="p-8 bg-slate-900/30 rounded-2xl border border-slate-800"
    >
        <p className="text-lg text-slate-300 mb-8 leading-relaxed">{role.content.intro}</p>

        <div className="space-y-6 mb-8">
            {role.content.roles.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-slate-400">{item.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        <p className="text-slate-300 font-medium border-t border-slate-800 pt-6">{role.content.closing}</p>
    </motion.div>
);

export const Roles = () => {
    const [activeRole, setActiveRole] = useState(roles[0]);

    return (
        <section id="roles" className="py-32 bg-slate-950 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <ScrollReveal className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4">Roles</h2>
                    <p className="text-xl text-slate-400">Everyone upgrades.</p>
                </ScrollReveal>

                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                    {/* Tab Navigation */}
                    <div className="space-y-2">
                        {roles.map((role) => (
                            <RoleTab
                                key={role.id}
                                role={role}
                                active={activeRole.id === role.id}
                                onClick={() => setActiveRole(role)}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        <RoleContent role={activeRole} />
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
