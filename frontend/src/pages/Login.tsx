import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/auth.context";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";
import toast from "react-hot-toast";


export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginUser({ email, password });
      setUser(user);
      toast.success("Login successful");
      navigate("/");
    } catch {
      setError("Invalid email or password");
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-white mb-1">
        Welcome back
      </h1>
      <p className="text-white/80 mb-6">
        Login to continue
      </p>

      {error && (
        <div className="mb-4 rounded bg-red-500/20 text-red-100 text-sm p-2">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-green-600 hover:bg-green-700 text-white py-2 font-semibold transition transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center text-white/80 mt-6">
        Don’t have an account?{" "}
        <Link to="/register" className="underline hover:text-white">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
