import { lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

const SocialProof = lazy(() => import("./components/SocialProof").then((m) => ({ default: m.SocialProof })));
const Features = lazy(() => import("./components/Features").then((m) => ({ default: m.Features })));
const Comparison = lazy(() => import("./components/Comparison").then((m) => ({ default: m.Comparison })));
const VideoDemo = lazy(() => import("./components/VideoDemo").then((m) => ({ default: m.VideoDemo })));
const HowItWorks = lazy(() => import("./components/HowItWorks").then((m) => ({ default: m.HowItWorks })));
const Pricing = lazy(() => import("./components/Pricing").then((m) => ({ default: m.Pricing })));
const About = lazy(() => import("./components/About").then((m) => ({ default: m.About })));
const FAQ = lazy(() => import("./components/FAQ").then((m) => ({ default: m.FAQ })));
const FinalCTA = lazy(() => import("./components/FinalCTA").then((m) => ({ default: m.FinalCTA })));
const Footer = lazy(() => import("./components/Footer").then((m) => ({ default: m.Footer })));

export default function App() {
  return (
    <div className="min-h-screen bg-ice-blue">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <SocialProof />
          <Features />
          <Comparison />
          <VideoDemo />
          <HowItWorks />
          <Pricing />
          <About />
          <FAQ />
          <FinalCTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
