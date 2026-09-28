import React, { useState } from "react";
import { Search, ShoppingBag, User, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, opts?: { id?: number | string; anchor?: string }) => void;
  cartCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  isDark,
  onToggleTheme,
  onOpenAuth,
  isLoggedIn,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string, anchor?: string) => {
    onNavigate(view, { anchor });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--line)] transition-colors">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ginger)] rounded-lg p-1 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--ginger-tint)] flex items-center justify-center border border-[var(--ginger)]/30 group-hover:scale-105 transition-transform shrink-0">
            <svg
              className="w-6 h-6 text-[var(--indigo)]"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M8 15L20 8l12 7v14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V15z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M16 31v-9h8v9"
                stroke="var(--ginger-deep)"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <div>
            <div className="font-serif-rustic font-bold text-xl text-[var(--indigo)] leading-tight tracking-tight">
              Tạp hoá vùng biên
            </div>
            <div className="text-[11px] font-medium text-[var(--ink-soft)] tracking-wider uppercase">
              Đặc sản vùng biên — giao tận tay
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => handleNavClick("home")}
            className={`text-sm font-semibold transition-colors pb-1 border-b-2 cursor-pointer ${
              currentView === "home"
                ? "border-[var(--ginger)] text-[var(--ink)]"
                : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
            }`}
          >
            Trang chủ
          </button>
          <button
            onClick={() => handleNavClick("shop")}
            className={`text-sm font-semibold transition-colors pb-1 border-b-2 cursor-pointer ${
              currentView === "shop"
                ? "border-[var(--ginger)] text-[var(--ink)]"
                : "border-transparent text-[var(--ink-soft)] hover:text-[var(--ink)]"
            }`}
          >
            Sản phẩm
          </button>
          <button
            onClick={() => handleNavClick("home", "coupons")}
            className="text-sm font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors pb-1 border-b-2 border-transparent cursor-pointer"
          >
            Ưu đãi
          </button>
          <button
            onClick={() => handleNavClick("home", "story")}
            className="text-sm font-semibold text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors pb-1 border-b-2 border-transparent cursor-pointer"
          >
            Về chúng tôi
          </button>
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center relative flex-1 max-w-[320px]">
          <Search className="w-4 h-4 absolute left-3 text-[var(--ink-soft)] pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (currentView !== "shop") {
                onNavigate("shop");
              }
            }}
            placeholder="Tìm thịt trâu, mật ong, thổ cẩm…"
            className="pl-9 h-9.5 text-xs bg-[var(--card)] rounded-full border-[var(--line)]"
          />
        </div>

        {/* Header Action Icons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            title={isDark ? "Chuyển chế độ sáng" : "Chuyển chế độ tối"}
            aria-label="Đổi giao diện"
            className="w-9 h-9 rounded-full bg-[var(--card)] hover:bg-[var(--bg-alt)] border-[var(--line)] text-[var(--ink)]"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--indigo)]" />
            )}
          </Button>

          {/* Account */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenAuth}
            title={isLoggedIn ? "Tài khoản của tôi" : "Đăng nhập / Đăng ký"}
            aria-label="Tài khoản"
            className="w-9 h-9 rounded-full bg-[var(--card)] hover:bg-[var(--bg-alt)] border-[var(--line)] text-[var(--ink)] relative"
          >
            <User className="w-4 h-4 text-[var(--ink)]" />
            {isLoggedIn && (
              <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[var(--card)]" />
            )}
          </Button>

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavClick("cart")}
            title="Giỏ hàng"
            aria-label="Giỏ hàng"
            className="w-9 h-9 rounded-full bg-[var(--card)] hover:bg-[var(--bg-alt)] border-[var(--line)] text-[var(--ink)] relative"
          >
            <ShoppingBag className="w-4 h-4 text-[var(--ink)]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--seal)] text-white text-[11px] font-bold min-w-5 h-5 rounded-full flex items-center justify-center px-1 shadow-xs animate-in zoom-in-50">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-[var(--card)] hover:bg-[var(--bg-alt)] border-[var(--line)] text-[var(--ink)]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--bg)] px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--ink-soft)] pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView !== "shop") {
                  onNavigate("shop");
                }
              }}
              placeholder="Tìm đặc sản, gia vị, thổ cẩm…"
              className="pl-9 h-10 bg-[var(--card)] text-sm rounded-xl"
            />
          </div>

          <div className="flex flex-col space-y-1 pt-1 font-medium">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-[var(--ink)] hover:bg-[var(--bg-alt)]"
            >
              <span>Trang chủ</span>
              <span className="text-xs text-[var(--ink-soft)]">Về đầu trang</span>
            </button>
            <button
              onClick={() => handleNavClick("shop")}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-[var(--ink)] hover:bg-[var(--bg-alt)]"
            >
              <span>Tất cả sản phẩm</span>
              <span className="text-xs font-bold text-[var(--ginger-deep)]">10 đặc sản</span>
            </button>
            <button
              onClick={() => handleNavClick("home", "coupons")}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-[var(--ink)] hover:bg-[var(--bg-alt)]"
            >
              <span>Mã ưu đãi hôm nay</span>
              <span className="text-xs bg-[var(--seal-tint)] text-[var(--seal)] px-2 py-0.5 rounded-full font-bold">
                Giảm đến 20%
              </span>
            </button>
            <button
              onClick={() => handleNavClick("home", "story")}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-[var(--ink)] hover:bg-[var(--bg-alt)]"
            >
              <span>Câu chuyện Tạp hoá</span>
              <span className="text-xs text-[var(--ink-soft)]">Bản sắc</span>
            </button>
            {isLoggedIn ? (
              <button
                onClick={() => handleNavClick("account")}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-[var(--indigo)] font-bold hover:bg-[var(--bg-alt)]"
              >
                <span>Tài khoản & Đơn hàng của tôi</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-left text-[var(--ginger-deep)] font-bold hover:bg-[var(--bg-alt)]"
              >
                <span>Đăng nhập / Đăng ký</span>
                <span className="text-xs bg-[var(--ginger-tint)] px-2 py-0.5 rounded-full">Tặng 10%</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
