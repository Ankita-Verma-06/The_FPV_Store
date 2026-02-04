
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from '../api';
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext) || {};

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await fetchProduct(id);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#00e5ff]/20 border-t-[#00e5ff] rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center text-white p-4">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Link to="/shop" className="neon-btn">BACK TO SHOP</Link>
        </div>
    );

    return (
        <div className="bg-[#0a0a0c] min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4">

                <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 md:mb-12 text-xs md:text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> BACK TO CATALOG
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="relative group">
                        <div className="glass-card aspect-square overflow-hidden border-white/5 p-4 md:p-8 flex items-center justify-center">
                            <img
                                src={product.imageUrl || 'https://via.placeholder.com/600'}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain mix-blend-lighten scale-90 group-hover:scale-100 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute top-8 right-8 bg-[#00e5ff] text-black text-[10px] font-black px-3 py-1 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                            IN STOCK
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-[#00e5ff] uppercase tracking-widest">
                                    {product.category || 'Components'}
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                    <span className="text-sm font-bold text-white">{product.rating || '4.8'}</span>
                                    <span className="text-xs text-gray-500 ml-1">(120 Reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-4xl font-black text-white">${product.price}</span>
                                <span className="text-gray-500 text-sm line-through mb-1">${(parseFloat(product.price) * 1.2).toFixed(2)}</span>
                            </div>

                            <p className="text-gray-400 leading-relaxed mb-10 text-lg">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-6 mb-12">
                            <button
                                onClick={() => addToCart?.(product)}
                                className="neon-btn w-full md:w-auto flex items-center justify-center gap-3 !rounded-2xl py-4"
                            >
                                <ShoppingCart className="w-5 h-5" /> ADD TO CART
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-[#00e5ff]" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">2-Year Warranty</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <Truck className="w-5 h-5 text-[#7000ff]" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fast Shipping</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                    <RotateCcw className="w-5 h-5 text-[#00e5ff]" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
