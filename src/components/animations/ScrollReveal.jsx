import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

export const ScrollReveal = ({ children, className, direction = 'up', delay = 0, duration = 0.8 }) => {
    const directions = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { x: 60, y: 0 },
        right: { x: -60, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction], filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export const ParallaxSection = ({ children, className, speed = 0.5 }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

    return (
        <motion.div style={{ y }} className={cn(className)}>
            {children}
        </motion.div>
    );
};

export const StaggerContainer = ({ children, className, staggerDelay = 0.1 }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
                }
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};
