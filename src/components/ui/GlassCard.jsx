import React from 'react';
import { cn } from '../../lib/utils';

export const GlassCard = ({ children, className, hoverEffect = true }) => {
    return (
        <div className={cn(
            "bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden",
            hoverEffect && "hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 group",
            className
        )}>
            {/* Subtle shine effect on hover */}
            {hoverEffect && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
