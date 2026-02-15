import { supabase } from './supabase';

export const productService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  },

  async getProducts(categoryId?: string, searchQuery?: string) {
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (id, name),
        product_images (id, image_url, alt_text)
      `)
      .order('created_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (id, name),
        product_images (id, image_url, alt_text, display_order),
        reviews (
          id,
          rating,
          title,
          comment,
          created_at,
          user_profiles (full_name)
        )
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
