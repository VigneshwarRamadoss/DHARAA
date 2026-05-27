import { createFileRoute } from "@tanstack/react-router";
import { PreLoader } from "@/components/PreLoader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Categories } from "@/components/Categories";
import { BestSellers } from "@/components/BestSellers";
import { Editorial } from "@/components/Editorial";
import { Deals } from "@/components/Deals";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DHARAA — Everyday Heirlooms, Thoughtfully Crafted" },
      { name: "description", content: "Handcrafted jewellery from Mumbai. Anti-tarnish, oxidised silver, and fine gold pieces from ₹59." },
      { property: "og:title", content: "DHARAA — Everyday Heirlooms" },
      { property: "og:description", content: "Handcrafted jewellery from Mumbai. From ₹59." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <PreLoader />
      <Nav />
      <Hero />
      <Marquee />
      <Categories />
      <BestSellers />
      <Editorial />
      <Deals />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
