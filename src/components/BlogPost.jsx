import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getBlogBySlug } from '../utils/blogUtils';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const foundBlog = getBlogBySlug(slug);
        if (foundBlog) {
            setBlog(foundBlog);
        } else {
            navigate('/blog'); // Redirect if not found
        }
    }, [slug, navigate]);

    if (!blog) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-900 text-gray-300 pt-24 pb-20 px-4"
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 mb-8 transition-colors">
                    <FaArrowLeft /> Back to Blogs
                </Link>

                <header className="mb-12 border-b border-gray-800 pb-12">
                    <div className="flex gap-2 mb-6">
                        <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-semibold border border-green-500/20">
                            {blog.category}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                            <FaUser className="text-gray-500" /> {blog.author}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-500" /> {blog.date}
                        </span>
                        {blog.readTime && (
                            <span className="italic">• {blog.readTime}</span>
                        )}
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg prose-invert max-w-none 
            prose-headings:text-gray-100 prose-a:text-green-500 prose-strong:text-white
            prose-blockquote:border-green-500 prose-blockquote:bg-gray-800/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
            prose-code:text-green-400 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        ">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={dracula} // Dark theme code blocks
                                        language={match[1]}
                                        PreTag="div"
                                        className="rounded-xl shadow-2xl my-8 !bg-[#282a36]"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    >
                        {blog.content}
                    </ReactMarkdown>
                </div>

                {/* Footer Tags */}
                <div className="mt-16 pt-8 border-t border-gray-800">
                    <h4 className="text-lg font-bold text-white mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {blog.tags && blog.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-2 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors cursor-default">
                                <FaTag className="text-xs text-green-500" /> {tag}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </motion.article>
    );
};

export default BlogPost;
