/*
  # Dodanie systemu ról i konta administratora

  1. Zmiany w schemacie
    - Dodanie kolumny `role` do tabeli `user_profiles`
    - Domyślna rola to 'customer'
    - Możliwe role: 'customer', 'admin'

  2. Utworzenie konta administratora
    - Email: ydadmin@admin.local
    - Hasło: !MegaAdminYD1
    - Rola: admin

  3. Bezpieczeństwo
    - Aktualizacja polityk RLS dla dostępu administratora do wszystkich zasobów
*/

-- Dodaj kolumnę role do user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'role'
  ) THEN
    ALTER TABLE user_profiles 
    ADD COLUMN role text DEFAULT 'customer' CHECK (role IN ('customer', 'admin'));
  END IF;
END $$;

-- Utwórz użytkownika administratora
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Sprawdź czy użytkownik już istnieje
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'ydadmin@admin.local';
  
  -- Jeśli nie istnieje, utwórz go
  IF admin_user_id IS NULL THEN
    -- Wstaw użytkownika do auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      invited_at,
      confirmation_token,
      confirmation_sent_at,
      recovery_token,
      recovery_sent_at,
      email_change_token_new,
      email_change,
      email_change_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone,
      phone_confirmed_at,
      phone_change,
      phone_change_token,
      phone_change_sent_at,
      email_change_token_current,
      email_change_confirm_status,
      banned_until,
      reauthentication_token,
      reauthentication_sent_at,
      is_sso_user,
      deleted_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'ydadmin@admin.local',
      crypt('!MegaAdminYD1', gen_salt('bf')),
      now(),
      NULL,
      '',
      NULL,
      '',
      NULL,
      '',
      '',
      NULL,
      NULL,
      '{"provider":"email","providers":["email"],"role":"admin"}',
      '{"role":"admin"}',
      false,
      now(),
      now(),
      NULL,
      NULL,
      '',
      '',
      NULL,
      '',
      0,
      NULL,
      '',
      NULL,
      false,
      NULL
    )
    RETURNING id INTO admin_user_id;
    
    -- Utwórz profil użytkownika z rolą admin
    INSERT INTO user_profiles (id, email, full_name, role)
    VALUES (admin_user_id, 'ydadmin@admin.local', 'YDadmin - Administrator', 'admin');
  END IF;
END $$;

-- Polityki RLS dla administratorów - dostęp do wszystkich produktów
CREATE POLICY "Admins can manage all products"
  ON products FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

-- Polityki RLS dla administratorów - dostęp do wszystkich zamówień
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role = 'admin'
    )
  );