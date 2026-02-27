import React from 'react';
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const FadeIn = ({ children, delay = 0, className, direction = "up" }) => {
    const directions = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { x: 30, y: 0 },
        right: { x: -30, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...directions[direction] }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};
