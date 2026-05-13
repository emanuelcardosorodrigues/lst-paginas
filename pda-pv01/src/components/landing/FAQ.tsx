import { FadeIn } from "@/lib/FadeIn";

const faqs = [
  {
    q: "Minha clínica é pequena. Funciona?",
    a: "Dra. Ana Beatriz. 1 cadeira. Sozinha. Lucro de R$7k pra R$13k. Os 4 ajustes existem em qualquer tamanho de clínica.",
  },
  {
    q: "Funciona pra cidade pequena?",
    a: "Dra. Maria Emília. São João Nepomuceno — 26 mil habitantes. Lucro de R$6k pra R$16k. Dois dos ajustes principais (tributação e maquininha) não dependem de onde você mora.",
  },
  {
    q: "Sou especialista. Isso é pra clínico geral?",
    a: "Igor Mazziolli — implantodontista, 18 anos. Ficou horrorizado com a planilha de custos. Custo de hora clínica existe em qualquer cadeira. Especialista que não calcula pode estar precificando implante abaixo do necessário.",
  },
  {
    q: "Não tenho tempo.",
    a: "Os encontros são quinzenais. O material de execução vai direto pra secretária. Quem não tem tempo é quem mais precisa — porque a falta de tempo vem da falta de estrutura.",
  },
  {
    q: "Já fiz mentoria e não funcionou.",
    a: "O problema não era você. Era o método. Cursos genéricos ensinam empresa — não clínica odontológica. O Águia é construído por um dentista de 30 anos que ainda atende.",
  },
  {
    q: "Preciso falar com meu sócio / cônjuge.",
    a: "Leva essa informação: quanto sua clínica perde por mês sem o ajuste? Multiplica por 6. É esse o custo de esperar.",
  },
  {
    q: "Meu contador já cuida do imposto.",
    a: "Pergunta pra ele se já calculou o Fator R da sua clínica. Se a resposta for \"o quê?\" — você tem sua resposta.",
  },
  {
    q: "Quando começa a próxima turma?",
    a: "10 vagas por turma. Quando preenche, preenche. A próxima depende da agenda do Leandro.",
  },
  {
    q: "E se eu entrar e não funcionar?",
    a: "Duas garantias. 15 dias sem perguntas. 6 meses de resultado — se implementou e não funcionou, Leandro te acompanha por mais 3 meses. Se ainda assim não funcionar: dinheiro de volta.",
  },
  {
    q: "O preço parece baixo pra esse nível de acompanhamento.",
    a: "O preço atual é estratégia das primeiras turmas. O valor público é R$12.000. Quando os resultados ficarem públicos, o valor muda.",
  },
];

export default function FAQ() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }} id="faq">
      <div className="container">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.875rem,4vw,2.75rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "#1A1A1A",
              }}
            >
              Dúvidas{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>frequentes</em>.
            </h2>
          </div>
        </FadeIn>

        <div style={{ maxWidth: 750, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0 }}>
          {faqs.map(({ q, a }, i) => (
            <FadeIn key={q} delay={i * 60}>
              <details className="faq-item" style={{ borderBottom: "1px solid #E8E4DB" }}>
                <summary
                  style={{
                    padding: "24px 0",
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "1.0625rem",
                    color: "#1A1A1A",
                    userSelect: "none",
                  }}
                >
                  <span>{q}</span>
                  <span
                    className="faq-icon"
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#F7F3EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.25rem",
                      color: "#C8A84E",
                      lineHeight: 1,
                      fontWeight: 300,
                      transition: "transform 0.3s ease",
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1rem",
                    color: "#6B6560",
                    lineHeight: 1.7,
                    paddingBottom: 24,
                    paddingTop: 4,
                    maxWidth: "90%",
                  }}
                >
                  {a}
                </p>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        .faq-item[open] .faq-icon { transform: rotate(45deg); }
        .faq-item summary::-webkit-details-marker { display: none; }
      `}</style>
    </section>
  );
}
