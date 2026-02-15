import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star, Package, Truck } from 'lucide-react';
import { supabase } from '../services/supabase';
import { cartService } from '../services/cart';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  review_count: number;
  category: {
    name: string;
  };
  images: Array<{
    image_url: string;
    alt_text: string;
  }>;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(name),
          images:product_images(image_url, alt_text, display_order)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data.images) {
        data.images.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
      }

      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToCart() {
    if (!product) return;

    setAddingToCart(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      const cart = await cartService.getOrCreateCart(user.id);
      await cartService.addToCart(cart.id, product.id, quantity);
      alert('Dodano do koszyka!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Błąd podczas dodawania do koszyka');
    } finally {
      setAddingToCart(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Ładowanie...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produkt nie znaleziony</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Wróć
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage]?.image_url || '/placeholder-product.jpg'}
              alt={product.images[selectedImage]?.alt_text || product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text || `${product.name} - zdjęcie ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-sm text-gray-500 mb-2">{product.category.name}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {product.rating.toFixed(1)} ({product.review_count} opinii)
                </span>
              </div>
            </div>

            <div className="text-4xl font-bold text-blue-600 mb-6">
              {product.price.toFixed(2)} PLN
            </div>
          </div>

          <div className="border-t border-b py-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Package className="w-5 h-5 text-green-600" />
              <span>
                {product.stock > 0
                  ? `Dostępne: ${product.stock} szt.`
                  : 'Brak w magazynie'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>Darmowa dostawa od 100 PLN</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ilość
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addingToCart}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {addingToCart ? 'Dodawanie...' : 'Dodaj do koszyka'}
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Opis produktu</h3>
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
