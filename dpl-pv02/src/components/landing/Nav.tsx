import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050B18]/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}
    >
      <div className="container mx-auto px-6 max-w-[1200px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-[800] tracking-tighter ${scrolled ? "text-white" : "text-[#0F172A]"}`}>
            DPL<span className="text-[#00A88E]">.</span>
          </span>
        </div>
        
        <button className="bg-[#00A88E] hover:bg-[#00967F] text-white font-bold px-[24px] py-[12px] text-sm rounded-full transition-all duration-300 hover:-translate-y-[1px] shadow-[0_10px_25px_rgba(0,168,142,0.25)] hover:shadow-[0_15px_30px_rgba(0,168,142,0.4)]">
          Garantir meu acesso
        </button>
      </div>
    </motion.nav>
  );
};
