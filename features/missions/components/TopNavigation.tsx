import { navigationLinks } from "@/features/missions/data/missions";
import styles from "@/features/missions/styles/mission-theme.module.css";

export function TopNavigation() {
  return (
    <header className="sticky top-0 z-50 bg-[#FCF9F4] transition-all duration-200">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-on-primary-container">
              <img 
              src="/logo.png"  
              alt="Mission Saver Logo"
              className="h-auto w-25" 
            />
            </div>
            <span className={`text-2xl font-bold text-[#A43A3D] ${styles.brandLogo}`}>
              Mission Saver
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                className={
                  link.isActive
                    ? "text-sm font-bold text-[#A43A3D] relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#006A63] after:rounded-full"
                    : "text-sm font-medium text-[#1C1C19]/60 hover:text-[#A43A3D] transition-colors duration-200"
                }
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full text-sm font-bold scale-95 active:opacity-80 transition-all hover:shadow-lg hover:shadow-primary-container/20"
            type="button"
          >
            Create Mission
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              data-alt="portrait of a professional creative woman in a bright studio setting with soft natural window lighting"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU4Ym_9VTQVB7gfLCmIleP0P_-c_lJG72EKKdHGWVxNyX3Q0vf0AB34kCcGaup7woFypJdF0zWThrv2yt00_JFj83hrEMQnfrasClZmb-4dA1yly03nv4CINcOuRiwwIipLy64w6jcwODw1EtnS5XOMacg2hZtjknqGSPFxKLrDl97lpVmO6MOLofE_Fxzx9POijlj5eHLzKOLXhGdseUs_7315QSGyQ2AgvMlOpZxClagUKDbrBQdKfl6LyudPWB6LMTN31zYbfY"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
