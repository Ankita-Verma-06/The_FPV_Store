
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { LogOut, User, Mail, Shield, Zap, Box, History, Settings, ChevronRight } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    const pilotData = user?.result || user || {};
    const pilotName = pilotData?.name || 'Unknown Pilot';
    const pilotEmail = pilotData?.email || 'No Frequency Detected';

    return (
        <div className="bg-[#0a0a0c] min-h-screen pb-20 overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00e5ff]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7000ff]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pb-8 border-b border-white/5">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
                            <Shield className="w-3 h-3 text-[#00e5ff]" />
                            <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Verified Pilot Profile</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                            PILOT <span className="text-gradient">DASHBOARD</span>
                        </h1>
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-bold text-sm hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all group"
                    >
                        TERMINATE SESSION <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="glass-card p-8 border-white/10 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent" />

                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#00e5ff] to-[#7000ff] p-1 mb-6 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                                    <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center">
                                        <User className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-black text-white mb-1 uppercase tracking-tight">{pilotName}</h2>
                                <p className="text-xs text-gray-500 font-black uppercase tracking-[0.2em] mb-8">Flight Class: Beginner / Racer</p>

                                <div className="w-full space-y-4">
                                    <ProfileDetail icon={<Mail className="w-4 h-4" />} label="Signal (Email)" value={pilotEmail} />
                                    <ProfileDetail icon={<Shield className="w-4 h-4" />} label="Status" value="Active Duty" accent="#00e5ff" />
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <StatCard label="Orders" value="03" icon={<Box className="w-4 h-4 text-[#7000ff]" />} />
                            <StatCard label="XP" value="450" icon={<Zap className="w-4 h-4 text-[#00e5ff]" />} />
                        </div>
                    </div>

                    {/* Main Column - Activities & Navigation */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Navigation Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <DashboardNavBox
                                title="ORDER HISTORY"
                                desc="Review your previous fleet acquisitions"
                                icon={<History className="w-6 h-6 text-[#7000ff]" />}
                                link="/orders"
                            />
                            <DashboardNavBox
                                title="MY WISHLIST"
                                desc="Gear marked for future operations"
                                icon={<Zap className="w-6 h-6 text-[#00e5ff]" />}
                                link="/shop"
                            />
                            <DashboardNavBox
                                title="SAVED TUTORIALS"
                                desc="Master complex flight maneuvers"
                                icon={<Box className="w-6 h-6 text-[#7000ff]" />}
                                link="/tutorials"
                            />
                            <DashboardNavBox
                                title="CORE SETTINGS"
                                desc="Adjust your flight profile parameters"
                                icon={<Settings className="w-6 h-6 text-[#00e5ff]" />}
                                link="/dashboard"
                            />
                        </div>

                        {/* Recent Activity Mockup */}
                        <div className="glass-card p-8 border-white/5">
                            <h3 className="text-[10px] font-black tracking-widest text-[#00e5ff] uppercase mb-8">Recent Transmissions</h3>
                            <div className="space-y-6">
                                <ActivityItem date="JAN 08, 2026" text="Flight profile credentials updated successfully" />
                                <ActivityItem date="JAN 07, 2026" text="Welcome to FPV HAVEN Pilot Academy" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileDetail = ({ icon, label, value, accent }) => (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center gap-3">
            <div className="text-gray-500">{icon}</div>
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{label}</span>
        </div>
        <span className="text-xs font-bold text-white truncate max-w-[150px]" style={accent ? { color: accent } : {}}>{value}</span>
    </div>
);

const StatCard = ({ label, value, icon }) => (
    <div className="glass-card p-6 border-white/5 flex flex-col items-center text-center">
        <div className="mb-2">{icon}</div>
        <div className="text-2xl font-black text-white mb-1 uppercase tracking-tighter">{value}</div>
        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{label}</div>
    </div>
);

const DashboardNavBox = ({ title, desc, icon, link }) => (
    <Link to={link} className="glass-card p-8 flex items-start gap-6 border-white/5 hover:border-white/20 transition-all group">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-black text-white mb-1 tracking-tight group-hover:text-gradient transition-all">{title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-700 ml-auto group-hover:text-white transition-colors" />
    </Link>
);

const ActivityItem = ({ date, text }) => (
    <div className="flex gap-6 items-start">
        <div className="text-[10px] font-black text-gray-500 w-24 flex-shrink-0 pt-0.5">{date}</div>
        <div className="text-xs font-bold text-gray-300">{text}</div>
    </div>
);

export default Dashboard;
