import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { CreditCard, Smartphone, Loader } from 'lucide-react';

export default function PaymentGateway() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [blikCode, setBlikCode] = useState('');

  const token = searchParams.get('token');
  const paymentId = searchParams.get('paymentId');
  const amount = searchParams.get('amount');
  const method = searchParams.get('method');
  const returnUrl = searchParams.get('returnUrl');

  useEffect(() => {
    if (!token || !paymentId || !amount || !method) {
      navigate('/');
    }
  }, [token, paymentId, amount, method, navigate]);

  const handlePayment = async (status: 'completed' | 'failed') => {
    setIsProcessing(true);

    try {
      const supabaseServiceClient = supabase;

      const { error } = await supabaseServiceClient
        .from('payments')
        .update({
          payment_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (error) throw error;

      if (status === 'completed') {
        const { data: payment } = await supabaseServiceClient
          .from('payments')
          .select('order_id')
          .eq('id', paymentId)
          .single();

        if (payment) {
          await supabaseServiceClient
            .from('orders')
            .update({ status: 'paid' })
            .eq('id', payment.order_id);
        }
      }

      if (returnUrl) {
        window.location.href = `${returnUrl}&status=${status}`;
      } else {
        navigate(`/payment-confirmation?paymentId=${paymentId}&status=${status}`);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Błąd podczas przetwarzania płatności');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Bramka płatności - Sandbox</h1>
            <p className="text-blue-100">Środowisko testowe</p>
          </div>

          <div className="p-8">
            <div className="mb-8 pb-8 border-b">
              <div className="text-center mb-2 text-gray-600">Kwota do zapłaty</div>
              <div className="text-5xl font-bold text-center text-gray-900">
                {parseFloat(amount || '0').toFixed(2)} PLN
              </div>
            </div>

            {method === 'blik' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold">Płatność BLIK</h2>
                    <p className="text-sm text-gray-600">Wpisz kod z aplikacji bankowej</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kod BLIK (6 cyfr)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="000 000"
                    value={blikCode}
                    onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center text-3xl tracking-widest px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Tryb testowy:</strong> Wpisz dowolny 6-cyfrowy kod aby zasymulować płatność.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handlePayment('completed')}
                    disabled={isProcessing || blikCode.length !== 6}
                    className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Przetwarzanie...
                      </>
                    ) : (
                      'Zapłać'
                    )}
                  </button>

                  <button
                    onClick={() => navigate('/')}
                    disabled={isProcessing}
                    className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
                  >
                    Anuluj płatność
                  </button>
                </div>
              </div>
            )}

            {method === 'przelewy24' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold">Przelewy24</h2>
                    <p className="text-sm text-gray-600">Wybierz metodę płatności</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Tryb testowy:</strong> Symulacja środowiska Przelewy24. Kliknij przycisk aby zasymulować płatność.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handlePayment('completed')}
                    disabled={isProcessing}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-gray-600" />
                      <div>
                        <div className="font-semibold">Karta płatnicza</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePayment('completed')}
                    disabled={isProcessing}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-6 h-6 text-gray-600" />
                      <div>
                        <div className="font-semibold">Przelew bankowy</div>
                        <div className="text-sm text-gray-600">Szybkie przelewy online</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate('/')}
                    disabled={isProcessing}
                    className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold mt-4"
                  >
                    Anuluj płatność
                  </button>
                </div>

                {isProcessing && (
                  <div className="flex items-center justify-center py-4">
                    <Loader className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-600 border-t">
            Płatność jest zabezpieczona SSL
          </div>
        </div>
      </div>
    </div>
  );
}
