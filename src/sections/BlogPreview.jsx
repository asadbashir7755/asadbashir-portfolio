import React, { useEffect, useState } from 'react';
import { getBlogs } from '../utils/blogUtils';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTag, FaArrowRight } from 'react-icons/fa';

const BlogPreview = () => {
    const [latestBlogs, setLatestBlogs] = useState([]);

    useEffect(() => {
        // Fetch all blogs
        const allBlogs = getBlogs();
        // Since getBlogs sorts by date, we just take the first 3
        setLatestBlogs(allBlogs.slice(0, 3));
    }, []);

    // Only render if we have blogs
    if (latestBlogs.length === 0) return null;

    return (
        <section id="blog" className="py-20 bg-gray-800 text-white px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Latest <span className="text-green-500">Articles</span>
                    </h2>
                    <span className="block h-1 w-20 bg-green-500 mx-auto rounded"></span>
                    <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                        Thoughts, tutorials, and insights on DevOps, Cloud, and Automation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {latestBlogs.map((blog, index) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-green-500 transition-all hover:translate-y-[-5px] group flex flex-col h-full"
                        >
                            {/* Cover Image */}
                            <div className="h-48 bg-gray-800 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                {blog.image ? (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-6xl opacity-20">
                                        <FaTag />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                                    {blog.category}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                    <span className="flex items-center gap-1"><FaCalendarAlt /> {blog.date}</span>
                                    <span className="flex items-center gap-1"><FaClock /> {blog.readTime || "5 min read"}</span>
                                </div>

                                <Link to={`/blog/${blog.slug}`}>
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                </Link>

                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                                    {blog.description}
                                </p>

                                <Link
                                    to={`/blog/${blog.slug}`}
                                    className="inline-flex items-center gap-2 text-green-500 hover:text-white font-medium transition-colors mt-auto"
                                >
                                    Read Article <FaArrowRight className="text-xs" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 hover:bg-gray-700 text-white rounded-full font-medium transition-all border border-gray-700 hover:border-green-500 shadow-lg hover:shadow-green-500/20 group"
                    >
                        View All Articles
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
