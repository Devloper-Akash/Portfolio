import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark
};

export const workData = [
    {
        title: 'Frontend Project',
        description: 'Web Design & React Architecture',
        bgImage: '/work-1.png',
        longDescription: 'This comprehensive frontend project showcases modern web design principles. It incorporates cutting and clean aesthetic visuals with an emphasis on responsive design, ensuring a seamless experience across all devices. Built with performance in mind using React and Tailwind CSS.',
        role: 'Frontend Engineer & UI Designer',
        timeline: '3 Months',
        problemStatement: 'Modern web applications often suffer from cluttered interfaces, inconsistent design systems, and sluggish mobile responsiveness, leading to high bounce rates.',
        solution: 'Engineered a component-driven atomic design system in React with Tailwind CSS, guaranteeing sub-second load times, smooth micro-interactions, and 100% responsive fluid layouts.',
        uxProcess: 'Conducted competitive heuristic evaluations, established 8pt grid token spacing, implemented accessible WCAG 2.1 AA color contrast, and crafted intuitive navigation paradigms.',
        keyFeatures: [
            'Atomic Component Architecture with React & Tailwind',
            'Sub-second page load times with zero Cumulative Layout Shift',
            'Fluid responsive design across mobile (375px) to 4K displays',
            'Dynamic theme switching with persistent local storage',
            'Framer Motion smooth scroll animations and state transitions'
        ],
        techStack: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'JavaScript ES6+'],
        metrics: [
            { label: 'LIGHTHOUSE SCORE', val: '98 / 100' },
            { label: 'LOAD LATENCY', val: '0.8s' },
            { label: 'RESPONSIVE BREAKPOINTS', val: '4 Breakpoints' },
            { label: 'ACCESSIBILITY', val: 'WCAG AA Compliant' }
        ],
        liveUrl: 'https://github.com/Devloper-Akash',
        githubUrl: 'https://github.com/Devloper-Akash'
    },
    {
        title: 'Geo Based App',
        description: 'Mobile App & Geospatial Tracking',
        bgImage: '/work-2.png',
        longDescription: 'A dynamic geolocation-based application that offers real-time location tracking and mapping services. Designed with a mobile-first approach, it features smooth interactive maps, custom markers, and location-based notifications to keep users engaged and informed on the go.',
        role: 'Full Stack & Mobile Developer',
        timeline: '4 Months',
        problemStatement: 'Field tracking and geo-tagging systems frequently struggle with battery drain, inaccurate location pings in low-signal areas, and complex multi-step map interfaces.',
        solution: 'Built a lightweight geospatial tracking web app with Leaflet and GPS APIs, optimizing location polling intervals and presenting data through intuitive radar sweeps and custom color-coded map markers.',
        uxProcess: 'Designed thumb-friendly bottom sheets for one-handed mobile use, high-contrast outdoor visibility map layers, and minimal taps to broadcast coordinates.',
        keyFeatures: [
            'Real-time GPS coordinate triangulation with auto-smoothing',
            'Interactive vector map with dynamic clustered radius markers',
            'Low battery consumption background polling algorithm',
            'Offline caching for route waypoints and previously loaded tiles',
            'Instant location dispatch & sharing with encrypted links'
        ],
        techStack: ['React', 'Leaflet / OpenStreetMap', 'Geolocation Web API', 'Node.js', 'Express', 'MongoDB'],
        metrics: [
            { label: 'GPS ACCURACY', val: '< 5 meters' },
            { label: 'PING LATENCY', val: '45ms' },
            { label: 'MOBILE OPTIMIZATION', val: '100% PWA Ready' },
            { label: 'BATTERY EFFICIENCY', val: '+35% Optimized' }
        ],
        liveUrl: 'https://github.com/Devloper-Akash',
        githubUrl: 'https://github.com/Devloper-Akash'
    },
    {
        title: 'ScriptBridge AI',
        subtitle: 'AI-Powered Regional OCR & Multilingual Translation Engine',
        description: 'AI OCR & Regional Translation',
        bgImage: '/scriptbridge-live.png',
        longDescription: 'An advanced AI-powered OCR and regional language translation platform built to extract, preserve, translate, and digitize handwritten or printed text from historical manuscripts, archives, signboards, and documents across 55+ languages powered by Google Gemini AI and Tesseract.',
        role: 'Creator & Full Stack AI Developer',
        timeline: '2024 - 2025',
        problemStatement: 'Historical archives, handwritten regional notes, and cultural Indian language scripts are rapidly decaying. Existing commercial OCR solutions struggle with non-Latin scripts, complex handwritten ligatures, low-contrast scans, and lack seamless real-time translation pipelines.',
        solution: 'Architected ScriptBridge AI — a full-stack platform integrating React, Tailwind CSS, Node.js/Express, Python Flask microservices, and Google Gemini AI. Engineered intelligent image enhancement (noise removal, contrast, auto-crop), robust OCR script extraction, neural cross-lingual translation, and real-time audio playback via Web Speech API.',
        uxProcess: 'Designed an intuitive glassmorphic workstation featuring drag-and-drop batch upload, side-by-side comparative inspection between raw input and parsed text, confidence metric meters, instant language switcher, and export controls for PDF, TXT, and DOCX formats.',
        keyFeatures: [
            '🧠 Intelligent OCR Extraction: Transcribes handwritten, printed, and mixed scripts with confidence scoring',
            '🌐 55+ Supported Languages: Full recognition for Bengali, Hindi, Tamil, Telugu, Marathi, Urdu, English & more',
            '✨ AI Image Enhancement: Automatic noise removal, contrast enhancement, and auto-cropping before processing',
            '🔤 Real-Time Cross-Translation: Neural multilingual translation powered by Google Gemini AI',
            '🔊 Text-to-Speech Accessibility: Instant voice playback of translated regional scripts via Web Speech API',
            '📥 Multi-Format Export: Seamless one-click download as PDF, TXT, DOCX, plus clipboard copy and history archive'
        ],
        techStack: [
            'React.js',
            'Node.js',
            'Express.js',
            'Google Gemini AI',
            'Python',
            'Flask',
            'Tesseract OCR',
            'Tailwind CSS',
            'MongoDB',
            'Web Speech API'
        ],
        metrics: [
            { label: 'LANGUAGES SUPPORTED', val: '55+ Languages' },
            { label: 'OCR ACCURACY', val: '99% Precision' },
            { label: 'AVG PROCESSING SPEED', val: '< 5 Seconds' },
            { label: 'AI ENGINE', val: 'Google Gemini' }
        ],
        liveUrl: 'https://scriptbridge-ai.vercel.app',
        githubUrl: 'https://github.com/Devloper-Akash/ScriptBridge-AI---OCR-Translation'
    },
    {
        title: 'ProResume',
        subtitle: 'Modern Feature-Rich Resume Builder Web App',
        description: 'ATS Resume Builder & Supabase',
        bgImage: '/proresume-live.png',
        longDescription: 'A modern, feature-rich resume builder web application built with React + Vite and powered by Supabase authentication. Engineered with a responsive dual-pane editing interface, instant reactive live preview, 5 professional ATS-optimized templates, and one-click high-resolution PDF export.',
        role: 'Creator & Full Stack Developer',
        timeline: '2024 - 2025',
        problemStatement: 'Most online resume builders lock fundamental features behind expensive recurring subscriptions, have clunky multi-step forms that lack immediate visual feedback, and generate formats that break automated Applicant Tracking Systems (ATS).',
        solution: 'Engineered ProResume — a seamless React + Vite web application integrating Supabase for cloud auth and data storage, providing instant real-time live preview, 5 hand-crafted layout templates, customizable typography, and client-side vector PDF generation using jsPDF and html2canvas.',
        uxProcess: 'Designed an intuitive dual-pane workspace: an interactive template selector carousel at the top (Modern, Minimal, Corporate, Creative, Compact), collapsible form modules on the left, and a pixel-perfect live preview canvas on the right with dark/light mode accents.',
        keyFeatures: [
            '🎨 Multiple Resume Templates: Modern, Minimal, Corporate, Creative, and Compact',
            '📝 Live Real-Time Preview: Instant reactive canvas updates as you type',
            '📥 High-Resolution PDF Download: One-click export powered by jsPDF and html2canvas',
            '🔐 Secure Supabase Authentication: Email sign-in/sign-up and cloud resume management',
            '⚙️ Customizable Design Settings: Dynamic font, color palette, and layout controls',
            '⚡ Lightning-Fast Performance: Bundled with Vite and animated with Framer Motion'
        ],
        techStack: [
            'React.js',
            'Vite',
            'Supabase',
            'Tailwind CSS',
            '@supabase/supabase-js',
            'Framer Motion',
            'jsPDF',
            'html2canvas',
            'Lucide Icons'
        ],
        metrics: [
            { label: 'TEMPLATES AVAILABLE', val: '5 Pro Layouts' },
            { label: 'REAL-TIME SYNC', val: '< 10ms Latency' },
            { label: 'DATABASE & AUTH', val: 'Supabase Cloud' },
            { label: 'PDF EXPORT', val: 'One-Click Download' }
        ],
        liveUrl: 'https://pro-resume-8ag5.vercel.app',
        githubUrl: 'https://github.com/Devloper-Akash/ProResume'
    },
]

