import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Loader2, Eye, ChevronRight } from 'lucide-react';
import { shopService } from '@/features/api/services/shop.service.js';

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
  paid: { color: 'bg-blue-100 text-blue-800', label: 'Paid' },
  processing: { color: 'bg-indigo-100 text-indigo-800', label: 'Processing' },
  shipped: { color: 'bg-purple-100 text-purple-800', label: 'Shipped' },
  delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
  cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
};

const statusSteps = ['pending', 'paid', 'processing', 'shipped', 'delivered'];

export function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await shopService.getMyOrders({ limit: 50 });
        setOrders(res.data.data || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const viewDetail = async (orderNumber) => {
    try {
      setDetailLoading(true);
      const res = await shopService.getOrder(orderNumber);
      setSelectedOrder(res.data.data);
    } catch {
      setSelectedOrder(null);
    } finally {
      setDetailLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-dark">My Orders</h1>
          <p className="text-text-secondary mt-1">Track and manage your purchases</p>
        </div>
        <Link to="/shop" className="text-sm text-primary-blue hover:underline font-medium flex items-center gap-1">
          Continue Shopping <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-20 h-20 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-text-dark">No Orders Yet</h3>
          <p className="text-text-secondary mt-2">Start shopping to see your orders here!</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary-blue text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
            <ShoppingBag className="w-5 h-5" /> Browse Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl border border-border-light p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-primary-blue">{order.orderNumber}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusConfig[order.status]?.color || 'bg-gray-100'}`}>
                      {statusConfig[order.status]?.label || order.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' · '}
                    {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-text-dark">₹{order.total?.toLocaleString()}</span>
                  <button
                    onClick={() => viewDetail(order.orderNumber)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border-light text-sm font-medium hover:bg-bg-light transition-colors"
                  >
                    <Eye className="w-4 h-4" /> Details
                  </button>
                </div>
              </div>

              {/* Order items preview */}
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {order.items?.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-border-light" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-border-light" />
                    )}
                  </div>
                ))}
                {(order.items?.length || 0) > 4 && (
                  <span className="text-xs text-text-muted ml-1">+{order.items.length - 4} more</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            {detailLoading ? (
              <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-primary-blue animate-spin" /></div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold">{selectedOrder.orderNumber}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusConfig[selectedOrder.status]?.color || 'bg-gray-100'}`}>
                    {statusConfig[selectedOrder.status]?.label || selectedOrder.status}
                  </span>
                </div>

                {/* Status Timeline */}
                {selectedOrder.status !== 'cancelled' && (
                  <div className="flex items-center gap-1 mb-6 overflow-x-auto">
                    {statusSteps.map((step, i) => {
                      const currentIdx = statusSteps.indexOf(selectedOrder.status);
                      const isActive = i <= currentIdx;
                      return (
                        <div key={step} className="flex items-center flex-1 min-w-0">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isActive ? 'bg-primary-blue' : 'bg-gray-200'}`} />
                          {i < statusSteps.length - 1 && (
                            <div className={`flex-1 h-0.5 ${i < currentIdx ? 'bg-primary-blue' : 'bg-gray-200'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="space-y-3">
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-gray-200" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                        <p className="text-xs text-text-muted">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                      </div>
                      <span className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border-light mt-4 pt-3 space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-text-secondary">Subtotal</span><span>₹{selectedOrder.subtotal?.toLocaleString()}</span></div>
                  {selectedOrder.donationExtra > 0 && (
                    <div className="flex justify-between text-warm-orange"><span>Donation</span><span>₹{selectedOrder.donationExtra.toLocaleString()}</span></div>
                  )}
                  <div className="flex justify-between font-bold text-base pt-1"><span>Total</span><span>₹{selectedOrder.total?.toLocaleString()}</span></div>
                </div>

                {selectedOrder.trackingInfo?.trackingNumber && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="font-medium text-primary-blue">Tracking: {selectedOrder.trackingInfo.trackingNumber}</p>
                    {selectedOrder.trackingInfo.carrier && <p className="text-text-muted">{selectedOrder.trackingInfo.carrier}</p>}
                  </div>
                )}

                <button onClick={() => setSelectedOrder(null)} className="w-full mt-4 py-2.5 rounded-xl border border-border-light font-medium hover:bg-bg-light transition-colors">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
