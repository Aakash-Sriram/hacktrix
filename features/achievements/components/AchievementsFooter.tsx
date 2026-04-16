import { footerLinks } from "@/features/achievements/data/achievements";

export function AchievementsFooter() {
  return (
    <footer className="mt-20 border-t border-surface-container-highest py-12 px-8">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-black text-primary/40 font-['Plus_Jakarta_Sans']">
          Mission Saver
        </div>
        <div className="flex space-x-8 text-sm font-bold text-on-surface-variant">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="hover:text-primary transition-colors"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-outline/60 font-medium">
          © 2024 Mission Saver. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
