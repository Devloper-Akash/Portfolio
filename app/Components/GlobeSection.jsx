'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const KOLKATA_LAT = 22.5726;
const KOLKATA_LNG = 88.3639;

// Multiple markers - Kolkata + major tech hubs
const markerData = [
  { lat: KOLKATA_LAT, lng: KOLKATA_LNG, label: '🏠 Kolkata — Home Base', size: 1.2, color: '#f59e0b' },
  { lat: 37.7749, lng: -122.4194, label: 'San Francisco', size: 0.4, color: '#38bdf8' },
  { lat: 51.5074, lng: -0.1278, label: 'London', size: 0.4, color: '#38bdf8' },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo', size: 0.4, color: '#38bdf8' },
  { lat: -33.8688, lng: 151.2093, label: 'Sydney', size: 0.4, color: '#38bdf8' },
  { lat: 1.3521, lng: 103.8198, label: 'Singapore', size: 0.4, color: '#38bdf8' },
  { lat: 55.7558, lng: 37.6173, label: 'Moscow', size: 0.4, color: '#38bdf8' },
  { lat: 48.8566, lng: 2.3522, label: 'Paris', size: 0.4, color: '#38bdf8' },
  { lat: 25.2048, lng: 55.2708, label: 'Dubai', size: 0.4, color: '#38bdf8' },
  { lat: 19.076, lng: 72.8777, label: 'Mumbai', size: 0.35, color: '#a78bfa' },
  { lat: 28.6139, lng: 77.209, label: 'Delhi', size: 0.35, color: '#a78bfa' },
  { lat: 12.9716, lng: 77.5946, label: 'Bangalore', size: 0.35, color: '#a78bfa' },
];

// Animated arcs radiating from Kolkata to global cities
const arcData = [
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 37.7749, endLng: -122.4194, color: ['#f59e0b', '#38bdf8'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 51.5074, endLng: -0.1278, color: ['#f59e0b', '#6366f1'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 35.6762, endLng: 139.6503, color: ['#f59e0b', '#38bdf8'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: -33.8688, endLng: 151.2093, color: ['#f59e0b', '#a78bfa'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 1.3521, endLng: 103.8198, color: ['#f59e0b', '#38bdf8'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 55.7558, endLng: 37.6173, color: ['#f59e0b', '#6366f1'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 48.8566, endLng: 2.3522, color: ['#f59e0b', '#a78bfa'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 25.2048, endLng: 55.2708, color: ['#f59e0b', '#38bdf8'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 40.7128, endLng: -74.006, color: ['#f59e0b', '#6366f1'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 19.076, endLng: 72.8777, color: ['#f59e0b', '#a78bfa'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 28.6139, endLng: 77.209, color: ['#f59e0b', '#a78bfa'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 12.9716, endLng: 77.5946, color: ['#f59e0b', '#a78bfa'] },
];

// Multiple pulsing rings from Kolkata
const ringData = [
  { lat: KOLKATA_LAT, lng: KOLKATA_LNG, maxR: 6, propagationSpeed: 2, repeatPeriod: 800 },
  { lat: KOLKATA_LAT, lng: KOLKATA_LNG, maxR: 10, propagationSpeed: 4, repeatPeriod: 1500 },
];

export default function GlobeSection({ isDarkMode }) {
  const globeRef = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Poll until the globe ref is ready (it renders async via dynamic import)
    const interval = setInterval(() => {
      if (globeRef.current) {
        clearInterval(interval);

        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.0;
          controls.enableZoom = true;
          controls.minDistance = 200;
          controls.maxDistance = 500;
        }

        globeRef.current.pointOfView(
          { lat: KOLKATA_LAT, lng: KOLKATA_LNG, altitude: 2.5 },
          2000
        );
      }
    }, 200);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div id="location" className="w-full px-[12%] py-20 scroll-mt-20 relative">

      {/* Ambient particles behind the globe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {[
          { top: "15%", left: "8%", dur: 7 }, { top: "75%", left: "88%", dur: 5 },
          { top: "25%", left: "82%", dur: 6 }, { top: "55%", left: "12%", dur: 8 },
          { top: "85%", left: "25%", dur: 9 }, { top: "35%", left: "65%", dur: 7 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 dark:bg-sky-400/20 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        My Location
      </motion.h4>

      <h2 className="text-center mb-6 text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">
        {"Based In Kolkata".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.05 + 0.1, ease: "easeOut" }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </h2>

      <p className="text-center max-w-2xl mx-auto mb-12 font-Ovo text-gray-600 dark:text-gray-400">
        Drag to explore the interactive 3D globe — arcs radiate from Kolkata to major cities worldwide.
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}
        className="relative w-full max-w-[620px] aspect-square mx-auto flex items-center justify-center rounded-[2.5rem] backdrop-blur-xl bg-gradient-to-br from-white/40 via-white/20 to-white/40 dark:from-white/5 dark:via-transparent dark:to-white/5 border border-gray-200/50 dark:border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_0_100px_rgba(56,189,248,0.06)] overflow-hidden hover:shadow-[0_30px_90px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_0_120px_rgba(56,189,248,0.2)] transition-shadow duration-700"
      >
        {/* Subtle animated border glow */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-sky-500/10 dark:from-sky-400/10 dark:via-indigo-500/10 dark:to-blue-600/10 animate-pulse pointer-events-none"></div>

        <Globe
          ref={globeRef}
          width={580}
          height={580}
          backgroundColor="rgba(0,0,0,0)"
          
          // Earth textures
          globeImageUrl={isDarkMode
            ? '//unpkg.com/three-globe/example/img/earth-night.jpg'
            : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
          }
          bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
          
          // Clouds layer for extra realism
          cloudsImageUrl='//unpkg.com/three-globe/example/img/earth-clouds.png'
          cloudsAltitude={0.02}
          cloudsRotate={true}
          cloudsOpacity={0.4}
          
          // Atmosphere
          atmosphereColor={isDarkMode ? '#38bdf8' : '#6366f1'}
          atmosphereAltitude={0.22}

          // Glowing points
          pointsData={markerData}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.02}
          pointRadius="size"
          pointLabel="label"

          // Animated arcs
          arcsData={arcData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={1500}
          arcStroke={0.6}
          arcAltitudeAutoScale={0.4}

          // Pulsing rings
          ringsData={ringData}
          ringColor={() => isDarkMode ? '#38bdf8' : '#6366f1'}
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"

          animateIn={true}
          rendererConfig={{ antialias: true, alpha: true }}
        />

        {/* Location badge */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/85 dark:bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-gray-200 dark:border-white/20 shadow-lg pointer-events-none z-10">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 dark:bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <p className="text-sm sm:text-base font-bold text-gray-800 dark:text-white tracking-wide">
            📍 Kolkata, West Bengal
          </p>
        </div>
      </motion.div>
    </div>
  );
}
