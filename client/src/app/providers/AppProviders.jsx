import { AuthProvider } from '@/features/auth/auth.context.jsx';
import { BuyerAuthProvider } from '@/features/buyer-auth/BuyerAuthContext.jsx';
import { CartProvider } from '@/features/cart/CartContext.jsx';

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <BuyerAuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </BuyerAuthProvider>
    </AuthProvider>
  );
}
