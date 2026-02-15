/*
  # Dodanie systemu płatności

  1. Nowe tabele
    - `payments` - przechowuje informacje o płatnościach
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `payment_method` (text) - metoda płatności (BLIK, Przelewy24, przy_odbiorze)
      - `payment_status` (text) - status płatności (pending, completed, failed, cancelled)
      - `amount` (decimal) - kwota płatności
      - `transaction_id` (text) - ID transakcji z bramki płatności
      - `payment_url` (text) - URL do płatności w bramce
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Zmiany w istniejących tabelach
    - Dodanie kolumny `payment_method` do tabeli `orders`

  3. Bezpieczeństwo
    - Włączenie RLS dla tabeli `payments`
    - Polityki dostępu dla użytkowników
*/

-- Dodanie kolumny payment_method do tabeli orders
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'payment_method'
  ) THEN
    ALTER TABLE orders ADD COLUMN payment_method text DEFAULT 'przy_odbiorze';
  END IF;
END $$;

-- Utworzenie tabeli payments
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  payment_method text NOT NULL,
  payment_status text DEFAULT 'pending' NOT NULL,
  amount decimal(10, 2) NOT NULL,
  transaction_id text,
  payment_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indeksy dla lepszej wydajności
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);

-- Włączenie RLS dla tabeli payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Użytkownicy mogą przeglądać swoje płatności
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = payments.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Użytkownicy mogą tworzyć płatności dla swoich zamówień
CREATE POLICY "Users can create payments for own orders"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = payments.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Tylko system może aktualizować status płatności (przez Edge Functions z service role)
CREATE POLICY "Service role can update payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (false)
  WITH CHECK (false);
