import React, { useMemo, useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import Select from '../../components/Select'
import TextInput from '../../components/inputs/Text'
import NumInput from '../../components/inputs/NumInput'
import type { IdName, Product, TradeRow } from '../../lib/types'
import { fmtDateNoYear } from '../../lib/format'

export default function SellForm({ sb, inventory, products, customers, onDone }:{ sb: SupabaseClient; inventory: TradeRow[]; products: Product[]; customers: IdName[]; onDone: ()=>Promise<void> }) {
  const [inventory_row_id, setInventoryRowId] = useState<string>('');
  const [qty_units, setQtyUnits] = useState<number>(0);
  const [customer_id, setCustomerId] = useState<string>('');
  const [sold_at, setSoldAt] = useState<string>(new Date().toISOString().slice(0,10));
  const [price, setPrice] = useState<number>(0);
  const [msg, setMsg] = useState<string>('');

  const productById = useMemo(() => {
    const m = new Map<string, Product>();
    products.forEach(p => m.set(p.id, p));
    return m;
  }, [products]);

  const inventoryOptions = useMemo(() => inventory.map(r => {
    const pname = productById.get(r.in_product_id)?.name || '';
    return { value: r.id, label: `${pname} / ${fmtDateNoYear(r.purchased_at)} / 件数 ${r.in_qty_units}` };
  }), [inventory, productById]);

  const customerOptions = useMemo(()=>customers.map(c=>({ value: c.id, label: c.name })), [customers]);

  async function submit() {
    setMsg('');
    const { error } = await sb.rpc('fn_split_and_sell', {
      p_row_id: inventory_row_id,
      p_sell_qty_units: Number(qty_units),
      p_customer_id: customer_id,
      p_sold_at: sold_at,
      p_out_unit_price: Number(price),
    });
    if (error) { setMsg('販売エラー: ' + (error.message||String(error))); return; }
    setMsg('在庫を分割して販売しました');
    setQtyUnits(0); setPrice(0);
    await onDone();
  }

  return (
    <div className="row">
      <div className="col-6"><Select label="在庫行" value={inventory_row_id} onChange={setInventoryRowId} options={inventoryOptions} /></div>
      <div className="col-3"><NumInput label="販売件数" value={qty_units} onCommit={setQtyUnits} /></div>
      <div className="col-3"><Select label="販売先" value={customer_id} onChange={setCustomerId} options={customerOptions} /></div>
      <div className="col-6"><TextInput label="販売日" type="date" value={sold_at} onChange={setSoldAt} /></div>
      <div className="col-6"><NumInput label="販売単価" value={price} onCommit={setPrice} /></div>
      <div className="col-12" style={{display:'flex', justifyContent:'flex-end'}}>
        <button className="btn" onClick={submit}>販売を確定</button>
      </div>
      {msg && <div className="col-12 muted">{msg}</div>}
    </div>
  )
}
