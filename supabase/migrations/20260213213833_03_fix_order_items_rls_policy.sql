/*
  # Fix RLS Policy for order_items

  1. Problem
    - Brakuje polityki INSERT dla tabeli order_items
    - Użytkownicy nie mogą składać zamówień

  2. Rozwiązanie
    - Dodanie polityki INSERT dla order_items
    - Sprawdzanie czy zamówienie należy do użytkownika
*/

CREATE POLICY "Users can insert own order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );