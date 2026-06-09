import { SocialLinks } from "@/app/components/SocialLinks";

export function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      <div className="container-custom py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-neutral-500 text-sm">
          © {new Date().getFullYear()} Zach Riley. All rights reserved.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
