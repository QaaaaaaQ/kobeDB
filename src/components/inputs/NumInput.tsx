import React from 'react'

function toNumOrUndefined(s: string): number | undefined {
  if (s.trim() === '') return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

export default function NumInput({ label, value, onCommit, placeholder = '数値を入力' }:{ label: string; value: number; onCommit: (v: number)=>void; placeholder?: string }) {
  const [text, setText] = React.useState<string>(value === 0 ? '' : String(value));
  React.useEffect(() => { setText(value === 0 ? '' : String(value)); }, [value]);

  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="text"
        inputMode="decimal"
        value={text}
        placeholder={placeholder}
        onChange={(e)=>setText(e.target.value)}
        onBlur={()=>{
          const n = toNumOrUndefined(text);
          onCommit(Number(n ?? 0));
        }}
      />
    </div>
  )
}
