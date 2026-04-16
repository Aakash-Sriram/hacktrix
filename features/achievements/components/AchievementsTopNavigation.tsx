import { navigationLinks } from "@/features/achievements/data/achievements";

export function AchievementsTopNavigation() {
  return (
    <header className="bg-[#FCF9F4] docked full-width top-0 sticky z-50">
      <div className="bg-[#DCDAD5]/20">
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-black text-[#A43A3D] font-['Plus_Jakarta_Sans'] tracking-tight">
            Mission Saver
          </div>
          <nav className="hidden md:flex items-center space-x-8 font-['Plus_Jakarta_Sans'] font-bold tracking-tight">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                className={link.className}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-bold scale-95 active:scale-90 transition-transform shadow-sm hover:shadow-md"
              type="button"
            >
              Create Mission
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border-2 border-primary-container/20">
              <img
                alt="User profile"
                className="w-full h-full object-cover"
                data-alt="Close up portrait of a young professional woman smiling warmly with soft sunlight filtering through her hair"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYHML3iWy3uc9yGalZh5aEyKVc8wH2YmBff0HjIKIdShDD8xBZj9p7mWmbcdnZSc7YES4fR7S6vUfjjnxzwmMYd3unoZQ6RYLe07akA4Nof3Eyb5cJR6ftFgdsvRevVqec3_m3VOVW3q6vOuJXm-CycRREFXFUmiigwSIsC5ugD_P6OpIo8xJ--hQy0KWEjchscFRqfThRuMphy6-AAysng6aTQEbCdu8oE_IobCMzVjspeMw2lDBksvEV3SVDQn4ErPWxycXxXkY"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
