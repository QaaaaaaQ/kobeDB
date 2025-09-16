export function todayYYYYMMDD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${da}`;
}
export function generateDocNo(prefix = "P") {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${todayYYYYMMDD()}-${rand}`;
}
export function supplierNameForCategory(cat: string): string | null {
  switch (cat) {
    case "赤貝": return "振興商事";
    case "サザエ": return "唐戸";
    case "蛤": return "東源";
    case "活アワビ": return "シーオン";
    default: return null;
  }
}
export function csvToList(s: string): string[] {
  if (!s) return [];
  return s.split(/[、,]/).map(x => x.trim()).filter(Boolean);
}
