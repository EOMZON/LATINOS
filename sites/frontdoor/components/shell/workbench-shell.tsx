import { MobileNav } from "@/components/shell/mobile-nav";
import { Sidebar } from "@/components/shell/sidebar";

export function WorkbenchShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <Sidebar />
      <div className="content-area">
        <MobileNav />
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
