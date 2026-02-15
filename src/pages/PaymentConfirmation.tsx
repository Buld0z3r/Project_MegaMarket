import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { CheckCircle, XCircle, Loader, Package } from 'lucide-react';

export default function PaymentConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);

  const paymentId = searchParams.get('paymentId');
  const status = searchParams.get('status');

  useEffect(() => {
    loadPaymentDetails();
  }, [paymentId]);

  const loadPaymentDetails = async () => {
    try {
      if (!paymentId) {
        navigate('/');
        return;
      }

      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .single();

      if (paymentError) throw paymentError;

      setPayment(paymentData);

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            price_at_purchase,
            products (
              name
            )
          )
        `)
        .eq('id', paymentData.order_id)
        .single();

      if (orderError) throw orderError;

      setOrder(orderData);
    } catch (error) {
      console.error('Error loading payment details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const isSuccess = payment?.payment_status === 'completed' || status === 'completed';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className={`p-8 text-center ${isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
            {isSuccess ? (
              <>
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-green-900 mb-2">
                  Płatność zakończona sukcesem!
                </h1>
                <p className="text-green-700">
                  Dziękujemy za zakupy. Twoje zamówienie zostało opłacone.
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-red-900 mb-2">
                  Płatność nieudana
                </h1>
                <p className="text-red-700">
                  Nie udało się przetworzyć płatności. Spróbuj ponownie.
                </p>
              </>
            )}
          </div>

          <div className="p-8">
            {order && (
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    Szczegóły zamówienia
                  </h2>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Numer zamówienia:</span>
                      <div className="font-semibold">{order.id.substring(0, 8).toUpperCase()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Data:</span>
                      <div className="font-semibold">
                        {new Date(order.created_at).toLocaleDateString('pl-PL')}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Metoda płatności:</span>
                      <div className="font-semibold">
                        {order.payment_method === 'blik' && 'BLIK'}
                        {order.payment_method === 'przelewy24' && 'Przelewy24'}
                        {order.payment_method === 'przy_odbiorze' && 'Płatność przy odbiorze'}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <div className="font-semibold">
                        {isSuccess ? (
                          <span className="text-green-600">Opłacone</span>
                        ) : (
                          <span className="text-red-600">Oczekuje na płatność</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Zamówione produkty:</h3>
                  <div className="space-y-2">
                    {order.order_items?.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm py-2 border-b">
                        <span className="text-gray-700">
                          {item.products?.name} x{item.quantity}
                        </span>
                        <span className="font-semibold">
                          {(item.price_at_purchase * item.quantity).toFixed(2)} PLN
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Razem:</span>
                    <span className="text-blue-600">{order.total_amount.toFixed(2)} PLN</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Adres dostawy:</strong><br />
                    {order.shipping_address}
                    {order.phone && (
                      <>
                        <br />
                        <strong>Telefon:</strong> {order.phone}
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <button
                onClick={() => navigate('/orders')}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Zobacz moje zamówienia
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Wróć do sklepu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
