import { useState } from "react";
import { Link } from "react-router";
import { login, getMe } from "../data/auth.ts";
import { useAuth } from "../contexts/useAuth.tsx";
import { useNavigate } from "react-router";

type LoginFormState = {
  email: string;
  password: string;
};

const buttonClass =
  "px-0 py-2 text-sm text-white font-semibold bg-(--color-primary) \
   w-75 self-center hover:text-black rounded-l-full rounded-r-full";

const inputClass = "rounded-full grow text-center text-black font-semibold bg-(--color-primary)";

export function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [{ email, password }, setForm] = useState<LoginFormState>({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [noteSignin, setNoteSignin] = useState<null | string>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(email, password);
      if (!email || !password) throw new Error("All fields are required");
      setLoading(true);

      const resData = await login({ email, password });
      console.log(resData);

      const { user } = await getMe();
      setUser(user);
      navigate("/");
    } catch (error: unknown) {
      console.log(error);
      const message = (error as { message: string }).message;
      setNoteSignin(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Anmeldung</h1>
      <form className="my-5 md:w-1/2 mx-auto flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="flex items-center gap-2 font-semibold" htmlFor="login-input-email">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            className={inputClass}
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            id="login-input-email"
            placeholder="E-Mail"
          />
        </label>

        <label className="flex items-center gap-2" htmlFor="login-input-password">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className={inputClass}
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            id="login-input-password"
            placeholder="Passwort"
          />
        </label>

        <small>
          Du bist noch nicht registriert?{" "}
          <Link to="/signup" className="hover:underline">
            Registere dich hier!
          </Link>
        </small>
        <button className={buttonClass} disabled={loading}>
          Anmelden
        </button>
        <p className="text-center font-extrabold ">{noteSignin ? noteSignin : ""}</p>
      </form>
    </>
  );
}
