import React, { useState } from "react";
import { Order, Coupon, UserProfile } from "../types";
import { formatMoney } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { CouponCard } from "../components/CouponCard";
import {
  Package,
  User as UserIcon,
  Ticket,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
} from "lucide-react";

interface AccountViewProps {
  orders: Order[];
  coupons: Coupon[];
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onViewOrder: (orderId: string) => void;
  onCopyCoupon: (code: string) => void;
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const STATUS_NAMES = [
  "Đã đặt hàng",
  "Đã xác nhận",
  "Đang đóng gói",
  "Đang vận chuyển",
  "Đã giao hàng",
];

export const AccountView: React.FC<AccountViewProps> = ({
  orders,
  coupons,
  userProfile,
  onUpdateProfile,
  onViewOrder,
  onCopyCoupon,
  onLogout,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "coupons">("orders");

  // Profile editing state
  const [profileName, setProfileName] = useState(userProfile.name);
  const [profilePhone, setProfilePhone] = useState(userProfile.phone);
  const [profileEmail, setProfileEmail] = useState(userProfile.email);
  const [profileAddress, setProfileAddress] = useState(userProfile.address);
  const [profileSaved, setProfileSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: profileName,
      phone: profilePhone,
      email: profileEmail,
      address: profileAddress,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  return (
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-serif-rustic font-bold text-3xl sm:text-4xl text-[var(--ink)]">
          Tài khoản của tôi
        </h1>
        <p className="text-sm text-[var(--ink-soft)] mt-1">
          Xin chào <strong>{userProfile.name}</strong>, quản lý đơn hàng đặc sản và thông tin cá nhân.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="md:col-span-4 lg:col-span-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-3 space-y-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === "orders"
                ? "bg-[var(--ginger-tint)] text-[var(--ginger-deep)]"
                : "text-[var(--ink)] hover:bg-[var(--bg-alt)]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>Đơn hàng của tôi</span>
            </span>
            <Badge variant="outline" className="text-xs">
              {orders.length}
            </Badge>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === "profile"
                ? "bg-[var(--ginger-tint)] text-[var(--ginger-deep)]"
                : "text-[var(--ink)] hover:bg-[var(--bg-alt)]"
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Thông tin cá nhân</span>
          </button>

          <button
            onClick={() => setActiveTab("coupons")}
            className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === "coupons"
                ? "bg-[var(--ginger-tint)] text-[var(--ginger-deep)]"
                : "text-[var(--ink)] hover:bg-[var(--bg-alt)]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Ticket className="w-4 h-4" />
              <span>Ví ưu đãi</span>
            </span>
            <span className="text-xs font-bold text-[var(--seal)]">Hot</span>
          </button>

          <div className="pt-2 border-t border-[var(--line)]">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold text-[var(--seal)] hover:bg-[var(--seal-tint)]/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất tài khoản</span>
            </button>
          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="md:col-span-8 lg:col-span-9">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif-rustic font-bold text-xl text-[var(--ink)]">
                  Lịch sử đơn hàng ({orders.length})
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate("shop")}
                  className="text-xs font-bold"
                >
                  Mua thêm đặc sản
                </Button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-14 rounded-2xl bg-[var(--card)] border border-dashed border-[var(--line)]">
                  <Package className="w-10 h-10 mx-auto text-[var(--ink-soft)]/50 mb-3" />
                  <p className="font-serif-rustic font-bold text-base text-[var(--ink)]">
                    Bạn chưa có đơn hàng nào
                  </p>
                  <p className="text-xs text-[var(--ink-soft)] mt-1">
                    Hãy dạo quanh Tạp hoá và chọn những món đặc sản vùng cao nhé!
                  </p>
                  <Button
                    onClick={() => onNavigate("shop")}
                    className="mt-4 font-bold text-xs"
                  >
                    Khám phá sản phẩm
                  </Button>
                </div>
              ) : (
                orders.map((order) => {
                  const isDelivered = order.statusIndex >= 5;
                  const isRefunded = order.isRefundRequested;
                  const canRefund =
                    !isRefunded && Date.now() - order.date <= 60 * 60 * 1000;

                  return (
                    <div
                      key={order.id}
                      className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-xs transition-all hover:border-[var(--ginger)]/50"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
                        <div className="flex items-center gap-3">
                          <span className="font-serif-rustic font-bold text-base text-[var(--ink)]">
                            Đơn #{order.id}
                          </span>
                          <span className="text-xs text-[var(--ink-soft)]">
                            {new Date(order.date).toLocaleString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Status badge */}
                        <div>
                          {isRefunded ? (
                            <Badge variant="destructive">
                              Đã gửi yêu cầu hoàn tiền (1 giờ)
                            </Badge>
                          ) : isDelivered ? (
                            <Badge variant="tea">Đã giao thành công</Badge>
                          ) : (
                            <Badge variant="default">
                              {STATUS_NAMES[order.statusIndex - 1] || "Đang xử lý"}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Items preview */}
                      <div className="py-3 text-xs sm:text-sm text-[var(--ink-soft)]">
                        <span className="font-medium text-[var(--ink)]">
                          {order.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                        </span>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--line)]/60">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs text-[var(--ink-soft)]">
                            Tổng thanh toán:
                          </span>
                          <span className="font-bold text-base text-[var(--ink)]">
                            {formatMoney(order.total)}
                          </span>
                          {canRefund && (
                            <span className="text-[11px] text-[var(--ginger-deep)] font-semibold flex items-center gap-1 bg-[var(--ginger-tint)] px-2 py-0.5 rounded-md ml-1">
                              <Clock className="w-3 h-3" /> Trong hạn đổi trả 1h
                            </span>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewOrder(order.id)}
                          className="font-bold text-xs"
                        >
                          <span>Xem chi tiết & theo dõi</span>
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 space-y-5">
              <h2 className="font-serif-rustic font-bold text-xl text-[var(--ink)]">
                Cập nhật thông tin giao nhận
              </h2>

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--ink)]">
                    Họ và tên
                  </label>
                  <Input
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--ink)]">
                    Số điện thoại
                  </label>
                  <Input
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--ink)]">
                    Địa chỉ email
                  </label>
                  <Input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--ink)]">
                    Địa chỉ giao hàng mặc định
                  </label>
                  <Textarea
                    value={profileAddress}
                    onChange={(e) => setProfileAddress(e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Button type="submit" className="font-bold text-xs">
                    Lưu thông tin
                  </Button>
                  {profileSaved && (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Đã cập nhật thành công!
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Coupons Wallet Tab */}
          {activeTab === "coupons" && (
            <div className="space-y-4">
              <div>
                <h2 className="font-serif-rustic font-bold text-xl text-[var(--ink)]">
                  Ví ưu đãi của bạn
                </h2>
                <p className="text-xs text-[var(--ink-soft)] mt-1">
                  Mã giảm giá đang có hiệu lực. Bạn chỉ cần bấm sao chép và áp dụng khi đến giỏ hàng.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {coupons.map((coupon) => (
                  <CouponCard
                    key={coupon.code}
                    coupon={coupon}
                    onCopy={onCopyCoupon}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
