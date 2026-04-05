import { useLocation, Link, useParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Package, ArrowRight } from 'lucide-react';

export function OrderConfirmationPage() {
  const { id: orderNumber } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Success Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-success-green/20 rounded-full animate-ping" />
          <div className="relative w-24 h-24 bg-gradient-to-br from-success-green to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold text-text-dark mb-3">
          Order Confirmed! 🎉
        </h1>
        <p className="text-text-secondary text-lg">
          Thank you for your purchase! Your support makes a real difference.
        </p>

        {/* Order Number */}
        <div className="mt-8 bg-white rounded-2xl border border-border-light p-6 shadow-sm">
          <p className="text-sm text-text-muted mb-1">Order Number</p>
          <p className="text-2xl font-bold text-primary-blue font-mono">{orderNumber}</p>

          {order && (
            <div className="mt-4 space-y-2 text-sm border-t border-border-light pt-4">
              <div className="flex justify-between">
                <span className="text-text-secondary">Items</span>
                <span className="font-medium">{order.items?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Total Paid</span>
                <span className="font-bold text-text-dark">₹{order.total?.toLocaleString()}</span>
              </div>
              {order.donationExtra > 0 && (
                <div className="flex justify-between text-warm-orange">
                  <span>Extra Donation ❤️</span>
                  <span className="font-medium">₹{order.donationExtra.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Impact Message */}
        <div className="mt-6 bg-gradient-to-r from-primary-blue/5 via-warm-orange/5 to-primary-blue/5 rounded-2xl p-6 border border-primary-blue/10">
          <p className="text-lg font-semibold text-text-dark">🌟 You're Making a Difference!</p>
          <p className="text-sm text-text-secondary mt-2">
            Your purchase directly supports children's education and creative development.
            Every rupee counts towards building a brighter future.
          </p>
        </div>

        {/* A confirmation email note */}
        <p className="mt-6 text-sm text-text-muted">
          📧 A confirmation email has been sent to your registered email address.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/my-orders"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-border-light font-semibold text-text-dark hover:bg-bg-light transition-colors"
          >
            <Package className="w-4 h-4" /> My Orders
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-blue to-blue-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
