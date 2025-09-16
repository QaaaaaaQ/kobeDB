import { useEffect, useMemo, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import type { IdName, Product } from '../lib/types';

export function useMasters(sb: SupabaseClient | null) {
  const [products, setProducts] = useState<Product[]>([]);
  const [units, setUnits] = useState<IdName[]>([]);
  const [suppliers, setSuppliers] = useState<IdName[]>([]);
  const [customers, setCustomers] = useState<IdName[]>([]);
  const [categories, setCategories] = useState<IdName[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sb) return;
    (async () => {
      setLoading(true); setError(null);
      try {
        const [p, u, s, cu, cats] = await Promise.all([
          sb.from('products').select('id,code,name,category_id').order('code'),
          sb.from('units').select('id,name').order('name'),
          sb.from('suppliers').select('id,name').order('name'),
          sb.from('customers').select('id,name').order('name'),
          sb.from('categories').select('id,name').order('name'),
        ]);
        if (p.error) throw p.error; if (u.error) throw u.error; if (s.error) throw s.error; if (cu.error) throw cu.error; if (cats.error) throw cats.error;
        setProducts(p.data || []);
        setUnits(u.data || []);
        setSuppliers(s.data || []);
        setCustomers(cu.data || []);
        setCategories(cats.data || []);
      } catch (e: any) {
        setError(e?.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [sb]);

  const categoryNameById = useMemo(() => {
    const m = new Map<string, string>();
    categories.forEach(c => m.set(c.id, c.name));
    return m;
  }, [categories]);

  return { products, units, suppliers, customers, categories, categoryNameById, loading, error };
}
