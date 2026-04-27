import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { BestSellers } from "@/components/bestsellers";
import { Categories } from "@/components/categories";
import { NewArrivals } from "@/components/new-arrivals";
import { PromoBanner } from "@/components/promo-banner";
import { FeaturedAuthors } from "@/components/featured-authors";
// import { Testimonials } from '@/components/testimonials'
// import { Newsletter } from '@/components/newsletter'
import { Footer } from "@/components/footer";
import ReflectionCard from "@/components/ReflectionCard";
import PhysicalSanctuary from "@/components/physicalSanctuary";
import WhatsAppButton from "@/components/whatsapp";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <Hero />
      <BestSellers />
      <Categories />
      <NewArrivals />
      <PromoBanner />
      {/* <FeaturedAuthors /> */}
      <PhysicalSanctuary />
      <ReflectionCard />
      <WhatsAppButton />
      {/* <Testimonials /> */}
      {/* <Newsletter /> */}

      <Footer />
    </main>
  );
}
