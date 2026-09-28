import React, { useState, useEffect } from "react";
import { PRODUCTS, COUPONS, INITIAL_ORDERS } from "./data/mockData";
import {
  CartItem,
  Coupon,
  Order,
  UserProfile,
  CustomerInfo,
  PaymentMethod,
} from "./types";
import { ToastProvider, useToast } from "./components/Toast";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MobileCartBar } from "./components/MobileCartBar";
import { AuthModal } from "./components/AuthModal";

// Views
import { HomeView } from "./views/HomeView";
import { ShopView } from "./views/ShopView";
import { ProductDetailView } from "./views/ProductDetailView";
import { CartView } from "./views/CartView";
import { CheckoutView } from "./views/CheckoutView";
import { AccountView } from "./views/AccountView";
import { OrderDetailView } from "./views/OrderDetailView";

export function MainApp() {
  const { showToast } = useToast();

  // Navigation State
  const [currentView, setCurrentView] = useState<
    "home" | "shop" | "product" | "cart" | "checkout" | "account" | "order"
  >("home");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>("DH1002");

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("taphoa_theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("taphoa_theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      localStorage.setItem("taphoa_theme", "light");
    }
  }, [isDark]);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Nguyễn Văn Hùng",
    phone: "0912 345 678",
    email: "hung.nguyen@example.com",
    address: "Số 45 Ngõ 12 Đội Cấn, Ba Đình, Hà Nội",
  });

  // Cart & Order State
  const [cart, setCart] = useState<CartItem[]>([
    { productId: 1, qty: 1 },
    { productId: 5, qty: 1 },
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(COUPONS[0]); // default FIRST10 applied
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Cart Helpers
  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartProductIds = cart.map((c) => c.productId);

  const calculateCartSubtotal = () => {
    return cart.reduce((sum, item) => {
      const p = PRODUCTS.find((prod) => prod.id === item.productId);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  };

  const calculateCartTotal = () => {
    const subtotal = calculateCartSubtotal();
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
    return Math.max(0, subtotal - discount);
  };

  // Navigation Handler
  const handleNavigate = (
    view: string,
    opts?: { id?: number | string; anchor?: string }
  ) => {
    if (view === "product" && opts?.id) {
      setSelectedProductId(Number(opts.id));
    }
    if (view === "order" && opts?.id) {
      setSelectedOrderId(String(opts.id));
    }

    setCurrentView(view as any);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (opts?.anchor) {
      setTimeout(() => {
        const el = document.getElementById(opts.anchor!);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  // Cart Actions
  const handleAddToCart = (productId: number, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { productId, qty }];
    });
    const p = PRODUCTS.find((item) => item.id === productId);
    showToast(`Đã thêm "${p?.name || "sản phẩm"}" vào giỏ hàng`);
  };

  const handleBuyNow = (productId: number, qty: number = 1) => {
    handleAddToCart(productId, qty);
    handleNavigate("cart");
  };

  const handleUpdateQty = (productId: number, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, qty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    const p = PRODUCTS.find((item) => item.id === productId);
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    showToast(`Đã xoá "${p?.name}" khỏi giỏ`, "info");
  };

  const handleApplyCoupon = (code: string) => {
    const coupon = COUPONS.find(
      (c) => c.code.toLowerCase() === code.trim().toLowerCase()
    );
    if (!coupon) {
      return { success: false, message: "Mã ưu đãi không hợp lệ hoặc đã hết hạn." };
    }
    const subtotal = calculateCartSubtotal();
    if (subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Đơn hàng cần tối thiểu ${coupon.minOrder.toLocaleString(
          "vi-VN"
        )}đ để áp dụng mã này.`,
      };
    }
    setAppliedCoupon(coupon);
    showToast(`Đã áp dụng mã "${coupon.code}" thành công!`);
    return { success: true, message: `Áp dụng mã ${coupon.code} thành công!` };
  };

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText?.(code);
    showToast(`Đã sao chép mã "${code}" vào bộ nhớ tạm!`);
  };

  // Place Order
  const handlePlaceOrder = (paymentMethod: PaymentMethod) => {
    const subtotal = calculateCartSubtotal();
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
    const total = Math.max(0, subtotal - discount);

    const orderItems = cart
      .map((item) => {
        const prod = PRODUCTS.find((p) => p.id === item.productId);
        if (!prod) return null;
        return {
          id: prod.id,
          name: prod.name,
          qty: item.qty,
          price: prod.price,
          unit: prod.unit,
          icon: prod.icon,
          category: prod.category,
        };
      })
      .filter(Boolean) as any;

    const newOrder: Order = {
      id: `DH${1000 + orders.length + 3}`,
      date: Date.now(),
      items: orderItems,
      subtotal,
      discount,
      total,
      coupon: appliedCoupon ? appliedCoupon.code : null,
      pay: paymentMethod,
      statusIndex: 1, // Đã đặt hàng
      trackingUpdatedAt: Date.now(),
      customerInfo: {
        name: userProfile.name,
        phone: userProfile.phone,
        address: userProfile.address,
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setSelectedOrderId(newOrder.id);
    showToast(`Đặt hàng thành công! Mã đơn #${newOrder.id}`);
    handleNavigate("order", { id: newOrder.id });
  };

  // 1-Hour Refund Request Handler
  const handleRequestRefund = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              isRefundRequested: true,
              refundRequestedAt: Date.now(),
            }
          : o
      )
    );
    showToast(
      `Đã tiếp nhận yêu cầu hoàn tiền 100% cho đơn #${orderId}!`,
      "success"
    );
  };

  const handleShareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: "Tạp hoá vùng biên",
        text: "Đặc sản vùng biên chính hiệu, đặt trực tiếp từ chợ phiên!",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      showToast("Đã sao chép liên kết sản phẩm!");
    }
  };

  // Current selected product and order
  const currentProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const currentOrder =
    orders.find((o) => o.id === selectedOrderId) || orders[0];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] transition-colors">
      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        onOpenAuth={() => {
          if (isLoggedIn) {
            handleNavigate("account");
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === "home" && (
          <HomeView
            products={PRODUCTS}
            coupons={COUPONS}
            onNavigate={handleNavigate}
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              handleNavigate("shop");
            }}
            onOpenDetail={(id) => handleNavigate("product", { id })}
            onAddToCart={(id) => handleAddToCart(id, 1)}
            onCopyCoupon={handleCopyCoupon}
            cartProductIds={cartProductIds}
          />
        )}

        {currentView === "shop" && (
          <ShopView
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedPriceRange={selectedPriceRange}
            onSelectPriceRange={setSelectedPriceRange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onResetFilters={() => {
              setSelectedCategory(null);
              setSelectedPriceRange("all");
              setSearchQuery("");
            }}
            onOpenDetail={(id) => handleNavigate("product", { id })}
            onAddToCart={(id) => handleAddToCart(id, 1)}
            cartProductIds={cartProductIds}
          />
        )}

        {currentView === "product" && (
          <ProductDetailView
            product={currentProduct}
            allProducts={PRODUCTS}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            cartProductIds={cartProductIds}
            onShare={handleShareProduct}
          />
        )}

        {currentView === "cart" && (
          <CartView
            cart={cart}
            products={PRODUCTS}
            appliedCoupon={appliedCoupon}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveFromCart}
            onApplyCoupon={handleApplyCoupon}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "checkout" && (
          <CheckoutView
            cart={cart}
            products={PRODUCTS}
            appliedCoupon={appliedCoupon}
            customerInfo={userProfile}
            onUpdateCustomerInfo={(info: CustomerInfo) =>
              setUserProfile((prev) => ({ ...prev, ...info }))
            }
            onPlaceOrder={handlePlaceOrder}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "account" && (
          <AccountView
            orders={orders}
            coupons={COUPONS}
            userProfile={userProfile}
            onUpdateProfile={(p) => {
              setUserProfile(p);
              showToast("Đã lưu thông tin cá nhân!");
            }}
            onViewOrder={(id) => handleNavigate("order", { id })}
            onCopyCoupon={handleCopyCoupon}
            onLogout={() => {
              setIsLoggedIn(false);
              showToast("Đã đăng xuất tài khoản", "info");
              handleNavigate("home");
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "order" && currentOrder && (
          <OrderDetailView
            order={currentOrder}
            onNavigate={handleNavigate}
            onRequestRefund={handleRequestRefund}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Cart Bar */}
      <MobileCartBar
        itemCount={totalCartCount}
        totalPrice={calculateCartTotal()}
        onOpenCart={() => handleNavigate("cart")}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(name, phone) => {
          setIsLoggedIn(true);
          setUserProfile((prev) => ({ ...prev, name, phone }));
          showToast(`Chào mừng bạn, ${name}!`);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
