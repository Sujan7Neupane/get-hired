interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

const Button = ({
  children,
  type = "button",
  className = "",
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`btn btn-neutral ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
