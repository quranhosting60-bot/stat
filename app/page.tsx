import Hero from "@/components/Hero";
import StatsBand from "@/components/StatsBand";
import CategoryGrid from "@/components/CategoryGrid";
import HomeMerchandising from "@/components/HomeMerchandising";
import ProcessSteps from "@/components/ProcessSteps";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CtaBand from "@/components/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <HomeMerchandising />
      <CategoryGrid />
      <ProcessSteps />
      <FeaturedProducts />
      <Testimonials />
      <FAQ />
      <CtaBand />
    </>
  );
}
