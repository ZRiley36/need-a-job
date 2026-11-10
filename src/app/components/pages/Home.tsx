import { Hero } from "@/app/components/Hero";
import { FeaturedWork } from "@/app/components/FeaturedWork";
import { WhatIDo } from "@/app/components/WhatIDo";
import { PageKey } from "@/app/lib/nav";

export function Home({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <FeaturedWork onNavigate={onNavigate} />
      <WhatIDo onNavigate={onNavigate} />
    </>
  );
}
