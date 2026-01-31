import { FastDashboard } from "@/components/dashboard/fast-dashboard";
import { StaticAuthGuard } from "@/components/static-auth-guard";

export default function DashboardContent() {
  return (
    <StaticAuthGuard>
      <FastDashboard />
    </StaticAuthGuard>
  );
}
