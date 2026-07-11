import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ProductsSnapshot } from "@/components/home/ProductsSnapshot";
import { WhyPartner } from "@/components/home/WhyPartner";
import { StatsBand } from "@/components/home/StatsBand";
import { SustainabilityTeaser } from "@/components/home/SustainabilityTeaser";
import { Industries } from "@/components/home/Industries";
import { CTASection } from "@/components/CTASection";
import { organizationJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <Hero />
      <TrustBar />
      <ProductsSnapshot />
      <WhyPartner />
      <StatsBand />
      <SustainabilityTeaser />
      <Industries />
      <CTASection />
    </>
  );
}
