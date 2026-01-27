
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ArrowRight, Zap } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="glass-card group hover:border-[#00e5ff]/40 transition-all duration-500 flex flex-col h-full overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-60" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 self-start">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-[10px] font-bold text-white tracking-widest">{product.rating || '4.8'}</span>
                    </div>
                    {product.stock <= 5 && product.stock > 0 && (
                        <div className="bg-red-500/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 self-start animate-pulse">
                            <span className="w-1.5 h-1.5 bg-white rounded-full" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Low Stock</span>
                        </div>
                    )}
                </div>

                {/* Quick Add Button */}
                <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-2xl bg-[#00e5ff] text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-110 active:scale-95"
                >
                    <ShoppingCart className="w-5 h-5" />
                </button>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-3 bg-gradient-to-b from-[#00e5ff] to-[#7000ff] rounded-full" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        {product.category || 'Gear'}
                    </span>
                </div>

                <Link to={`/product/${product.id}`} className="block group/title">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover/title:text-[#00e5ff] transition-colors uppercase tracking-tight">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm text-gray-400 line-clamp-2 mb-8 font-medium leading-relaxed flex-1">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Price (USD)</span>
                        <span className="text-2xl font-black text-white tracking-tighter">
                            ${parseFloat(product.price).toFixed(2)}
                        </span>
                    </div>

                    <Link
                        to={`/product/${product.id}`}
                        className="flex items-center gap-2 text-[10px] font-black text-[#00e5ff] uppercase tracking-widest hover:gap-3 transition-all group/link"
                    >
                        Details <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
