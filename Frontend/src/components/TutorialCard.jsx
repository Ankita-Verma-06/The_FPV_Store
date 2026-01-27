
import React from 'react';
import { Play, User, Calendar, ExternalLink } from 'lucide-react';

const TutorialCard = ({ tutorial }) => {
    return (
        <div className="glass-card group overflow-hidden border-white/5 hover:border-[#7000ff]/30 transition-all duration-500">
            {/* Video Viewport */}
            <div className="relative aspect-video overflow-hidden">
                {(tutorial.videoUrl || tutorial.video_url) ? (
                    <iframe
                        src={(tutorial.videoUrl || tutorial.video_url).replace('watch?v=', 'embed/')}
                        title={tutorial.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 border-0"
                    ></iframe>
                ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <Play className="w-12 h-12 text-gray-700" />
                    </div>
                )}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60" />
            </div>

            <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#7000ff]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7000ff]" />
                        Tutorial
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                        {Math.floor(Math.random() * 15 + 5)} Min Watch
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gradient transition-all leading-tight">
                    {tutorial.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-3 mb-8 leading-relaxed">
                    {tutorial.content}
                </p>

                <div className="h-px bg-white/10 w-full mb-6" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-[#00e5ff] font-bold">
                            {tutorial.author?.[0] || 'A'}
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Pilot</div>
                            <div className="text-xs font-bold text-white">{tutorial.author || 'Prop Master'}</div>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                        Expand <ExternalLink className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorialCard;
