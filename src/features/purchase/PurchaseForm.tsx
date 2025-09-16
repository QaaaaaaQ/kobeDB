import React, { useEffect, useMemo, useState } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import Select from '../../components/Select'
import TextInput from '../../components/inputs/Text'
import NumInput from '../../components/inputs/NumInput'
import type { IdName, Product } from '../../lib/types'
import { generateDocNo, supplierNameForCategory } from '../../lib/utils'

export default function PurchaseForm({ sb, products, units, suppliers, categories, onDone }:{ sb: SupabaseClient; products: Product[]; units: IdName[]; suppliers: IdName[]; categories: IdName[]; onDone: ()=>Promise<void> }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('赤貝');
  const [purchased_at, setPurchasedAt] = useState<string>(new Date().toISOString().slice(0,10));
  const [supplier_id, setSupplierId] = useState<string>('');
  const [in_product_id, setInProductId] = useState<string>('');
  const [in_unit_id, setInUnitId] = useState<string>('');
  const [in_qty_units, setInQtyUnits] = useState<number>(0);
  const [in_unit_price, setInUnitPrice] = useState<number>(0);
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    const catMap = new Map(categories.map(c => [c.id, c.name] as const));
    const first = products.find(p => (catMap.get(p.category_id || '') || '') === selectedCategory);
    if (first && in_product_id !== first.id) setInProductId(first.id);
    const name = supplierNameForCategory(selectedCategory);
    if (name && suppliers.length) {
      const s = suppliers.find(x => x.name === name);
      if (s && supplier_id !== s.id) setSupplierId(s.id);
    }
  }, [selectedCategory, products, suppliers, categories]);

  useEffect(() => {
    if (!units.length) return;
    if (!in_unit_id) {
      const kg = units.find(u => u.name === '㎏');
      setInUnitId(kg?.id || units[0]?.id || '');
    }
  }, [units]);

  const categoryOptions = useMemo(() => {
    return Array.from(new Set(categories.map(c => c.name).filter(Boolean) as string[]))
      .sort((a,b)=>a.localeCompare(b,'ja')).map(n => ({ value: n, label: n }));
  }, [categories]);

  const productOptions = useMemo(() => {
    const catMap = new Map(categories.map(c => [c.id, c.name] as const));
    return products
      .filter(p => (catMap.get(p.category_id || '') || '') === selectedCategory)
      .sort((a,b)=>(a.code||'').localeCompare(b.code||'','ja'))
      .map(p => ({ value: p.id, label: `${p.code} - ${p.name}` }));
  }, [products, categories, selectedCategory]);

  const unitOptions = useMemo(()=>units.map(u=>({ value: u.id, label: u.name })), [units]);
  const supplierOptions = useMemo(()=>suppliers.map(s=>({ value: s.id, label: s.name })), [suppliers]);

  async function submit() {
    setMsg('');
    const payload = {
      doc_no: generateDocNo(),
      purchased_at, supplier_id: supplier_id || null,
      in_product_id, in_unit_id,
      in_qty_units: Number(in_qty_units),
      in_unit_price: Number(in_unit_price),
      state: '在庫',
    };
    const { error } = await sb.from('trade_rows').insert(payload);
    if (error) { setMsg('仕入 登録エラー: ' + (error.message||String(error))); return; }
    setMsg('仕入を登録しました');
    setInQtyUnits(0); setInUnitPrice(0);
    await onDone();
  }

  return (
    <div className="row">
      <div className="col-12 muted">取引番号は登録時に自動採番</div>
      <div className="col-6"><TextInput label="仕入日" type="date" value={purchased_at} onChange={setPurchasedAt} /></div>
      <div className="col-6"><Select label="仕入先" value={supplier_id} onChange={setSupplierId} options={supplierOptions} /></div>
      <div className="col-6"><Select label="分類" value={selectedCategory} onChange={setSelectedCategory} options={categoryOptions} /></div>
      <div className="col-6"><Select label="商品" value={in_product_id} onChange={setInProductId} options={productOptions} /></div>
      <div className="col-4"><Select label="単位" value={in_unit_id} onChange={setInUnitId} options={unitOptions} /></div>
      <div className="col-4"><NumInput label="件数" value={in_qty_units} onCommit={setInQtyUnits} /></div>
      <div className="col-4"><NumInput label="仕入単価" value={in_unit_price} onCommit={setInUnitPrice} /></div>
      <div className="col-12" style={{display:'flex', justifyContent:'flex-end'}}>
        <button className="btn" onClick={submit}>登録</button>
      </div>
      {msg && <div className="col-12 muted">{msg}</div>}
    </div>
  )
}
