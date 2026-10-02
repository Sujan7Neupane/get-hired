interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
}

const Input = ({ type = "text", placeholder, className = "" }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full border-0 border-b-2 border-gray-200 bg-transparent px-2 py-3 outline-none transition focus:border-primary ${className}`}
    />
  );
};

export default Input;
