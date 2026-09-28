import React, { useState } from "react";
import { CartItem, Product, Coupon } from "../types";
import { CATEGORIES } from "../data/mockData";
import { formatMoney } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { RusticIcon } from "../components/RusticIcon";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  Tag,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

interface CartViewProps {
  cart: CartItem[];
  products: Product[];
  appliedCoupon: Coupon | null;
  onUpdateQty: (productId: number, qty: number) => void;
  onRemoveItem: (productId: number) => void;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onNavigate: (view: string, opts?: { id?: number | string }) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  products,
  appliedCoupon,
  onUpdateQty,
  onRemoveItem,
  onApplyCoupon,
  onNavigate,
}) => {
  const [couponInput, setCouponInput] = useState(appliedCoupon?.code || "");
  const [couponFeedback, setCouponFeedback] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  // Calculate lines
  const lines = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return {
      product,
      qty: item.qty,
      lineTotal: product ? product.price * item.qty : 0,
    };
  }).filter((line) => !!line.product);

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);

  // Calculate discount
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    discount =
      appliedCoupon.type === "percent"
        ? Math.round((subtotal * appliedCoupon.value) / 100)
        : appliedCoupon.value;
    if (appliedCoupon.maxDiscount) {
      discount = Math.min(discount, appliedCoupon.maxDiscount);
    }
    discount = Math.min(discount, subtotal);
  }

  const grandTotal = Math.max(0, subtotal - discount);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = onApplyCoupon(couponInput.trim());
    setCouponFeedback(res);
  };

  if (lines.length === 0) {
    return (
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="max-w-md mx-auto rounded-3xl border border-dashed border-[var(--line)] bg-[var(--card)] p-10">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-alt)] flex items-center justify-center mx-auto text-[var(--ink-soft)] mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif-rustic font-bold text-2xl text-[var(--ink)]">
            Giỏ hàng của bạn đang trống
          </h2>
          <p className="text-sm text-[var(--ink-soft)] mt-2">
            Chưa có sản vật vùng biên nào được chọn. Hãy ghé gian hàng để tìm những món ngon ưng ý nhé!
          </p>
          <Button
            size="lg"
            onClick={() => onNavigate("shop")}
            className="mt-6 font-bold"
          >
            Bắt đầu chọn hàng
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="font-serif-rustic font-bold text-3xl sm:text-4xl text-[var(--ink)] mb-8">
        Giỏ hàng của bạn ({lines.length} sản phẩm)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-8 rounded-3xl border border-[var(--line)] bg-[var(--card)] p-4 sm:p-6 divide-y divide-[var(--line)]">
          {lines.map(({ product, qty, lineTotal }) => {
            const category = CATEGORIES.find((c) => c.id === product.category) || CATEGORIES[0];
            return (
              <div
                key={product.id}
                className="py-4.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Item Details */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl bg-[var(--bg-alt)] border border-[var(--line)] flex items-center justify-center shrink-0"
                    style={{ color: category.color }}
                  >
                    <RusticIcon name={product.icon} size={32} />
                  </div>
                  <div>
                    <h3
                      onClick={() => onNavigate("product", { id: product.id } as any)}
                      className="font-serif-rustic font-semibold text-base text-[var(--ink)] hover:underline cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <div className="text-xs text-[var(--ink-soft)] mt-0.5">
                      {formatMoney(product.price)} {product.unit} · {product.origin}
                    </div>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="inline-flex items-center gap-1 text-xs text-[var(--seal)] hover:underline mt-1.5 cursor-pointer font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xoá</span>
                    </button>
                  </div>
                </div>

                {/* Qty & Line Price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0">
                  <div className="flex items-center rounded-xl border border-[var(--line)] bg-[var(--card)] p-1">
                    <button
                      onClick={() => onUpdateQty(product.id, qty - 1)}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--ink)] hover:bg-[var(--bg-alt)] cursor-pointer"
                      aria-label="Giảm"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[var(--ink)]">
                      {qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(product.id, qty + 1)}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--ink)] hover:bg-[var(--bg-alt)] cursor-pointer"
                      aria-label="Tăng"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-base text-[var(--ink)]">
                      {formatMoney(lineTotal)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary & Coupon box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-xs">
            <h2 className="font-serif-rustic font-bold text-lg text-[var(--ink)] mb-4">
              Tóm tắt đơn hàng
            </h2>

            {/* Coupon input */}
            <form onSubmit={handleApply} className="mb-4">
              <label className="text-xs font-semibold text-[var(--ink)] block mb-1.5">
                Mã ưu đãi / giảm giá
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3.5 text-[var(--ink-soft)]" />
                  <Input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="VD: FIRST10, BIEN50"
                    className="pl-8 text-xs font-semibold uppercase"
                  />
                </div>
                <Button type="submit" variant="outline" size="sm" className="h-11 font-bold text-xs">
                  Áp dụng
                </Button>
              </div>

              {couponFeedback && (
                <div
                  className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${
                    couponFeedback.success ? "text-[var(--tea)]" : "text-[var(--seal)]"
                  }`}
                >
                  {couponFeedback.success ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{couponFeedback.message}</span>
                </div>
              )}
            </form>

            <div className="space-y-2.5 text-sm text-[var(--ink-soft)] pt-3 border-t border-[var(--line)]">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-semibold text-[var(--ink)]">{formatMoney(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[var(--tea)] font-semibold">
                  <span>Giảm giá ({appliedCoupon?.code})</span>
                  <span>-{formatMoney(discount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Phí vận chuyển</span>
                <span className="text-xs bg-[var(--tea-tint)] text-[var(--tea)] font-bold px-2 py-0.5 rounded-full">
                  Miễn phí toàn quốc
                </span>
              </div>

              <div className="pt-3 border-t border-[var(--line)] flex justify-between items-baseline text-[var(--ink)]">
                <span className="font-serif-rustic font-bold text-base">Tổng thanh toán</span>
                <span className="font-bold text-2xl text-[var(--ginger-deep)]">
                  {formatMoney(grandTotal)}
                </span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => onNavigate("checkout")}
              className="w-full mt-6 font-bold text-sm shadow-md"
            >
              <span>Tiến hành thanh toán</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <div className="mt-4 flex items-center justify-center gap-1 text-[11px] text-[var(--ink-soft)]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chính sách đổi trả trong 1 giờ đầu được kích hoạt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
