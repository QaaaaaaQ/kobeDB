export type IdName = { id: string; name: string };
export type Product = { id: string; code: string; name: string; category_id: string | null };

export type TradeRow = {
  id: string;
  doc_no: string | null;
  purchased_at: string;
  supplier_id: string | null;
  in_product_id: string;
  in_unit_id: string;
  in_qty_units: number;
  in_unit_price: number | null;
  state: string | null;
};

export type ViewRowEN = {
  purchase_date: string | null;
  supplier: string | null;
  product_name: string | null;
  qty_units: number | null;
  unit_name: string | null;
  kg: number | null;
  unit_price: number | null;
  amount: number | null;
  form_name: string | null;
  sold_at: string | null;
  customer: string | null;
  sales_product_name: string | null;
  sales_qty_units: number | null;
  sales_unit_name: string | null;
  sales_kg: number | null;
  sales_unit_price: number | null;
  sales_amount: number | null;
  state: string | null;
  doc_no?: string | null;
};
