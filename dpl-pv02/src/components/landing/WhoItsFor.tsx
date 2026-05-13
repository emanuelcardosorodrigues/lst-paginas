import { CheckCircle2, XCircle } from "lucide-react";
import { FadeIn } from "@/lib/FadeIn";

export const WhoItsFor = () => {
  return (
    <section className="bg-white py-[clamp(100px,12vw,160px)] px-6 border-b border-black/[0.05]">
      <div className="container mx-auto max-w-[1000px]">
        <div className="text-center mb-16">
          <h2 className="text-[#0F172A] text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight">
            ISSO É PRA VOCÊ?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">

          <FadeIn direction="left" className="space-y-4">
            <div className="bg-[#10B981]/10 text-[#10B981] font-bold text-lg px-6 py-4 rounded-2xl mb-6 text-center border border-[#10B981]/20">
              SIM, se você:
            </div>

            {[
              "Tem dentista parceiro e não sabe se está lucrando com ele",
              "Paga por percentual — e desconfia que está no vermelho",
              "Quer a clínica lucrando mesmo sem você no mocho",
              "O faturamento cresceu. O lucro, não."
            ].map((text, i) => (
              <div key={i} className="bg-[#F8F9FA] border border-black/[0.03] rounded-2xl p-5 flex items-start gap-4">
                <CheckCircle2 className="text-[#00A88E] shrink-0 mt-0.5" size={24} />
                <p className="text-[#0F172A] font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </FadeIn>

          <FadeIn direction="right" delay={100} className="space-y-4">
            <div className="bg-[#EF4444]/10 text-[#EF4444] font-bold text-lg px-6 py-4 rounded-2xl mb-6 text-center border border-[#EF4444]/20">
              NÃO, se você:
            </div>

            {[
              "Não tem parceiro e não quer ter",
              "Quer resultado sem mudar nada",
              "Acha que 50% pro parceiro é justo — e não quer questionar"
            ].map((text, i) => (
              <div key={i} className="bg-[#F8F9FA] border border-black/[0.03] rounded-2xl p-5 flex items-start gap-4 opacity-70">
                <XCircle className="text-[#EF4444] shrink-0 mt-0.5" size={24} />
                <p className="text-[#64748B] font-medium leading-relaxed">{text}</p>
              </div>
            ))}
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
