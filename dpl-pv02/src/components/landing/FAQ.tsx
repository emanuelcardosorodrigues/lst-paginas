import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    { q: "Eu não entendo nada de Excel. Consigo usar?", a: "Sim. É plug and play. Você digita os números nos campos. A calculadora faz a conta. Se sabe digitar um número, consegue usar." },
    { q: "Minha cidade é diferente. Vai funcionar pra mim?", a: "A calculadora usa seus custos reais. São Paulo ou interior — você coloca os valores da sua realidade e ela mostra o resultado." },
    { q: "Meu parceiro vai embora se eu mudar o modelo.", a: "Todos os dentistas do nosso programa disseram isso. Nenhum parceiro foi embora. Sabe por quê? O Protocolo te ensina a apresentar os números — não a impor uma decisão. Parceiro que entende a conta, aceita. Parceiro que não aceita… não era o parceiro certo." },
    { q: "Já tentei outros cursos e não funcionou.", a: "Porque te venderam teoria ou promessa de faturamento. Isso aqui é diferente. É uma calculadora que mostra em minutos se você está no lucro ou no prejuízo com seu parceiro. Não é curso de 40 horas. É: abrir → digitar → ver o resultado. E se não funcionar? Reembolso em 7 dias." },
    { q: "Não tenho tempo pra aprender mais uma coisa.", a: "São 10 minutos. Você gasta mais tempo tentando entender por que o dinheiro não sobra. 10 minutos pra descobrir se seu parceiro tá te dando lucro ou prejuízo. Vale ou não vale?" },
    { q: "Meu parceiro é meu amigo. Não consigo falar de dinheiro com ele.", a: "Essa é a objeção mais comum — e a mais cara. Porque enquanto você evita a conversa, está perdendo dinheiro todo mês. O Protocolo te dá exatamente o que falta nessa situação: os números na mesa. Não é você contra ele. É a conta mostrando o que é justo pra ambos. Quando você chega com dados — não com opinião — a conversa muda. E o parceiro entende." },
    { q: "Meu contador já cuida disso.", a: "Seu contador cuida de imposto e conformidade. Ele não calcula se o repasse que você paga ao parceiro está te dando lucro ou prejuízo. O Protocolo faz isso." },
    { q: "E se eu não souber meus custos exatos?", a: "A calculadora tem todos os campos prontos. Aluguel, funcionário, material, imposto, hora clínica... Você pega os boletos e coloca. Se não souber algum, a calculadora orienta com referências." },
    { q: "Preciso de suporte?", a: "O Protocolo é autoexplicativo. Vem com vídeo tutorial. Se quiser acompanhamento completo pra implementar tudo, o caminho é o Programa de Aceleração. O Protocolo é o primeiro passo." },
    { q: "Quanto tempo até ver resultado?", a: "Imediato. Você descobre hoje se está no prejuízo. Ajusta o modelo hoje. Na próxima negociação com o parceiro, já entra com o número certo." },
    { q: "E se eu não gostar?", a: "7 dias de garantia incondicional. Não gostou? Pede reembolso. 100% do dinheiro de volta. Sem perguntas. Sem burocracia. O risco é zero." },
    { q: "Funciona pra qualquer especialidade de parceiro?", a: "Sim. Implantodontista, ortodontista, endodontista, harmonizador... A lógica é a mesma: custo real + repasse correto = lucro de verdade." },
    { q: "Consigo aplicar sozinho?", a: "Sim. A calculadora mostra o número. Você leva pro parceiro. Se quiser ir além — montar o time completo, escalar a clínica — o Programa de Aceleração é o próximo passo." },
    { q: "Quando recebo o acesso?", a: "Na hora. Compra agora, acesso no email em até 5 minutos. Pode começar hoje mesmo." }
  ];

  return (
    <section className="bg-[#F8F9FA] py-[clamp(100px,12vw,160px)] px-6">
      <div className="container mx-auto max-w-[800px]">
        <div className="text-center mb-16">
          <div className="text-[#64748B] text-sm font-bold tracking-widest uppercase mb-4">
            DÚVIDAS FREQUENTES
          </div>
          <h2 className="text-[#0F172A] text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight">
            Perguntas comuns
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-black/[0.05] rounded-2xl px-6 py-2 data-[state=open]:shadow-sm transition-all shadow-[0_5px_15px_rgba(0,0,0,0.02)]">
              <AccordionTrigger className="text-left font-bold text-[#0F172A] text-lg hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#64748B] text-base leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
