import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, AlertCircle, Package, User, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { adminShopService } from '@/features/api/services/admin-shop.service.js';

const statusOptions = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];
const statusColors = { pending: 'bg-yellow-100 text-yellow-800', paid: 'bg-blue-100 text-blue-800', processing: 'bg-indigo-100 text-indigo-800', shipped: 'bg-purple-100 text-purple-800', delivered: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800' };

export function AdminShopOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [tracking, setTracking] = useState({ carrier: '', trackingNumber: '', trackingUrl: '' });

  useEffect(() => { loadOrder(); }, [id]);

  const loadOrder = async () => {
    try { setLoading(true); const res = await adminShopService.getOrder(id); const o = res.data.data; setOrder(o); setStatus(o.status); setTracking(o.trackingInfo || { carrier: '', trackingNumber: '', trackingUrl: '' }); }
    catch { setError('Order not found.'); } finally { setLoading(false); }
  };

  const handleSave = async () => {
    try { setSaving(true); setError(''); await adminShopService.updateOrderStatus(id, { status, trackingInfo: tracking }); await loadOrder(); }
    catch (err) { setError(err.response?.data?.message || 'Update failed.'); } finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary-blue" /></div>;
  if (!order) return <div className="text-center py-20 text-text-secondary">Order not found.</div>;

  const addr = order.shippingAddress || {};

  return (
    <div className="max-w-4xl space-y-6 pb-20 animate-in">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/shop/orders')} className="p-2 hover:bg-bg-light rounded-full transition-colors"><ArrowLeft className="w-5 h-5 text-text-secondary" /></button>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-text-dark">{order.orderNumber}</h1>
          <p className="text-sm text-text-secondary">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${statusColors[order.status] || 'bg-gray-100'}`}>{order.status}</span>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm flex items-center gap-2"><AlertCircle className="w-5 h-5" />{error}</div>}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Customer */}
        <div className="bg-white p-5 rounded-xl border border-border-light shadow-sm">
          <h3 className="font-semibold flex items-center gap-2 mb-3"><User className="w-4 h-4 text-primary-blue" /> Customer</h3>
          <p className="text-sm"><strong>{order.buyer?.name}</strong></p>
          <p className="text-sm text-text-secondary">{order.buyer?.email}</p>
          {order.buyer?.phone && <p className="text-sm text-text-secondary">{order.buyer.phone}</p>}
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-5 rounded-xl border border-border-light shadow-sm">
          <h3 className="font-semibold flex items-center gap-2 mb-3"><Package className="w-4 h-4 text-primary-blue" /> Shipping Address</h3>
          <p className="text-sm">{addr.name}</p>
          <p className="text-sm text-text-secondary">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
          <p className="text-sm text-text-secondary">{addr.city}, {addr.state} - {addr.pincode}</p>
        </div>

        {/* Payment */}
        <div className="bg-white p-5 rounded-xl border border-border-light shadow-sm">
          <h3 className="font-semibold flex items-center gap-2 mb-3"><CreditCard className="w-4 h-4 text-primary-blue" /> Payment</h3>
          <p className="text-sm">Provider: <strong>{order.payment?.provider}</strong></p>
          <p className="text-sm">Status: <strong className="capitalize">{order.payment?.status}</strong></p>
          {order.payment?.razorpayPaymentId && <p className="text-sm text-text-muted font-mono">{order.payment.razorpayPaymentId}</p>}
        </div>

        {/* Update Status */}
        <div className="bg-white p-5 rounded-xl border border-border-light shadow-sm space-y-4">
          <h3 className="font-semibold flex items-center gap-2"><Truck className="w-4 h-4 text-primary-blue" /> Update Status</h3>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border-light bg-bg-light text-sm capitalize">
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <Input placeholder="Carrier" value={tracking.carrier} onChange={(e) => setTracking((p) => ({ ...p, carrier: e.target.value }))} />
          <Input placeholder="Tracking Number" value={tracking.trackingNumber} onChange={(e) => setTracking((p) => ({ ...p, trackingNumber: e.target.value }))} />
          <Input placeholder="Tracking URL" value={tracking.trackingUrl} onChange={(e) => setTracking((p) => ({ ...p, trackingUrl: e.target.value }))} />
          <Button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}<Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white p-5 rounded-xl border border-border-light shadow-sm">
        <h3 className="font-semibold mb-4">Order Items</h3>
        <div className="space-y-3">
          {order.items?.map((item, i) => (
            <div key={i} className="flex gap-3 items-center border-b border-border-light pb-3 last:border-0">
              {item.image ? <img src={item.image} alt="" className="w-14 h-14 rounded-lg object-cover" /> : <div className="w-14 h-14 rounded-lg bg-gray-100" />}
              <div className="flex-1"><p className="text-sm font-medium">{item.title}</p><p className="text-xs text-text-muted">Qty: {item.quantity} × ₹{item.price?.toLocaleString()}</p></div>
              <span className="font-semibold text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border-light mt-3 pt-3 space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{order.subtotal?.toLocaleString()}</span></div>
          {order.donationExtra > 0 && <div className="flex justify-between text-warm-orange"><span>Extra Donation</span><span>₹{order.donationExtra.toLocaleString()}</span></div>}
          <div className="flex justify-between font-bold text-base pt-1"><span>Total</span><span>₹{order.total?.toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );
}
