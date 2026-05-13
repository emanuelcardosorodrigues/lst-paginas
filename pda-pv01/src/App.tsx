import { lazy, Suspense } from "react";
import { ScrollProgress } from "./lib/ScrollProgress";
import Hero from "./components/landing/Hero";

const DepoimentoDestaque   = lazy(() => import("./components/landing/DepoimentoDestaque"));
const IdentificacaoProblema = lazy(() => import("./components/landing/IdentificacaoProblema"));
const PorqueAcontece       = lazy(() => import("./components/landing/PorqueAcontece"));
const MercadoPrega         = lazy(() => import("./components/landing/MercadoPrega"));
const PorqueNaoFunciona    = lazy(() => import("./components/landing/PorqueNaoFunciona"));
const ManifestoDark        = lazy(() => import("./components/landing/ManifestoDark"));
const Solucao              = lazy(() => import("./components/landing/Solucao"));
const ProvaCases           = lazy(() => import("./components/landing/ProvaCases"));
const SomosDiferentes      = lazy(() => import("./components/landing/SomosDiferentes"));
const Beneficios           = lazy(() => import("./components/landing/Beneficios"));
const QuemCriou            = lazy(() => import("./components/landing/QuemCriou"));
const ParaQuemServe        = lazy(() => import("./components/landing/ParaQuemServe"));
const Entregaveis          = lazy(() => import("./components/landing/Entregaveis"));
const VinteDuasAreas       = lazy(() => import("./components/landing/VinteDuasAreas"));
const Personalizacao       = lazy(() => import("./components/landing/Personalizacao"));
const Timeline             = lazy(() => import("./components/landing/Timeline"));
const MetodologiaDark      = lazy(() => import("./components/landing/MetodologiaDark"));
const Depoimentos          = lazy(() => import("./components/landing/Depoimentos"));
const StackOferta          = lazy(() => import("./components/landing/StackOferta"));
const Garantias            = lazy(() => import("./components/landing/Garantias"));
const FAQ                  = lazy(() => import("./components/landing/FAQ"));
const FuturoCTAFinal       = lazy(() => import("./components/landing/FuturoCTAFinal"));
const Footer               = lazy(() => import("./components/landing/Footer"));

export default function App() {
  return (
    <>
      <ScrollProgress />
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <main id="main">
        <Hero />
        <Suspense fallback={null}>
          <DepoimentoDestaque />
          <IdentificacaoProblema />
          <PorqueAcontece />
          <MercadoPrega />
          <PorqueNaoFunciona />
          <ManifestoDark />
          <Solucao />
          <ProvaCases />
          <SomosDiferentes />
          <Beneficios />
          <QuemCriou />
          <ParaQuemServe />
          <Entregaveis />
          <VinteDuasAreas />
          <Personalizacao />
          <Timeline />
          <MetodologiaDark />
          <Depoimentos />
          <StackOferta />
          <Garantias />
          <FAQ />
          <FuturoCTAFinal />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
