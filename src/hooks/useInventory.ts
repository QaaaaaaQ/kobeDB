import { useEffect, useMemo, useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import type { TradeRow, ViewRowEN, Product } from '../lib/types';
import { JP2EN, LABELS } from '../lib/constants';

export function useInventory(sb: SupabaseClient | null) {
  const [inventory, setInventory] = useState<TradeRow[]>([]);
  const [viewRows, setViewRows] = useState<ViewRowEN[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sb) return;
    (async () => {
      setLoading(true); setError(null);
      try {
        const inv = await sb
          .from('trade_rows')
          .select('id, doc_no, purchased_at, supplier_id, in_product_id, in_unit_id, in_qty_units, in_unit_price, state, out_qty_units')
          .is('out_qty_units', null)
          .order('purchased_at', { ascending: false });
        if (inv.error) throw inv.error;
        setInventory(inv.data || []);

        const vw = await sb.from('v_trade_rows_grid').select('*').limit(5000);
        if (vw.error) throw vw.error;
        const mapped = (vw.data || []).map((row: any) => {
          const o: any = {};
          Object.keys(row).forEach((k) => {
            const en = JP2EN[k];
            if (en && en in LABELS) {
              o[en] = row[k];
            } else if (en === 'doc_no') {
              o['doc_no'] = row[k];
            }
          });
          return o as ViewRowEN;
        });
        mapped.sort((a,b) => {
          const ad = new Date(a.sold_at || a.purchase_date || 0).getTime();
          const bd = new Date(b.sold_at || b.purchase_date || 0).getTime();
          return bd - ad;
        });
        setViewRows(mapped);
      } catch (e: any) {
        setError(e?.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [sb]);

  return { inventory, viewRows, loading, error };
}
