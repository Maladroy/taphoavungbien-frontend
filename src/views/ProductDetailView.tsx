import React, { useState } from "react";
import { Product } from "../types";
import { CATEGORIES } from "../data/mockData";
import { formatMoney } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { RusticIcon } from "../components/RusticIcon";
import { ProductCard } from "../components/ProductCard";
import {
  RotateCcw,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Share2,
} from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  onNavigate: (view: string, opts?: { id?: number | string }) => void;
  onAddToCart: (productId: number, qty: number) => void;
  onBuyNow: (productId: number, qty: number) => void;
  cartProductIds: number[];
  onShare: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onNavigate,
  onAddToCart,
  onBuyNow,
  cartProductIds,
  onShare,
}) => {
  const [qty, setQty] = useState(1);
  const category = CATEGORIES.find((c) => c.id === product.category) || CATEGORIES[0];
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.origin === product.origin))
    .slice(0, 3);

  const lineTotal = product.price * qty;

  return (
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm text-[var(--ink-soft)] flex items-center gap-2">
        <button
          onClick={() => onNavigate("home")}
          className="hover:underline hover:text-[var(--ink)] cursor-pointer"
        >
          Trang chủ
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate("shop")}
          className="hover:underline hover:text-[var(--ink)] cursor-pointer"
        >
          Sản phẩm
        </button>
        <span>/</span>
        <span className="font-semibold text-[var(--ink)] line-clamp-1">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Visual Box */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl border border-(--line) bg-(--card) p-6 shadow-sm">
            <div
              className="weave-pattern h-80 sm:h-96 w-full rounded-2xl border border-(--line)/60 flex flex-col items-center justify-center relative overflow-hidden"
              style={{ color: category.color }}
            >
              <div className="p-8 rounded-full bg-[var(--card)]/90 shadow-lg border border-(--line) transition-transform hover:scale-105 duration-300">
                <RusticIcon name={product.icon} size={110} />
              </div>

              {product.badge && (
                <span className="absolute top-4 right-4 font-bold text-xs px-3 py-1 rounded-md shadow-xs bg-[var(--ginger-tint)] text-[var(--ginger-deep)] border border-[var(--ginger)]/30">
                  {product.badge}
                </span>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-(--ink-soft) bg-[var(--card)]/80 backdrop-blur-xs px-3 py-2 rounded-xl border border-[var(--line)]">
                <span>Nguồn gốc: <strong>{product.origin}</strong></span>
                <span className="font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Tồn kho <span className="text-(--tea)">{product.stock || 20}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <Badge
                variant="outline"
                className="font-bold text-xs uppercase tracking-wider py-0.5 px-2.5"
                style={{ color: category.color, borderColor: `${category.color}50` }}
              >
                {product.origin} · {category.name}
              </Badge>

              <button
                onClick={onShare}
                className="inline-flex items-center gap-1 text-xs text-[var(--ink-soft)] hover:text-[var(--ink)] cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ</span>
              </button>
            </div>

            <h1 className="font-serif-rustic font-bold text-3xl sm:text-4xl text-[var(--ink)] mt-2 leading-tight">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-bold text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">
                {formatMoney(product.price)}
              </span>
              <span className="text-sm text-[var(--ink-soft)] font-medium">
                {product.unit}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
            {product.desc}
          </p>

          {/* Taste & Preservation cards */}
          {(product.tasteProfile || product.preservation) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {product.tasteProfile && (
                <div className="p-3.5 rounded-xl bg-[var(--bg-alt)] border border-[var(--line)]">
                  <span className="font-bold text-[var(--ink)] block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--ginger)]" />
                    Hương vị đặc trưng
                  </span>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    {product.tasteProfile}
                  </p>
                </div>
              )}
              {product.preservation && (
                <div className="p-3.5 rounded-xl bg-[var(--bg-alt)] border border-[var(--line)]">
                  <span className="font-bold text-[var(--ink)] block mb-1">
                    Gợi ý bảo quản & dùng ngon
                  </span>
                  <p className="text-[var(--ink-soft)] leading-relaxed">
                    {product.preservation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] block mb-2">
              Số lượng
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-[var(--line)] bg-[var(--card)] p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--ink)] hover:bg-[var(--bg-alt)] transition-colors cursor-pointer"
                  aria-label="Giảm"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[var(--ink)]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--ink)] hover:bg-[var(--bg-alt)] transition-colors cursor-pointer"
                  aria-label="Tăng"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-sm text-[var(--ink-soft)]">
                Thành tiền: <strong className="text-[var(--ink)] font-bold text-base">{formatMoney(lineTotal)}</strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="lg"
              onClick={() => onAddToCart(product.id, qty)}
              className="flex-1 min-w-[180px] font-bold text-sm"
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              Thêm vào giỏ hàng
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => onBuyNow(product.id, qty)}
              className="flex-1 min-w-[160px] font-bold text-sm border-2"
            >
              Mua ngay
            </Button>
          </div>

          {/* 1-Hour return policy card */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--bg-alt)] border border-[var(--line)] text-xs text-[var(--ink-soft)] leading-relaxed">
            <RotateCcw className="w-5 h-5 text-[var(--tea)] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--ink)] block mb-0.5">
                Chính sách đổi trả trong 1 giờ đầu
              </strong>
              <span>
                Bạn có trọn vẹn 60 phút sau khi bấm đặt hàng để huỷ hoặc đổi ý miễn phí.
                Sau thời gian này, đội ngũ của chúng tôi luôn túc trực hỗ trợ bảo đảm quyền lợi của bạn.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-[var(--line)]">
          <h2 className="font-serif-rustic font-bold text-2xl text-[var(--ink)] mb-6">
            Đặc sản cùng miền biên ải
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpenDetail={(id) => onNavigate("product", { id })}
                onAddToCart={(id) => onAddToCart(id, 1)}
                isInCart={cartProductIds.includes(p.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
