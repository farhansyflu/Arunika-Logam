import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden p-6 sm:p-10">{children}</div>
    </div>
  );
}
