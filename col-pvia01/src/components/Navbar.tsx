import { Menu } from "lucide-react";
import { Button } from "./ui/Button";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-12 bg-rich-black/90 backdrop-blur-[12px] border-b border-white/5 w-full">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21c-2.5 0-4.5-2-4.5-4.5 0-1.5.5-2.5 1.5-3.5L12 9l3 4c1 1 1.5 2 1.5 3.5 0 2.5-2 4.5-4.5 4.5z" />
            <path d="M12 9V3" />
            <path d="M12 21v3" />
            <path d="M9 15h6" />
          </svg>
          <span className="text-white font-body font-medium text-sm">Calculadora OdontoLucro</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <span className="border border-gold text-gold rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em]">
            Exclusivo para Dentistas
          </span>
          <Button
            className="!py-2 !px-5 !text-[13px] !rounded-md"
            onClick={() =>
              document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Quero Lucrar de Verdade
          </Button>
        </div>

        <button className="md:hidden text-white p-1" aria-label="Abrir menu">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
