import React, { useState, useEffect } from 'react';
import { getBlogs } from '../utils/blogUtils';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaTag, FaSearch } from 'react-icons/fa';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const loadedBlogs = getBlogs();
        setBlogs(loadedBlogs);
        setFilteredBlogs(loadedBlogs);
    }, []);

    useEffect(() => {
        let result = blogs;

        if (searchTerm) {
            result = result.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'All') {
            result = result.filter(blog => blog.category === selectedCategory);
        }

        setFilteredBlogs(result);
    }, [searchTerm, selectedCategory, blogs]);

    // Extract unique categories
    const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

    return (
        <section className="min-h-screen pt-24 pb-20 bg-gray-900 text-white px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        DevOps <span className="text-green-500">Insights</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Technical guides, tutorials, and thoughts on Cloud Native, CI/CD, and Infrastructure as Code.
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-700 placeholder-gray-500"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog, index) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700 hover:border-green-500 transition-all hover:translate-y-[-5px] group"
                        >
                            {/* Cover Image Placeholder - In real usage, you'd check if blog.image exists */}
                            <div className="h-48 bg-gray-700 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                                {/* Dynamic Pattern or Image */}
                                <div className="w-full h-full flex items-center justify-center text-gray-600 text-6xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                                    <FaTag />
                                </div>
                                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {blog.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                    <span className="flex items-center gap-1"><FaCalendarAlt /> {blog.date}</span>
                                    <span className="flex items-center gap-1"><FaClock /> {blog.readTime || "5 min read"}</span>
                                </div>

                                <h2 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors line-clamp-2">
                                    {blog.title}
                                </h2>

                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                                    {blog.description}
                                </p>

                                <Link
                                    to={`/blog/${blog.slug}`}
                                    className="inline-block w-full text-center bg-gray-700 hover:bg-green-500 text-white py-3 rounded-lg font-medium transition-all"
                                >
                                    Read Article
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredBlogs.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <h3 className="text-xl">No articles found matching your search.</h3>
                    </div>
                )}

            </div>
        </section>
    );
};

export default BlogList;
