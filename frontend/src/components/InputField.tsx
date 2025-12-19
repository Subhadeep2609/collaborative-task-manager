import { useState } from "react";

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: Props) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-white mb-1">
        {label}
      </label>

      <input
        type={isPassword && show ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full rounded-lg bg-white/80 px-3 py-2 pr-10 text-gray-800 outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-9 text-gray-600 hover:text-gray-900 transition"
        >
          {show ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
}
