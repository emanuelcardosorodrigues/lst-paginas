import { motion } from "framer-motion";
import { Calculator, Sparkles, Video, FileText } from "lucide-react";

export const WhatsInside = () => {
  const features = [
    {
      icon: <Calculator size={28} strokeWidth={1.5} />,
      title: "Calculadora do Dentista Parceiro Lucrativo",
      desc: "Insira custos e veja, em segundos, o repasse correto e a margem real."
    },
    {
      icon: <Sparkles size={28} strokeWidth={1.5} />,
      title: "Consultor de Precificação com IA",
      desc: "Recomendações de preço baseadas no seu perfil de clínica."
    },
    {
      icon: <Video size={28} strokeWidth={1.5} />,
      title: "Masterclass: Custos Ocultos e Como Lucrar",
      desc: "Aula objetiva sobre os 12 custos invisíveis que comem seu lucro."
    },
    {
      icon: <FileText size={28} strokeWidth={1.5} />,
      title: "Bônus: Como Dobrar Seu Lucro em 6 Meses",
      desc: "Plano de execução enxuto para reorganizar a clínica."
    }
  ];

  return (
    <section className="bg-white py-[clamp(100px,12vw,160px)] px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <h2 className="text-[#0F172A] text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight">
            O que está incluso
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#F8F9FA] rounded-[24px] p-8 flex gap-6 hover:bg-[#F1F5F9] transition-colors border border-black/[0.03]"
            >
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 text-[#0F172A]">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{item.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
