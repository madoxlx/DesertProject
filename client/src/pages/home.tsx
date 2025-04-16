import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturedOffers } from "@/components/featured-offers";
import { PopularDestinations } from "@/components/popular-destinations";
import { PopularPackages } from "@/components/popular-packages";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Destination, Package } from "@shared/schema";

export default function Home() {
  const { data: destinations } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  const { data: featuredOffers } = useQuery<Package[]>({
    queryKey: ["/api/packages/featured"],
  });

  const { data: popularPackages } = useQuery<Package[]>({
    queryKey: ["/api/packages/popular"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <FeaturedOffers offers={featuredOffers || []} />
        <PopularDestinations destinations={destinations || []} />
        <PopularPackages packages={popularPackages || []} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
