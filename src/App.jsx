
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, Smartphone, MapPin, ExternalLink, Moon, Sun, Download, ChevronDown } from 'lucide-react';
import { cvData } from './data/cvData';

const Section = ({ children, id, className = "" }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8 }}
    className={`min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center ${className}`}
  >
    {children}
  </motion.section>
);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen font-inter">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation / Toggle */}
      <nav className="fixed top-0 right-0 p-6 z-40 flex gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md shadow-lg hover:scale-110 transition-transform dark:bg-black/20"
        >
          {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
        </button>
      </nav>

      {/* Hero Section */}
      <Section id="hero" className="items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h2 className="text-xl md:text-2xl font-light tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            PORTFOLIO & CV
          </h2>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            LOLA <span className="text-blue-600 dark:text-blue-500">MARINA</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {cvData.personalInfo.role}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href={`mailto:${cvData.personalInfo.email}`} className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              <Mail className="w-5 h-5" /> Contáctame
            </a>
            <a href="#experience" className="flex items-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full font-bold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              Ver Experiencia
            </a>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
          >
            <ChevronDown className="w-8 h-8 text-gray-400" />
          </motion.div>
        </motion.div>
      </Section>

      {/* About Section */}
      <Section id="about">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Sobre Mí</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {cvData.personalInfo.summary}
            </p>
            <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-500" /> {cvData.personalInfo.location}
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" /> {cvData.personalInfo.email}
              </div>
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-blue-500" /> {cvData.personalInfo.phone}
              </div>
            </div>
          </div>
          {/* Placeholder for Photo/Visual */}
          <div className="order-1 md:order-2 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-3xl aspect-square rotate-3 opacity-20 blur-3xl"></div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <h3 className="text-4xl font-bold mb-16 text-center text-gray-900 dark:text-white">Experiencia</h3>
        <div className="max-w-4xl mx-auto space-y-12">
          {cvData.experience.map((exp, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.role}</h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">{exp.company}</p>
                </div>
                <span className="text-gray-500 dark:text-gray-400 font-mono mt-2 md:mt-0">{exp.period}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">{exp.description}</p>
              <ul className="grid md:grid-cols-2 gap-3">
                {exp.achievements?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <span className="text-blue-500 mt-1">▹</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills">
        <h3 className="text-4xl font-bold mb-16 text-center text-gray-900 dark:text-white">Habilidades</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cvData.skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                {skill.name.charAt(0)}
              </div>
              <div>
                <h5 className="font-bold text-gray-900 dark:text-white">{skill.name}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">{skill.level}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Education & Certs */}
      <Section id="education">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Educación</h3>
            <div className="space-y-8">
              {cvData.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-6 relative">
                  <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></span>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Certificaciones</h3>
            <div className="space-y-4">
              {cvData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{cert}</span>
                </div>
              ))}
            </div>

            <h3 className="text-3xl font-bold my-8 text-gray-900 dark:text-white">Idiomas</h3>
            <div className="flex flex-wrap gap-3">
              {cvData.languages.map((lang, index) => (
                <span key={index} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 text-sm font-semibold">
                  {lang.language} - {lang.level}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400 text-center">
        <p>© 2025 Lola Marina Jiménez. Creado con React & Tailwind.</p>
      </footer>
    </div>
  );
}

export default App;
