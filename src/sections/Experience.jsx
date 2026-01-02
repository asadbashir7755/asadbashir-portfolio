import React from 'react';
import { experience } from '../data/experience';
import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-gray-800 text-white px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-16"
                >
                    Experience
                    <span className="block h-1 w-20 bg-green-500 mx-auto mt-4 rounded"></span>
                </motion.h2>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-gray-600 before:to-transparent md:before:mx-auto md:before:translate-x-0">
                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                        >
                            {/* Icon/Dot on Timeline */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 bg-gray-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow shadow-green-500/20 group-hover:shadow-green-500/50 transition-shadow duration-300">
                                <div className="w-3 h-3 bg-green-500 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                            </div>

                            {/* Content Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{job.role}</h3>
                                        <h4 className="text-lg text-green-400 font-medium">{job.company}</h4>
                                    </div>
                                    <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full mt-2 sm:mt-0">
                                        {job.duration}
                                    </span>
                                </div>

                                <p className="text-gray-300 mb-4 italic">
                                    {job.description}
                                </p>

                                <ul className="space-y-2">
                                    {job.tasks.map((task, tIdx) => (
                                        <li key={tIdx} className="flex items-start text-gray-400 text-sm">
                                            <span className="mr-2 text-green-500">▹</span>
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
