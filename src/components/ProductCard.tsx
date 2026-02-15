import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    rating?: number;
    stock: number;
    product_images?: Array<{ image_url: string }>;
  };
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const imageUrl = product.product_images?.[0]?.image_url || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Brak w magazynie</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 h-14 hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < (product.rating || 0)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">({product.rating?.toFixed(1) || '0.0'})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {product.price.toFixed(2)} PLN
          </span>

          <button
            onClick={() => onAddToCart(product.id)}
            disabled={product.stock === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Dodaj</span>
          </button>
        </div>
      </div>
    </div>
  );
}
