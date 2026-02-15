import { supabase } from './supabase';
import { cartService } from './cart';

export const orderService = {
  async createOrder(
    userId: string,
    shippingAddress: string,
    phone: string,
    notes?: string,
    paymentMethod: string = 'przy_odbiorze'
  ) {
    const cart = await cartService.getOrCreateCart(userId);
    const cartWithItems = await cartService.getCartWithItems(cart.id);

    if (!cartWithItems?.cart_items || cartWithItems.cart_items.length === 0) {
      throw new Error('Cart is empty');
    }

    const totalAmount = cartWithItems.cart_items.reduce(
      (sum: number, item: any) => sum + (item.products?.price || 0) * item.quantity,
      0
    );

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        phone,
        notes: notes || null,
        status: 'pending',
        payment_method: paymentMethod,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = cartWithItems.cart_items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.products?.price || 0,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    await cartService.clearCart(cart.id);

    return order;
  },

  async getOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          quantity,
          price_at_purchase,
          products (
            name,
            product_images (image_url)
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getOrderById(id: string, userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id,
          product_id,
          quantity,
          price_at_purchase,
          products (
            name,
            product_images (image_url)
          )
        )
      `)
      .eq('id', id)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
