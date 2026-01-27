import React from 'react';

const TechCore3D = () => {
  return (
    <div className="relative w-full h-[320px] flex items-center justify-center perspective-1000 select-none">
      {/* Volumetric Glow / Atmospheric Haze - More sophisticated colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.08)_0%,transparent_75%)] blur-[60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)]" />

      {/* Main 3D Container - Scaled down to w-48 */}
      <div className="relative w-48 h-48 animate-float-slow transform-style-3d group-hover:rotate-y-12 transition-transform duration-1000">

        {/* Holographic Bases - Softened */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-white/10 blur-[6px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#00a3ff]/20 blur-[10px] rounded-full animate-pulse" />

        {/* Outer Tech Rings - Single Color Family for better Harmony */}
        <div className="absolute inset-0 border-[2px] border-[#00a3ff]/10 rounded-full animate-spin-slow" />
        <div className="absolute inset-6 border border-white/10 rounded-full animate-reverse-spin opacity-40 shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
        <div className="absolute inset-12 border border-[#00a3ff]/20 rounded-full animate-spin-slow opacity-30" />

        {/* Core Geometry - Increased Size (inset-12 instead of inset-16) */}
        <div className="absolute inset-12 flex items-center justify-center">
          <div className="w-full h-full transform-style-3d animate-rotate-core">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00a3ff] via-[#4dbaff] to-white rounded-2xl shadow-[0_0_40px_rgba(0,163,255,0.5)] rotate-45 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
              {/* Internal Energy Layers */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)] animate-pulse" />
              <div className="absolute inset-[3px] bg-[#00a3ff]/30 backdrop-blur-xl rounded-xl border border-white/40 shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping shadow-[0_0_15px_#fff]" />
                  {/* Secondary internal light */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.2)_0%,transparent_50%)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Data Nodes - White for contrast */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-float-delayed">
          <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_15px_#fff]" />
          <div className="w-[0.5px] h-20 bg-gradient-to-b from-white/40 to-transparent mx-auto" />
        </div>

        {/* Orbiting Particles */}
        <div className="absolute inset-0 animate-orbit">
          <div className="w-1 h-1 bg-[#00a3ff] rounded-full absolute top-0 left-1/2 shadow-[0_0_12px_#00a3ff]" />
        </div>
        <div className="absolute inset-0 animate-reverse-orbit">
          <div className="w-0.5 h-0.5 bg-white rounded-full absolute bottom-0 right-1/2 shadow-[0_0_8px_#fff]" />
        </div>
      </div>

      {/* Holographic Scanline Overlay - Integrated better */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden mix-blend-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan" />
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
          50% { transform: translateY(-30px) rotateX(10deg) rotateY(10deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-20px); opacity: 0.5; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0); }
        }
        @keyframes orbit {
          from { transform: rotate(0); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-orbit {
          from { transform: rotate(360deg); }
          to { transform: rotate(0); }
        }
        @keyframes rotate-core {
          0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
          100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); }
        }
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
        @keyframes scan-flare {
          0% { transform: translateY(-100px); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(300px); opacity: 0; }
        }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .translate-z-10 { transform: translateZ(20px); }
        .-translate-z-10 { transform: translateZ(-20px); }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 10s linear infinite; }
        .animate-rotate-core { animation: rotate-core 20s linear infinite; transform-style: preserve-3d; }
        .animate-orbit { animation: orbit 5s linear infinite; }
        .animate-reverse-orbit { animation: reverse-orbit 7s linear infinite; }
        .animate-scan { animation: scan 12s linear infinite; }
        .animate-scan-flare { animation: scan-flare 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default TechCore3D;
