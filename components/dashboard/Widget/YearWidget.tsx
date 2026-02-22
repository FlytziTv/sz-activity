export function YearProgressWidget() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31);

  // Calcul du nombre total de jours (gère les années bissextiles)
  const totalDays =
    Math.floor(
      (endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  // Calcul du jour actuel dans l'année
  const currentDayOfYear =
    Math.floor(
      (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  // Pourcentage de l'année écoulée
  const percentage = Math.round((currentDayOfYear / totalDays) * 100);

  return (
    <div className="col-span-3 row-span-1 bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <h5 className="text-black text-base font-semibold">
          Année {now.getFullYear()}
        </h5>
        <p className="text-black text-sm font-medium">{percentage}%</p>
      </div>

      {/* Grille des jours */}
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(6px, 1fr))",
          // Ou fixe si tu veux un rendu précis : gridTemplateColumns: "repeat(25, 1fr)"
        }}
      >
        {Array.from({ length: totalDays }).map((_, i) => {
          const isPassed = i < currentDayOfYear;
          return (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                isPassed ? "bg-black" : "bg-black/10"
              }`}
              title={`Jour ${i + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
