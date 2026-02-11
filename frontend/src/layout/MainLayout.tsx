import { Outlet } from "react-router";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import Sidebar from "../components/Sidebar.tsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar links */}
      <Sidebar />

      {/* Main rechts = Column */}
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />

        {/* Content wächst */}
        <main className="flex-1 px-8">
          <Outlet />
        </main>

        {/* Footer immer unten */}
        <Footer />
      </div>
    </div>
  );
}
