
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

const Cart = () => {
    const { cart = [], removeFromCart, updateQuantity, cartCount = 0, cartTotal = 0 } = useContext(CartContext) || {};

    return (
        <div className="bg-[#0a0a0c] min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4">
                <HeaderSection cartCount={cartCount} />

                {cart.length === 0 ? (
                    <EmptyCartState />
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-6">
                            {cart.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeFromCart={removeFromCart}
                                />
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-96">
                            <OrderSummary cartTotal={cartTotal} cartCount={cartCount} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const HeaderSection = ({ cartCount }) => (
    <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">YOUR <span className="text-gradient">HANGAR</span></h1>
        <p className="text-gray-500 text-sm">You have {cartCount} high-performance items ready for takeoff</p>
    </div>
);

const EmptyCartState = () => (
    <div className="glass-card py-32 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
            <ShoppingBag className="w-10 h-10 text-gray-700" />
        </div>
        <h2 className="text-2xl font-black text-white mb-4">The Hangar is Empty</h2>
        <p className="text-gray-500 mb-10 max-w-xs mx-auto">No gear found. Visit the shop to add some premium FPV components to your list.</p>
        <Link to="/shop" className="neon-btn inline-flex items-center gap-2">
            GO TO SHOP <ArrowRight className="w-4 h-4" />
        </Link>
    </div>
);

const CartItem = ({ item, updateQuantity, removeFromCart }) => (
    <div className="glass-card p-6 flex flex-col sm:flex-row items-center gap-8 group">
        <div className="w-32 h-32 bg-white/5 rounded-2xl flex-shrink-0 flex items-center justify-center p-4 border border-white/5 group-hover:border-[#00e5ff]/20 transition-all">
            <img
                src={item.imageUrl || 'https://via.placeholder.com/150'}
                alt={item.name}
                className="max-w-full max-h-full object-contain mix-blend-lighten"
            />
        </div>

        <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white hover:text-gradient transition-all">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-black">{item.category || 'Part'}</p>
                </div>
                <div className="text-xl font-black text-white">${item.price}</div>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8">
                <div className="flex items-center bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-white">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest"
                >
                    <Trash2 className="w-4 h-4" /> Remove
                </button>
            </div>
        </div>
    </div>
);

const OrderSummary = ({ cartTotal, cartCount }) => (
    <div className="glass-card p-8 sticky top-28">
        <h2 className="text-xl font-black text-white mb-8 border-b border-white/5 pb-4 uppercase tracking-tighter">Mission Briefing</h2>

        <div className="space-y-4 mb-10">
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payload ({cartCount} units)</span>
                <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-500">Logistics</span>
                <span className="text-[#00e5ff] font-bold uppercase text-[10px] tracking-widest">Comped</span>
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                <span className="text-gray-400 text-xs font-bold uppercase">Total Credits</span>
                <span className="text-3xl font-black text-white tracking-tighter">${cartTotal.toFixed(2)}</span>
            </div>
        </div>

        <Link to="/checkout" className="block">
            <button className="neon-btn w-full flex items-center justify-center gap-2 mb-6">
                PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
            </button>
        </Link>

        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" /> Secure Encrypted Transmission
        </div>
    </div>
);

export default Cart;
