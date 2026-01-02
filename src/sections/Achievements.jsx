import React from 'react';
import { achievements } from '../data/achievements';
import { FaAward } from 'react-icons/fa';

const Achievements = () => {
    return (
        <section id="achievements" className="py-20 bg-gray-800 text-white px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Achievements
                    <span className="block h-1 w-20 bg-green-500 mx-auto mt-4 rounded"></span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 p-6 rounded-lg border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-green-500/10 p-3 rounded-full text-green-500">
                                    <FaAward size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
