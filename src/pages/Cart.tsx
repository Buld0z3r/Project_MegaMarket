import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/cart';
import { supabase } from '../services/supabase';
import { Trash2, Plus, Minus, Loader } from 'lucide-react';

export function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const userCart = await cartService.getOrCreateCart(user.id);
      const cartWithItems = await cartService.getCartWithItems(userCart.id);
      setCart(cartWithItems);
    } catch (err) {
      console.error('Error loading cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      await cartService.removeFromCart(cartItemId);
    } else {
      await cartService.updateCartItem(cartItemId, quantity);
    }
    await loadCart();
  };

  const handleRemove = async (cartItemId: string) => {
    await cartService.removeFromCart(cartItemId);
    await loadCart();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const cartItems = cart?.cart_items || [];
  const total = cartItems.reduce(
    (sum: number, item: any) => sum + (item.products?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Koszyk zakupowy</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg mb-6">Twój koszyk jest pusty</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Przejdź do sklepu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item: any) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-6 flex gap-6">
                  {item.products?.product_images?.[0]?.image_url && (
                    <img
                      src={item.products.product_images[0].image_url}
                      alt={item.products.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2">{item.products?.name}</h3>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      {item.products?.price.toFixed(2)} PLN
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-16 text-center border border-gray-300 rounded-lg py-1"
                        min="1"
                      />
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Podsumowanie</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Produkty:</span>
                    <span>{cartItems.length} szt.</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Dostawa:</span>
                    <span className="text-green-600 font-semibold">Gratis</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold pt-4 border-t">
                    <span>Razem:</span>
                    <span className="text-blue-600">{total.toFixed(2)} PLN</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg mb-3"
                >
                  Złóż zamówienie
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
                >
                  Kontynuuj zakupy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
