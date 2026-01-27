
import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../api';
import { Package, Calendar, Clock, ChevronRight, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const { data } = await fetchOrders();
                setOrders(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getOrders();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#0a0a0c] min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-[#00a3ff]/20 border-t-[#00a3ff] rounded-full animate-spin" />
                    <div className="text-xs font-bold text-[#00a3ff] animate-pulse tracking-widest">RETRIEVING FLIGHT LOGS...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0c] min-h-screen pb-20 overflow-hidden relative font-mono text-gray-300">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00a3ff]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7000ff]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 pt-12">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                        <Package className="w-6 h-6 text-[#00a3ff]" />
                    </div>
                    <div>
                          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Mission <span className="text-gradient">Log</span></h1>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Order History & Status</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="glass-card p-12 text-center border-dashed border-white/10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <Search className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 uppercase">No Missions Found</h3>
                        <p className="text-gray-500 text-sm max-w-md mb-8">You haven't requisitioned any gear yet. Visit the Armory to equip your fleet.</p>
                        <Link to="/shop" className="px-8 py-3 bg-[#00a3ff] text-black font-black uppercase tracking-widest text-xs rounded hover:bg-[#00e5ff] transition-colors">
                            Go to Armory
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="glass-card p-0 border-white/10 overflow-hidden group hover:border-[#00a3ff]/30 transition-all">
                                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl font-black text-white tracking-widest">#{order.id.toString().padStart(6, '0')}</div>
                                        <StatusBadge status={order.status || 'Processing'} />
                                    </div>
                                    <div className="flex items-center gap-6 text-xs font-bold text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="px-3 py-1 bg-white/5 rounded text-white">${parseFloat(order.total_amount).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Requisitioned Assets</p>
                                    {/* Since backend might purely return order details, listing items implies we need to fetch them or they are included. 
                                        For now, user just asked to 'take orders', detailed item view might require more backend work.
                                        We will assume basic display. If items aren't in response, we'll just show total.
                                        Based on typical implementation, we might not have items without a join. 
                                        Let's keep it simple.
                                    */}
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Package className="w-4 h-4" />
                                        <span>Items included in shipment</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        Processing: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        Shipped: 'bg-[#00a3ff]/10 text-[#00a3ff] border-[#00a3ff]/20',
        Delivered: 'bg-green-500/10 text-green-500 border-green-500/20',
        Cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
    };

    return (
        <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.Processing}`}>
            {status}
        </span>
    );
};

export default Orders;
