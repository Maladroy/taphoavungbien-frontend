import React from "react";
import { Product } from "../types";
import { CATEGORIES } from "../data/mockData";
import { formatMoney } from "../lib/utils";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RusticIcon } from "./RusticIcon";
import { Plus, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onOpenDetail: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  onAddToCart,
  isInCart = false,
}) => {
  const category = CATEGORIES.find((c) => c.id === product.category) || CATEGORIES[0];

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[var(--ginger)]/50">
      {/* Corner Stamp Badge */}
      {product.badge && (
        <span className="absolute top-3 right-3 z-10 font-bold text-[11px] px-2.5 py-0.5 rounded-md shadow-xs bg-[var(--ginger-tint)] text-[var(--ginger-deep)] border border-[var(--ginger)]/30 rotate-2">
          {product.badge}
        </span>
      )}

      <div>
        {/* Weave Pattern visual container */}
        <div
          onClick={() => onOpenDetail(product.id)}
          className="weave-pattern relative h-28 w-full rounded-xl flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-[1.02] border border-[var(--line)]/50 overflow-hidden"
          style={{ color: category.color }}
        >
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20" />
          <div className="relative z-10 p-3 rounded-full bg-[var(--card)]/90 shadow-sm border border-[var(--line)]/60">
            <RusticIcon name={product.icon} size={42} className="transition-transform group-hover:rotate-6 duration-200" />
          </div>
        </div>

        {/* Origin & Category tag */}
        <div className="mt-3.5 flex items-center gap-1.5">
          <Badge
            variant="outline"
            className="text-[11px] uppercase tracking-wider font-bold py-0 px-2"
            style={{ color: category.color, borderColor: `${category.color}40` }}
          >
            {product.origin}
          </Badge>
          <span className="text-xs text-[var(--ink-soft)] font-medium">
            · {category.name}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetail(product.id)}
          className="mt-2 font-serif-rustic font-semibold text-base text-[var(--ink)] line-clamp-2 cursor-pointer hover:underline transition-colors leading-snug"
        >
          {product.name}
        </h3>

        {/* Description snippet */}
        <p className="mt-1.5 text-xs text-[var(--ink-soft)] line-clamp-2 leading-relaxed">
          {product.desc}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--line)]">
        {/* Price & Unit */}
        <div className="flex items-baseline justify-between gap-1 mb-3">
          <span className="font-bold text-lg text-[var(--ink)] tracking-tight">
            {formatMoney(product.price)}
          </span>
          <span className="text-xs text-[var(--ink-soft)] font-medium">
            {product.unit}
          </span>
        </div>

        {/* Action Button */}
        <Button
          variant={isInCart ? "secondary" : "outline"}
          size="sm"
          onClick={() => onAddToCart(product.id)}
          className="w-full justify-center gap-1.5 text-xs font-bold"
        >
          {isInCart ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đã có trong giỏ</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm vào giỏ</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
