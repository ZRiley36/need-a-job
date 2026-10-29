import { SocialLinks } from "@/app/components/SocialLinks";

export function Footer() {
  return (
    <footer className="bg-neutral-950/80 backdrop-blur-md border-t border-neutral-800/80">
      <div className="container-custom py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-neutral-400 text-sm">
          © {new Date().getFullYear()} Zach Riley. Background: NASA Earth Observatory, Black Marble 2016.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
