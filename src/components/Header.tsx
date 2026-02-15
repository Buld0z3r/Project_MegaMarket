import { ShoppingCart, User, Search, Package } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount: number;
  isLoggedIn: boolean;
  onLogout: () => void;
  onSearch: (query: string) => void;
}

export function Header({ cartCount, isLoggedIn, onLogout, onSearch }: HeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            MegaMarket
          </button>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj produktów..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </form>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/orders')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Package className="w-5 h-5" />
                  <span className="hidden md:inline">Zamówienia</span>
                </button>

                <button
                  onClick={() => navigate('/cart')}
                  className="relative flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  <span className="hidden md:inline">Koszyk</span>
                </button>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">Wyloguj</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Zaloguj się</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
