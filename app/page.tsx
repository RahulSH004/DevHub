import {Hero} from "@/components/hero/hero";
import ProductShowcase from "@/components/layout/productshowcase";
import Features from "@/components/layout/features";
import FAQ from "@/components/layout/faq";
import Footer from "@/components/layout/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <Features />
      <FAQ />
      <Footer />
    </>
  );
}