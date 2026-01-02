import React from 'react';
import { FaLinux, FaAws, FaDocker, FaJenkins, FaReact, FaNodeJs, FaGithub, FaTerminal, FaClock, FaInfinity, FaLaptopCode, FaServer, FaCogs, FaCloud } from 'react-icons/fa';
import { SiAnsible, SiExpress, SiMongodb, SiGnubash, SiNginx, SiPostman, SiKubernetes } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { IoLogoJavascript } from "react-icons/io5";

const iconMap = {
    // Map string names to components
    FaLinux,
    FaAws,
    FaDocker,
    FaJenkins,
    FaReact,
    FaNodeJs,
    FaGithub,
    FaTerminal,
    FaClock,
    FaInfinity,
    SiAnsible,
    FaAnsible: SiAnsible, // Mapping FaAnsible to SiAnsible just in case
    IoLogoJavascript,
    SiJavascript: IoLogoJavascript,
    SiExpress,
    SiMongodb,
    SiGnubash,
    SiNginx,
    SiPostman,
    VscVscode,

    // Generic icons for "What I Do" section if needed
    FaLaptopCode,
    FaServer,
    FaCogs,
    FaCloud,

    // Aliases for data files
    "Linux": FaLinux,
    "AWS": FaAws,
    "Docker": FaDocker,
    "Jenkins": FaJenkins,
    "React": FaReact,
    "Node.js": FaNodeJs,
    "GitHub": FaGithub,
    "Ansible": SiAnsible,
    "JavaScript": IoLogoJavascript,
    "Express": SiExpress,
    "MongoDB": SiMongodb,
    "Bash": SiGnubash,
    "Nginx": SiNginx,
    "Postman": SiPostman,
    "VS Code": VscVscode,
    "Terminal": FaTerminal,
    "SSH": FaTerminal,
    "Cron": FaClock,
    "CI/CD": FaInfinity,
    "Kubernetes": SiKubernetes,
    "EC2": FaAws, // Fallback
};

export const IconRenderer = ({ iconName, className }) => {
    const Icon = iconMap[iconName];
    if (!Icon) {
        console.warn(`Icon "${iconName}" not found in IconRenderer.`);
        return null;
    }
    return <Icon className={className} />;
};
