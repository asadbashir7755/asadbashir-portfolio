import React from 'react';
import { skills } from '../data/skills';
import { IconRenderer } from '../components/IconRenderer';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-gray-800 text-white px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-16"
                >
                    Skills
                    <span className="block h-1 w-20 bg-green-500 mx-auto mt-4 rounded"></span>
                </motion.h2>

                <div className="space-y-16">
                    {skills.map((category, idx) => (
                        <div key={idx}>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-2xl font-semibold mb-8 text-center text-gray-300"
                            >
                                {category.category}
                            </motion.h3>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-wrap justify-center gap-8"
                            >
                                {category.items.map((skill, sIdx) => (
                                    <motion.div
                                        key={sIdx}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="flex flex-col items-center gap-3 p-4 bg-gray-900/50 rounded-lg min-w-[120px] hover:bg-gray-700 transition-colors shadow-lg border border-transparent hover:border-green-500/30 group"
                                    >
                                        <div className="text-4xl text-gray-400 transition-colors">
                                            <IconRenderer iconName={skill.icon} className="transition-colors duration-300 group-hover:text-green-400" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
