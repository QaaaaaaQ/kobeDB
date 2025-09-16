export function fmtDateNoYear(s?: string | null): string {
  if (!s) return "";
  const d = new Date(s);
  if (isNaN(+d)) return String(s);
  const mm = String(d.getMonth()+1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

export function nfmt(v: any): string {
  if (v === null || v === undefined || v === "") return "";
  const n = Number(v);
  if (Number.isFinite(n)) return n.toLocaleString();
  return String(v);
}
