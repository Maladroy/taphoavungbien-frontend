import React, { useEffect, useState } from "react";
import { Order } from "../types";
import { formatMoney } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Check,
  RotateCcw,
  Clock,
  Printer,
  ChevronLeft,
  Truck,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

interface OrderDetailViewProps {
  order: Order;
  onNavigate: (view: string) => void;
  onRequestRefund: (orderId: string) => void;
}

const STATUS_STEPS = [
  "Đã đặt hàng",
  "Đã xác nhận",
  "Đang đóng gói",
  "Đang vận chuyển",
  "Đã giao hàng",
];

const PAYMENT_LABELS: Record<string, string> = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank: "Chuyển khoản ngân hàng / VietQR",
  card: "Thẻ quốc tế (Visa / MasterCard)",
};

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({
  order,
  onNavigate,
  onRequestRefund,
}) => {
  // Live ticking 1-hour refund timer
  const deadline = order.date + 60 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(Math.max(0, deadline - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, deadline - Date.now());
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const canRefund = !order.isRefundRequested && timeLeft > 0;
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate("account")}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--indigo)] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Quay lại Đơn hàng của tôi</span>
        </button>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          className="text-xs font-semibold"
        >
          <Printer className="w-3.5 h-3.5 mr-1" />
          In hoá đơn
        </Button>
      </div>

      {/* Header title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="font-bold text-xs uppercase tracking-wider">
            Chi tiết đơn hàng
          </Badge>
          <span className="text-xs text-[var(--ink-soft)]">
            Ngày đặt: {new Date(order.date).toLocaleString("vi-VN")}
          </span>
        </div>
        <h1 className="font-serif-rustic font-bold text-3xl text-[var(--ink)]">
          Đơn hàng #{order.id}
        </h1>
      </div>

      {/* Timeline Status Tracker */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-rustic font-bold text-base text-[var(--ink)] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[var(--tea)]" />
            <span>Tiến độ vận chuyển</span>
          </h2>
          <span className="text-xs font-bold text-[var(--tea)]">
            {order.isRefundRequested
              ? "Yêu cầu huỷ / hoàn tiền"
              : STATUS_STEPS[order.statusIndex - 1] || "Đang xử lý"}
          </span>
        </div>

        {/* Stepper */}
        <div className="relative flex items-center justify-between pt-2 pb-1">
          {STATUS_STEPS.map((step, idx) => {
            const isCompleted = !order.isRefundRequested && idx < order.statusIndex;
            const isCurrent = !order.isRefundRequested && idx === order.statusIndex - 1;

            return (
              <div
                key={step}
                className="relative flex flex-col items-center flex-1 text-center"
              >
                {/* Connecting bar */}
                {idx > 0 && (
                  <div
                    className={`absolute top-3.5 -left-1/2 w-full h-[2px] z-0 transition-colors ${
                      isCompleted ? "bg-[var(--tea)]" : "bg-[var(--line)]"
                    }`}
                  />
                )}

                {/* Dot */}
                <div
                  className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                    isCompleted
                      ? "bg-[var(--tea)] border-[var(--tea)] text-white shadow-xs"
                      : isCurrent
                      ? "bg-[var(--card)] border-[var(--ginger)] text-[var(--ginger-deep)] animate-pulse"
                      : "bg-[var(--card)] border-[var(--line)] text-[var(--ink-soft)]"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-[11px] sm:text-xs mt-2 line-clamp-1 max-w-[80px] font-medium ${
                    isCompleted || isCurrent
                      ? "text-[var(--ink)] font-bold"
                      : "text-[var(--ink-soft)]"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-[var(--ink-soft)] pt-2 border-t border-[var(--line)]/50">
          Cập nhật vận chuyển lần cuối:{" "}
          <strong>{new Date(order.trackingUpdatedAt).toLocaleString("vi-VN")}</strong> (tự động đối chiếu hệ thống bưu chính)
        </p>
      </div>

      {/* 1-Hour Refund & Guarantee Banner */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6 shadow-xs">
        {order.isRefundRequested ? (
          <div className="flex items-start gap-3.5 text-xs text-[var(--ink-soft)]">
            <div className="w-9 h-9 rounded-xl bg-[var(--seal-tint)] text-[var(--seal)] flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-sm font-bold text-[var(--seal)] block mb-1">
                Yêu cầu hoàn tiền trong 1 giờ đã được ghi nhận!
              </strong>
              <p className="leading-relaxed">
                Đội ngũ chăm sóc khách hàng của Tạp hoá vùng biên đã tiếp nhận yêu cầu huỷ đơn #{order.id}.
                Khoản tiền thanh toán sẽ được hoàn trả theo phương thức thanh toán ban đầu trong ít phút.
              </p>
            </div>
          </div>
        ) : canRefund ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-alt)] border border-[var(--ginger)]/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[var(--ginger-deep)]" />
                <strong className="text-sm font-bold text-[var(--ink)]">
                  Bạn vẫn có thể huỷ & hoàn tiền miễn phí
                </strong>
              </div>
              <p className="text-xs text-[var(--ink-soft)]">
                Trong 1 giờ đầu tiên, bạn có toàn quyền huỷ đơn nhận lại 100% tiền mà không cần nêu lý do.
              </p>
            </div>

            <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0">
              <div className="font-serif-rustic font-bold text-lg text-[var(--ginger-deep)] flex items-center gap-1.5 bg-[var(--card)] px-3 py-1 rounded-lg border border-[var(--line)]">
                <Clock className="w-4 h-4 text-[var(--ginger)]" />
                <span>
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </span>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onRequestRefund(order.id)}
                className="font-bold text-xs"
              >
                Yêu cầu hoàn tiền ngay
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4 text-xs text-[var(--ink-soft)]">
            <div className="space-y-1">
              <strong className="font-bold text-[var(--ink)] block">
                Đã quá thời gian tự hoàn tiền tự động (60 phút)
              </strong>
              <p>
                Đơn hàng đang trong tiến trình chuẩn bị gói kỹ lưỡng. Nếu có bất kỳ thắc mắc hoặc cần điều chỉnh địa chỉ,
                vui lòng liên hệ trực tiếp với chúng tôi qua Zalo hoặc Hotline để được hỗ trợ nhanh nhất.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert("Tổng đài hỗ trợ Zalo/Hotline: 0912 345 678 (24/7)")}
              className="shrink-0 text-xs font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1" />
              Hỗ trợ Zalo
            </Button>
          </div>
        )}
      </div>

      {/* Vintage Perforated Paper Receipt */}
      <div>
        <h3 className="font-serif-rustic font-bold text-lg text-[var(--ink)] mb-3">
          Hoá đơn bán lẻ & giao hàng
        </h3>

        <div className="zigzag-receipt rounded-t-xl border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8 font-mono text-xs sm:text-sm text-[var(--ink)] shadow-md space-y-4">
          <div className="text-center pb-4 border-b border-dashed border-[var(--line)]">
            <div className="font-serif-rustic font-bold text-lg uppercase tracking-wider text-[var(--indigo)]">
              Tạp hoá vùng biên
            </div>
            <div className="text-[11px] text-[var(--ink-soft)] mt-0.5">
              Đặc sản vùng biên — giao tận tay
            </div>
            <div className="text-[10px] text-[var(--ink-soft)] mt-1">
              Phiếu thanh toán & kiểm hàng trực tiếp
            </div>
          </div>

          {/* Metadata lines */}
          <div className="space-y-1.5 text-xs pb-3 border-b border-dashed border-[var(--line)]">
            <div className="flex justify-between">
              <span className="text-[var(--ink-soft)]">Mã đơn hàng:</span>
              <strong className="font-bold text-[var(--ink)]">#{order.id}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--ink-soft)]">Ngày đặt:</span>
              <span>{new Date(order.date).toLocaleString("vi-VN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--ink-soft)]">Thanh toán:</span>
              <span>{PAYMENT_LABELS[order.pay] || order.pay}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--ink-soft)]">Người nhận:</span>
              <span>{order.customerInfo.name} ({order.customerInfo.phone})</span>
            </div>
            <div className="flex justify-between text-right">
              <span className="text-[var(--ink-soft)]">Địa chỉ:</span>
              <span className="max-w-[280px] line-clamp-2">{order.customerInfo.address}</span>
            </div>
          </div>

          {/* Itemized lines */}
          <div className="space-y-2 py-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <span className="max-w-[280px]">
                  {item.name} <span className="text-[var(--ink-soft)]">× {item.qty}</span>
                </span>
                <span className="font-semibold shrink-0">
                  {formatMoney(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          {/* Total calculation */}
          <div className="space-y-1.5 pt-3 border-t border-dashed border-[var(--line)] text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--ink-soft)]">Tạm tính:</span>
              <span>{formatMoney(order.subtotal)}</span>
            </div>

            {order.discount > 0 && (
              <div className="flex justify-between text-[var(--tea)] font-semibold">
                <span>Giảm giá ({order.coupon}):</span>
                <span>-{formatMoney(order.discount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-[var(--ink-soft)]">Cước giao hàng:</span>
              <span className="text-[var(--tea)] font-bold">Miễn phí</span>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-[var(--line)] font-bold text-base sm:text-lg">
              <span>TỔNG CỘNG:</span>
              <span className="text-[var(--ginger-deep)]">{formatMoney(order.total)}</span>
            </div>
          </div>

          <div className="text-center pt-3 text-[10px] text-[var(--ink-soft)] space-y-0.5">
            <p>Cảm ơn quý khách đã tin dùng sản vật quê hương vùng biên.</p>
            <p>Hotline/Zalo hỗ trợ: 1900 xxxx · www.taphoavungbien.vn</p>
          </div>
        </div>
      </div>
    </div>
  );
};
