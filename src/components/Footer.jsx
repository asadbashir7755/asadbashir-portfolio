import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black py-8 text-center text-gray-500 text-sm border-t border-gray-800">
            <p>Built with React & Tailwind — DevOps focused.</p>
            <p className="mt-2 text-xs text-gray-700">© {new Date().getFullYear()} Asad Bashir. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
