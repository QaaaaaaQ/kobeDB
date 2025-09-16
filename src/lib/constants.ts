export const LABELS = {
  purchase_date: "仕入日",
  supplier: "仕入先",
  product_name: "商品名",
  qty_units: "件数",
  unit_name: "単位",
  kg: "㎏数",
  unit_price: "単価",
  amount: "金額",
  form_name: "形態",
  sold_at: "販売日",
  customer: "販売先",
  sales_product_name: "販売商品名",
  sales_qty_units: "販売件数",
  sales_unit_name: "販売単位",
  sales_kg: "販売㎏数",
  sales_unit_price: "販売単価",
  sales_amount: "販売金額",
  state: "状態",
} as const;

export const JP2EN: Record<string, keyof typeof LABELS | "doc_no"> = {
  "仕入日": "purchase_date",
  "仕入先": "supplier",
  "商品名": "product_name",
  "件数": "qty_units",
  "単位": "unit_name",
  "㎏数": "kg",
  "単価": "unit_price",
  "金額": "amount",
  "形態": "form_name",
  "販売日": "sold_at",
  "販売先": "customer",
  "販売商品名": "sales_product_name",
  "販売件数": "sales_qty_units",
  "販売単位": "sales_unit_name",
  "販売㎏数": "sales_kg",
  "販売単価": "sales_unit_price",
  "販売金額": "sales_amount",
  "状態": "state",
  "取引番号": "doc_no"
};

export const DEFAULT_STATE_FILTER = "在庫";
