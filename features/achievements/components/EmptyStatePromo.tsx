type EmptyStatePromoProps = {
  isEmpty?: boolean;
};

export function EmptyStatePromo({ isEmpty = false }: EmptyStatePromoProps) {
  const heading = isEmpty ? "No achievements yet" : "The Journey Continues";
  const description = isEmpty
    ? "Complete your missions and milestones to unlock badges and certificates for this account."
    : "There are over 50 unique badges waiting for you. Keep saving and learning to unlock more rewards!";

  return (
    <section className="bg-surface-container-low rounded-xl p-12 text-center border-2 border-dashed border-outline-variant/30">
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-outline text-3xl">auto_awesome</span>
        </div>
        <h4 className="text-2xl font-bold text-on-surface">{heading}</h4>
        <p className="text-on-surface-variant">{description}</p>
        <div className="pt-6">
          <button
            className="text-primary font-extrabold flex items-center justify-center space-x-2 mx-auto hover:opacity-70 transition-opacity"
            type="button"
          >
            <span>Explore New Missions</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
