import React from 'react';
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const TextReveal = ({ text, className, delay = 0 }) => {
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i + delay },
        }),
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
            clipPath: "inset(0 0 100% 0)"
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn("flex flex-wrap", className)}
        >
            {words.map((word, index) => (
                <motion.span variants={child} key={index} className="mr-[0.25em] inline-block">
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};
