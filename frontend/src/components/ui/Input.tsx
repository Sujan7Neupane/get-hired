import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`w-full border-0 border-b-2 border-gray-200 bg-transparent px-2 py-3 outline-none transition focus:border-primary ${className}`}
    />
  );
};

export default Input;
