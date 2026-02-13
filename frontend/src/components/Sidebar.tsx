// ////// Nav icon + open/close  /////////
import { NavLink, Link } from "react-router";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal.tsx";
import { logout } from "../data/auth.ts";
import { useAuth } from "../contexts/useAuth.tsx";

const NAV = [
  { to: "/", label: "Home", icon: "/icons/home.svg", end: true },
  { to: "/modules", label: "Module", icon: "/icons/modules.svg" },
  { to: "/quiz", label: "Quiz", icon: "/icons/quiz.svg" },
  { to: "/progress", label: "Fortschritte", icon: "/icons/progress.svg" },
  { to: "/lessons", label: "Lektionen", icon: "/icons/lessons.svg" },
  { to: "/createProfiles", label: "Profile", icon: "/avatars/cat.svg" }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { setUser, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setShowConfirm(false);
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-(--color-secondary) transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex h-full flex-col py-6">
        {/* Logo + Toggle */}
        {/* Header: Logo + Arrow  */}
        <div className="mb-8 flex justify-center">
          <div className="relative flex h-24 w-full items-center justify-center">
            {/* Logo – nur sichtbar wenn offen */}
            {!collapsed && (
              <Link to="/" className="absolute inset-0 flex items-center justify-center mt-6">
                <img src="/logo.svg" alt="SakuraBloom Logo" className="w-40" />
              </Link>
            )}

            {/* Arrow */}
            <button
              type="button"
              onClick={() => setCollapsed(v => !v)}
              aria-label={collapsed ? "Sidebar öffnen" : "Sidebar schließen"}
              className={` absolute grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow transition-all duration-300 hover:scale-105 active:scale-95 ml-1
        ${
          collapsed ? "left-1/2 -translate-x-1/2 -bottom-4 " : "right-4 -bottom-4" // Pfeil position
        }
      `}
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

        {/* Navigation */}
        <nav className={`flex flex-col gap-2 ${collapsed ? "pl-3" : "text-center pl-6 pt-8"}`}>
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `group ${navClass({ isActive, collapsed })}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3 pl-4"}`}>
                {/* Icon */}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/40 transition group-hover:bg-white group-hover:shadow-md ">
                  <img
                    src={item.icon}
                    alt=""
                    className="h-7 w-7 transition-transform group-hover:scale-110"
                  />
                </span>

                {/* Label (nur wenn offen) */}
                {!collapsed && <span>{item.label}</span>}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Auth */}
        {user === null ? (
          <div
            className={`flex flex-col gap-2 text-sm ${collapsed ? "items-center" : "items-center"}`}
          >
            {/* sign up */}

            <NavLink
              to="/signup"
              className="text-(--color-primary)  transition group"
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
                {/* Label */}
                {!collapsed && <span className="font-semibold w-20 text-left">Sign up</span>}
              </span>
            </NavLink>

            <NavLink
              to="/login"
              title={collapsed ? "Login" : undefined}
              className="group text-(--color-primary) transition "
            >
              <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                {/* Icon Bubble */}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/40 transition group-hover:bg-white group-hover:shadow-md">
                  <img
                    src="/icons/login.png"
                    alt=""
                    className="h-6 w-6 transition-transform group-hover:scale-110"
                  />
                </span>
                {/* Label */}
                {!collapsed && <span className="font-semibold w-20 text-left">Login</span>}
              </span>
            </NavLink>
          </div>
        ) : (
          <div
            className={`flex flex-col gap-2 text-sm ${collapsed ? "items-center" : "items-center"}`}
          >
            <NavLink
              to="/"
              title={collapsed ? "Logout" : undefined}
              onClick={e => {
                e.preventDefault();
                setShowConfirm(true);
              }}
              className="group text-(--color-primary) transition "
            >
              <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                {/* Icon Bubble */}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/40 transition group-hover:bg-white group-hover:shadow-md">
                  <img
                    src="/icons/logout.png"
                    alt=""
                    className="h-6 w-6 transition-transform group-hover:scale-110"
                  />
                </span>
                {/* Label */}
                {!collapsed && <span className="font-semibold w-20 text-left">Logout</span>}
              </span>
            </NavLink>
            <ConfirmModal
              isOpen={showConfirm}
              title="Ausloggen?"
              message="Willst du dich wirklich ausloggen?"
              confirmLabel="Ausloggen"
              cancelLabel="Abbrechen"
              onConfirm={handleLogout}
              onCancel={() => setShowConfirm(false)}
            />
            {/* <NavLink to="createProfiles" title="Create Profile"></NavLink> */}
          </div>
        )}
      </div>
    </aside>
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
