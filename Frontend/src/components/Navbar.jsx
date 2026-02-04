
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, Ghost, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const user = authContext.user;
    const { cartCount } = useContext(CartContext);
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group" onClick={closeMenu}>
                            <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:rotate-12 transition-transform duration-300">
                                <img src="/logo.png" alt="Quad Hub Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-black italic tracking-tighter text-white group-hover:text-gradient transition-all duration-300">
                                QUAD HUB
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'text-white' : ''}`}>Shop</Link>
                            <Link to="/tutorials" className={`nav-link ${location.pathname === '/tutorials' ? 'text-white' : ''}`}>Tutorials</Link>
                            <Link to="/customer-service" className={`nav-link ${location.pathname === '/customer-service' ? 'text-white' : ''}`}>Support</Link>
                            {(user?.result?.role === 'admin' || user?.role === 'admin') && (
                                <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                                    <Link to="/admin" className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 pb-0.5 rounded border ${location.pathname.startsWith('/admin') ? 'bg-[#00a3ff] border-[#00a3ff] text-black' : 'border-white/20 text-white/50 hover:text-white hover:border-white/40'} transition-all`}>Admin Panel</Link>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 md:gap-6">
                            <button className="text-gray-400 hover:text-white transition-colors hidden sm:block">
                                <Search className="w-5 h-5" />
                            </button>

                            <Link to={user ? "/dashboard" : "/login"} className="flex items-center gap-3 group" onClick={closeMenu}>
                                <div className="flex flex-col items-end hidden lg:flex">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">
                                        {user ? 'Pilot Active' : 'Offline'}
                                    </span>
                                    <span className="text-xs font-bold text-white group-hover:text-[#00a3ff] transition-colors">
                                        {user ? (user.result?.name || user.name || 'Profile') : 'Login'}
                                    </span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#00a3ff]/50 transition-all overflow-hidden">
                                    {user ? (
                                        <div className="w-full h-full bg-gradient-to-tr from-[#00a3ff] to-white/40 flex items-center justify-center">
                                            <span className="text-sm font-black text-white">{(user.result?.name || user.name || 'P')[0].toUpperCase()}</span>
                                        </div>
                                    ) : (
                                        <User className="w-5 h-5 text-gray-400 group-hover:text-[#00a3ff]" />
                                    )}
                                </div>
                            </Link>

                            <Link to="/cart" className="relative group" onClick={closeMenu}>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/50 transition-all">
                                    <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </div>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#00a3ff] text-black text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0a0a0c]">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <button className="md:hidden text-white" onClick={toggleMenu}>
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Outside of Nav element to prevent clipping */}
            <div className={`
                md:hidden fixed inset-0 z-[100] transition-all duration-300 ease-in-out bg-black
                ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
            `}>
                {/* Close Button UI */}
                <div className="absolute top-6 right-6 z-[110]">
                    <button onClick={closeMenu} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-8 h-8" />
                    </button>
                </div>

                {/* Content */}
                <div className="relative z-50 flex flex-col p-8 gap-8 h-full overflow-y-auto pt-24">
                    <div className="space-y-4">
                        <div className="text-[10px] font-black text-[#00a3ff] uppercase tracking-[0.4em] mb-4 opacity-50">Navigation Map</div>
                        <Link to="/shop" className="block text-5xl font-black text-white italic tracking-tighter hover:text-[#00a3ff] transition-all" onClick={closeMenu}>SHOP</Link>
                        <Link to="/tutorials" className="block text-5xl font-black text-white italic tracking-tighter hover:text-[#00a3ff] transition-all" onClick={closeMenu}>TUTORIALS</Link>
                        <Link to="/customer-service" className="block text-5xl font-black text-white italic tracking-tighter hover:text-[#00a3ff] transition-all" onClick={closeMenu}>SUPPORT</Link>
                    </div>

                    {(user?.result?.role === 'admin' || user?.role === 'admin') && (
                        <div className="pt-6 border-t border-white/10">
                            <Link to="/admin" className="block text-2xl font-black text-[#00a3ff] italic tracking-tighter" onClick={closeMenu}>ADMIN COMMAND</Link>
                        </div>
                    )}

                    <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-6">
                        <button className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors" onClick={closeMenu}>
                            <Search className="w-6 h-6" />
                            <span className="text-sm font-black italic tracking-widest uppercase">Global Search Library</span>
                        </button>
                        <div className="text-[9px] font-bold text-gray-800 uppercase tracking-[0.4em] leading-relaxed">
                            System v2.4 // Quad Hub Official<br />
                            High Speed Low Latency Access Approved
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
