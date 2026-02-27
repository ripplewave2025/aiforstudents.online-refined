import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const GradientButton = ({ children, className, onClick, icon: Icon, variant = "primary" }) => {
    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25",
        secondary: "bg-white/10 border border-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
        glow: "bg-slate-950 border border-blue-500/50 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "relative overflow-hidden font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300",
                variants[variant],
                className
            )}
        >
            <span className="relative flex items-center gap-2 justify-center">
                {children}
                {Icon && <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </span>
        </motion.button>
    );
};
