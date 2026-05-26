import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-body rounded-lg transition-all duration-250 ease-out cursor-pointer hover:-translate-y-0.5";

  const variants = {
    primary:
      "bg-gold text-rich-black font-bold text-base px-8 py-4 hover:brightness-110 hover:shadow-[0_4px_16px_rgba(200,149,46,0.35)]",
    secondary:
      "bg-transparent text-rich-black border-[1.5px] border-rich-black font-medium px-7 py-3.5",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
