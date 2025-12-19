import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">
          TaskManager
        </h1>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Organize Your Tasks.  
            <span className="text-blue-600"> Boost Productivity.</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            A collaborative task management platform where you can create,
            track, prioritize and complete your tasks efficiently.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>

          {/* Features */}
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900">
                Task Management
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Create, update and manage tasks with priorities and deadlines.
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 backdrop-blur-xl p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900">
                Secure Authentication
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Register and login securely with protected routes.
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 backdrop-blur-xl p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900">
                Real-time Ready
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Built with a scalable backend ready for real-time updates.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-600">
        Created by <span className="font-semibold">Subhadeep Saha</span>
      </footer>
    </div>
  );
}
