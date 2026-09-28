import React, { useState } from "react";
import { Coupon } from "../types";
import { Button } from "./ui/button";
import { Check, Copy, Tag } from "lucide-react";

interface CouponCardProps {
  coupon: Coupon;
  onCopy: (code: string) => void;
  isApplied?: boolean;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  onCopy,
  isApplied = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex w-[300px] shrink-0 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
      {/* Code voucher side */}
      <div className="relative flex w-26 shrink-0 flex-col items-center justify-center bg-[var(--indigo)] p-3 text-white">
        {/* Top & bottom circular ticket punch notches */}
        <div className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full bg-[var(--bg)] border border-[var(--line)] z-10" />
        <div className="absolute -bottom-2.5 -right-2.5 h-5 w-5 rounded-full bg-[var(--bg)] border border-[var(--line)] z-10" />

        <Tag className="w-4 h-4 mb-1 text-[var(--ginger)] opacity-90" />
        <span className="font-serif-rustic font-bold text-base tracking-wider text-amber-200 text-center">
          {coupon.code}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-slate-300 font-medium">
          Ưu đãi
        </span>
      </div>

      {/* Info details side */}
      <div className="flex flex-1 flex-col justify-between border-l-2 border-dashed border-[var(--line)] p-3.5">
        <p className="text-xs text-[var(--ink-soft)] leading-relaxed line-clamp-3">
          {coupon.desc}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[var(--tea)]">
            {coupon.minOrder > 0
              ? `Đơn từ ${(coupon.minOrder / 1000).toLocaleString()}k`
              : "Mọi đơn hàng"}
          </span>

          <Button
            size="sm"
            variant={isApplied ? "secondary" : "default"}
            onClick={handleCopy}
            className="h-7 px-2.5 text-xs font-bold"
          >
            {isApplied ? (
              <span className="text-emerald-700 dark:text-emerald-400">Đang dùng</span>
            ) : copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Sao chép</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
