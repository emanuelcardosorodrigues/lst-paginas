import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Testimonials } from "@/components/landing/Testimonials";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PainNarrative } from "@/components/landing/PainNarrative";
import { RealityCheck } from "@/components/landing/RealityCheck";
import { TruthAndSteps } from "@/components/landing/TruthAndSteps";
import { WhoItsFor } from "@/components/landing/WhoItsFor";
import { WhatYouReceive } from "@/components/landing/WhatYouReceive";
import { Pricing } from "@/components/landing/Pricing";
import { Benefits } from "@/components/landing/Benefits";
import { Guarantee } from "@/components/landing/Guarantee";
import { Authority } from "@/components/landing/Authority";
import { QuestionAndDecision } from "@/components/landing/QuestionAndDecision";
import { FAQ } from "@/components/landing/FAQ";
import { FinalDecision } from "@/components/landing/FinalDecision";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sans selection:bg-[#00A88E] selection:text-white">
      <Nav />
      <Hero />
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
    </main>
  );
}
