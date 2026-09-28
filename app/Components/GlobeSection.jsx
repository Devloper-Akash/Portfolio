'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const KOLKATA_LAT = 22.5726;
const KOLKATA_LNG = 88.3639;

// Global tech hub nodes
const markerData = [
  { lat: KOLKATA_LAT, lng: KOLKATA_LNG, label: '🏠 Kolkata — Home Base', size: 1.4, color: '#10b981' },
  { lat: 37.7749, lng: -122.4194, label: 'San Francisco (US-West)', size: 0.5, color: '#06b6d4' },
  { lat: 51.5074, lng: -0.1278, label: 'London (EU-West)', size: 0.5, color: '#06b6d4' },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo (AP-Northeast)', size: 0.5, color: '#06b6d4' },
  { lat: -33.8688, lng: 151.2093, label: 'Sydney (AP-Southeast)', size: 0.5, color: '#06b6d4' },
  { lat: 1.3521, lng: 103.8198, label: 'Singapore (AP-South)', size: 0.5, color: '#06b6d4' },
  { lat: 55.7558, lng: 37.6173, label: 'Moscow', size: 0.4, color: '#6366f1' },
  { lat: 48.8566, lng: 2.3522, label: 'Paris (EU-Central)', size: 0.5, color: '#06b6d4' },
  { lat: 25.2048, lng: 55.2708, label: 'Dubai (ME-Central)', size: 0.5, color: '#06b6d4' },
  { lat: 19.076, lng: 72.8777, label: 'Mumbai (IN-West)', size: 0.4, color: '#10b981' },
  { lat: 28.6139, lng: 77.209, label: 'Delhi (IN-North)', size: 0.4, color: '#10b981' },
  { lat: 12.9716, lng: 77.5946, label: 'Bangalore (IN-South)', size: 0.4, color: '#10b981' },
];

// Telemetry network arcs from Kolkata
const arcData = [
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 37.7749, endLng: -122.4194, color: ['#10b981', '#06b6d4'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 51.5074, endLng: -0.1278, color: ['#10b981', '#6366f1'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 35.6762, endLng: 139.6503, color: ['#10b981', '#06b6d4'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: -33.8688, endLng: 151.2093, color: ['#10b981', '#8b5cf6'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 1.3521, endLng: 103.8198, color: ['#10b981', '#06b6d4'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 48.8566, endLng: 2.3522, color: ['#10b981', '#6366f1'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 25.2048, endLng: 55.2708, color: ['#10b981', '#06b6d4'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 19.076, endLng: 72.8777, color: ['#10b981', '#10b981'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 28.6139, endLng: 77.209, color: ['#10b981', '#10b981'] },
  { startLat: KOLKATA_LAT, startLng: KOLKATA_LNG, endLat: 12.9716, endLng: 77.5946, color: ['#10b981', '#10b981'] },
];

const emptySubscribe = () => () => {};

export default function GlobeSection() {
  const globeRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  // Hydration-safe mount detection without cascading render state
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    const updateTheme = () => setIsDarkMode(document.documentElement.dataset.theme !== 'light');
    updateTheme();
    window.addEventListener('portfolio-theme-change', updateTheme);
    return () => window.removeEventListener('portfolio-theme-change', updateTheme);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      if (globeRef.current) {
        clearInterval(interval);
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.8;
          controls.enableZoom = false;
        }

        globeRef.current.pointOfView(
          { lat: KOLKATA_LAT, lng: KOLKATA_LNG, altitude: 2.3 },
          1500
        );
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="w-full py-20 min-h-[500px] flex items-center justify-center">
        <div className="font-mono text-xs text-slate-500 animate-pulse">Initializing 3D Globe Telemetry...</div>
      </div>
    );
  }

  return (
    <section id="location" className="w-full px-[8%] sm:px-[12%] py-20 scroll-mt-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 mb-3 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            GLOBAL DATA NODES & DEPLOYMENTS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Global Availability & Hub
          </motion.h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans">
            Operating from Kolkata, India with low-latency communication channels connecting worldwide cloud infrastructure.
          </p>
        </div>

        {/* 3D Globe & Telemetry Panel Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0d1117]/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-slate-200/50 dark:shadow-black/40 relative overflow-hidden flex flex-col lg:flex-row items-center gap-8">
          {/* Globe Canvas Container */}
          <div className="w-full lg:w-3/5 h-[400px] sm:h-[480px] relative flex items-center justify-center cursor-grab active:cursor-grabbing">
            <Globe
              ref={globeRef}
              width={typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.8, 600) : 500}
              height={460}
              globeImageUrl={
                isDarkMode
                  ? '//unpkg.com/three-globe/example/img/earth-dark.jpg'
                  : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
              }
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundColor="rgba(0,0,0,0)"
              atmosphereColor="#10b981"
              atmosphereAltitude={0.18}
              pointsData={markerData}
              pointLat="lat"
              pointLng="lng"
              pointColor="color"
              pointRadius="size"
              pointAltitude={0.02}
              arcsData={arcData}
              arcColor="color"
              arcDashLength={0.4}
              arcDashGap={0.2}
              arcDashAnimateTime={2500}
              arcStroke={1.2}
            />
          </div>

          {/* Telemetry Stats Sidebar */}
          <div className="w-full lg:w-2/5 space-y-4 font-mono">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Home Base Location</div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                <span>Kolkata, West Bengal, India</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold">HQ</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Coordinates: 22.5726° N, 88.3639° E</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Network Latency & Reach</div>
              <div className="grid grid-cols-2 gap-3 mt-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">AP-South:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">12ms (Optimal)</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">EU-West:</span>
                  <span className="text-cyan-700 dark:text-cyan-400 font-bold">118ms</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">US-West:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-bold">185ms</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Protocol:</span>
                  <span className="text-indigo-700 dark:text-indigo-400 font-bold">HTTP/3 QUIC</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs shadow-sm">
              <div className="text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Ready for Remote & Distributed Teams</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-xs font-sans mt-1">
                Collaborating seamlessly across time zones with async communication and agile practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
