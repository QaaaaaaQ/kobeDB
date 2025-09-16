import React from 'react'
export default function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string)=>void; options: { value: string; label: string }[] }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select value={value} onChange={(e)=>onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
