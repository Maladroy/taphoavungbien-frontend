import React from "react";
import { formatMoney } from "../lib/utils";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface MobileCartBarProps {
  itemCount: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export const MobileCartBar: React.FC<MobileCartBarProps> = ({
  itemCount,
  totalPrice,
  onOpenCart,
}) => {
  if (itemCount === 0) return null;

  return (
    <div
      onClick={onOpenCart}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--indigo)] text-white px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center justify-between shadow-2xl cursor-pointer transition-transform animate-in slide-in-from-bottom-4"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[var(--ginger)] text-[#241704] flex items-center justify-center font-bold text-xs shrink-0">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs text-slate-300">
            {itemCount} món đặc sản trong giỏ
          </div>
          <div className="font-bold text-sm text-amber-200">
            {formatMoney(totalPrice)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 font-bold text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">
        <span>Xem giỏ hàng</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};
