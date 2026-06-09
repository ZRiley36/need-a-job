import { VectorFieldHero } from "@/app/components/VectorFieldHero";
import { WhatIDo } from "@/app/components/WhatIDo";
import { PageKey } from "@/app/lib/nav";

export function Home({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <>
      <VectorFieldHero onNavigate={onNavigate} />
      <WhatIDo onNavigate={onNavigate} />
    </>
  );
}
