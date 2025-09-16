import React, { useMemo, useState } from 'react'
import Section from '../../components/Section'
import Select from '../../components/Select'
import { LABELS, DEFAULT_STATE_FILTER } from '../../lib/constants'
import type { ViewRowEN, Product, IdName } from '../../lib/types'
import { fmtDateNoYear, nfmt } from '../../lib/format'

export default function TradeList({ rows, products, categories }:{ rows: ViewRowEN[]; products: Product[]; categories: IdName[] }) {
  const [listCategory, setListCategory] = useState<string>('');
  const [listState, setListState] = useState<string>(DEFAULT_STATE_FILTER);

  const catNameById = useMemo(() => {
    const m = new Map<string,string>(); categories.forEach(c => m.set(c.id, c.name)); return m;
  }, [categories]);

  const productNameToCategoryName = useMemo(() => {
    const map = new Map<string,string>();
    products.forEach(p => { const cname = p.category_id ? catNameById.get(p.category_id) : undefined; if (p.name && cname) map.set(p.name, cname); });
    return map;
  }, [products, catNameById]);

  const categoryOptions = useMemo(() => {
    const names = Array.from(new Set(categories.map(c => c.name).filter(Boolean) as string[])).sort((a,b)=>a.localeCompare(b,'ja'));
    return [{ value: '', label: 'すべて' }, ...names.map(n => ({ value: n, label: n }))];
  }, [categories]);

  const stateOptions = useMemo(() => {
    const set = new Set<string>(); rows.forEach(r => { if (r.state) set.add(r.state); }); set.add('在庫');
    const arr = Array.from(set).sort((a,b)=>a.localeCompare(b,'ja'));
    return [{ value: '', label: 'すべて' }, ...arr.map(s => ({ value: s, label: s }))];
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter(r => {
      if (listCategory) {
        const cat = r.product_name ? productNameToCategoryName.get(r.product_name) : undefined;
        if (cat !== listCategory) return false;
      }
      if (listState) {
        if ((r.state || '') !== listState) return false;
      }
      return true;
    });
  }, [rows, listCategory, listState, productNameToCategoryName]);

  const COLS: { key: keyof ViewRowEN, cls?: string }[] = [
    { key: 'purchase_date' },
    { key: 'supplier' },
    { key: 'product_name' },
    { key: 'qty_units', cls: 'num' },
    { key: 'unit_name' },
    { key: 'kg', cls: 'num' },
    { key: 'unit_price', cls: 'num' },
    { key: 'amount', cls: 'num' },
    { key: 'form_name' },
    { key: 'sold_at' },
    { key: 'customer' },
    { key: 'sales_product_name' },
    { key: 'sales_qty_units', cls: 'num' },
    { key: 'sales_unit_name' },
    { key: 'sales_kg', cls: 'num' },
    { key: 'sales_unit_price', cls: 'num' },
    { key: 'sales_amount', cls: 'num' },
    { key: 'state' },
  ];

  return (
    <Section title="一覧（仕入/販売/組替/在庫)">
      <div className="filters">
        <div className="w-200"><Select label="分類（一覧フィルタ）" value={listCategory} onChange={setListCategory} options={categoryOptions} /></div>
        <div className="w-200"><Select label="状態（一覧フィルタ）" value={listState} onChange={setListState} options={stateOptions} /></div>
        <div className="muted" style={{marginLeft: 'auto'}}>件数: {filtered.length}</div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {COLS.map(c => <th key={String(c.key)}>{LABELS[c.key]}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i}>
                <td>{fmtDateNoYear(r.purchase_date)}</td>
                <td>{r.supplier || ''}</td>
                <td>{r.product_name || ''}</td>
                <td className="num">{nfmt(r.qty_units)}</td>
                <td>{r.unit_name || ''}</td>
                <td className="num">{nfmt(r.kg)}</td>
                <td className="num">{nfmt(r.unit_price)}</td>
                <td className="num">{nfmt(r.amount)}</td>
                <td>{r.form_name || ''}</td>
                <td>{fmtDateNoYear(r.sold_at)}</td>
                <td>{r.customer || ''}</td>
                <td>{r.sales_product_name || ''}</td>
                <td className="num">{nfmt(r.sales_qty_units)}</td>
                <td>{r.sales_unit_name || ''}</td>
                <td className="num">{nfmt(r.sales_kg)}</td>
                <td className="num">{nfmt(r.sales_unit_price)}</td>
                <td className="num">{nfmt(r.sales_amount)}</td>
                <td>{r.state || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
