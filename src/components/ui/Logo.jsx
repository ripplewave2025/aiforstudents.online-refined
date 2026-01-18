import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Logo = ({ className, showText = true, size = 'default' }) => {
    const sizes = {
        small: { icon: 'w-8 h-8', text: 'text-xl' },
        default: { icon: 'w-10 h-10', text: 'text-2xl' },
        large: { icon: 'w-14 h-14', text: 'text-3xl' }
    };

    return (
        <div className={cn("flex items-center gap-3", className)}>
            {/* Shield/Mountain Icon representing Gorkha */}
            <motion.div
                className={cn("relative flex items-center justify-center", sizes[size].icon)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Mountain/Shield shape */}
                    <path
                        d="M20 4 L36 32 Q36 36 32 36 L8 36 Q4 36 4 32 L20 4Z"
                        className="fill-blue-600"
                    />
                    {/* Inner mountain peak */}
                    <path
                        d="M20 12 L28 28 L12 28 Z"
                        className="fill-slate-900"
                    />
                    {/* Snow cap / highlight */}
                    <path
                        d="M20 12 L23 18 L17 18 Z"
                        className="fill-white/90"
                    />
                </svg>
            </motion.div>

            {showText && (
                <div className="flex flex-col">
                    <span className={cn("font-sans font-bold text-white tracking-tight leading-none", sizes[size].text)}>
                        Gorkha
                    </span>
                    <span className="text-[10px] font-semibold text-blue-400 tracking-[0.2em] uppercase">
                        Academy
                    </span>
                </div>
            )}
        </div>
    );
};
