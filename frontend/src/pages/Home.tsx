import { Link } from "react-router-dom";
import { CheckCircle, Shield, Users, ListTodo } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            TaskManager
          </h1>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="text-5xl font-extrabold tracking-tight text-slate-900">
            Manage Tasks.
            <br />
            <span className="text-blue-600">Collaborate Better.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            TaskManager is a modern collaborative task management platform
            designed to help individuals and teams plan, assign, track, and
            complete work efficiently — all in one place.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow hover:bg-blue-700 hover:scale-[1.02] transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-center text-3xl font-bold text-slate-900">
            Everything you need to manage work
          </h3>

          <p className="mt-3 text-center text-slate-600">
            Built with scalability, security, and usability in mind
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<ListTodo className="h-6 w-6 text-blue-600" />}
              title="Task Management"
              description="Create, update, prioritize, and track tasks with due dates, priorities, and statuses."
            />

            <Feature
              icon={<Users className="h-6 w-6 text-green-600" />}
              title="Collaboration"
              description="Assign tasks to users, track progress, and collaborate efficiently in real time."
            />

            <Feature
              icon={<Shield className="h-6 w-6 text-purple-600" />}
              title="Secure Authentication"
              description="JWT-based authentication with protected routes to keep user data safe."
            />

            <Feature
              icon={<CheckCircle className="h-6 w-6 text-orange-600" />}
              title="Productivity Focused"
              description="Filters, status tracking, and smart UI to help you stay focused and organized."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 border-t">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-center text-3xl font-bold text-slate-900">
            How TaskManager works
          </h3>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <Step
              step="01"
              title="Register & Login"
              description="Create your account securely and access your personalized dashboard."
            />
            <Step
              step="02"
              title="Create & Assign Tasks"
              description="Add tasks with priorities, due dates, and assign them to collaborators."
            />
            <Step
              step="03"
              title="Track & Complete"
              description="Update task status, monitor progress, and complete work efficiently."
            />
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h3 className="text-3xl font-bold text-slate-900">
            Built with modern technologies
          </h3>

          <p className="mt-4 text-slate-600">
            Designed for performance, scalability, and maintainability
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "Express",
              "Prisma",
              "PostgreSQL",
              "JWT Auth",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center text-white">
        <h3 className="text-3xl font-bold">
          Ready to organize your work better?
        </h3>
        <p className="mt-3 text-blue-100">
          Start managing tasks efficiently with TaskManager today.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-3 text-base font-semibold text-blue-600 hover:bg-blue-50 transition"
        >
          Create Free Account
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-slate-100 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} TaskManager — Created by{" "}
        <span className="font-semibold">Subhadeep Saha</span>
      </footer>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

function Step({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-6 shadow-sm">
      <span className="text-sm font-bold text-blue-600">{step}</span>
      <h4 className="mt-2 text-xl font-semibold text-slate-900">{title}</h4>
      <p className="mt-2 text-slate-600">{description}</p>
    </div>
  );
}
