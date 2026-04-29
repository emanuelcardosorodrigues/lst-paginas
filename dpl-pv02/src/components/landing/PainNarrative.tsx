import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { img } from "@/lib/imgPath";

export const PainNarrative = () => {
  return (
    <section className="bg-[#050B18] py-[clamp(100px,12vw,160px)] px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(0,168,142,0.15)_0%,transparent_70%)] -z-10" />

      <div className="container mx-auto max-w-[900px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-white text-[clamp(1.75rem,4vw,2.5rem)] font-[800] leading-[1.3] tracking-tight mb-8">
            "Você contratou um dentista parceiro pra finalmente sair do mocho. Mas o lucro — e o tempo — que deviam sobrar… sumiram."
          </h2>
          <div className="text-[#00A88E] text-xl font-medium">
            Deixa eu adivinhar...
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center mb-20">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              "Parceiro atendendo na sua clínica",
              "Agenda com dois profissionais trabalhando",
              "Mais especialidades oferecidas aos pacientes",
              "Faturamento cresceu: R$30 mil, R$50 mil, R$80 mil por mês…",
              "Você até conseguiu sair mais cedo alguns dias"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#00A88E] shrink-0 mt-0.5" />
                <span className="text-white/90 text-lg leading-snug">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="hidden md:flex flex-col items-center gap-4 py-8">
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-white/20"></div>
            <div className="text-white/40 font-bold tracking-widest text-sm uppercase">MAS…</div>
            <div className="w-px h-24 bg-gradient-to-t from-transparent to-white/20"></div>
          </div>
          <div className="md:hidden flex items-center justify-center gap-4 py-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20"></div>
            <div className="text-white/40 font-bold tracking-widest text-sm uppercase">MAS…</div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20"></div>
          </div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {[
              "No fim do mês, depois de pagar todo mundo, sobra menos do que antes",
              "Você trabalha mais do que quando estava sozinho",
              "Não sabe se a estratégia de pagamento do parceiro está certa",
              "Tem medo de mudar — e perder o profissional",
              "Se ele sair amanhã, a clínica sente na hora"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-[#EF4444] shrink-0 mt-0.5" />
                <span className="text-white/80 text-lg leading-snug">{text}</span>
              </div>
            ))}
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-12 relative">
            <div className="absolute top-4 left-6 text-6xl text-white/10 font-serif leading-none">"</div>
            <p className="text-[clamp(1.25rem,3vw,1.75rem)] text-white/90 font-serif italic relative z-10">
              Eu trouxe esse cara pra me ajudar a crescer. Como que eu tô ganhando menos do que antes?
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[700px] mx-auto"
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">E o pior de tudo…</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">
                Você sabe que tem algo ERRADO. Você sente que tá bancando uma estrutura cada vez maior pra ganhar quase o mesmo de antes. Mas quando você tenta entender onde tá o problema…
              </p>
            </div>
            <div className="md:w-[280px] shrink-0">
              <img
                src={img("agit-errado.webp")}
                alt="Documentos de gestão financeira"
                className="w-full h-auto rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.4)]"
                width="280"
                height="350"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="space-y-3 mb-10">
            {[
              "Não sabe se o percentual que você paga ao parceiro faz sentido",
              "Tem medo de mudar o modelo e perder o profissional",
              "Contador só fala de imposto",
              "O parceiro fala que ganha pouco. Você acha que paga demais. E ninguém consegue provar nada.",
              "O 'mentor' só fala em trazer mais paciente — mas a agenda já tá cheia e o lucro não aparece"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-[#00A88E] shrink-0 mt-2.5"></div>
                <span className="text-white/80">{text}</span>
              </div>
            ))}
          </div>

          <p className="text-[#64748B] text-lg leading-relaxed mb-16">
            Aí você continua na mesma. Gerenciando. Pagando. Cansado. E o dinheiro? Continua indo embora — só que agora com parceiro dentro de casa.
          </p>

          <div className="bg-[#0A1428] rounded-3xl p-8 md:p-12 border border-white/5 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Sabe por que isso acontece?</h3>
            <p className="text-white/70 mb-6">Não é porque você:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-white/5 px-4 py-2 rounded-lg text-white/80 text-sm">Escolheu o parceiro errado</span>
              <span className="bg-white/5 px-4 py-2 rounded-lg text-white/80 text-sm">Não sabe liderar uma equipe</span>
              <span className="bg-white/5 px-4 py-2 rounded-lg text-white/80 text-sm">Está numa cidade difícil</span>
              <span className="bg-white/5 px-4 py-2 rounded-lg text-white/80 text-sm">Não tem pacientes suficientes</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <img
                src={img("rev-porque.webp")}
                alt="Cadeira odontológica"
                className="w-full h-auto rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                width="320"
                height="240"
                loading="lazy"
                decoding="async"
              />
              <img
                src={img("rev-estrategia.webp")}
                alt="Papel amassado com percentuais"
                className="w-full h-auto rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                width="320"
                height="240"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="bg-[#050B18] border border-[#00A88E]/50 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(0,168,142,0.15)]">
              <p className="text-xl md:text-2xl font-bold text-white leading-snug">
                É porque: Você está usando a estratégia de remuneração ERRADA.<br/>
                <span className="text-[#00A88E]">Simples assim.</span>
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
