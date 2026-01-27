import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, ShieldCheck, Sparkles } from 'lucide-react';
import * as api from '../api';
import TechCore3D from '../components/TechCore3D';

const CustomerService = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.submitContactForm(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            // Clear success message after 2 seconds
            setTimeout(() => setStatus(''), 2000);
        } catch (error) {
            console.error(error);
            setStatus('error');
            // Clear error message after 2 seconds
            setTimeout(() => setStatus(''), 2000);
        }
    };

    return (
        <div className="bg-[#0a0a0c] min-h-screen pb-20 overflow-hidden relative">
            {/* Background Glows - Updated to Sapphire */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#00a3ff]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Hero Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Sparkles className="w-3 h-3 text-[#00a3ff]" />
                        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400">Support Terminal</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                        MISSION <span className="text-gradient">CONTROL</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Encountered a glitch in your build? Our senior flight engineers are standing by to assist your mission.
                    </p>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <ContactCard
                        icon={<Phone className="w-6 h-6 text-[#00a3ff]" />}
                        title="VOICE COMM"
                        desc="Deployment assistance line"
                        value="+1 (555) 123-4567"
                        link="tel:+15551234567"
                        accent="#00a3ff"
                    />
                    <ContactCard
                        icon={<Mail className="w-6 h-6 text-white" />}
                        title="ENCRYPTED MAIL"
                        desc="Technical schematics & logs"
                        value="support@fpvhaven.com"
                        link="mailto:support@fpvhaven.com"
                        accent="#fff"
                    />
                    <ContactCard
                        icon={<MapPin className="w-6 h-6 text-[#00a3ff]" />}
                        title="HANGAR HQ"
                        desc="Physical asset extraction"
                        value="123 Drone Valley, SF"
                        accent="#00a3ff"
                    />
                </div>

                {/* Contact Form Container */}
                <div className="glass-card overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                    {/* Form Visual/Info Side */}
                    <div className="p-12 bg-white/[0.02] border-r border-white/5 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent" />

                        <h2 className="text-3xl font-black text-white mb-8 tracking-tight">TRANSMIT <br /><span className="text-gradient">COMMUNICATION</span></h2>
                        <p className="text-gray-500 mb-12 text-sm leading-relaxed max-w-sm">
                            Submit your technical request. Our typical response frequency is within 24 operational hours.
                        </p>

                        <div className="space-y-8">
                            <InfoItem icon={<Clock className="w-5 h-5 text-[#00a3ff]" />} text="24/7 Signal Monitoring" />
                            <InfoItem icon={<ShieldCheck className="w-5 h-5 text-white" />} text="End-to-End Encrypted" />
                            <InfoItem icon={<MessageSquare className="w-5 h-5 text-[#00a3ff]" />} text="Direct Engineer Access" />
                        </div>

                        {/* 3D Tech Core Decoration */}
                        <div className="mt-6 relative">
                            <TechCore3D />
                        </div>
                    </div>

                    {/* Actual Form Side */}
                    <div className="p-12 relative">
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Identity</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-all"
                                        placeholder="PILOT NAME"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Frequency (Email)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#7000ff]/50 transition-all"
                                        placeholder="pilot@haven.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Message Content</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-[#00e5ff]/50 transition-all resize-none"
                                    placeholder="TYPE TRANMISSION HERE..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="neon-btn w-full flex items-center justify-center gap-3 py-4 group"
                            >
                                {status === 'sending' ? 'TRANSMITTING...' : (
                                    <>
                                        SEND MESSAGE <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-xs font-bold text-center animate-pulse">
                                    TRANSMISSION RECEIVED SUCCESSFULLY
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold text-center">
                                    SIGNAL LOST: PLEASE ATTEMPT RE-TRANSMISSION
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactCard = ({ icon, title, desc, value, link, accent }) => (
    <div className="glass-card p-8 group hover:-translate-y-2 transition-all duration-500 border-white/5 hover:border-white/10">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
            {icon}
        </div>
        <h3 className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-2">{title}</h3>
        <p className="text-xs text-white/50 mb-4">{desc}</p>
        <div className="text-white font-bold tracking-tight">
            {link ? (
                <a href={link} className="hover:text-gradient transition-all">{value}</a>
            ) : (
                <span>{value}</span>
            )}
        </div>
    </div>
);

const InfoItem = ({ icon, text }) => (
    <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            {icon}
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{text}</span>
    </div>
);

export default CustomerService;
