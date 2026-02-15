import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/orders';
import { supabase } from '../services/supabase';
import { Loader, Package, ShoppingBag } from 'lucide-react';

export function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const userOrders = await orderService.getOrders(user.id);
      setOrders(userOrders || []);
    } catch (err) {
      console.error('Error loading orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Zrealizowane';
      case 'pending':
        return 'Oczekujące';
      case 'processing':
        return 'W realizacji';
      case 'cancelled':
        return 'Anulowane';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Moje zamówienia</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Nie masz jeszcze żadnych zamówień
            </h2>
            <p className="text-gray-500 mb-6">
              Czas na pierwsze zakupy!
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Przejdź do sklepu
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Zamówienie #{order.id.slice(0, 8)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('pl-PL', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Wartość zamówienia</p>
                      <p className="text-xl font-bold text-blue-600">
                        {order.total_amount.toFixed(2)} PLN
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Produkty</p>
                      <p className="text-lg font-semibold">
                        {order.order_items?.length || 0} szt.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Adres dostawy</p>
                      <p className="text-sm font-medium">{order.shipping_address}</p>
                    </div>
                  </div>

                  {order.order_items && order.order_items.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Zamówione produkty:</p>
                      <div className="space-y-2">
                        {order.order_items.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded">
                            {item.products?.product_images?.[0]?.image_url && (
                              <img
                                src={item.products.product_images[0].image_url}
                                alt={item.products.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{item.products?.name}</p>
                              <p className="text-sm text-gray-600">Ilość: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-800">
                              {item.price_at_purchase.toFixed(2)} PLN
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
