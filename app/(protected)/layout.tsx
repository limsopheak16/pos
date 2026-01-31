import React from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import Footer from "@/components/footer";
import Header from "@/components/header";
import AppWrapper from "@/components/app-wrapper";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // No authentication required - using localStorage only
  return (
    <AppWrapper appInfo={{ userId: "static", token: "static" }}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <SidebarNav />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <nav className="w-full flex items-center border-b bg-white px-6 py-4">
            <Header />
          </nav>
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </AppWrapper>
  );
};

export default Layout;
