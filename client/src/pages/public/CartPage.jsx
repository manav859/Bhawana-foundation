import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext.jsx';
import { useBuyerAuth } from '@/features/buyer-auth/BuyerAuthContext.jsx';
import { useState } from 'react';

export function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { isAuthenticated } = useBuyerAuth();
  const [donationExtra, setDonationExtra] = useState(0);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <ShoppingBag className="w-24 h-24 text-gray-200 mb-6" />
        <h2 className="font-display text-2xl font-bold text-text-dark">Your Cart is Empty</h2>
        <p className="text-text-secondary mt-2 max-w-md">
          Explore our shop and find beautiful handmade artworks created by talented children.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-blue to-blue-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
        >
          <ShoppingCart className="w-5 h-5" /> Browse Shop
        </Link>
      </div>
    );
  }

  const grandTotal = cartTotal + donationExtra;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-dark">Shopping Cart</h1>
          <p className="text-text-secondary mt-1">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        <Link to="/shop" className="flex items-center gap-2 text-sm text-primary-blue hover:underline font-medium">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-4 bg-white rounded-2xl border border-border-light p-4 shadow-sm">
              <Link to={`/shop/${item.slug}`} className="flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover" />
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-100" />
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/shop/${item.slug}`} className="font-semibold text-text-dark hover:text-primary-blue transition-colors line-clamp-2">
                  {item.title}
                </Link>
                <p className="text-primary-blue font-bold text-lg mt-1">₹{item.price.toLocaleString()}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 border border-border-light rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2.5 py-2 hover:bg-bg-light disabled:opacity-40 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-2 font-semibold text-sm min-w-[2.5rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="px-2.5 py-2 hover:bg-bg-light disabled:opacity-40 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-text-dark">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-text-muted hover:text-coral-red transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm sticky top-24 space-y-5">
            <h2 className="font-display text-lg font-bold text-text-dark">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="font-semibold text-text-dark">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Shipping</span>
                <span className="font-semibold text-success-green">Free</span>
              </div>
            </div>

            {/* Donate Extra */}
            <div className="bg-gradient-to-r from-warm-orange/5 to-primary-blue/5 rounded-xl p-4 border border-warm-orange/10">
              <p className="text-sm font-semibold text-text-dark flex items-center gap-2">
                <Heart className="w-4 h-4 text-coral-red" /> Donate Extra
              </p>
              <p className="text-xs text-text-muted mt-1 mb-3">
                Add an extra donation to support children's education
              </p>
              <div className="flex gap-2 flex-wrap">
                {[0, 50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDonationExtra(amt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      donationExtra === amt
                        ? 'bg-warm-orange text-white'
                        : 'bg-white border border-border-light text-text-dark hover:border-warm-orange'
                    }`}
                  >
                    {amt === 0 ? 'None' : `₹${amt}`}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="0"
                value={donationExtra || ''}
                onChange={(e) => setDonationExtra(Math.max(0, Number(e.target.value) || 0))}
                className="w-full mt-2 px-3 py-2 rounded-lg border border-border-light bg-white text-sm focus:outline-none focus:ring-2 focus:ring-warm-orange/20"
                placeholder="Custom amount"
              />
            </div>

            <div className="border-t border-border-light pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-text-dark">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {isAuthenticated ? (
              <Link
                to="/checkout"
                state={{ donationExtra }}
                className="block w-full py-3.5 bg-gradient-to-r from-primary-blue to-blue-600 text-white text-center rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Proceed to Checkout
              </Link>
            ) : (
              <Link
                to="/shop/login"
                state={{ from: '/checkout' }}
                className="block w-full py-3.5 bg-gradient-to-r from-primary-blue to-blue-600 text-white text-center rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Login to Checkout
              </Link>
            )}

            <p className="text-center text-xs text-text-muted">
              🔒 Secure checkout powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
