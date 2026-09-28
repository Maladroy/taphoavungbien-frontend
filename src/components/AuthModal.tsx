import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sparkles, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, phone: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = loginIdentifier.includes("@")
      ? loginIdentifier.split("@")[0]
      : loginIdentifier || "Khách quen";
    onLoginSuccess(displayName, "0912 345 678");
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(regName || "Thành viên mới", regPhone || "0987 654 321");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px] p-6 bg-[var(--card)] border-[var(--line)]">
        <DialogHeader className="text-left pb-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[var(--ginger-tint)] text-[var(--ginger-deep)]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ginger-deep)]">
              Thành viên Tạp hoá
            </span>
          </div>
          <DialogTitle className="text-2xl text-[var(--ink)]">
            Tài khoản Tạp hoá vùng biên
          </DialogTitle>
          <DialogDescription className="text-xs text-[var(--ink-soft)]">
            Tra cứu đơn hàng, nhận ưu đãi độc quyền và theo dõi tiến độ vận chuyển.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-[var(--bg-alt)]">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Tạo tài khoản</TabsTrigger>
          </TabsList>

          {/* Login tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)]">
                  Số điện thoại hoặc Email
                </label>
                <Input
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="09xx xxx xxx hoặc email@domain.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[var(--ink)]">
                    Mật khẩu
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Vui lòng liên hệ hotline/Zalo để đặt lại mật khẩu nhanh chóng.")}
                    className="text-[11px] text-[var(--indigo)] hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <Input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full mt-2 font-bold">
                Đăng nhập
              </Button>

              <div className="pt-2 text-center text-xs text-[var(--ink-soft)] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bảo mật theo tiêu chuẩn thương mại điện tử</span>
              </div>
            </form>
          </TabsContent>

          {/* Register tab */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="rounded-lg bg-[var(--ginger-tint)]/60 border border-[var(--ginger)]/30 p-2.5 text-xs text-[var(--ginger-deep)] font-medium">
                🎁 <strong>Tặng mã FIRST10:</strong> Giảm 10% ngay cho đơn hàng đầu tiên của bạn!
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)]">
                  Họ và tên của bạn
                </label>
                <Input
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)]">
                  Số điện thoại
                </label>
                <Input
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="09xx xxx xxx"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--ink)]">
                  Mật khẩu đăng ký
                </label>
                <Input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Tạo mật khẩu (tối thiểu 6 ký tự)"
                  required
                />
              </div>

              <Button type="submit" className="w-full mt-2 font-bold">
                Tạo tài khoản & Nhận ưu đãi
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
