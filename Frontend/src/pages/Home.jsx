
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap, Shield, Rocket, Globe, Sparkles, Star, ChevronRight, Cpu, Activity, Layout } from 'lucide-react';

const Home = () => {
    const features = [
        { icon: <Cpu className="w-8 h-8 text-[#00a3ff]" />, title: 'Premium Components', desc: 'Direct access to high-tier flight controllers and ESCs.' },
        { icon: <Shield className="w-8 h-8 text-[#00e5ff]" />, title: 'Certified Safe', desc: 'Every component is tested for maximum reliability.' },
        { icon: <Zap className="w-8 h-8 text-[#00a3ff]" />, title: 'Fast Logistics', desc: 'Strategic warehouse locations for rapid global delivery.' },
        { icon: <Layout className="w-8 h-8 text-[#00e5ff]" />, title: 'Expert Curation', desc: 'Hand-picked gear by pro pilots who know the tech.' },
    ];

    const featuredProducts = [
        { id: 1, name: "Apex Carbon 5' Frame", price: "89.99", image: "/drone1.png", category: "Frames", rating: "4.9" },
        { id: 2, name: "SpeedyBee F405 Stack", price: "124.50", image: "/stack.png", category: "Electronics", rating: "4.8" },
        { id: 3, name: "HD Digital Goggles X", price: "549.00", image: "/goggles.png", category: "Visuals", rating: "5.0" },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00a3ff]/30 overflow-x-hidden">

            {/* --- Advanced Hero Section --- */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                {/* Visual Foundation */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero_new.png"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <Sparkles className="w-4 h-4 text-[#00a3ff]" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-300">Global Hub for FPV Innovation</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a3ff] to-[#00e5ff]">QUAD</span> <br />
                            <span className="text-white">HUB</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                            Professional grade equipment for elite pilots. We provide the architecture for high-speed flight, digital clarity, and uncompromised build quality.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
                            <Link to="/shop" className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-sm hover:bg-[#00a3ff] hover:text-white transition-all duration-500 text-center">
                                REQUISITION GEAR
                            </Link>
                            <Link to="/tutorials" className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 font-black uppercase tracking-[0.2em] rounded-sm hover:bg-white/10 transition-all duration-500 text-center flex items-center justify-center gap-2">
                                <Play className="w-4 h-4" /> PILOT ACADEMY
                            </Link>
                        </div>
                    </div>

                    {/* HUD / Data Panel for Desktop */}
                    <div className="hidden lg:block lg:col-span-4 space-y-4">
                        <div className="glass-card p-6 border-white/10 animate-pulse">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-black text-[#00a3ff] uppercase tracking-widest">System Status</span>
                                <Activity className="w-4 h-4 text-[#00a3ff]" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-4/5 bg-[#00a3ff]" />
                                </div>
                                <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                    <span>Signal Integrity</span>
                                    <span>98%</span>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-6 border-white/10 opacity-60">
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Connected Nodes</div>
                            <div className="text-2xl font-black text-white italic tracking-tighter">8,421 LABS</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Core Features Grid --- */}
            <section className="py-32 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a3ff]/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className="group p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 rounded-sm">
                                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500">{f.icon}</div>
                                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-[0.1em]">{f.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Section Divider --- */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
            </div>

            {/* --- Strategic Catalog Requisition --- */}
            <section className="py-32 relative">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00e5ff]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-px bg-[#00a3ff]" />
                                <span className="text-[#00a3ff] font-bold text-[10px] uppercase tracking-[0.4em]">Hardware Inventory</span>
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic">STRATEGIC <br /><span className="text-gradient">DEPLOYMENTS</span></h2>
                        </div>
                        <Link to="/shop" className="text-xs font-black text-gray-500 hover:text-[#00a3ff] transition-all flex items-center gap-2 mb-2 uppercase tracking-widest group">
                            ACCESS FULL INVENTORY <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {featuredProducts.map((p) => (
                            <div key={p.id} className="relative group overflow-hidden border border-white/5 bg-black/40">
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 z-10" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 z-10" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 z-10" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 z-10" />

                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <Link to="/shop" className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform">Quick Requisition</Link>
                                    </div>
                                    <div className="absolute top-6 left-6 bg-black/80 px-4 py-1.5 border border-white/10 flex items-center gap-2">
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        <span className="text-[10px] font-black text-white">{p.rating}</span>
                                    </div>
                                </div>
                                <div className="p-8 border-t border-white/5">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <span className="text-[9px] font-black text-[#00a3ff] uppercase tracking-[0.2em] mb-2 block">{p.category}</span>
                                            <h3 className="text-xl font-black text-white tracking-widest uppercase">{p.name}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-black text-white tracking-tighter">${p.price}</span>
                                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-1">Asset_{p.id.toString().padStart(3, '0')}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Professional Academy CTA --- */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto relative group">
                    <div className="absolute inset-0 bg-[#00a3ff]/20 blur-[150px] -z-10 group-hover:bg-[#00a3ff]/30 transition-all duration-1000" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-black overflow-hidden rounded-sm">
                        <div className="relative h-64 lg:h-auto overflow-hidden">
                            <img
                                src="https://dji-official-fe.djicdn.com/dps/407048a6e395ef255e989db12fd872a1.jpg"
                                alt="Academy"
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                        </div>
                        <div className="p-10 lg:p-20 flex flex-col justify-center items-start">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00a3ff]/10 border border-[#00a3ff]/20 rounded-full mb-8">
                                <Globe className="w-3 h-3 text-[#00a3ff]" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#00a3ff]">Academy Program v.2.4</span>
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
                                ESCALATE YOUR <br /><span className="text-gradient">FLIGHT SKILLS</span>
                            </h2>
                            <p className="text-gray-400 mb-12 text-lg leading-relaxed font-medium">Join our advanced pilot curriculum. Master complex building techniques, digital frequency management, and high-G cinematic maneuvers.</p>
                            <Link to="/tutorials" className="px-12 py-5 bg-[#00a3ff] text-black font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 rounded-sm italic">
                                COMMENCE TRAINING
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
