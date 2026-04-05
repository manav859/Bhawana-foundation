import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext.jsx';

export function CartDrawer({ isOpen, onClose }) {
  const { items, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[999] transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary-blue" />
              <h2 className="font-display text-lg font-bold text-text-dark">
                Your Cart ({cartCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                <p className="text-text-secondary font-medium">Your cart is empty</p>
                <p className="text-sm text-text-muted mt-1">
                  Explore our shop and support children's creativity!
                </p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-primary-blue text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Shop
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 bg-gray-50 rounded-xl p-3 border border-border-light"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/shop/${item.slug}`}
                      onClick={onClose}
                      className="text-sm font-semibold text-text-dark line-clamp-2 hover:text-primary-blue transition-colors"
                    >
                      {item.title}
                    </Link>
                    <p className="text-primary-blue font-bold text-sm mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center rounded-md border border-border-light hover:bg-white disabled:opacity-40 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-7 h-7 flex items-center justify-center rounded-md border border-border-light hover:bg-white disabled:opacity-40 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-1.5 text-text-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border-light px-6 py-4 space-y-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary font-medium">Subtotal</span>
                <span className="text-lg font-bold text-text-dark">
                  ₹{cartTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-text-muted">
                Shipping is free! 🎉 Every purchase supports a child's dream.
              </p>
              <Link
                to="/cart"
                onClick={onClose}
                className="block w-full py-3 bg-primary-blue text-white text-center rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                View Cart & Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
