import { NavLink, Link } from "react-router";
// import logo from "../assets/logo.svg";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-64 bg-(--color-secondary) border-r border-(--color-primary-50)">
      <div className="flex h-full flex-col  py-6">
        {/* Logo */}
        <Link to="/" className="mb-10 flex justify-center">
          <img src="/logo.svg" alt="SakuraBloom Logo" className="" />
          {/* <img src={logo} alt="SakuraBloom Logo" className="h-32" /> das hat funktioert */}
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-center pl-6">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/modules" className={navClass}>
            Module
          </NavLink>
          <NavLink to="/quiz" className={navClass}>
            Quiz
          </NavLink>
          <NavLink to="/progress" className={navClass}>
            Fortschritte
          </NavLink>
          <NavLink to="/lessons" className={navClass}>
            Lektionen
          </NavLink>
        </nav>

        <div className="flex-1" />

        {/* Auth */}
        <div className="flex flex-col items-center gap-2 text-sm">
          <NavLink to="/signup" className="text-(--color-primary) ">
            Signup
          </NavLink>
          <NavLink to="/login" className="text-(--color-primary)  ">
            Login
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

function navClass({ isActive }: { isActive: boolean }) {
  return `
     px-0 py-2 text-sm font-semibold transition
    ${
      isActive
        ? "bg-(--color-primary) text-white  w-full rounded-l-full rounded-r-none  "
        : " hover:bg-(--color-primary-50) rounded-l-full rounded-r-none"
    }
  `;
}
