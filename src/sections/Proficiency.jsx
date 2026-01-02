import React from 'react';
import { proficiency } from '../data/skills';
import { motion } from 'framer-motion';

const Proficiency = () => {
    return (
        <section className="py-20 bg-gray-900 text-white px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Proficiency
                    <span className="block h-1 w-20 bg-green-500 mx-auto mt-4 rounded"></span>
                </h2>

                <div className="space-y-8">
                    {proficiency.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between mb-2">
                                <span className="text-lg font-medium text-gray-300">{item.name}</span>
                                {/* <span className="text-sm text-gray-400">{item.value}%</span> Optional percentage */}
                            </div>
                            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.value}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                                ></motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Proficiency;
