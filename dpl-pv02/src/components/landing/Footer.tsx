export const Footer = () => {
  return (
    <footer className="bg-[#050B18]/90 pt-20 pb-10 px-6 border-t border-white/5">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">

          <div className="text-xl font-[800] tracking-tighter text-white/80 mb-6">
            DPL<span className="text-[#00A88E]">.</span>
          </div>

          <p className="text-white/25 text-sm mb-4">
            Dr. Leandro Stecca © 2026. Todos os direitos reservados.
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/30 mb-10">
            <a
              href="https://leandrostecca.com.br/termos-de-uso"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00A88E]/70 transition-colors underline-offset-4 hover:underline"
            >
              Termos de Uso
            </a>
            <span className="text-white/15" aria-hidden="true">|</span>
            <a
              href="https://leandrostecca.com.br/politica-de-privacidade"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00A88E]/70 transition-colors underline-offset-4 hover:underline"
            >
              Política de privacidade
            </a>
          </nav>

          <p className="text-white/10 text-[0.6875rem] leading-relaxed max-w-[560px] mx-auto">
            Este site não é afiliado, patrocinado ou endossado pela Meta®, Facebook® ou Instagram®. As marcas citadas pertencem aos seus respectivos proprietários. Resultados podem variar de acordo com a dedicação e realidade de cada pessoa.
          </p>

        </div>
      </div>
    </footer>
  );
};