export const serviceData = [
    { icon: assets.web_icon, title: 'Web design', description: 'Web development is the process of building, programming...', link: '' },
    { icon: assets.mobile_icon, title: 'Mobile app', description: 'Mobile app development involves creating software for mobile devices...', link: '' },
    { icon: assets.ui_icon, title: 'UI/UX design', description: 'UI/UX design focuses on creating a seamless user experience...', link: '' },
    { icon: assets.graphics_icon, title: 'Graphics design', description: 'Creative design solutions to enhance visual communication...', link: '' },
]

export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Languages', description: 'HTML, CSS, JavaScript React Js, Next Js' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: 'Masters Of Computer Application' },
    { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: 'Projects', description: 'Built more than 5 projects' }
];

export const toolsData = [
    assets.vscode, assets.firebase, assets.mongodb, assets.figma, assets.git
];

export const certificateData = [
    {
        title: 'WebRush — 6-Hour Frontend Hackathon',
        subtitle: 'Certificate of Participation',
        issuer: 'Frontend Arena (Unstop)',
        organization: 'Techno India University',
        recipient: 'Akash Halder',
        image: '/webrush-hackathon-certificate.png',
        pdfUrl: '/webrush-hackathon.pdf',
        date: '2026',
        credentialId: 'WEBRUSH-FRONTEND-2026',
        scope: 'Rapid Frontend Engineering & UI/UX Under Constraints',
        description: 'Awarded Certificate of Participation to Akash Halder representing Techno India University in the WebRush 6-Hour Frontend Hackathon, organized by Frontend Arena and hosted on the Unstop platform.',
        personalNote: 'A high-octane 6-hour hackathon that tested rapid UI prototyping, responsive web design, and sub-second frontend performance. Successfully architected and deployed a clean, responsive, and accessible web interface under intense competitive time limits.',
        competencies: [
            'Rapid UI/UX Prototyping & Layout Execution',
            'Modern Responsive Design & CSS Architecture',
            'Component-Driven Development Under Strict Deadlines',
            'Cross-Browser Consistency & Interactive Web Design',
            'Performance Optimization & Accessible Web Interfaces',
            'Competitive Frontend Problem Solving'
        ]
    },
    {
        title: 'Full Stack Web Development (Delta)',
        subtitle: 'Comprehensive Course Certification',
        issuer: 'Apna College',
        organization: 'Apna College',
        image: '/apna-college-certificate.png',
        date: '2024',
        credentialId: '2024-DELTA-MERN',
        scope: 'Fullstack JavaScript / MERN Architecture',
        description: 'Successfully completed the comprehensive Delta course on Full Stack Web Development. Gained deep proficiency in modern web technologies including HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.',
        personalNote: 'Established the foundational core of full-stack engineering, mastering end-to-end product development, REST API design, state management, and production database integration.',
        competencies: [
            'Full Stack Web Development Architecture',
            'HTML5, CSS3, ES6+ JavaScript',
            'React.js Component Ecosystem',
            'Node.js & Express RESTful APIs',
            'MongoDB Database & Mongoose ODM',
            'Production Deployment & Authentication'
        ]
    }
];

