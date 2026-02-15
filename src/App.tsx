import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './services/supabase';
import { authService } from './services/auth';
import { cartService } from './services/cart';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import PaymentGateway from './pages/PaymentGateway';
import PaymentConfirmation from './pages/PaymentConfirmation';

function AppContent() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setCurrentUser(session?.user || null);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    const updateCartCount = async () => {
      if (currentUser) {
        try {
          const cart = await cartService.getOrCreateCart(currentUser.id);
          const cartWithItems = await cartService.getCartWithItems(cart.id);
          setCartCount(cartWithItems?.cart_items?.length || 0);
        } catch (err) {
          console.error('Error updating cart count:', err);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
  }, [currentUser]);

  const handleSearch = async (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
    await authService.signOut();
    setCurrentUser(null);
    setCartCount(0);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={cartCount}
        isLoggedIn={!!currentUser}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment-gateway" element={<PaymentGateway />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
