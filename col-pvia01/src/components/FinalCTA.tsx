import { Button } from "./ui/Button";
import { TrustIndicators } from "./ui/TrustIndicators";
import { CHECKOUT_URL } from "../lib/checkout";

export function FinalCTA() {
  return (
    <section className="bg-rich-black py-16 md:py-[100px] px-6 text-center overflow-hidden">
      <div className="max-w-[600px] mx-auto flex flex-col items-center">
        <h2 className="text-[clamp(36px,4.5vw,56px)] leading-[1.1] tracking-[-0.01em] mb-6">
          <span className="display-light text-white/40">Você vai continuar </span>
          <span className="display-bold text-white">cobrando errado?</span>
        </h2>

        <p className="font-body text-lg text-white/70 leading-relaxed mb-8">
          10 minutos separam você de saber o preço certo de cada procedimento.
        </p>

        <Button
          href={CHECKOUT_URL}
          className="w-full sm:w-auto sm:min-w-[320px] !py-4.5 !text-lg mb-8 shadow-2xl shadow-gold/20"
          data-gtm-id="cta-final"
        >
          Quero Lucrar de Verdade &rarr;
        </Button>

        <TrustIndicators light={false} className="justify-center opacity-80" />
      </div>
    </section>
  );
}
