import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/orders';
import { cartService } from '../services/cart';
import { supabase } from '../services/supabase';
import { Loader } from 'lucide-react';

export function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'przy_odbiorze' | 'blik' | 'przelewy24'>('przy_odbiorze');

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

      if (!cartWithItems?.cart_items || cartWithItems.cart_items.length === 0) {
        navigate('/cart');
        return;
      }

      setCart(cartWithItems);
    } catch (err) {
      console.error('Error loading cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const address = `${formData.street}, ${formData.postalCode} ${formData.city}`;

      const order = await orderService.createOrder(
        user.id,
        address,
        formData.phone,
        formData.notes,
        paymentMethod
      );

      if (paymentMethod === 'przy_odbiorze') {
        alert('Zamówienie złożone pomyślnie! Zapłacisz przy odbiorze.');
        navigate('/orders');
      } else {
        const { data: payment, error: paymentError } = await supabase
          .from('payments')
          .insert({
            order_id: order.id,
            payment_method: paymentMethod,
            amount: total,
            payment_status: 'pending'
          })
          .select()
          .single();

        if (paymentError) throw paymentError;

        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId: payment.id,
            orderId: order.id,
            amount: total,
            paymentMethod: paymentMethod,
            description: `Zamówienie #${order.id.substring(0, 8)}`,
            email: user.email
          })
        });

        const result = await response.json();

        if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
        } else {
          throw new Error('Nie udało się utworzyć sesji płatności');
        }
      }
    } catch (err: any) {
      console.error('Error creating order:', err);
      alert('Błąd podczas składania zamówienia: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
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
        <h1 className="text-3xl font-bold mb-8">Finalizacja zamówienia</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Dane do wysyłki</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ulica i numer *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kod pocztowy *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Miasto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Uwagi do zamówienia
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h2 className="text-xl font-bold mb-4">Metoda płatności</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="przy_odbiorze"
                      checked={paymentMethod === 'przy_odbiorze'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <div className="font-semibold">Płatność przy odbiorze</div>
                      <div className="text-sm text-gray-600">Zapłać gotówką lub kartą przy dostawie</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="blik"
                      checked={paymentMethod === 'blik'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <div className="font-semibold">BLIK</div>
                      <div className="text-sm text-gray-600">Szybka płatność kodem z aplikacji bankowej</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="przelewy24"
                      checked={paymentMethod === 'przelewy24'}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <div className="font-semibold">Przelewy24</div>
                      <div className="text-sm text-gray-600">Płatność online - karty, przelewy bankowe</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold text-lg"
              >
                {isSubmitting ? 'Przetwarzanie...' : paymentMethod === 'przy_odbiorze' ? 'Złóż zamówienie' : 'Przejdź do płatności'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Twoje zamówienie</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.products?.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      {((item.products?.price || 0) * item.quantity).toFixed(2)} PLN
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Produkty:</span>
                  <span>{total.toFixed(2)} PLN</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
