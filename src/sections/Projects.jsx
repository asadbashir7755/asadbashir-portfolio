import React from 'react';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { IconRenderer } from '../components/IconRenderer';
import { FaGithub, FaExternalLinkAlt, FaFolder } from 'react-icons/fa';
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

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-gray-900 text-white px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-16"
                >
                    Projects & DevOps Work
                    <span className="block h-1 w-20 bg-green-500 mx-auto mt-4 rounded"></span>
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="bg-gray-800 rounded-xl p-6 transition-all duration-300 shadow-lg border border-gray-700 hover:border-green-500/50 flex flex-col h-full group"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <FaFolder className="text-4xl text-green-500" />
                                <div className="flex gap-4">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <FaGithub size={22} />
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <FaExternalLinkAlt size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-green-400 transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-auto">
                                {project.tech.map((tech, tIdx) => (
                                    <span
                                        key={tIdx}
                                        className="text-xs font-medium text-gray-300 flex items-center gap-1 bg-gray-900/50 px-2 py-1 rounded"
                                    >
                                        <IconRenderer iconName={tech} className="text-green-500" />
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <a
                        href={profile.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium transition-all border border-gray-700 hover:border-green-500 shadow-lg hover:shadow-green-500/20 group"
                    >
                        See More Projects
                        <FaGithub className="text-xl group-hover:text-green-500 transition-colors" />
                    </a>
                </motion.div>
            </div>
        </section >
    );
};

export default Projects;
