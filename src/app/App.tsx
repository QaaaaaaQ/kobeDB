import React, { useMemo, useState } from 'react'
import Section from '../components/Section'
import { useSupabaseEnv } from '../hooks/useSupabaseEnv'
import { useMasters } from '../hooks/useMasters'
import { useInventory } from '../hooks/useInventory'
import PurchaseForm from '../features/purchase/PurchaseForm'
import SellForm from '../features/sell/SellForm'
import ConvertForm from '../features/convert/ConvertForm'
import TradeList from '../features/list/TradeList'

export default function App() {
  const { sb, status } = useSupabaseEnv();
  const { products, units, suppliers, customers, categories } = useMasters(sb);
  const { inventory, viewRows } = useInventory(sb);

  async function refreshAll() {
    window.location.reload();
  }

  return (
    <div className="container">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 12}}>
        <h1>在庫・販売・組替</h1>
        <span className="status">{status === 'ready' ? '接続OK' : status === 'missing' ? '未設定' : '...'}</span>
      </div>

      {status === 'missing' && (
        <Section title="Supabase 接続設定">
          <div className="row">
            <div className="col-12">
              <div className="muted">Vite: <code>VITE_SUPABASE_URL</code> / <code>VITE_SUPABASE_ANON_KEY</code> を .env に設定するか、<br/>ブラウザの localStorage に <code>SB_URL</code> / <code>SB_ANON</code> を設定してください。</div>
            </div>
          </div>
        </Section>
      )}

      {sb && (
        <>
          <Section title="入庫（仕入）を登録">
            <PurchaseForm sb={sb} products={products} units={units} suppliers={suppliers} categories={categories} onDone={refreshAll} />
          </Section>

          <Section title="在庫から販売（必要なら自動分割）">
            <SellForm sb={sb} inventory={inventory} products={products} customers={customers} onDone={refreshAll} />
          </Section>

          <Section title="在庫から組替（原料→出来高として新たな在庫を作成）">
            <ConvertForm sb={sb} inventory={inventory} products={products} categories={categories} onDone={refreshAll} />
          </Section>

          <TradeList rows={viewRows} products={products} categories={categories} />
        </>
      )}
    </div>
  )
}
