import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  placeholder: string;
  onChange: (value: string) => void;
  label?: string;
}

const Dropdown = ({
  value,
  options,
  placeholder,
  onChange,
  label,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {label && (
        <label className="mb-1 block text-sm text-base-content/60">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-transparent px-2 py-3 text-left outline-none transition focus:border-primary"
      >
        <span className={selectedOption ? "" : "text-base-content/50"}>
          {selectedOption?.label || placeholder}
        </span>

        <FaChevronDown
          className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`block w-full bg-white px-4 py-3 text-left text-gray-800 transition hover:bg-gray-100 ${
                option.value === value ? "bg-gray-100" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
