import React from 'react'
export default function TextInput({ label, value, onChange, type = 'text', placeholder }: { label: string; value: string; onChange: (v: string)=>void; type?: string; placeholder?: string }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={(e)=>onChange(e.target.value)} />
    </div>
  )
}
