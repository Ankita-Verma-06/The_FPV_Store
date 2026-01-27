
import React, { useState, useEffect } from 'react';
import * as api from '../api';
import { PlayCircle, Video, BookOpen, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import TutorialCard from '../components/TutorialCard';

const Tutorials = () => {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getTutorials = async () => {
            setLoading(true);
            try {
                const { data } = await api.fetchTutorials();
                setTutorials(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getTutorials();
    }, []);

    return (
        <div className="bg-[#0a0a0c] min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header Header */}
                <div className="max-w-3xl mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                        <GraduationCap className="w-4 h-4 text-[#00a3ff]" />
                        <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Academy Programs</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                        FLIGHT <span className="text-gradient">ACADEMY</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Master the art of drone building and piloting. Our expert-led tutorials cover everything from basic soldering to advanced flight controllers and cinematic maneuvers.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-4 border-[#00a3ff]/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-t-[#00a3ff] rounded-full animate-spin"></div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {tutorials.map((tutorial) => (
                            <TutorialCard key={tutorial.id} tutorial={tutorial} />
                        ))}
                    </div>
                )}

                {/* Bottom Banner */}
                <div className="mt-32 glass-card p-12 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a3ff]/10 blur-[100px] -z-10" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black text-white mb-6">WANT PERSONAL COACHING?</h2>
                        <p className="text-gray-400 mb-10 max-w-lg mx-auto">Our pro pilots offer 1-on-1 sessions for building assistance and flight training.</p>
                        <Link to="/customer-service" className="neon-btn inline-block">CONTACT AN EXPERT</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutorials;
