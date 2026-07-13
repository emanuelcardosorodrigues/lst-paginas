import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

// Polimórfico: com `href` vira <a> de verdade (necessário pro interceptor de
// checkout do GTM, que age em closest('a')); sem `href`, continua <button>.
type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-body rounded-lg transition-all duration-250 ease-out cursor-pointer hover:-translate-y-0.5";

  const variants = {
    primary:
      "bg-gold text-rich-black font-bold text-base px-8 py-4 hover:brightness-110 hover:shadow-[0_4px_16px_rgba(200,149,46,0.35)]",
    secondary:
      "bg-transparent text-rich-black border-[1.5px] border-rich-black font-medium px-7 py-3.5",
  };

  const cls = `${baseStyles} ${variants[variant]} ${className}`;

  if (typeof props.href === "string") {
    const { href, ...rest } = props as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
