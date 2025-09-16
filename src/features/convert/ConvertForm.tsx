import React, { useMemo, useState, useEffect } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import Select from '../../components/Select'
import TextInput from '../../components/inputs/Text'
import NumInput from '../../components/inputs/NumInput'
import type { IdName, Product, TradeRow } from '../../lib/types'
import { fmtDateNoYear } from '../../lib/format'

export default function ConvertForm({ sb, inventory, products, categories, onDone }:{ sb: SupabaseClient; inventory: TradeRow[]; products: Product[]; categories: IdName[]; onDone: ()=>Promise<void> }) {
  const [inventory_row_id, setInventoryRowId] = useState<string>('');
  const [use_qty_units, setUseQtyUnits] = useState<number>(0);
  const [out_product_id, setOutProductId] = useState<string>('');
  const [out_unit_name, setOutUnitName] = useState<string>('箱');
  const [out_unit_price, setOutUnitPrice] = useState<number>(0);
  const [sold_at, setSoldAt] = useState<string>(new Date().toISOString().slice(0,10));
  const [msg, setMsg] = useState<string>('');

  const catNameById = useMemo(() => {
    const m = new Map<string,string>();
    categories.forEach(c => m.set(c.id, c.name));
    return m;
  }, [categories]);

  const productById = useMemo(() => {
    const m = new Map<string, Product>();
    products.forEach(p => m.set(p.id, p));
    return m;
  }, [products]);

  const inventoryOptions = useMemo(() => inventory.map(r => {
    const pname = productById.get(r.in_product_id)?.name || '';
    return { value: r.id, label: `${pname} / ${fmtDateNoYear(r.purchased_at)} / 件数 ${r.in_qty_units}` };
  }), [inventory, productById]);

  const baseCategoryId = useMemo(() => {
    const row = inventory.find(x => x.id === inventory_row_id);
    const p = row ? productById.get(row.in_product_id) : undefined;
    return p?.category_id || null;
  }, [inventory_row_id, inventory, productById]);

  const convertProductOptions = useMemo(() => {
    const list = products.filter(p => p.category_id === baseCategoryId);
    return list.map(p => ({ value: p.id, label: `${p.code} - ${p.name}` }));
  }, [products, baseCategoryId]);

  useEffect(() => {
    if (convertProductOptions.length === 0) return;
    setOutProductId(prev => {
      if (!prev || !convertProductOptions.some(o => o.value === prev)) {
        return convertProductOptions[0].value;
      }
      return prev;
    });
  }, [baseCategoryId, convertProductOptions]);

  async function submit() {
    setMsg('');
    const outCode = productById.get(out_product_id)?.code || '';
    const { error } = await sb.rpc('fn_convert_to_product', {
      p_row_id: inventory_row_id,
      p_use_qty_units: Number(use_qty_units),
      p_out_product_code: outCode,
      p_out_unit_name: out_unit_name,
      p_out_unit_price: Number(out_unit_price) || null,
      p_sold_at: sold_at,
    });
    if (error) { setMsg('組替エラー: ' + (error.message||String(error))); return; }
    setMsg('在庫を組替しました（原料消費＋新在庫）');
    setUseQtyUnits(0); setOutUnitPrice(0);
    await onDone();
  }

  return (
    <div className="row">
      <div className="col-6"><Select label="在庫行" value={inventory_row_id} onChange={setInventoryRowId} options={inventoryOptions} /></div>
      <div className="col-6"><NumInput label="原料に使う数量" value={use_qty_units} onCommit={setUseQtyUnits} /></div>
      <div className="col-6"><Select label="出来高の製品名" value={out_product_id} onChange={setOutProductId} options={convertProductOptions} /></div>
      <div className="col-3"><TextInput label="出来高の単位名" value={out_unit_name} onChange={setOutUnitName} placeholder="箱 など" /></div>
      <div className="col-3"><NumInput label="出来高の原価/単価(任意)" value={out_unit_price} onCommit={setOutUnitPrice} /></div>
      <div className="col-6"><TextInput label="組替日" type="date" value={sold_at} onChange={setSoldAt} /></div>
      <div className="col-12" style={{display:'flex', justifyContent:'flex-end'}}>
        <button className="btn" onClick={submit}>組替を実行</button>
      </div>
      {msg && <div className="col-12 muted">{msg}</div>}
    </div>
  )
}
