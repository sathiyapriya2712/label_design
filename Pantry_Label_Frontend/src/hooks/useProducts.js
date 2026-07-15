import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export const useProducts = (stateId, categoryId, searchQuery) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    // If no stateId is selected, we might not fetch products, or we can fetch a default list if backend allows.
    // The requirement says: GET /api/products?state={id} (state is always required to start browsing)
    if (!stateId) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await productService.getProducts(stateId, categoryId, searchQuery);
      setProducts(response.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [stateId, categoryId, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
};

export default useProducts;
