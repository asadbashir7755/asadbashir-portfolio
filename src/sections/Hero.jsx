import React from 'react';
import { profile } from '../data/profile';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp, FaFileDownload, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Hero = () => {
    // Letters for typewriter effect
    const sentence = profile.subHeading.split("");

    return (
        <section className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
            <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                {/* Left Content */}
                <div className="flex-1 text-center md:text-left space-y-6">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center md:justify-start gap-4 mb-4"
                    >
                        <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-2xl"><FaGithub /></a>
                        <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors text-2xl"><FaLinkedin /></a>
                        <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors text-2xl"><FaFacebook /></a>
                        <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors text-2xl"><FaInstagram /></a>
                        <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors text-2xl"><FaTwitter /></a>
                    </motion.div>

                    {/* Typewriter Effect Title */}
                    <div className="text-4xl md:text-6xl font-bold h-[3rem] md:h-[4.5rem] flex items-center justify-center md:justify-start overflow-hidden">
                        {sentence.map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.05, delay: index * 0.1 }}
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="text-green-500 ml-1"
                        >|</motion.span>
                    </div>

                    <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
                        {profile.role}
                    </h2>

                    {/* Quote */}
                    <motion.blockquote
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.5, duration: 0.8 }}
                        className="border-l-4 border-green-500 pl-4 italic text-gray-400 max-w-lg mx-auto md:mx-0 text-lg leading-relaxed bg-gray-800/30 p-2 rounded-r-lg"
                    >
                        {profile.devOpsQuote}
                    </motion.blockquote>

                    <p className="text-gray-400 max-w-lg mx-auto md:mx-0 text-lg leading-relaxed">
                        {profile.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                        <a
                            href={`https://wa.me/${profile.contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20"
                        >
                            <FaWhatsapp size={20} />
                            {profile.contact.whatsapp}
                        </a>

                        <a
                            href={profile.contact.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium flex items-center justify-center gap-2 transition-all border border-gray-600"
                        >
                            <FaFileDownload size={20} />
                            Download Resume
                        </a>
                    </div>

                </div>

                {/* Right Content - Illustration */}
                <div className="flex-1 w-full flex justify-center relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-full max-w-lg"
                    >
                        <img
                            src="/devops-hero.png"
                            alt="DevOps Illustration"
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </motion.div>
                    {/* Background Glow Effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-green-500/20 blur-[100px] rounded-full z-0"></div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