export const experienceData = [
    {
        role: 'Web Development Intern',
        company: '3Skill Training',
        companyFull: '3SKILL EDTECH PVT. LTD., Odisha, India',
        duration: '2 Months Internship',
        type: 'Internship',
        certificateId: 'ID-INTERN260789',
        certificateImage: '/3skill-internship-certificate.jpg',
        programFocus: 'Practical skills, project-based learning, and professional development aligned with industry expectations.',
        coreDeliverable: 'Make Fullstack Website in this Internship — Architected, developed, and deployed a complete, production-ready Full-Stack Web Application.',
        signatories: [
            { name: 'Satyajit Swain', title: 'Founder & CEO' },
            { name: 'Adil Quadri', title: 'Co-Founder & COO' }
        ],
        accreditations: [
            'DPIIT #startupindia',
            'ISO 9001:2015 Quality Management System',
            'MSME Registered Enterprise'
        ],
        description: 'Completed an intensive 2-month professional Web Development Internship at 3Skill Training. Focused on practical hands-on software engineering, industry-standard development workflows, and successfully engineered a full-stack website from concept to deployment.',
        achievements: [
            'Built a complete end-to-end Full-Stack Website during the internship, integrating frontend UI with backend web services.',
            'Engineered modular, reusable React components and fluid responsive layouts optimized across mobile and desktop breakpoints.',
            'Developed RESTful API routes handling structured JSON request/response pipelines, authentication, and CRUD data workflows.',
            'Structured database models with validation and seamless client-side state synchronisation.',
            'Collaborated within an agile project-based learning environment adhering to clean code standards and industry best practices.'
        ],
        techStack: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'JavaScript (ES6+)', 'Tailwind CSS / CSS3', 'Git & GitHub', 'Full Stack Architecture']
    }
];