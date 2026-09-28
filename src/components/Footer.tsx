import React from "react";

interface FooterProps {
  onNavigate: (view: string, opts?: { anchor?: string }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--card)]/50 pt-12 pb-8 transition-colors">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="font-serif-rustic font-bold text-xl text-[var(--indigo)]">
              Tạp hoá vùng biên
            </div>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed max-w-xs">
              Đặc sản vùng biên chọn lọc, giao tận tay — từ chợ phiên đến căn bếp gia đình bạn.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["VietQR", "Napas", "Visa", "Mastercard", "COD"].map((pay) => (
                <span
                  key={pay}
                  className="text-[11px] font-bold text-[var(--ink-soft)] bg-[var(--bg-alt)] border border-[var(--line)] px-2 py-0.5 rounded-md"
                >
                  {pay}
                </span>
              ))}
            </div>
          </div>

          {/* Store links */}
          <div>
            <h4 className="font-serif-rustic font-bold text-sm text-[var(--ink)] mb-3">
              Cửa hàng & Danh mục
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--ink-soft)]">
              <li>
                <button
                  onClick={() => onNavigate("shop")}
                  className="hover:text-[var(--ink)] hover:underline cursor-pointer"
                >
                  Tất cả sản phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("home", { anchor: "coupons-section" })}
                  className="hover:text-[var(--ink)] hover:underline cursor-pointer"
                >
                  Ưu đãi hôm nay
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("home", { anchor: "story" })}
                  className="hover:text-[var(--ink)] hover:underline cursor-pointer"
                >
                  Câu chuyện nguồn gốc
                </button>
              </li>
            </ul>
          </div>

          {/* Customer support */}
          <div>
            <h4 className="font-serif-rustic font-bold text-sm text-[var(--ink)] mb-3">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--ink-soft)]">
              <li>
                <span className="font-medium text-[var(--ginger-deep)]">
                  Chính sách đổi trả trong 1 giờ
                </span>
              </li>
              <li>
                <span className="text-[var(--ink-soft)]">Hướng dẫn thanh toán VietQR</span>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("account")}
                  className="hover:text-[var(--ink)] hover:underline cursor-pointer"
                >
                  Tra cứu đơn hàng
                </button>
              </li>
              <li>
                <span className="text-[var(--ink-soft)]">Bảo mật thông tin khách hàng</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif-rustic font-bold text-sm text-[var(--ink)] mb-3">
              Liên hệ chúng tôi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--ink-soft)]">
              <li>
                Hotline: <strong className="text-[var(--ink)]">1900 xxxx</strong> (8h - 21h)
              </li>
              <li>
                Zalo tư vấn: <strong className="text-[var(--ink)]">0912 345 678</strong>
              </li>
              <li>
                Email: <span className="text-[var(--ink)]">hotro@taphoavungbien.vn</span>
              </li>
              <li>
                Địa chỉ: Chợ phiên Trùng Khánh, Tỉnh Cao Bằng
              </li>
            </ul>
          </div>
        </div>

        {/* Vintage checker strip pattern */}
        <div className="checker-strip-vintage h-2.5 rounded-full my-8 opacity-80" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-[var(--ink-soft)]">
          <span>
            © 2026 Tạp hoá vùng biên.
          </span>
          <span>Bảo mật thanh toán chuẩn ngành thương mại điện tử.</span>
        </div>
      </div>
    </footer>
  );
};
