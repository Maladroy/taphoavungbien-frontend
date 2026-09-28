import React, { useState } from "react";
import { CartItem, Product, Coupon, CustomerInfo, PaymentMethod } from "../types";
import { formatMoney } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { RusticIcon } from "../components/RusticIcon";
import confetti from "canvas-confetti";
import {
  CreditCard,
  Truck,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface CheckoutViewProps {
  cart: CartItem[];
  products: Product[];
  appliedCoupon: Coupon | null;
  customerInfo: CustomerInfo;
  onUpdateCustomerInfo: (info: CustomerInfo) => void;
  onPlaceOrder: (paymentMethod: PaymentMethod) => void;
  onNavigate: (view: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  products,
  appliedCoupon,
  customerInfo,
  onUpdateCustomerInfo,
  onPlaceOrder,
  onNavigate,
}) => {
  const [payMethod, setPayMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState(customerInfo.name || "Nguyễn Văn Hùng");
  const [phone, setPhone] = useState(customerInfo.phone || "0912 345 678");
  const [address, setAddress] = useState(
    customerInfo.address || "Số 45 Ngõ 12 Đội Cấn, Ba Đình, Hà Nội"
  );
  const [note, setNote] = useState(customerInfo.note || "");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng.");
      return;
    }

    setIsSubmitting(true);
    onUpdateCustomerInfo({ name, phone, address, note });

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D98E2B", "#2A3B5C", "#4B6B4E", "#B33A2E"],
      });
    } catch (err) {
      // ignore
    }

    setTimeout(() => {
      onPlaceOrder(payMethod);
      setIsSubmitting(false);
    }, 600);
  };

  if (lines.length === 0) {
    return (
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-serif-rustic font-bold text-2xl text-[var(--ink)]">
          Giỏ hàng trống
        </h2>
        <Button onClick={() => onNavigate("shop")} className="mt-4 font-bold">
          Quay lại cửa hàng
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="font-serif-rustic font-bold text-3xl sm:text-4xl text-[var(--ink)] mb-2">
        Thanh toán đơn hàng
      </h1>
      <p className="text-sm text-[var(--ink-soft)] mb-8">
        Kiểm tra thông tin giao nhận và chọn phương thức thanh toán an toàn.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Shipping & Payment Method */}
        <div className="lg:col-span-8 space-y-6">
          {/* Shipping Details */}
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 space-y-4">
            <h2 className="font-serif-rustic font-bold text-lg text-[var(--ink)] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[var(--ginger-deep)]" />
              <span>1. Thông tin người nhận hàng</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--ink)]">
                  Họ và tên người nhận *
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--ink)]">
                  Số điện thoại nhận hàng *
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xx xxx xxx"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--ink)]">
                Địa chỉ chi tiết (Số nhà, đường, phường/xã, tỉnh/thành) *
              </label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Số nhà, ngõ/ngách, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                required
                rows={2}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--ink)]">
                Ghi chú cho shipper (không bắt buộc)
              </label>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="VD: Giao giờ hành chính, gọi trước khi giao 15 phút…"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 space-y-4">
            <h2 className="font-serif-rustic font-bold text-lg text-[var(--ink)] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[var(--indigo)]" />
              <span>2. Phương thức thanh toán</span>
            </h2>

            <div className="space-y-3">
              {/* COD */}
              <label
                className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                  payMethod === "cod"
                    ? "border-[var(--ginger)] bg-[var(--ginger-tint)]/40 shadow-xs"
                    : "border-[var(--line)] bg-[var(--bg-alt)]/50 hover:bg-[var(--bg-alt)]"
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  value="cod"
                  checked={payMethod === "cod"}
                  onChange={() => setPayMethod("cod")}
                  className="accent-[var(--ginger)] w-4 h-4"
                />
                <Truck className="w-5 h-5 text-[var(--ginger-deep)] shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-sm text-[var(--ink)]">
                    Thanh toán khi nhận hàng (COD)
                  </div>
                  <div className="text-xs text-[var(--ink-soft)]">
                    Kiểm tra đúng đặc sản rồi mới thanh toán tiền mặt cho nhân viên giao hàng.
                  </div>
                </div>
              </label>

              {/* VietQR / Bank */}
              <label
                className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                  payMethod === "bank"
                    ? "border-[var(--indigo)] bg-[var(--indigo-tint)]/40 shadow-xs"
                    : "border-[var(--line)] bg-[var(--bg-alt)]/50 hover:bg-[var(--bg-alt)]"
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  value="bank"
                  checked={payMethod === "bank"}
                  onChange={() => setPayMethod("bank")}
                  className="accent-[var(--indigo)] w-4 h-4"
                />
                <QrCode className="w-5 h-5 text-[var(--indigo)] shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
                    <span>Chuyển khoản VietQR / Ngân hàng</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      Khuyên dùng
                    </span>
                  </div>
                  <div className="text-xs text-[var(--ink-soft)]">
                    Quét mã QR tự động điền số tiền và nội dung, xác nhận tự động 24/7.
                  </div>
                </div>
              </label>

              {/* Visa/Mastercard */}
              <label
                className={`flex items-center gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                  payMethod === "card"
                    ? "border-[var(--seal)] bg-[var(--seal-tint)]/40 shadow-xs"
                    : "border-[var(--line)] bg-[var(--bg-alt)]/50 hover:bg-[var(--bg-alt)]"
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  value="card"
                  checked={payMethod === "card"}
                  onChange={() => setPayMethod("card")}
                  className="accent-[var(--seal)] w-4 h-4"
                />
                <CreditCard className="w-5 h-5 text-[var(--seal)] shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-sm text-[var(--ink)]">
                    Thẻ quốc tế (Visa, Mastercard, JCB)
                  </div>
                  <div className="text-xs text-[var(--ink-soft)]">
                    Bảo mật thẻ mã hoá chuẩn PCI DSS qua cổng thanh toán bảo đảm.
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-xs space-y-4">
            <h2 className="font-serif-rustic font-bold text-lg text-[var(--ink)]">
              Đơn hàng của bạn
            </h2>

            {/* Line items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[var(--line)]/50">
              {lines.map(({ product, qty, lineTotal }) => (
                <div key={product.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[var(--bg-alt)] flex items-center justify-center text-[var(--ink-soft)] shrink-0">
                      <RusticIcon name={product.icon} size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--ink)] line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-[var(--ink-soft)]">
                        SL: {qty} × {formatMoney(product.price)}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-[var(--ink)] shrink-0">
                    {formatMoney(lineTotal)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm text-[var(--ink-soft)] pt-3 border-t border-[var(--line)]">
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

              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="text-[var(--tea)] font-bold">Miễn phí</span>
              </div>

              <div className="pt-3 border-t border-[var(--line)] flex justify-between items-baseline text-[var(--ink)]">
                <span className="font-serif-rustic font-bold text-base">Tổng thanh toán</span>
                <span className="font-bold text-2xl text-[var(--ginger-deep)]">
                  {formatMoney(grandTotal)}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full mt-4 font-bold text-base shadow-md cursor-pointer"
            >
              {isSubmitting ? "Đang xử lý đơn hàng…" : "Xác nhận đặt hàng"}
            </Button>

            <div className="pt-2 text-center text-[11px] text-[var(--ink-soft)] space-y-1">
              <div className="flex items-center justify-center gap-1 text-[var(--tea)] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Kích hoạt quyền đổi trả miễn phí trong 60 phút</span>
              </div>
              <p>Bạn có thể bấm huỷ và hoàn tiền ngay tại mục Đơn hàng.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
