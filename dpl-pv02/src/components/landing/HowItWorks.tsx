import { motion } from "framer-motion";
import g11 from "@assets/showroom-g1-1_(1)_1777343134187.webp";
import g12 from "@assets/showroom-g1-2_(1)_1777343134187.webp";
import g13 from "@assets/showroom-g1-3_(1)_1777343134187.webp";
import g21 from "@assets/showroom-g2-1_(1)_1777343134186.webp";
import g22 from "@assets/showroom-g2-2_(1)_1777343134186.webp";
import g23 from "@assets/showroom-g2-3_(1)_1777343134186.webp";
import g31 from "@assets/showroom-g3-1_(1)_1777343134185.webp";
import g32 from "@assets/showroom-g3-2_(1)_1777343134185.webp";
import g33 from "@assets/showroom-g3-3_(1)_1777343134176.webp";

type CardData = {
  image: string;
  title: string;
  body: string;
};

const grid1: CardData[] = [
  {
    image: g11,
    title: "Custo real por procedimento",
    body: "ZERO surpresas ao fim do mês!",
  },
  {
    image: g12,
    title: "Lucro ou Prejuízo daquele procedimento do Parceiro",
    body: "Estruture tudo dentro da sua precificação",
  },
  {
    image: g13,
    title: "Valor da sua Hora Clínica",
    body: "O seu devido valor RESGUARDADO desde o preço.",
  },
];

const grid2: CardData[] = [
  {
    image: g21,
    title: "Remuneração Correta sem Risco Jurídico",
    body: "Tudo organizado para você pagar só o que precisa.",
  },
  {
    image: g22,
    title: "Margem de negociação Lucrativa",
    body: "O valor máximo de desconto para você ter lucro de verdade e ainda fazer o cliente feliz.",
  },
  {
    image: g23,
    title: "Reinvestimento",
    body: "O crescimento do seu consultório estruturado desde a precificação",
  },
];

const grid3: CardData[] = [
  {
    image: g31,
    title: "Projeção de Lucro",
    body: "Seu lucro protegido e projetado para garantir máxima liberdade",
  },
  {
    image: g32,
    title: "Valor Mínimo",
    body: "Qual o valor mínimo a ser cobrado para ainda ter lucro",
  },
  {
    image: g33,
    title: "Quanto cobrar",
    body: "O valor ideal para cobrar para cada procedimento",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Card = ({ image, title, body }: CardData) => (
  <motion.div variants={itemVariants} className="flex flex-col">
    <div className="h-[240px] bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F7] rounded-t-3xl border border-b-0 border-[#00A88E]/15 p-6 flex items-center justify-center overflow-hidden">
      <img
        src={image}
        alt={title}
        className="max-h-full max-w-full object-contain drop-shadow-[0_15px_25px_rgba(15,23,42,0.18)]"
      />
    </div>
    <div className="bg-white p-8 rounded-b-3xl border border-t-0 border-[#00A88E]/15 flex-grow shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
      <h3 className="text-xl font-bold text-[#0F172A] mb-3">{title}</h3>
      <p className="text-[#64748B] leading-relaxed">{body}</p>
    </div>
  </motion.div>
);

const Grid = ({ cards }: { cards: CardData[] }) => (
  <motion.div
    className="grid md:grid-cols-3 gap-8"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    {cards.map((c) => (
      <Card key={c.title} {...c} />
    ))}
  </motion.div>
);

export const HowItWorks = () => {
  return (
    <section className="bg-white py-[clamp(100px,12vw,160px)] px-6">
      <div className="container mx-auto max-w-[1200px]">

        <div className="text-center mb-16">
          <h2 className="text-[#0F172A] text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight mb-4">
            Como o DPL Funciona
          </h2>
          <div className="text-[#64748B] text-lg font-medium uppercase tracking-wider">
            O Básico bem estruturado
          </div>
        </div>

        <div className="mb-24">
          <Grid cards={grid1} />
        </div>

        <div className="text-center mb-16">
          <h3 className="text-[#0F172A] text-2xl font-[800] tracking-tight">Todos os Custos Mapeados</h3>
        </div>

        <div className="mb-24">
          <Grid cards={grid2} />
        </div>

        <div className="text-center mb-16">
          <h3 className="text-[#0F172A] text-2xl font-[800] tracking-tight">Os Valores Certos Para Você Lucrar!</h3>
        </div>

        <Grid cards={grid3} />

      </div>
    </section>
  );
};
