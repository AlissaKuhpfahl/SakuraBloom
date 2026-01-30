import { useState } from "react";
import { Link } from "react-router";
import { login } from "../data/auth.ts";

type LoginFormState = {
  email: string;
  password: string;
};

export function Login() {
  const [{ email, password }, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(email, password);
      if (!email || !password) throw new Error("All fields are required");
      setLoading(true);

      // TODO: Add login logic
      const resData = await login({ email, password });

      // toast.success(
      //   resData ? resData.message : "Login attempted (not implemented)",
      // );
    } catch (error: unknown) {
      console.log(error);
      // const message = (error as { message: string }).message;
      // toast.error(message);
    } finally {
      setLoading(false);
    }
    // const meData = await authMe();
    // console.log("meData:", meData);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Anmeldung</h1>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="flex">
          <label htmlFor="login-input-email">Email:</label>
          <input
            className="border"
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
            id="login-input-email"
          />
        </div>
        <div className="flex">
          <label htmlFor="login-input-password">Passwort:</label>
          <input
            className="border"
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            id="login-input-password"
          />
        </div>
        <small>
          Du hast dich noch nicht registriert?{" "}
          <Link to="/signup" className="hover:underline">
            Registere dich hier!
          </Link>
        </small>
        <button className="border hover:font-bold" disabled={loading}>
          Anmelden
        </button>
      </form>
    </>
  );
}
