import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Only scroll logic if on home page
    const isHome = location.pathname === '/';

    const simpleLinks = [
        { name: "Skills", href: "#skills" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Achievements", href: "#achievements" },
        { name: "Resume", href: "#resume" },
        { name: "Contact", href: "#contact" },
    ];

    const NavLink = ({ name, href, isRouterLink }) => {
        const baseClass = "hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 cursor-pointer block";

        if (isRouterLink) {
            return (
                <Link to={href} className={baseClass} onClick={() => setIsOpen(false)}>
                    {name}
                </Link>
            );
        }

        // If we are NOT on home page, hash links should redirect to home first
        const finalHref = isHome ? href : `/${href}`;

        return (
            <a href={finalHref} className={baseClass} onClick={() => setIsOpen(false)}>
                {name}
            </a>
        );
    };

    return (
        <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm text-white shadow-lg z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 font-bold text-2xl tracking-wider text-green-400 font-mono">
                        &lt;Asad /&gt;
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <NavLink name="Blog" href="/blog" isRouterLink={true} />
                            {simpleLinks.map((link) => (
                                <NavLink key={link.name} name={link.name} href={link.href} />
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-900 border-t border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink name="Blog" href="/blog" isRouterLink={true} />
                        {simpleLinks.map((link) => (
                            <NavLink key={link.name} name={link.name} href={link.href} />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
