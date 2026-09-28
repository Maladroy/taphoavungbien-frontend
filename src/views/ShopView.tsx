import React from "react";
import { Product } from "../types";
import { CATEGORIES } from "../data/mockData";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, RotateCcw, Filter } from "lucide-react";

interface ShopViewProps {
  products: Product[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  selectedPriceRange: string;
  onSelectPriceRange: (range: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onResetFilters: () => void;
  onOpenDetail: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  cartProductIds: number[];
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  selectedPriceRange,
  onSelectPriceRange,
  searchQuery,
  onSearchChange,
  onResetFilters,
  onOpenDetail,
  onAddToCart,
  cartProductIds,
}) => {
  // Filter products
  const filteredProducts = products.filter((p) => {
    // Category filter
    if (selectedCategory && p.category !== selectedCategory) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchOrigin = p.origin.toLowerCase().includes(q);
      const matchDesc = p.desc.toLowerCase().includes(q);
      if (!matchName && !matchOrigin && !matchDesc) return false;
    }
    // Price range filter
    if (selectedPriceRange === "under100" && p.price >= 100000) return false;
    if (
      selectedPriceRange === "100to250" &&
      (p.price < 100000 || p.price > 250000)
    )
      return false;
    if (selectedPriceRange === "over250" && p.price <= 250000) return false;

    return true;
  });

  return (
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Title & subtitle */}
      <div className="mb-8">
        <h1 className="font-serif-rustic font-bold text-3xl sm:text-4xl text-[var(--ink)]">
          Tất cả đặc sản vùng biên
        </h1>
        <p className="text-sm sm:text-base text-[var(--ink-soft)] mt-1.5 max-w-2xl">
          Đặc sản khô, gia vị rừng nguyên bản, thức uống ủ men lá và đồ thổ cẩm thủ công dệt tay từ khắp các bản làng biên giới.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="md:col-span-4 lg:col-span-3 space-y-6 bg-[var(--card)] p-5 rounded-2xl border border-[var(--line)]">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <span className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--ginger-deep)]" />
              <span>Bộ lọc tìm kiếm</span>
            </span>
            {(selectedCategory || selectedPriceRange !== "all" || searchQuery) && (
              <button
                onClick={onResetFilters}
                className="text-xs text-[var(--seal)] hover:underline font-semibold"
              >
                Xoá lọc
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-3">
              Danh mục sản vật
            </h4>
            <div className="space-y-1.5 text-sm">
              <label className="flex items-center gap-2.5 cursor-pointer py-1 text-[var(--ink)] hover:text-[var(--ginger-deep)]">
                <input
                  type="radio"
                  name="cat"
                  value="all"
                  checked={!selectedCategory}
                  onChange={() => onSelectCategory(null)}
                  className="accent-[var(--ginger)]"
                />
                <span className={!selectedCategory ? "font-bold text-[var(--ginger-deep)]" : ""}>
                  Tất cả ({products.length})
                </span>
              </label>

              {CATEGORIES.map((cat) => {
                const count = products.filter((p) => p.category === cat.id).length;
                const isSelected = selectedCategory === cat.id;
                return (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2.5 cursor-pointer py-1 text-[var(--ink)] hover:text-[var(--ginger-deep)]"
                  >
                    <input
                      type="radio"
                      name="cat"
                      value={cat.id}
                      checked={isSelected}
                      onChange={() => onSelectCategory(cat.id)}
                      className="accent-[var(--ginger)]"
                    />
                    <span className={isSelected ? "font-bold text-[var(--ginger-deep)]" : ""}>
                      {cat.name} ({count})
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="pt-2 border-t border-[var(--line)]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--ink-soft)] mb-3">
              Khoảng giá
            </h4>
            <div className="space-y-1.5 text-sm">
              {[
                { value: "all", label: "Tất cả mức giá" },
                { value: "under100", label: "Dưới 100.000đ" },
                { value: "100to250", label: "100.000đ – 250.000đ" },
                { value: "over250", label: "Trên 250.000đ" },
              ].map((p) => (
                <label
                  key={p.value}
                  className="flex items-center gap-2.5 cursor-pointer py-1 text-[var(--ink)] hover:text-[var(--ginger-deep)]"
                >
                  <input
                    type="radio"
                    name="price"
                    value={p.value}
                    checked={selectedPriceRange === p.value}
                    onChange={(e) => onSelectPriceRange(e.target.value)}
                    className="accent-[var(--ginger)]"
                  />
                  <span className={selectedPriceRange === p.value ? "font-bold text-[var(--ginger-deep)]" : ""}>
                    {p.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="md:col-span-8 lg:col-span-9">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3.5 rounded-xl bg-[var(--card)] border border-[var(--line)]">
            <div className="text-sm text-[var(--ink-soft)]">
              Tìm thấy <strong className="text-[var(--ink)]">{filteredProducts.length}</strong> sản phẩm
              {selectedCategory && (
                <span>
                  {" "}thuộc <em>{CATEGORIES.find((c) => c.id === selectedCategory)?.name}</em>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="text-xs font-semibold text-[var(--ink-soft)]"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Đặt lại bộ lọc
              </Button>
            </div>
          </div>

          {/* Grid or Empty */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onOpenDetail={onOpenDetail}
                  onAddToCart={onAddToCart}
                  isInCart={cartProductIds.includes(p.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-2xl bg-[var(--card)] border border-dashed border-[var(--line)]">
              <Search className="w-10 h-10 mx-auto text-[var(--ink-soft)]/50 mb-3" />
              <h3 className="font-serif-rustic font-bold text-lg text-[var(--ink)]">
                Không tìm thấy đặc sản phù hợp
              </h3>
              <p className="text-sm text-[var(--ink-soft)] mt-1 max-w-sm mx-auto">
                Thử nới lỏng mức giá hoặc tìm kiếm với từ khoá khác như "trâu", "mật ong", "chè"...
              </p>
              <Button
                onClick={onResetFilters}
                className="mt-4 font-bold text-xs"
              >
                Xem lại tất cả sản phẩm
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
