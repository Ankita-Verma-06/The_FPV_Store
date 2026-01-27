
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Zap, Shield, Rocket, Globe, Sparkles, Star, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import TechCore3D from '../components/TechCore3D';

const Home = () => {
    const features = [
        { icon: <Zap className="w-6 h-6 text-[#00a3ff]" />, title: 'Lightning Fast', desc: 'Pre-tuned stacks and powerful motors for racing.' },
        { icon: <Shield className="w-6 h-6 text-white" />, title: 'Built to Last', desc: 'Carbon fiber frames with extreme crash durability.' },
        { icon: <Rocket className="w-6 h-6 text-[#00a3ff]" />, title: 'Next-Gen Tech', desc: 'Digital HD transmission systems for crystal clear video.' },
        { icon: <Globe className="w-6 h-6 text-white" />, title: 'Global Support', desc: 'Expert advice and worldwide shipping on all builds.' },
    ];


    const featuredProducts = [
        { id: 1, name: "Apex Carbon 5' Frame", price: "89.99", image: "/drone1.png", category: "Frames", rating: "4.9" },
        { id: 2, name: "SpeedyBee F405 Stack", price: "124.50", image: "/stack.png", category: "Electronics", rating: "4.8" },
        { id: 3, name: "HD Digital Goggles X", price: "549.00", image: "/goggles.png", category: "Visuals", rating: "5.0" },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0c] overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-screen flex items-center">
                {/* Constrained Background Container */}
                <div className="absolute inset-x-0 top-0 bottom-0 z-0 max-w-7xl mx-auto px-4 w-full h-full">
                    <div className="relative w-full h-full rounded-b-[4rem] overflow-hidden border-x border-b border-white/5 shadow-2xl">
                        <img
                            src="/hero.png"
                            alt="Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
                    </div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-6 animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-[#00a3ff]" />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#00a3ff]">Next-Gen FPV Gear Available</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-extrabold text-white leading-tight mb-8 tracking-tighter">
                            BEYOND THE <br />
                            <span className="text-gradient">HORIZON</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed font-medium">
                            Engineered for high-performance pilots. Discover the world's most advanced racing drones, custom frames, and digital HD components.
                        </p>
                        <div className="flex flex-wrap justify-start gap-6">
                            <Link to="/shop" className="neon-btn flex items-center gap-2 group">
                                EXPLORE SHOP <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/tutorials" className="outline-btn flex items-center gap-2">
                                <Play className="w-4 h-4" /> WATCH TUTORIALS
                            </Link>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center relative group min-h-[500px]">
                        {/* Mission-Spec HUD Frame */}
                        <div className="absolute inset-0 bg-[#00a3ff]/5 backdrop-blur-[2px] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                            {/* Technical Grid Overlay */}
                            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                            {/* HUD Technical Labels */}
                            <div className="absolute top-6 left-6 flex flex-col gap-1">
                                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">[ TARGET: SYSTEM_CORE ]</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00a3ff] animate-pulse" />
                                    <span className="text-[10px] font-bold text-[#00a3ff] uppercase tracking-widest">Active Analysis</span>
                                </div>
                            </div>

                            <div className="absolute top-6 right-6 text-right">
                                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">[ MOD: X-SERIES-PRO ]</span>
                                <div className="text-[10px] font-bold text-white uppercase tracking-tighter mt-1">S/N: 8842-Ω</div>
                            </div>

                            <div className="absolute bottom-6 left-6">
                                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">[ SENSORS: 100% ]</span>
                                <div className="w-32 h-[2px] bg-white/10 mt-2 rounded-full overflow-hidden">
                                    <div className="w-2/3 h-full bg-[#00a3ff] animate-pulse" />
                                </div>
                            </div>

                            <div className="absolute bottom-6 right-6 text-right flex flex-col items-end">
                                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">[ SIG: HIGH_LEVEL ]</span>
                                <div className="flex gap-1 mt-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-[#00a3ff]' : 'bg-white/10'}`} />
                                    ))}
                                </div>
                            </div>

                            {/* Scanning Platform Base */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#00a3ff]/40 to-transparent" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-gradient-to-t from-[#00a3ff]/10 to-transparent blur-md opacity-50" />
                        </div>

                        {/* Centered 3D Component */}
                        <div className="relative z-10 p-12">
                            <TechCore3D />
                        </div>

                        {/* Corner Accents - Professional & Precise */}
                        <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-[#00a3ff] rounded-tr-lg" />
                        <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-[#00a3ff] rounded-bl-lg" />
                    </div>
                </div>

            </div>

            {/* Features Stats Section - Fixed positioning to avoid 'hiding' upper page */}
            <div className="max-w-7xl mx-auto px-4 py-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="glass-card p-8 hover:-translate-y-2 transition-all duration-500 group border-white/5">
                            <div className="mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">{f.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>


            {/* Featured Section */}
            <div className="py-32 relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#7000ff]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-3 h-3 text-[#00a3ff]" />
                                <span className="text-[#00a3ff] font-bold text-[10px] uppercase tracking-[0.4em] block">Curation</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">NEW <span className="text-gradient">ARRIVALS</span></h2>
                        </div>
                        <Link to="/shop" className="text-xs font-black text-gray-500 hover:text-[#00a3ff] transition-all flex items-center gap-2 mb-2 uppercase tracking-widest group">
                            VIEW FULL CATALOG <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {featuredProducts.map((p) => (
                            <div key={p.id} className="glass-card group hover:border-[#00e5ff]/30 transition-all duration-500">
                                <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                        <span className="text-[10px] font-bold text-white">{p.rating}</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <span className="text-[10px] font-black text-[#00a3ff] uppercase tracking-[0.2em] mb-3 block">
                                        {p.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-gradient transition-all tracking-tight uppercase">
                                        {p.name}
                                    </h3>
                                    <div className="flex items-center justify-between mt-6">
                                        <span className="text-2xl font-black text-white tracking-tighter">${p.price}</span>
                                        <Link
                                            to="/shop"
                                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00a3ff] hover:text-black hover:border-transparent transition-all"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="pb-32 px-4 relative">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00e5ff]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto glass-card overflow-hidden relative group border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                    <img
                        src="https://dji-official-fe.djicdn.com/dps/407048a6e395ef255e989db12fd872a1.jpg"
                        alt="CTA"
                        className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 opacity-40"
                    />
                    <div className="relative z-20 px-8 py-20 md:p-20 max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter uppercase">MASTER THE SKIES WITH <br /><span className="text-gradient">EXPERT TUTORIALS</span></h2>
                        <p className="text-gray-400 mb-12 text-lg font-medium leading-relaxed">Join 10,000+ pilots who learned to build and fly with our comprehensive FPV guides and hardware analysis.</p>
                        <Link to="/tutorials" className="neon-btn inline-block tracking-widest">START LEARNING</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
