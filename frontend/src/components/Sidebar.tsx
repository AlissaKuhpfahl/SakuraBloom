// ////// Nav icon + open/close  /////////
import { useParams } from "react-router-dom";
import { NavLink, Link } from "react-router";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal.tsx";
import { logout } from "../data/auth.ts";
import { useAuth } from "../contexts/useAuth.tsx";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { lang } = useParams();
  const { t } = useTranslation("common");
  const [collapsed, setCollapsed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobile() {
    setMobileOpen(false);
  }
  const { setUser, user } = useAuth();

  const NAV = [
    {
      showItem: () => {
        return true;
      },
      to: `/${lang}/`,
      label: t("nav.home"),
      icon: "/icons/home.svg",
      end: true
    },
    {
      showItem: () => {
        return true;
      },
      to: `/${lang}/modules`,
      label: t("nav.modules"),
      icon: "/icons/modules.svg"
    },
    {
      showItem: () => {
        return true;
      },
      to: `/${lang}/quiz/online`,
      label: t("nav.quiz"),
      icon: "/icons/quiz.svg"
    },
    {
      showItem: () => {
        return true;
      },
      to: `/${lang}/progress`,
      label: t("nav.progress"),
      icon: "/icons/progress.svg"
    },
    {
      showItem: () => {
        return true;
      },
      to: `/${lang}/lessons`,
      label: t("nav.lessons"),
      icon: "/icons/lessons.svg"
    },
    {
      showItem: () => {
        return user != null;
      },
      to: `/${lang}/createProfiles`,
      label: t("nav.createProfile"),
      icon: "/icons/account.svg"
    },
    {
      showItem: () => {
        return user != null;
      },
      to: `/${lang}/profile`,
      label: t("nav.profile"),
      icon: "/icons/manager.svg"
    }
  ];

  const handleLogout = async () => {
    console.log(await logout());
    setUser(null);
    setShowConfirm(false);
  };

  return (
    <>
      {/* Mobile Toggle Button (Burger) */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed left-4 top-4 z-50 grid h-11 w-11 place-items-center bg-(--color-primary) shadow rounded-full"
        aria-label="Menü öffnen"
      >
        <img src="/icons/menu.svg" alt="" className="h-8 w-8" />
      </button>

      {/* Backdrop (nur mobil) */}
      {mobileOpen && (
        <button
          type="button"
          onClick={closeMobile}
          className="lg:hidden fixed inset-0 z-40 bg-black/35"
          aria-label="Menü schließen"
        />
      )}

      <aside
        className={[
          "bg-(--color-secondary) transition-all duration-300",
          // Desktop
          "lg:sticky lg:top-0 lg:h-screen",
          // Mobile Drawer
          "fixed left-0 top-0 z-50 h-dvh lg:z-auto",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          // Width
          collapsed ? "w-20" : "w-64"
        ].join(" ")}
      >
        <div className="flex h-full flex-col py-6">
          {/* Header: Logo + Toggle */}
          <div className="mb-8 flex justify-center">
            <div className="relative flex h-24 w-full items-center justify-center">
              {/* Logo */}
              {!collapsed && (
                <Link
                  to={`/${lang}`}
                  className="absolute inset-0 flex items-center justify-center mt-6"
                >
                  <img src="/logo.svg" alt="SakuraBloom Logo" className="w-40" />
                </Link>
              )}

              {/* Mobile Close (X) */}
              <button
                type="button"
                onClick={closeMobile}
                className="lg:hidden absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-(--color-primary) shadow"
                aria-label="Menü schließen"
              >
                <img src="/icons/close.svg" alt="" className="h-8 w-8" />
              </button>

              {/* Arrow (Collapse) */}
              <button
                type="button"
                onClick={() => setCollapsed(v => !v)}
                aria-label={collapsed ? "Sidebar öffnen" : "Sidebar schließen"}
                className={`absolute grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow transition-all duration-300 hover:scale-105 active:scale-95 ml-1
              ${collapsed ? "left-1/2 -translate-x-1/2 -bottom-4" : "right-4 -bottom-4"}`}
              >
                <img
                  src="/icons/arrow.svg"
                  alt=""
                  className={`h-6 w-6 transition-transform duration-300 ${
                    collapsed ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Navigation (NUR EINMAL) */}
          <nav className={`flex flex-col gap-2 ${collapsed ? "pl-3" : "text-center pl-6 pt-8"}`}>
            {NAV.map(item =>
              item.showItem() ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `group ${navClass({ isActive, collapsed })}`}
                  title={collapsed ? item.label : undefined}
                >
                  <span
                    className={`flex items-center ${collapsed ? "justify-center" : "gap-3 pl-4"}`}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-white/40 transition group-hover:bg-white group-hover:shadow-md">
                      <img
                        src={item.icon}
                        alt=""
                        className="h-7 w-7 transition-transform group-hover:scale-110"
                      />
                    </span>
                    {!collapsed && <span>{item.label}</span>}
                  </span>
                </NavLink>
              ) : null
            )}
          </nav>

          <div className="flex-1" />

          {/* Auth */}
          {user === null ? (
            <div
              className={`flex flex-col gap-2 text-sm ${
                collapsed ? "items-center" : "items-center"
              }`}
            >
              <NavLink
                to={`/${lang}/signup`}
                onClick={() => setMobileOpen(false)}
                className="text-(--color-primary) transition group"
                title={collapsed ? "Signup" : undefined}
              >
                <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/40 transition group-hover:bg-white group-hover:shadow-md">
                    <img
                      src="/icons/signup.png"
                      alt=""
                      className="h-6 w-6 transition-transform group-hover:scale-110"
                    />
                  </span>
                  {!collapsed && (
                    <span className="font-semibold w-20 text-left">{t("nav.signup")}</span>
                  )}
                </span>
              </NavLink>

              <NavLink
                to={`/${lang}/login`}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? "Login" : undefined}
                className="group text-(--color-primary) transition"
              >
                <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/40 transition group-hover:bg-white group-hover:shadow-md">
                    <img
                      src="/icons/login.png"
                      alt=""
                      className="h-6 w-6 transition-transform group-hover:scale-110"
                    />
                  </span>
                  {!collapsed && (
                    <span className="font-semibold w-20 text-left">{t("nav.login")}</span>
                  )}
                </span>
              </NavLink>
            </div>
          ) : (
            <div
              className={`flex flex-col gap-2 text-sm ${
                collapsed ? "items-center" : "items-center"
              }`}
            >
              <NavLink
                to={`/${lang}/`}
                title={collapsed ? "Logout" : undefined}
                onClick={e => {
                  e.preventDefault();
                  setShowConfirm(true);
                  setMobileOpen(false);
                }}
                className="group text-(--color-primary) transition"
              >
                <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/40 transition group-hover:bg-white group-hover:shadow-md">
                    <img
                      src="/icons/logout.png"
                      alt=""
                      className="h-6 w-6 transition-transform group-hover:scale-110"
                    />
                  </span>
                  {!collapsed && (
                    <span className="font-semibold w-20 text-left">{t("nav.logout")}</span>
                  )}
                </span>
              </NavLink>

              <ConfirmModal
                isOpen={showConfirm}
                title={t("modal.logoutTitle")}
                message={t("modal.logoutMessage")}
                confirmLabel={t("modal.confirm")}
                cancelLabel={t("modal.cancel")}
                onConfirm={async () => handleLogout()}
                onCancel={() => setShowConfirm(false)}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function navClass({ isActive, collapsed }: { isActive: boolean; collapsed: boolean }) {
  return `
     py-2 text-sm font-semibold transition 
    ${collapsed ? "px-1" : "px-0"}
    ${
      isActive
        ? "bg-(--color-light-pink) text-(--color-primary) w-full rounded-full rounded-r-none "
        : "hover:bg-(--color-primary-50) rounded-full rounded-r-none  "
    }
  `;
}
