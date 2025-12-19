import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";
import { useAuth } from "../context/auth.context";
import AuthLayout from "../layouts/AuthLayout";
import InputField from "../components/InputField";

export default function Register() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await registerUser({ name, email, password });
      setUser(user);
      navigate("/");
    } catch {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-white mb-1">
        Create account
      </h1>
      <p className="text-white/80 mb-6">
        Start managing tasks collaboratively
      </p>

      {error && (
        <div className="mb-4 rounded bg-red-500/20 text-red-100 text-sm p-2">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <InputField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />

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
          className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 font-semibold transition transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center text-white/80 mt-6">
        Already have an account?{" "}
        <Link to="/login" className="underline hover:text-white">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
