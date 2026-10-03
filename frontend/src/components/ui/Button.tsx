interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

const Button = ({
  children,
  type = "button",
  className = "",
  onClick,
  disabled = false,
  "aria-label": ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`btn btn-neutral ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
