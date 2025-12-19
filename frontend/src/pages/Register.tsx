import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth.api";
import { useAuth } from "../context/auth.context";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await registerUser({ name, email, password });
    setUser(user);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={submit} className="bg-gray-800 p-6 rounded w-96 space-y-4">
        <h1 className="text-xl font-bold">Register</h1>

        <input
          className="w-full p-2 text-black"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 text-black"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 p-2 rounded">Register</button>

        <p className="text-sm">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
