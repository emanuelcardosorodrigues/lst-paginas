import { lazy, Suspense } from "react";
import { Hero } from "@/components/landing/Hero";

const Testimonials      = lazy(() => import("@/components/landing/Testimonials").then(m => ({ default: m.Testimonials })));
const HowItWorks        = lazy(() => import("@/components/landing/HowItWorks").then(m => ({ default: m.HowItWorks })));
const PainNarrative     = lazy(() => import("@/components/landing/PainNarrative").then(m => ({ default: m.PainNarrative })));
const RealityCheck      = lazy(() => import("@/components/landing/RealityCheck").then(m => ({ default: m.RealityCheck })));
const TruthAndSteps     = lazy(() => import("@/components/landing/TruthAndSteps").then(m => ({ default: m.TruthAndSteps })));
const WhoItsFor         = lazy(() => import("@/components/landing/WhoItsFor").then(m => ({ default: m.WhoItsFor })));
const WhatYouReceive    = lazy(() => import("@/components/landing/WhatYouReceive").then(m => ({ default: m.WhatYouReceive })));
const Pricing           = lazy(() => import("@/components/landing/Pricing").then(m => ({ default: m.Pricing })));
const Benefits          = lazy(() => import("@/components/landing/Benefits").then(m => ({ default: m.Benefits })));
const Guarantee         = lazy(() => import("@/components/landing/Guarantee").then(m => ({ default: m.Guarantee })));
const Authority         = lazy(() => import("@/components/landing/Authority").then(m => ({ default: m.Authority })));
const QuestionAndDecision = lazy(() => import("@/components/landing/QuestionAndDecision").then(m => ({ default: m.QuestionAndDecision })));
const FAQ               = lazy(() => import("@/components/landing/FAQ").then(m => ({ default: m.FAQ })));
const FinalDecision     = lazy(() => import("@/components/landing/FinalDecision").then(m => ({ default: m.FinalDecision })));
const Footer            = lazy(() => import("@/components/landing/Footer").then(m => ({ default: m.Footer })));

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans selection:bg-[#00A88E] selection:text-white">
      <Hero />
      <Suspense fallback={null}>
        <Testimonials />
        <HowItWorks />
        <PainNarrative />
        <RealityCheck />
        <TruthAndSteps />
        <WhoItsFor />
        <WhatYouReceive />
        <Pricing />
        <Benefits />
        <Guarantee />
        <Authority />
        <QuestionAndDecision />
        <FAQ />
        <FinalDecision />
        <Footer />
      </Suspense>
    </main>
  );
}
