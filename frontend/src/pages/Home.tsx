import { Link } from "react-router-dom";
import { CheckCircle, Users, ShieldCheck, ListChecks } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Task<span className="text-blue-600">Manager</span>
          </h1>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-5xl font-extrabold leading-tight text-gray-900">
            Organize Work.
            <br />
            <span className="text-blue-600">Collaborate Better.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            TaskManager is a modern collaborative task management platform
            designed to help individuals and teams plan, assign, track and
            complete tasks efficiently — all from one clean dashboard.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:bg-blue-700 hover:scale-[1.03] transition"
            >
              Start Free
            </Link>
            <Link
              to="/login"
              className="rounded-2xl border border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-800 shadow hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-bold text-gray-900">
            Everything You Need to Stay Productive
          </h3>
          <p className="mt-3 text-gray-600">
            Built with modern technologies and real-world workflows in mind.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<ListChecks className="text-blue-600" />}
            title="Task Management"
            desc="Create, update, prioritize and track tasks with deadlines and statuses."
          />

          <FeatureCard
            icon={<Users className="text-green-600" />}
            title="Collaboration"
            desc="Assign tasks to teammates and track shared progress in real time."
          />

          <FeatureCard
            icon={<ShieldCheck className="text-purple-600" />}
            title="Secure Authentication"
            desc="JWT-based authentication with protected routes and secure APIs."
          />

          <FeatureCard
            icon={<CheckCircle className="text-orange-600" />}
            title="Progress Tracking"
            desc="Monitor task states like Todo, In Progress, Review and Completed."
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white/70 backdrop-blur border-y">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-14">
            <h3 className="text-3xl font-bold text-gray-900">
              How TaskManager Works
            </h3>
            <p className="mt-3 text-gray-600">
              Simple steps to keep your work organized.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <StepCard
              step="01"
              title="Create an Account"
              desc="Sign up in seconds and securely access your workspace."
            />
            <StepCard
              step="02"
              title="Add & Assign Tasks"
              desc="Create tasks, set priorities, deadlines and assign them."
            />
            <StepCard
              step="03"
              title="Track & Complete"
              desc="Update task status and monitor progress from your dashboard."
            />
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h3 className="text-4xl font-bold text-gray-900">
          Ready to Get Organized?
        </h3>
        <p className="mt-4 text-gray-600">
          Start managing your tasks efficiently today.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-block rounded-2xl bg-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-xl hover:bg-blue-700 hover:scale-[1.04] transition"
        >
          Create Your Free Account
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} TaskManager — Created by{" "}
          <span className="font-semibold text-gray-900">
            Subhadeep Saha
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur p-6 shadow hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow hover:shadow-lg transition text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
        {step}
      </div>
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
