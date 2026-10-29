import { Hero } from "@/app/components/Hero";
import { FeaturedMaps } from "@/app/components/FeaturedMaps";
import { WhatIDo } from "@/app/components/WhatIDo";
import { PageKey } from "@/app/lib/nav";

export function Home({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <FeaturedMaps onNavigate={onNavigate} />
      <WhatIDo onNavigate={onNavigate} />
    </>
  );
}
