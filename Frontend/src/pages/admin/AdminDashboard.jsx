import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import * as api from '../../api';
import toast from 'react-hot-toast';
import {
    ShoppingBag,
    Users,
    Mail,
    Plus,
    ExternalLink,
    Clock,
    MapPin,
    CreditCard,
    AlertTriangle,
    RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');
    const [data, setData] = useState({
        orders: [],
        users: [],
        contacts: []
    });
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const pilotData = user?.result || user || {};
    const isAdmin = pilotData?.role === 'admin';

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!isAdmin) {
            toast.error("Access Denied: Admin privileges required.");
            navigate('/');
            return;
        }

        fetchData();
    }, [user, isAdmin]);

    const fetchData = async () => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const [ordersRes, usersRes, contactsRes] = await Promise.all([
                api.fetchAllOrders(),
                api.fetchAllUsers(),
                api.fetchAllContacts()
            ]);

            setData({
                orders: ordersRes.data || [],
                users: usersRes.data || [],
                contacts: contactsRes.data || []
            });
        } catch (error) {
            console.error("Admin Fetch Error:", error);
            const msg = error.response?.data?.message || error.message || "Failed to establish connection with secure data-tower.";
            setErrorMessage(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, currentStatus) => {
        const statuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];
        const currentIndex = statuses.indexOf(currentStatus);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];

        try {
            await api.updateOrderStatus(id, nextStatus);
            toast.success(`Order status updated to ${nextStatus.toUpperCase()}`);

            // Optimistic update or refetch
            const ordersRes = await api.fetchAllOrders();
            setData(prev => ({ ...prev, orders: ordersRes.data }));
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-[#00a3ff]/20 border-t-[#00a3ff] rounded-full animate-spin mb-4"></div>
                <div className="text-[#00a3ff] font-mono tracking-widest text-sm uppercase animate-pulse">
                    Synchronizing_Admin_Datastream...
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="max-w-xl mx-auto mt-20 p-8 bg-[#141416] border border-red-500/20 text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-6" />
                <h2 className="text-xl font-black text-white uppercase italic mb-2">Data-Link Severed</h2>
                <p className="text-gray-400 font-mono text-xs mb-8 leading-relaxed">{errorMessage}</p>
                <button
                    onClick={fetchData}
                    className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white font-bold uppercase text-xs tracking-widest hover:bg-red-600 transition-all mx-auto"
                >
                    <RefreshCw className="w-4 h-4" /> Re-establish Connection
                </button>
            </div>
        );
    }

    const tabs = [
        { id: 'orders', label: 'Order Requests', icon: <ShoppingBag className="w-4 h-4" /> },
        { id: 'users', label: 'Registered Users', icon: <Users className="w-4 h-4" /> },
        { id: 'contacts', label: 'Contact Messages', icon: <Mail className="w-4 h-4" /> },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 w-full">
            <header className="mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">
                            Admin <span className="text-[#00a3ff]">Command Center</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                            <span className="text-[#00a3ff]">Operator_Online:</span> {pilotData?.name || 'ADMIN_77'}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/admin/create-product"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-[#00a3ff] hover:text-white transition-all duration-300"
                        >
                            <Plus className="w-4 h-4" /> Create Product
                        </Link>
                        <Link
                            to="/admin/create-tutorial"
                            className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-bold uppercase text-xs tracking-widest hover:border-[#00a3ff] hover:text-[#00a3ff] transition-all duration-300"
                        >
                            <Plus className="w-4 h-4" /> Create Tutorial
                        </Link>
                    </div>
                </div>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard label="Total Orders" value={data.orders.length} />
                <StatCard label="Active Users" value={data.users.length} />
                <StatCard label="Support Tickets" value={data.contacts.length} />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-8 py-4 font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300 border-b-2 whitespace-nowrap ${activeTab === tab.id
                            ? 'border-[#00a3ff] text-white bg-[#00a3ff]/5'
                            : 'border-transparent text-gray-500 hover:text-white'
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid gap-6">
                {activeTab === 'orders' && (
                    <div className="space-y-4">
                        {data.orders.length === 0 ? (
                            <div className="py-20 text-center border border-white/5 bg-[#141416]">
                                <p className="text-gray-500 font-mono text-sm uppercase tracking-widest italic opacity-50">No order transmissions found</p>
                            </div>
                        ) : (
                            data.orders.map((order) => (
                                <div key={order.id} className="bg-[#141416] border border-white/5 p-6 hover:border-[#00a3ff]/30 transition-all duration-300 group">
                                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                                <span className="px-4 py-1 bg-[#00a3ff]/10 text-[#00a3ff] text-[10px] font-black uppercase tracking-widest border border-[#00a3ff]/20">
                                                    ORDER_ID: #{order.id}
                                                </span>
                                                <span className={`px-4 py-1 text-[10px] font-black uppercase tracking-widest border ${order.status === 'completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                    order.status === 'shipped' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                        order.status === 'processing' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                                                            order.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                                <span className="text-gray-500 text-[10px] font-mono flex items-center gap-1 uppercase">
                                                    <Clock className="w-3 h-3" /> {new Date(order.created_at).toLocaleDateString()}
                                                </span>
                                            </div>

                                            {order.transaction_id && (
                                                <div className="mb-6 p-3 bg-[#7000ff]/10 border border-[#7000ff]/20 rounded-lg flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="w-3 h-3 text-[#7000ff]" />
                                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Verification ID:</span>
                                                        <span className="text-xs font-mono font-bold text-white selection:bg-[#7000ff]">{order.transaction_id}</span>
                                                    </div>
                                                    <span className="text-[8px] font-black text-[#7000ff] uppercase tracking-widest animate-pulse">Pending Review</span>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                                <div className="space-y-2">
                                                    <p className="text-[#00a3ff] text-[9px] uppercase font-black tracking-widest opacity-50">Customer Protocol</p>
                                                    <p className="text-white font-bold text-lg leading-none">{order.user_name}</p>
                                                    <p className="text-gray-400 font-mono text-xs">{order.user_email}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[#00a3ff] text-[9px] uppercase font-black tracking-widest opacity-50">Drop Location</p>
                                                    <div className="flex items-start gap-2 text-white text-sm bg-white/5 p-3 border border-white/5">
                                                        <MapPin className="w-4 h-4 text-[#00a3ff] flex-shrink-0 mt-0.5" />
                                                        <p className="font-medium text-xs leading-relaxed">{order.address}, {order.city}, {order.zip_code}, {order.country}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-white/5 pt-6">
                                                <p className="text-[#00a3ff] text-[9px] uppercase font-black tracking-widest opacity-50 mb-4">Inventory Data</p>
                                                <div className="space-y-2">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between items-center bg-black/40 p-3 border border-white/5 group-hover:border-white/10 transition-colors">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 bg-white/5 p-1 border border-white/5">
                                                                    <img src={item.product?.imageUrl} alt={item.product?.name} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-bold text-gray-100 italic">{item.product?.name}</p>
                                                                    <p className="text-[10px] font-black text-[#00a3ff] uppercase tracking-widest mt-0.5">Quantity: {item.quantity}</p>
                                                                </div>
                                                            </div>
                                                            <p className="font-mono text-xs text-white bg-white/5 px-3 py-1">${(item.price * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:w-72 flex flex-col justify-between border-l border-white/5 lg:pl-8">
                                            <div className="p-6 bg-[#00a3ff]/5 border border-[#00a3ff]/10">
                                                <p className="text-[#00a3ff] text-[9px] uppercase font-black tracking-widest mb-1 opacity-70">Secured Payment</p>
                                                <p className="text-4xl font-black text-white italic tracking-tighter mb-4">${parseFloat(order.total).toFixed(2)}</p>
                                                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                                    <CreditCard className="w-3 h-3 text-[#00a3ff]" /> {order.payment_method?.replace('_', ' ') || 'CREDIT_CARD'}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleStatusUpdate(order.id, order.status)}
                                                className="mt-6 w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00a3ff] hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
                                            >
                                                Update_Status
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="bg-[#141416] border border-white/5 overflow-x-auto">
                        <table className="w-full text-left font-mono">
                            <thead className="bg-[#1a1a1c] text-[#00a3ff] text-[9px] font-black uppercase tracking-widest border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-6 font-black">USER_ID</th>
                                    <th className="px-6 py-6 font-black">PILOT_NAME</th>
                                    <th className="px-6 py-6 font-black">EMAIL_SIGNAL</th>
                                    <th className="px-6 py-6 font-black">ACCESS_CORE</th>
                                    <th className="px-6 py-6 font-black text-right">JOIN_DATE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-[11px]">
                                {data.users.map(u => (
                                    <tr key={u.id} className="hover:bg-white/[0.02] group transition-colors">
                                        <td className="px-6 py-4 text-gray-600">#{u.id}</td>
                                        <td className="px-6 py-4 font-bold text-white italic">{u.name || 'ANONYMOUS'}</td>
                                        <td className="px-6 py-4 text-gray-400">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-0.5 border text-[9px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'border-[#00a3ff] text-[#00a3ff] bg-[#00a3ff]/10' : 'border-white/10 text-gray-500'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-500">
                                            {new Date(u.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'contacts' && (
                    <div className="grid gap-6">
                        {data.contacts.length === 0 ? (
                            <div className="py-20 text-center border border-white/5 bg-[#141416]">
                                <p className="text-gray-500 font-mono text-sm uppercase tracking-widest italic opacity-50">No incoming transmissions</p>
                            </div>
                        ) : (
                            data.contacts.map((contact) => (
                                <div key={contact.id} className="bg-[#141416] border border-white/5 p-8 hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4">
                                        <span className="text-[#00a3ff]/30 text-[40px] font-black italic opacity-20 group-hover:opacity-40 transition-opacity">
                                            {String(contact.id).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                                        <div>
                                            <p className="text-[#00a3ff] text-[9px] uppercase font-black tracking-widest mb-1 opacity-50">Transmission From</p>
                                            <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{contact.name}</h3>
                                            <p className="text-gray-400 font-mono text-xs mt-1">{contact.email}</p>
                                        </div>
                                        <span className="text-gray-600 text-[10px] font-mono uppercase tracking-[0.2em] bg-white/5 px-4 py-1">
                                            {new Date(contact.created_at).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="bg-black/40 p-6 border-l-4 border-[#00a3ff] relative">
                                        <div className="absolute top-0 left-0 w-8 h-8 bg-[#00a3ff]/5 blur-xl"></div>
                                        <p className="text-gray-300 text-sm leading-relaxed font-medium italic">"{contact.message}"</p>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button className="text-[10px] font-black text-gray-500 hover:text-[#00a3ff] uppercase tracking-[0.3em] transition-all flex items-center gap-2 italic">
                                            Archives_Transmission <ExternalLink className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ label, value }) => (
    <div className="bg-[#141416] border border-white/5 p-8 relative overflow-hidden group hover:border-[#00a3ff]/30 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a3ff]/5 blur-[60px] -mr-16 -mt-16 group-hover:bg-[#00a3ff]/10 transition-all duration-700"></div>
        <div className="relative z-10">
            <p className="text-gray-500 font-black text-[9px] mb-2 uppercase tracking-[0.3em] opacity-70 group-hover:text-[#00a3ff] transition-colors">{label}</p>
            <p className="text-5xl font-black text-white tracking-tighter italic leading-none">{String(value).padStart(2, '0')}</p>
        </div>
        <div className="absolute bottom-4 right-8 h-px w-12 bg-[#00a3ff]/20 group-hover:w-24 transition-all duration-700"></div>
    </div>
);

export default AdminDashboard;
