import Image from "next/image";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
export default function HomePage() {
  return (
    <main className="pt-20">
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}
