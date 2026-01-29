import { Outlet } from "react-router";

import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import Sidebar from "../components/Sidebar.tsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen ">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Header />
          <div className="px-6 pb-10">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
