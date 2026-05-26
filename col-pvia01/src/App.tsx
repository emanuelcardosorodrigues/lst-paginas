import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { Features } from "./components/Features";
import { Comparison } from "./components/Comparison";
import { VideoDemo } from "./components/VideoDemo";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { About } from "./components/About";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";

export default function App() {
  return (
    <div className="min-h-screen bg-ice-blue">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Comparison />
        <VideoDemo />
        <HowItWorks />
        <Pricing />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
