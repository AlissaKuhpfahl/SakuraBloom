import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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
