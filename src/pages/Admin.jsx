import AdminNavbar from "@/components/admin/AdminNavbar";
import { ChevronLeft, ChevronRight, LayoutDashboard, ReceiptText,ScrollText,Menu, X, UserIcon, Banknote, } from "lucide-react";
import DashboardPanel from "@/components/admin/Dashboard";
import PoojaList from "@/components/admin/PoojaList";
import Receipts from "@/components/admin/Receipts";
import Report from "@/components/admin/Report";
import React, { useState } from "react";
import Users from "@/components/admin/Users";
import PaymentList from "@/components/admin/PaymentList";

function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [panel, setPanel] = useState("Receipts");

  const menuItems = [
    // {
    //   icon: <LayoutDashboard size={20} />,
    //   label: "dashboard",
    // },
    {
      icon: <ReceiptText size={20} />,
      label: "Receipts",
    },
    {
      icon: <ScrollText size={20} />,
      label: "Poojas",
    },
    {
      icon: <Banknote size={20} />,
      label: "Payments",
    },
    {
      icon: <UserIcon size={20} />,
      label: "Users",
    },
    // {
    //   icon: <Settings size={20} />,
    //   label: "Settings",
    // },
  ];

  const handlePanelChange = (label) => {
    setPanel(label);
    setMobileSidebarOpen(false);
  };

  const renderContent = () => {
    switch (panel) {
      case "dashboard":
        return <DashboardPanel />;

      case "Receipts":
        return <Receipts />;

      case "Poojas":
        return <PoojaList />;

      case "Payments":
        return <PaymentList />;

      case "Users":
        return <Users />;
      case "Settings":
        return (
          <div className="flex h-full items-center justify-center text-center text-lg sm:text-2xl text-[#9A6428]">
            Settings Coming Soon
          </div>
        );

      default:
        return <DashboardPanel />;
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FFF8EE]">
      <AdminNavbar />

      <div className="relative flex">

        {/* Mobile Overlay */}

        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}

        {/* Mobile Menu Button */}

        {!mobileSidebarOpen && (
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="fixed right-3.5 sm:right-4 top-20 sm:top-22 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-[#E8D7BC] bg-white shadow-lg lg:hidden"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Sidebar */}

        <aside
          className={`
            fixed lg:sticky
            top-0
            left-0
            z-50
            h-screen
            bg-[#FFFDF8]
            border-r border-[#E8D7BC]
            shadow-sm
            transition-all duration-300

            ${mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
            }

            ${collapsed ? "lg:w-20" : "lg:w-72"}

            w-[80%] max-w-72
          `}
        >
          {/* Mobile Close */}

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="absolute right-4 top-4 rounded-lg p-2 hover:bg-[#FFF2DF] lg:hidden"
          >
            <X size={20} />
          </button>

          {/* Desktop Collapse */}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-4 top-8 hidden lg:flex h-8 w-8 items-center justify-center rounded-full border border-[#E8D7BC] bg-white shadow"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          {/* Sidebar Header */}

          <div className="border-b border-[#F2E3CA] p-4 sm:p-6">
            {collapsed ? (
              <div className="text-center text-2xl">🕉</div>
            ) : (
              <>
                <h2 className="font-gelasio text-lg sm:text-xl font-bold text-[#4A2108] truncate">
                  Temple Admin
                </h2>

                <p className="mt-1 text-xs sm:text-sm text-[#9A6428]">
                  Management Panel
                </p>
              </>
            )}
          </div>

          {/* Navigation */}

          <nav className="space-y-1.5 sm:space-y-2 p-3 sm:p-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handlePanelChange(item.label)}
                className={`flex w-full items-center rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 transition-all hover:bg-[#FFF2DF] hover:text-[#D88718] ${panel === item.label
                  ? "bg-[#FFF2DF] text-[#D88718]"
                  : "text-[#6B4A27]"
                  }`}
              >
                {item.icon}

                {!collapsed && (
                  <span className="ml-3.5 sm:ml-4 truncate font-medium">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}

        <main className="min-w-0 w-full flex-1 p-3.5 sm:p-4 md:p-6 lg:p-8">

          {/* Header */}

          <div className="mb-5 sm:mb-8">

            <h1 className="mt-1.5 sm:mt-2 uppercase text-xl sm:text-2xl md:text-3xl font-bold text-[#C46E16] wrap-break-word">
              {panel}
            </h1>

          </div>

          {/* Dynamic Content */}

          <div className="min-h-125 lg:min-h-162.5 w-full max-w-full overflow-x-auto rounded-2xl sm:rounded-3xl border border-[#E8D7BC] bg-[#FFFDF8] p-3.5 sm:p-6">
            {renderContent()}
          </div>

        </main>

      </div>
    </div>
  );
}

export default AdminDashboard;