import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Proficiency from '../sections/Proficiency';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Achievements from '../sections/Achievements';
import BlogPreview from '../sections/BlogPreview';
import Contact from '../sections/Contact';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Skills />
            <Proficiency />
            <Experience />
            <Projects />
            <Achievements />
            <BlogPreview />
            <Contact />
        </>
    );
};

export default Home;
