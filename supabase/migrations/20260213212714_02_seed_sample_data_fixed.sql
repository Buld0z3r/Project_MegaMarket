/*
  # Seed Sample Data

  1. Sample Categories
    - Elektronika
    - Moda
    - Dom i ogród
    - Sport i rekreacja
    - Książki
    - Zabawki

  2. Sample Products
    - 20+ produktów z różnych kategorii
    - Obrazy z Pexels
    - Realistyczne ceny i opisy
*/

INSERT INTO categories (name, description, icon) VALUES
  ('Elektronika', 'Najnowsze urządzenia elektroniczne', '💻'),
  ('Moda', 'Odzież i akcesoria', '👗'),
  ('Dom i ogród', 'Wszystko do domu i ogrodu', '🏡'),
  ('Sport i rekreacja', 'Sprzęt sportowy i turystyczny', '⚽'),
  ('Książki', 'Literatura i publikacje', '📚'),
  ('Zabawki', 'Zabawki dla dzieci', '🧸')
ON CONFLICT (name) DO NOTHING;

DO $$
DECLARE
  cat_elektronika uuid;
  cat_moda uuid;
  cat_dom uuid;
  cat_sport uuid;
  cat_ksiazki uuid;
  cat_zabawki uuid;
BEGIN
  SELECT id INTO cat_elektronika FROM categories WHERE name = 'Elektronika';
  SELECT id INTO cat_moda FROM categories WHERE name = 'Moda';
  SELECT id INTO cat_dom FROM categories WHERE name = 'Dom i ogród';
  SELECT id INTO cat_sport FROM categories WHERE name = 'Sport i rekreacja';
  SELECT id INTO cat_ksiazki FROM categories WHERE name = 'Książki';
  SELECT id INTO cat_zabawki FROM categories WHERE name = 'Zabawki';

  INSERT INTO products (category_id, name, description, price, stock, rating, review_count) VALUES
    (cat_elektronika, 'Laptop Premium 15"', 'Wydajny laptop z procesorem i7, 16GB RAM, 512GB SSD', 3499.99, 15, 4.5, 127),
    (cat_elektronika, 'Słuchawki bezprzewodowe', 'Słuchawki z redukcją szumów i długim czasem pracy', 299.99, 45, 4.7, 89),
    (cat_elektronika, 'Smartwatch Sport', 'Zegarek sportowy z monitorem tętna i GPS', 799.99, 30, 4.3, 156),
    (cat_elektronika, 'Klawiatura mechaniczna RGB', 'Gamingowa klawiatura z podświetleniem RGB', 349.99, 22, 4.6, 67),
    (cat_moda, 'T-shirt bawełniany', 'Wysokiej jakości bawełniany t-shirt', 49.99, 100, 4.8, 234),
    (cat_moda, 'Jeansy slim fit', 'Modne jeansy w stylu slim fit', 199.99, 60, 4.5, 178),
    (cat_moda, 'Bluza z kapturem', 'Wygodna bluza na chłodniejsze dni', 129.99, 75, 4.7, 145),
    (cat_moda, 'Sneakersy sportowe', 'Wygodne buty sportowe na co dzień', 249.99, 40, 4.4, 92),
    (cat_dom, 'Zestaw garnków', '5-elementowy zestaw garnków ze stali nierdzewnej', 399.99, 25, 4.6, 112),
    (cat_dom, 'Lampa biurkowa LED', 'Nowoczesna lampa LED z regulacją jasności', 159.99, 35, 4.7, 89),
    (cat_dom, 'Pościel bawełniana', 'Komplet pościeli 160x200', 149.99, 50, 4.5, 67),
    (cat_dom, 'Sokowirówka', 'Wydajna sokowirówka wolnoobrotowa', 499.99, 18, 4.8, 134),
    (cat_sport, 'Mata do jogi', 'Antypoślizgowa mata do jogi i ćwiczeń', 89.99, 55, 4.6, 201),
    (cat_sport, 'Hantle regulowane', 'Para hantli 2-20kg z możliwością regulacji', 449.99, 20, 4.7, 87),
    (cat_sport, 'Butelka sportowa 1L', 'Bidon sportowy z filtrem', 39.99, 120, 4.3, 345),
    (cat_sport, 'Rower miejski', 'Wygodny rower na każdą trasę', 1299.99, 8, 4.5, 56),
    (cat_ksiazki, 'Książka kulinarna', 'Przepisy z całego świata', 79.99, 40, 4.8, 234),
    (cat_ksiazki, 'Powieść kryminalna', 'Bestseller roku 2024', 49.99, 65, 4.6, 567),
    (cat_ksiazki, 'Poradnik psychologiczny', 'Jak radzić sobie ze stresem', 59.99, 30, 4.7, 189),
    (cat_zabawki, 'Klocki konstrukcyjne', 'Zestaw 500 elementów', 149.99, 45, 4.9, 456),
    (cat_zabawki, 'Pluszowy miś', 'Miękki pluszak 50cm', 79.99, 70, 4.8, 234),
    (cat_zabawki, 'Puzzle 1000 elementów', 'Piękny krajobraz górski', 69.99, 35, 4.5, 123)
  ON CONFLICT DO NOTHING;

  INSERT INTO product_images (product_id, image_url, alt_text, display_order)
  SELECT p.id, 
    CASE p.name
      WHEN 'Laptop Premium 15"' THEN 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Słuchawki bezprzewodowe' THEN 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Smartwatch Sport' THEN 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Klawiatura mechaniczna RGB' THEN 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'T-shirt bawełniany' THEN 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Jeansy slim fit' THEN 'https://images.pexels.com/photos/1485630/pexels-photo-1485630.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Bluza z kapturem' THEN 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Sneakersy sportowe' THEN 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Zestaw garnków' THEN 'https://images.pexels.com/photos/4254167/pexels-photo-4254167.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Lampa biurkowa LED' THEN 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Pościel bawełniana' THEN 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Sokowirówka' THEN 'https://images.pexels.com/photos/7937487/pexels-photo-7937487.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Mata do jogi' THEN 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Hantle regulowane' THEN 'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Butelka sportowa 1L' THEN 'https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Rower miejski' THEN 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Książka kulinarna' THEN 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Powieść kryminalna' THEN 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Poradnik psychologiczny' THEN 'https://images.pexels.com/photos/4350057/pexels-photo-4350057.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Klocki konstrukcyjne' THEN 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Pluszowy miś' THEN 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=800'
      WHEN 'Puzzle 1000 elementów' THEN 'https://images.pexels.com/photos/3661193/pexels-photo-3661193.jpeg?auto=compress&cs=tinysrgb&w=800'
    END,
    p.name,
    0
  FROM products p
  WHERE NOT EXISTS (
    SELECT 1 FROM product_images WHERE product_id = p.id
  );
END $$;