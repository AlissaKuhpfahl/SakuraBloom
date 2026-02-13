import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { getMe, register } from "../data/auth.ts";
import { useAuth } from "../contexts/useAuth.tsx";
import Lottie from "lottie-react";

import PrimaryButton from "../components/Btn.tsx";

type RegisterFormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const inputClass =
  "w-full rounded-2xl px-5 py-2 " +
  "bg-white border border-(--color-primary-50) " +
  "text-(--color-Deep-Wine) placeholder:text-(--color-dark-gray)/40 " +
  "transition-all duration-200 " +
  "focus:outline-none focus:border-(--color-primary) " +
  "focus:ring-2 focus:ring-(--color-primary-50)";

const iconWrapClass = "grid h-11 w-11 place-items-center";
const iconClass = "h-5 w-5 text-(--color-primary)";

export function SignUp() {
  /* */
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [{ firstName, lastName, email, password, confirmPassword }, setForm] =
    useState<RegisterFormState>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  const [loading, setLoading] = useState(false);
  const [noteSignup, setNoteSignup] = useState<null | string>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!firstName || !lastName || !email || !password || !confirmPassword)
        throw new Error("All fields are required");
      if (password !== confirmPassword) throw new Error("Passwords do not match");
      setLoading(true);
      console.log(firstName, lastName, email, password, confirmPassword);
      await register({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });
      const { user } = await getMe();
      setUser(user);
      navigate("/");
    } catch (error: unknown) {
      console.log(error);
      const message = (error as { message: string }).message;
      setNoteSignup(message);
    } finally {
      setLoading(false);
    }
  };

  // panda
  const [pandaData, setPandaData] = useState(null);

  useEffect(() => {
    fetch("/animations/waving-girl.json")
      .then(res => res.json())
      .then(data => setPandaData(data));
  }, []);

  return (
    <div className="min-h-full px-4 py-10">
      <div className="mx-auto w-full max-w-5xl">
        {/* farbverlauf */}
        <div className="rounded-3xl overflow-hidden bg-linear-to-br from-(--color-primary) via-(--color-light-pink) to-(--color-blue) shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* linkeseite, Panda */}
            <div className="hidden md:flex items-center justify-center p-10">
              <div className="w-[85%] max-w-md">
                {pandaData && <Lottie animationData={pandaData} loop autoplay />}
              </div>
            </div>

            {/* RECHTS: Inhalt */}
            <div className="p-8 md:p-10 md:pl-0">
              <h1 className="text-2xl font-bold">Registrieren</h1>

              <form id="signup-form" className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Vorname / Nachname */}
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 flex-1">
                    <span className={iconWrapClass}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className={iconClass}
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                    </span>
                    <input
                      className={inputClass}
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      placeholder="Vorname"
                    />
                  </label>

                  <label className="flex items-center gap-1 flex-1">
                    <span className={iconWrapClass}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className={iconClass}
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                    </span>

                    <input
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Nachname"
                    />
                  </label>
                </div>

                {/* Email */}
                <label className="flex items-center gap-1">
                  <span className={iconWrapClass}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className={iconClass}
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                  </span>

                  <input
                    name="email"
                    value={email}
                    onChange={handleChange}
                    type="email"
                    className={inputClass}
                    placeholder="E-Mail"
                  />
                </label>

                {/* Passwort / Confirm */}
                <div className="flex gap-3">
                  <label className="flex items-center gap-1 flex-1">
                    <span className={iconWrapClass}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className={iconClass}
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <input
                      name="password"
                      value={password}
                      onChange={handleChange}
                      type="password"
                      className={inputClass}
                      placeholder="Passwort"
                    />
                  </label>

                  <label className="flex items-center gap-1 flex-1">
                    <span className={iconWrapClass}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className={iconClass}
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>

                    <input
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                      type="password"
                      className={inputClass}
                      placeholder="Bestätige Passwort"
                    />
                  </label>
                </div>

                <small className="text-xs text-center">
                  Du hast schon einen Account?{" "}
                  <Link to="/login" className="hover:underline">
                    Melde dich hier an!
                  </Link>
                </small>

                {/* BTN (zentriert, nicht full) */}
                <PrimaryButton
                  className="w-64 mt-2 self-center"
                  label={loading ? "Erstelle..." : "Erstelle Account"}
                  disabled={loading}
                  onClick={() => {
                    const form = document.getElementById("signup-form") as HTMLFormElement | null;
                    form?.requestSubmit();
                  }}
                />

                <p className="text-center font-extrabold">{noteSignup ? noteSignup : ""}</p>

                {/* Mobile Panda */}
                <div className="mt-6 flex md:hidden items-center justify-center">
                  <div className="w-[70%] max-w-xs opacity-95">
                    {pandaData && <Lottie animationData={pandaData} loop autoplay />}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
