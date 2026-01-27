
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Rocket, ArrowRight, Zap, Sparkles } from 'lucide-react';

const OrderSuccess = () => {
    return (
        <div className="flex-1 bg-[#0a0a0c] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00e5ff]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full relative">
                <div className="glass-card p-12 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent" />

                    <div className="mb-8 relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative z-10 mx-auto group-hover:scale-110 transition-transform duration-700">
                            <ShieldCheck className="w-12 h-12 text-[#00e5ff] animate-pulse" />
                        </div>
                        <div className="absolute inset-0 bg-[#00e5ff]/20 blur-2xl rounded-full" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 mx-auto">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Mission Confirmed</span>
                    </div>

                    <h1 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">
                        DEPLOYMENT <br /><span className="text-gradient">SUCCESSFUL</span>
                    </h1>

                    <p className="text-gray-500 text-sm font-medium mb-10 leading-relaxed">
                        Your requisition has been processed. Our logistics fleet is preparing your hardware for immediate orbital drop-off.
                    </p>

                    <div className="space-y-4">
                        <Link
                            to="/dashboard"
                            className="neon-btn w-full flex items-center justify-center gap-3 py-4 group font-black tracking-widest"
                        >
                            VIEW FLIGHT LOGS <Rocket className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            to="/shop"
                            className="w-full flex items-center justify-center gap-3 py-4 text-xs font-black text-gray-500 hover:text-white transition-all uppercase tracking-widest group"
                        >
                            ACQUIRE MORE GEAR <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-center gap-6">
                        <div className="flex flex-col items-center">
                            <div className="text-[10px] font-black text-[#00e5ff] tracking-widest uppercase">Freq</div>
                            <div className="text-xs font-bold text-white">2.4GHz</div>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex flex-col items-center">
                            <div className="text-[10px] font-black text-[#7000ff] tracking-widest uppercase">Link</div>
                            <div className="text-xs font-bold text-white">ELRS</div>
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex flex-col items-center">
                            <div className="text-[10px] font-black text-[#00e5ff] tracking-widest uppercase">Status</div>
                            <div className="text-xs font-bold text-white">STABLE</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
