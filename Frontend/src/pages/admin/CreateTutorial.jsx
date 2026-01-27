import React, { useState } from 'react';
import { createTutorial } from '../../api';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Send, ArrowLeft, Youtube, User, Type } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateTutorial = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        videoUrl: '',
        author: 'Flight Command',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createTutorial(formData);
            toast.success('Intelligence report published');
            navigate('/tutorials');
        } catch (err) {
            console.error(err);
            toast.error('Transmission failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] pt-12 pb-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7000ff]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00e5ff]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <Link to="/tutorials" className="inline-flex items-center gap-2 text-xs font-black text-gray-500 hover:text-white transition-all uppercase tracking-widest mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Archives
                </Link>

                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-4 uppercase">
                        KNOWLEDGE <span className="text-gradient">TRANSFER</span>
                    </h1>
                    <p className="text-gray-500 text-sm uppercase font-bold tracking-[0.2em]">Publish new flight intelligence and tutorials</p>
                </div>

                <div className="glass-card p-1 border-white/5 bg-white/[0.01]">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-black tracking-widest text-[#7000ff] uppercase flex items-center gap-2">
                                <BookOpen className="w-3 h-3" /> Report Metadata
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Report Title</label>
                                    <div className="relative">
                                        <Type className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            onChange={handleChange}
                                            placeholder="e.g. Master the Matty Flip"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-[#7000ff]/50 transition-all text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Assigned Author</label>
                                    <div className="relative">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            name="author"
                                            defaultValue="Flight Command"
                                            required
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-[#7000ff]/50 transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Intelligence Content (Markdown Supported)</label>
                                <textarea
                                    name="content"
                                    required
                                    rows="8"
                                    onChange={handleChange}
                                    placeholder="Detailed instructions and tactical advice..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#7000ff]/50 transition-all text-sm resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-gray-500 ml-1">Video Link (YouTube Relay)</label>
                                <div className="relative">
                                    <Youtube className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        name="videoUrl"
                                        onChange={handleChange}
                                        placeholder="https://youtube.com/watch?v=..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-4 text-white focus:outline-none focus:border-[#7000ff]/50 transition-all text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <button
                                type="submit"
                                disabled={loading}
                                className="neon-btn w-full flex items-center justify-center gap-3 py-5 group font-black tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'TRANSMITTING...' : (
                                    <>
                                        PUBLISH REPORT <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTutorial;
