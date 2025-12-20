import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 p-6 sm:p-8 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
