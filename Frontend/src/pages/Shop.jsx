
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import * as api from '../api';
import { Link } from 'react-router-dom';
import {
    Search, Filter, ShoppingCart, Heart, SlidersHorizontal, ChevronRight,
    Sparkles, LayoutGrid, List, Cpu, Crosshair, Wifi, Battery, Terminal,
    Scan, Grid, Zap, Activity, Radio, Box, X, Hammer
} from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    // Debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearch(query);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const [category, setCategory] = useState('');
    const { addToCart } = useContext(CartContext);

    // Filters
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('');

    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.fetchProducts(page, search, category, minPrice, maxPrice, sort);
                setProducts(data.result);
                setTotalPages(data.pagination.pages || 1);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [page, search, category, minPrice, maxPrice, sort]);

    // Categories with tech icons
    const categories = [
        { id: 'All', icon: <Grid className="w-4 h-4" />, label: 'ALL SYSTEMS' },
        { id: 'Motors', icon: <Zap className="w-4 h-4" />, label: 'PROPULSION' },
        { id: 'Frames', icon: <Box className="w-4 h-4" />, label: 'CHASSIS' },
        { id: 'Electronics', icon: <Cpu className="w-4 h-4" />, label: 'AVIONICS' },
        { id: 'Cameras', icon: <Scan className="w-4 h-4" />, label: 'OPTICS' },
        { id: 'Batteries', icon: <Battery className="w-4 h-4" />, label: 'POWER CELL' },
        { id: 'Props', icon: <Activity className="w-4 h-4" />, label: 'THRUSTERS' },
    ];

    return (
        <div className="bg-[#050505] min-h-screen pb-20 overflow-x-hidden relative font-mono selection:bg-[#00a3ff]/30 text-gray-300">
            {/* --- Global Styles for Holographic Effects --- */}
            <style>{`
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                @keyframes flicker {
                    0% { opacity: 0.9; }
                    5% { opacity: 0.5; }
                    10% { opacity: 0.9; }
                    100% { opacity: 0.9; }
                }
                @keyframes grid-move {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 40px; }
                }
                .holo-grid {
                    background-image: 
                        linear-gradient(rgba(0, 163, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 163, 255, 0.1) 1px, transparent 1px);
                    background-size: 40px 40px;
                    transform: perspective(1000px) rotateX(60deg) scale(2);
                    animation: grid-move 20s linear infinite;
                    opacity: 0.2;
                }
                .scan-line {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: rgba(0, 229, 255, 0.5);
                    box-shadow: 0 0 10px #00e5ff;
                    animation: scanline 3s linear infinite;
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .holo-card:hover .scan-line { opacity: 1; }
                .tech-border-corner {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border: 2px solid #00a3ff;
                    transition: all 0.3s;
                }
                .holo-card:hover .tech-border-corner {
                    width: 100%;
                    height: 100%;
                    border-color: #00e5ff;
                    background: rgba(0, 229, 255, 0.02);
                }
            `}</style>

            {/* Atmospheric Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[#050505]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 holo-grid origin-bottom" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00a3ff]/5 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7000ff]/5 blur-[150px] rounded-full mix-blend-screen" />
                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-gradient(circle, transparent 40%, #050505 100%) pointer-events-none" />
            </div>

            <div className="max-w-[1600px] mx-auto px-4 md:px-6 relative z-10 pt-8">

                {/* --- HUD Header --- */}
                <header className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 md:gap-8 mb-12 border-b border-white/5 pb-8 relative">
                    <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-[#00a3ff] shadow-[0_0_10px_#00a3ff]" />

                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-2 px-2 py-1 bg-[#00a3ff]/10 border border-[#00a3ff]/20 rounded text-[10px] font-bold text-[#00a3ff]">
                                <Wifi className="w-3 h-3 animate-pulse" />
                                <span>LINK: STABLE</span>
                            </div>
                            <div className="text-[10px] font-bold text-gray-600 tracking-[0.2em] hidden sm:block">[ SECURE CONNECTION ]</div>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-none tracking-tighter uppercase relative inline-block">
                            ARMORY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a3ff] to-[#00e5ff]">REQUISITION</span>
                            <span className="absolute -top-2 -right-4 text-[10px] font-bold text-gray-500 hidden sm:block">v.4.0.2</span>
                        </h1>
                    </div>

                    {/* Quick Stats / Search */}
                    <div className="flex flex-col items-start lg:items-end gap-4 w-full lg:w-auto">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                            <div className="text-left md:text-right">
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Available Assets</div>
                                <div className="text-xl font-bold text-white leading-none mt-1">{products.length || 0} UNITS</div>
                            </div>
                            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
                            <div className="relative group w-full md:w-80">
                                <div className="absolute inset-0 bg-[#00a3ff]/5 rounded-sm blur-sm group-focus-within:bg-[#00a3ff]/10 transition-all" />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00a3ff] z-20" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                                    placeholder="SEARCH DATABASE..."
                                    className="relative z-20 w-full bg-black/40 border border-[#00a3ff]/20 rounded-sm py-3 pl-12 pr-4 text-sm text-[#00e5ff] placeholder-[#00a3ff]/30 focus:outline-none focus:border-[#00a3ff] transition-all uppercase tracking-widest font-bold"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className={`
                                lg:hidden flex items-center justify-center gap-3 w-full md:w-auto px-6 py-4 rounded-lg 
                                transition-all duration-300 relative overflow-hidden group border
                                ${showMobileFilters
                                    ? 'bg-[#00a3ff] border-[#00a3ff] text-black shadow-[0_0_30px_rgba(0,163,255,0.4)]'
                                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'}
                            `}
                        >
                            <div className={`transition-transform duration-500 ${showMobileFilters ? 'rotate-180' : 'rotate-0'}`}>
                                <Hammer className={`w-5 h-5 ${showMobileFilters ? 'text-black' : 'text-[#00a3ff]'}`} />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.25em] italic">
                                {showMobileFilters ? 'DISENGAGE TACTICAL' : 'ENGAGE FILTERS'}
                            </span>

                            {/* Animated Background Line */}
                            {!showMobileFilters && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[scanline_2s_linear_infinite]" />
                            )}
                        </button>
                    </div>
                </header>

                {/* --- Frequency Tuner (Categories) --- */}
                <div className="mb-8 lg:mb-12 relative overflow-hidden">
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/5" />
                    <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mask-gradient scroll-smooth">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => { setCategory(cat.id === 'All' ? '' : cat.id); setPage(1); }}
                                className={`
                                    relative group px-4 md:px-6 py-3 min-w-max flex items-center gap-3 border transition-all duration-300 overflow-hidden
                                    ${(category === cat.id || (cat.id === 'All' && !category))
                                        ? 'bg-[#00a3ff]/10 border-[#00a3ff] text-[#00e5ff] shadow-[0_0_20px_rgba(0,163,255,0.2)]'
                                        : 'bg-transparent border-white/5 text-gray-500 hover:border-white/20 hover:text-white'}
                                `}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[scanline_1s_linear_infinite]`} />
                                {cat.icon}
                                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase">{cat.label}</span>
                                {cat.id === category && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00e5ff] animate-pulse" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* --- Mobile Backdrop --- */}
                    {showMobileFilters && (
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setShowMobileFilters(false)}
                        />
                    )}

                    {/* --- Tactical Console (Filters) --- */}
                    <aside className={`
                        fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-64 transform ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                        transition-transform duration-300 ease-in-out bg-[#050505] lg:bg-transparent lg:block shrink-0
                        p-6 lg:p-0 border-r lg:border-r-0 border-white/5 lg:space-y-8 overflow-y-auto lg:overflow-visible
                    `}>
                        <div className="lg:hidden flex justify-between items-center mb-8">
                            <h3 className="text-xs font-black text-[#00a3ff] uppercase tracking-[0.2em] flex items-center gap-2">
                                <Terminal className="w-4 h-4" /> System Stats
                            </h3>
                            <button onClick={() => setShowMobileFilters(false)} className="text-gray-500 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 border border-white/5 bg-black/40 backdrop-blur-md relative overflow-hidden rounded-sm">
                            <div className="absolute top-0 right-0 p-2 text-[#00a3ff] opacity-20"><Crosshair className="w-12 h-12" /></div>

                            <h3 className="text-xs font-black text-[#00a3ff] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Terminal className="w-4 h-4" /> Filter Parameters
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                                {/* Price Range */}
                                <div className="space-y-3">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Credit Range</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            placeholder="MIN"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white font-mono focus:border-[#00a3ff] outline-none"
                                        />
                                        <span className="text-gray-600">-</span>
                                        <input
                                            type="number"
                                            placeholder="MAX"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white font-mono focus:border-[#00a3ff] outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Sort Options */}
                                <div className="space-y-3">
                                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Sort Protocol</label>
                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 p-2 text-xs text-white font-mono focus:border-[#00a3ff] outline-none uppercase"
                                    >
                                        <option value="" className="bg-black">Default Sequence</option>
                                        <option value="price:asc" className="bg-black">Price: Ascending</option>
                                        <option value="price:desc" className="bg-black">Price: Descending</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 text-[9px] text-[#00a3ff]/50 font-mono leading-relaxed hidden lg:block">
                                &gt; READY FOR DEPLOYMENT<br />
                                &gt; SCANNING SECTOR 7<br />
                                &gt; OPTIMIZING ROUTE
                            </div>
                        </div>
                    </aside>

                    {/* --- Deployment Grid (Products) --- */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="h-96 flex flex-col items-center justify-center gap-4">
                                <div className="w-16 h-16 border-4 border-[#00a3ff]/20 border-t-[#00a3ff] rounded-full animate-spin" />
                                <div className="text-xs font-bold text-[#00a3ff] animate-pulse tracking-widest">INITIALIZING DATABASE...</div>
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <HoloCard key={product.id} product={product} addToCart={addToCart} />
                                    ))}
                                </div>

                                {/* Pagination Console */}
                                {totalPages > 1 && (
                                    <div className="mt-16 flex items-center justify-center gap-4 p-4 border-t border-white/5">
                                        <button
                                            disabled={page === 1}
                                            onClick={() => setPage(p => p - 1)}
                                            className="px-6 py-2 border border-white/10 bg-white/5 text-xs font-bold hover:bg-[#00a3ff] hover:text-black transition-colors disabled:opacity-20"
                                        >
                                            PREV SECTOR
                                        </button>
                                        <div className="text-xs font-mono text-[#00a3ff] tracking-widest">
                                            PAGE {page} / {totalPages}
                                        </div>
                                        <button
                                            disabled={page === totalPages}
                                            onClick={() => setPage(p => p + 1)}
                                            className="px-6 py-2 border border-white/10 bg-white/5 text-xs font-bold hover:bg-[#00a3ff] hover:text-black transition-colors disabled:opacity-20"
                                        >
                                            NEXT SECTOR
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="h-96 border border-[#00a3ff]/20 bg-[#00a3ff]/5 flex flex-col items-center justify-center">
                                <Scan className="w-12 h-12 text-[#00a3ff] mb-4 animate-pulse" />
                                <div className="text-xl font-black text-white uppercase tracking-widest mb-2">Sector Empty</div>
                                <div className="text-sm text-[#00a3ff]/60">No assets found matching parameters.</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-Component: HoloCard ---
const HoloCard = ({ product, addToCart }) => {
    return (
        <div className="holo-card relative group min-h-[400px] md:h-[400px] bg-black/40 border border-white/10 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-[#00a3ff]/50 hover:shadow-[0_0_30px_rgba(0,163,255,0.1)]">
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-[#00e5ff] transition-colors z-20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-[#00e5ff] transition-colors z-20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-[#00e5ff] transition-colors z-20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-[#00e5ff] transition-colors z-20" />

            {/* Animated Scan Line */}
            <div className="scan-line z-10" />

            {/* Image Section */}
            <div className="h-48 md:h-1/2 relative overflow-hidden bg-[#0a0a0c]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] z-10 opacity-40" />
                <img
                    src={product.image_url || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[0.5] group-hover:grayscale-0"
                />

                {/* Tech Overlay on Hover */}
                <div className="absolute inset-0 bg-[#00a3ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
                    <div className="w-[90%] h-[90%] border border-[#00e5ff]/30 relative">
                        <div className="absolute top-2 left-2 text-[8px] text-[#00e5ff] font-mono">SCANNING...</div>
                        <Crosshair className="absolute center w-8 h-8 text-[#00e5ff] opacity-50" />
                    </div>
                </div>

                <div className="absolute top-3 left-3 z-30 flex flex-col gap-1">
                    <span className="px-2 py-0.5 bg-black/80 border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest backdrop-blur-md">
                        {product.category || 'ASSET'}
                    </span>
                    {product.stock <= 5 && (
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/50 text-[9px] font-bold text-red-500 uppercase tracking-widest backdrop-blur-md animate-pulse">
                            CRITICAL STOCK
                        </span>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="min-h-1 flex-1 p-6 flex flex-col justify-between relative bg-gradient-to-b from-black/0 to-black/80">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter line-clamp-1 group-hover:text-[#00e5ff] transition-colors">
                            {product.name}
                        </h3>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                            <Activity className="w-3 h-3 text-[#00a3ff]" />
                            <span>EFFICIENCY: 98%</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                            <Radio className="w-3 h-3 text-[#00a3ff]" />
                            <span>SIG: STABLE</span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Requisition Cost</div>
                        <div className="text-2xl font-black text-white tracking-tighter">${product.price}</div>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="z-20 group/btn relative px-4 py-2 bg-[#00e5ff]/10 hover:bg-[#00e5ff] border border-[#00e5ff]/50 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[#00e5ff] transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        <div className="relative flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#00e5ff] group-hover/btn:text-black">Add to Cart</span>
                            <ShoppingCart className="w-3 h-3 text-[#00e5ff] group-hover/btn:text-black" />
                        </div>
                    </button>

                    {/* View Details Link Overlay */}
                    <Link to={`/product/${product.id}`} className="absolute inset-0 z-0" />
                </div>
            </div>
        </div>
    );
};

export default Shop;
