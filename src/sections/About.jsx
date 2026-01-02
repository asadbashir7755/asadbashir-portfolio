import React from 'react';
import { whatIDo, profile } from '../data/profile';
import { IconRenderer } from '../components/IconRenderer';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="py-20 bg-gray-900 text-white px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-16"
                >
                    What I Do
                    <span className="block h-1 w-20 bg-green-500 mx-auto mt-4 rounded"></span>
                </motion.h2>

                {/* Profile Image & Short Bio */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0"
                    >
                        <div className="absolute inset-0 bg-green-500 rounded-full blur opacity-40 animate-pulse"></div>
                        <img
                            src={profile.imagePath}
                            alt={profile.name}
                            className="w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-2xl relative z-10"
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl font-light text-gray-300 max-w-2xl text-center md:text-left leading-relaxed italic"
                    >
                        "{profile.devOpsQuote}"
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {whatIDo.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 p-8 rounded-xl hover:translate-y-[-5px] transition-transform duration-300 border-b-4 border-transparent hover:border-green-500 shadow-lg"
                        >
                            <div className="text-4xl text-green-400 mb-6">
                                <IconRenderer iconName={item.icon} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
