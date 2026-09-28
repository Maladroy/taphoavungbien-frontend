import React from "react";
import { Product, Coupon } from "../types";
import { CATEGORIES } from "../data/mockData";
import { ProductCard } from "../components/ProductCard";
import { CouponCard } from "../components/CouponCard";
import { RusticIcon } from "../components/RusticIcon";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  HeartHandshake,
} from "lucide-react";

interface HomeViewProps {
  products: Product[];
  coupons: Coupon[];
  onNavigate: (view: string, opts?: { id?: number | string; anchor?: string }) => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenDetail: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onCopyCoupon: (code: string) => void;
  cartProductIds: number[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  coupons,
  onNavigate,
  onSelectCategory,
  onOpenDetail,
  onAddToCart,
  onCopyCoupon,
  cartProductIds,
}) => {
  const featuredProducts = [
    products[0], // Thịt trâu gác bếp
    products[5], // Mật ong rừng Bảy Núi
    products[7], // Chè Shan Tuyết cổ thụ
    products[8], // Khăn thổ cẩm dệt tay
    products[4], // Mắc khén rừng
    products[1], // Lạp xưởng hun khói
    products[6], // Rượu ngô men lá
    products[9], // Túi thổ cẩm
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 pb-4">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column Copy */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="stamp" className="inline-flex items-center gap-1.5 py-1 px-3.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[var(--seal)]" />
                <span>Chính hiệu vùng biên viễn</span>
              </Badge>

              <h1 className="font-serif-rustic font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--ink)] leading-[1.1] tracking-tight">
                Đặc sản vùng biên, <br />
                <span className="text-[var(--indigo)] underline decoration-[var(--ginger)] decoration-wavy decoration-2 underline-offset-8">
                  giao tận tay bạn.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--ink-soft)] leading-relaxed max-w-xl">
                Chúng tôi lấy hàng trực tiếp từ các phiên chợ vùng cao — không qua trung gian,
                không đội giá. Mỗi món đều mang trong mình hương khói bếp củi và câu chuyện cần mẫn của người làm ra nó.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={() => onNavigate("shop")}
                  className="font-bold shadow-md hover:shadow-lg transition-shadow text-base px-7"
                >
                  <span>Khám phá sản phẩm</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const el = document.getElementById("coupons-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-base px-6 border-2"
                >
                  Xem ưu đãi hôm nay
                </Button>
              </div>

              {/* Trust micro-callout */}
              <div className="flex items-center gap-2.5 pt-2 text-xs sm:text-sm text-[var(--ink-soft)] bg-[var(--card)]/80 border border-[var(--line)] rounded-xl p-3 w-fit">
                <RotateCcw className="w-4 h-4 text-[var(--tea)] shrink-0" />
                <span>
                  <strong>Đổi trả trong 1 giờ đầu</strong> nếu bạn lỡ bấm đặt nhầm — hoàn tiền 100% không phiền hà.
                </span>
              </div>
            </div>

            {/* Right Column: Artisan Stall Tilted Cards */}
            <div className="lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4 p-2 sm:p-4">
                {/* Stall 1 */}
                <div
                  onClick={() => onOpenDetail(1)}
                  className="cursor-pointer rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 -rotate-2 hover:rotate-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--ginger-tint)] flex items-center justify-center text-[var(--ginger)] mb-2.5">
                    <RusticIcon name="beef" size={24} />
                  </div>
                  <div className="font-serif-rustic font-semibold text-sm text-[var(--ink)]">
                    Thịt trâu gác bếp
                  </div>
                  <div className="text-xs text-[var(--ginger-deep)] font-bold mt-1">
                    từ 320.000đ
                  </div>
                </div>

                {/* Stall 2 */}
                <div
                  onClick={() => onOpenDetail(6)}
                  className="cursor-pointer rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 rotate-3 translate-y-3 hover:rotate-0 hover:translate-y-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--tea-tint)] flex items-center justify-center text-[var(--tea)] mb-2.5">
                    <RusticIcon name="honey" size={24} />
                  </div>
                  <div className="font-serif-rustic font-semibold text-sm text-[var(--ink)]">
                    Mật ong rừng
                  </div>
                  <div className="text-xs text-[var(--tea)] font-bold mt-1">
                    từ 280.000đ
                  </div>
                </div>

                {/* Stall 3 */}
                <div
                  onClick={() => onOpenDetail(7)}
                  className="cursor-pointer rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 rotate-2 -translate-y-1 hover:rotate-0 hover:translate-y-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--seal-tint)] flex items-center justify-center text-[var(--seal)] mb-2.5">
                    <RusticIcon name="jar" size={24} />
                  </div>
                  <div className="font-serif-rustic font-semibold text-sm text-[var(--ink)]">
                    Rượu ngô men lá
                  </div>
                  <div className="text-xs text-[var(--seal)] font-bold mt-1">
                    từ 150.000đ
                  </div>
                </div>

                {/* Stall 4 */}
                <div
                  onClick={() => onOpenDetail(9)}
                  className="cursor-pointer rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 -rotate-3 translate-y-2 hover:rotate-0 hover:translate-y-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--indigo-tint)] flex items-center justify-center text-[var(--indigo)] mb-2.5">
                    <RusticIcon name="textile" size={24} />
                  </div>
                  <div className="font-serif-rustic font-semibold text-sm text-[var(--ink)]">
                    Thổ cẩm dệt tay
                  </div>
                  <div className="text-xs text-[var(--indigo)] font-bold mt-1">
                    từ 190.000đ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="bg-[var(--bg-alt)] border-y border-[var(--line)] py-8 transition-colors">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Badge 1 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[var(--indigo)] text-[var(--indigo)] flex items-center justify-center shrink-0 -rotate-3 bg-[var(--card)]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif-rustic font-bold text-base text-[var(--ink)]">
                  Thanh toán an toàn
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-0.5 leading-relaxed">
                  Hỗ trợ VietQR, chuyển khoản, ví điện tử & COD bảo mật theo chuẩn thương mại điện tử.
                </p>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[var(--seal)] text-[var(--seal)] flex items-center justify-center shrink-0 rotate-3 bg-[var(--card)]">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif-rustic font-bold text-base text-[var(--ink)]">
                  Đổi trả trong 1 giờ
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-0.5 leading-relaxed">
                  Bấm nhầm hay đổi ý? Huỷ đơn và nhận hoàn tiền tức thì trong 60 phút đầu tiên.
                </p>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[var(--tea)] text-[var(--tea)] flex items-center justify-center shrink-0 -rotate-2 bg-[var(--card)]">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif-rustic font-bold text-base text-[var(--ink)]">
                  Hàng chuẩn gốc bản địa
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-0.5 leading-relaxed">
                  Trực tiếp từ các chợ phiên vùng biên — đúng gốc, đúng vị, không hàng gia công trôi nổi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Categories Shelf */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif-rustic font-bold text-2xl sm:text-3xl text-[var(--ink)]">
              Chọn theo vùng miền & hương vị
            </h2>
            <p className="text-sm text-[var(--ink-soft)] mt-1">
              Mỗi vùng biên một sản vật kết tinh từ khí hậu và văn hoá lâu đời.
            </p>
          </div>
          <Button
            variant="link"
            onClick={() => onNavigate("shop")}
            className="hidden sm:inline-flex text-xs font-bold text-[var(--ginger-deep)]"
          >
            Xem tất cả sản phẩm →
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigate("shop");
                }}
                className="group flex flex-col justify-between text-left p-5 rounded-2xl border border-[var(--line)] bg-[var(--card)] hover:border-[var(--ginger)] hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: cat.tint,
                    color: cat.color,
                  }}
                >
                  <RusticIcon name={cat.iconName} size={24} />
                </div>
                <div>
                  <div className="font-serif-rustic font-bold text-base text-[var(--ink)] group-hover:text-[var(--ginger-deep)] transition-colors">
                    {cat.name}
                  </div>
                  <div className="text-xs text-[var(--ink-soft)] mt-1">
                    {count} sản vật chọn lọc
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif-rustic font-bold text-2xl sm:text-3xl text-[var(--ink)]">
              Sản phẩm được yêu thích nhất
            </h2>
            <p className="text-sm text-[var(--ink-soft)] mt-1">
              Những món được đồng bào vùng biên làm kỳ công và khách hàng đặt nhiều nhất tháng này.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("shop")}
            className="text-xs font-bold"
          >
            Xem kho hàng đầy đủ
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpenDetail={onOpenDetail}
              onAddToCart={onAddToCart}
              isInCart={cartProductIds.includes(p.id)}
            />
          ))}
        </div>
      </section>

      {/* Active Coupons Section */}
      <section id="coupons-section" className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--ginger-deep)] bg-[var(--ginger-tint)] px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Phiên chợ ưu đãi</span>
              </div>
              <h2 className="font-serif-rustic font-bold text-2xl sm:text-3xl text-[var(--ink)]">
                Mã giảm giá đang diễn ra
              </h2>
              <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-1">
                Bấm sao chép mã và dán vào ô ưu đãi tại giỏ hàng để được trừ tiền trực tiếp.
              </p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.code}
                coupon={coupon}
                onCopy={onCopyCoupon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Story Section */}
      <section className="bg-[var(--bg-alt)] border-t border-[var(--line)] py-14 transition-colors">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-sm">
                <div className="weave-pattern h-56 rounded-xl border border-[var(--line)]/60 flex flex-col items-center justify-center text-[var(--indigo)] relative overflow-hidden">
                  <div className="p-4 rounded-full bg-[var(--card)]/90 shadow-md border border-[var(--line)]">
                    <RusticIcon name="jar" size={54} />
                  </div>
                  <span className="font-serif-rustic text-sm font-bold mt-3 text-[var(--ink)]">
                    Gìn giữ hương vị cội nguồn
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--tea)]">
                Về chúng tôi
              </span>
              <h2 className="font-serif-rustic font-bold text-3xl sm:text-4xl text-[var(--ink)] leading-snug">
                Câu chuyện của Tạp hoá vùng biên
              </h2>
              <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                Tạp hoá vùng biên bắt đầu từ một gian hàng nhỏ ở chợ phiên biên giới, nơi chúng tôi
                lớn lên cùng mùi khói bếp hun thịt trâu gác bếp, hạt mắc khén thơm lừng và tiếng mặc cả rộn ràng
                mỗi sớm mai sương giăng kín đèo.
              </p>
              <p className="text-sm sm:text-base text-[var(--ink-soft)] leading-relaxed">
                Chúng tôi dựng nên Tạp hoá này để mang đúng những món ấy đến gần hơn với bữa cơm gia đình bạn —
                không phải qua một sàn thương mại xa lạ, mà từ chính tay những người quen thuộc với từng góc chợ,
                từng cây chè Shan Tuyết cổ thụ trên non cao.
              </p>
              <div className="pt-2">
                <p className="font-serif-rustic italic font-semibold text-lg text-[var(--ink)]">
                  — Đội ngũ sáng lập, Tạp hoá vùng biên
                </p>
                <span className="text-xs text-[var(--ink-soft)]">
                  Từ Trùng Khánh, Cao Bằng & Đồng Văn, Hà Giang
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
