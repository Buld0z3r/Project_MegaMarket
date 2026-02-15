import { supabase } from './supabase';

export const cartService = {
  async getOrCreateCart(userId: string) {
    let { data: cart, error } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;

    if (!cart) {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: userId })
        .select()
        .single();

      if (createError) throw createError;
      cart = newCart;
    }

    return cart;
  },

  async getCartWithItems(cartId: string) {
    const { data, error } = await supabase
      .from('carts')
      .select(`
        *,
        cart_items (
          id,
          quantity,
          product_id,
          products (
            id,
            name,
            price,
            stock,
            product_images (image_url)
          )
        )
      `)
      .eq('id', cartId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async addToCart(cartId: string, productId: string, quantity: number = 1) {
    const { data: existing } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('cart_items')
        .insert({ cart_id: cartId, product_id: productId, quantity })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  async updateCartItem(cartItemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async removeFromCart(cartItemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
  },

  async clearCart(cartId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (error) throw error;
  },
};
