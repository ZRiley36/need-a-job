import { Hero } from "@/app/components/Hero";
import { WhatIDo } from "@/app/components/WhatIDo";
import { PageKey } from "@/app/lib/nav";

export function Home({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <WhatIDo onNavigate={onNavigate} />
    </>
  );
}
