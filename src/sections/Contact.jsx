import React from 'react';
import { profile } from '../data/profile';
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub, FaFileDownload, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-gray-900 text-white px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-gray-900 to-gray-900 z-0"></div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">
                        Get In Touch
                        <span className="block h-1 w-20 bg-green-500 mx-auto mt-4 rounded"></span>
                    </h2>

                    <p className="text-gray-400 mb-12 text-lg">
                        I'm currently looking for new opportunities as a DevOps Engineer.
                        Whether you have a question or just want to say hi, my inbox is always open!
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-16 w-full max-w-2xl mx-auto">
                        <a
                            href={`https://wa.me/${profile.contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-4 bg-gray-800 hover:bg-gray-700 px-6 py-6 rounded-xl transition-all border border-gray-700 hover:border-green-500 group shadow-lg"
                        >
                            <FaWhatsapp className="text-4xl text-green-500 group-hover:scale-110 transition-transform" />
                            <div className="text-left">
                                <div className="text-sm text-gray-400 font-medium">Chat on WhatsApp</div>
                                <div className="font-bold text-white text-lg">{profile.contact.whatsapp}</div>
                            </div>
                        </a>

                        <a
                            href={`mailto:${profile.contact.email}`}
                            className="flex-1 flex items-center justify-center gap-4 bg-gray-800 hover:bg-gray-700 px-6 py-6 rounded-xl transition-all border border-gray-700 hover:border-blue-500 group shadow-lg"
                        >
                            <FaEnvelope className="text-4xl text-blue-500 group-hover:scale-110 transition-transform" />
                            <div className="text-left">
                                <div className="text-sm text-gray-400 font-medium">Send an Email</div>
                                <div className="font-bold text-white text-lg">{profile.contact.email}</div>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Social Links Section */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold mb-8 text-gray-300">Connect on Social</h3>
                    <div className="flex justify-center gap-8 flex-wrap">
                        <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-4 rounded-full hover:bg-blue-600 hover:text-white text-blue-500 transition-all transform hover:-translate-y-1 shadow-lg border border-gray-700"><FaLinkedin size={32} /></a>
                        <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-4 rounded-full hover:bg-gray-700 hover:text-white text-gray-400 transition-all transform hover:-translate-y-1 shadow-lg border border-gray-700"><FaGithub size={32} /></a>
                        <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-4 rounded-full hover:bg-blue-400 hover:text-white text-blue-400 transition-all transform hover:-translate-y-1 shadow-lg border border-gray-700"><FaTwitter size={32} /></a>
                        <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-4 rounded-full hover:bg-pink-600 hover:text-white text-pink-500 transition-all transform hover:-translate-y-1 shadow-lg border border-gray-700"><FaInstagram size={32} /></a>
                        <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-4 rounded-full hover:bg-blue-700 hover:text-white text-blue-600 transition-all transform hover:-translate-y-1 shadow-lg border border-gray-700"><FaFacebook size={32} /></a>
                    </div>
                </div>

                {/* Resume Section integrated logic or anchor */}
                <div id="resume" className="bg-gray-800/50 p-8 rounded-2xl border border-dashed border-gray-600">
                    <h3 className="text-2xl font-bold mb-4">Check my Resume</h3>
                    <p className="text-gray-400 mb-6">For a detailed look at my professional experience and skills, download my resume or CV.</p>
                    <div className="flex justify-center gap-4">
                        <a
                            href={profile.contact.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-green-500/30"
                        >
                            <FaFileDownload />
                            Download Resume
                        </a>
                    </div>
                </div>

                <div className="mt-16 flex justify-center gap-6">
                    <a href={profile.social.github} className="text-gray-400 hover:text-white transition-colors text-2xl"><FaGithub /></a>
                    <a href={profile.social.linkedin} className="text-gray-400 hover:text-blue-500 transition-colors text-2xl"><FaLinkedin /></a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
