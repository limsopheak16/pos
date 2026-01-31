import DashboardContent from "./dashboard-content";
import PageWrapper from "@/components/page-wrapper";
import { StaticAuthGuard } from "@/components/static-auth-guard";

export default function DashboardPage() {
  return (
    <PageWrapper>
      <StaticAuthGuard>
        <DashboardContent />
      </StaticAuthGuard>
    </PageWrapper>
  );
}
