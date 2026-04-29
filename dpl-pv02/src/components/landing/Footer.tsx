export const Footer = () => {
  return (
    <footer className="bg-[#050B18]/90 pt-20 pb-10 px-6 border-t border-white/5">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          
          <div className="text-xl font-[800] tracking-tighter text-white/80 mb-6">
            DPL<span className="text-[#00A88E]">.</span>
          </div>

          <div className="flex gap-4 text-sm text-white/50 mb-8">
            <a href="#" className="hover:text-[#00A88E] transition-colors">Política de Privacidade</a>
            <span>|</span>
            <a href="#" className="hover:text-[#00A88E] transition-colors">Termos de Uso</a>
          </div>

          <p className="text-white/30 text-xs leading-relaxed mb-8 text-justify">
            Este site não é afiliado ao Facebook, Meta, Google ou qualquer rede social ou recursos de marketing. A compra desse material não garante nenhum tipo de resultado. Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usamos resultados reais de alunos.
          </p>

          <p className="text-white/40 text-sm">
            © 2026 Leandro Stecca. Todos os direitos reservados.
          </p>

        </div>
      </div>
    </footer>
  );
};
