export default function ExplorationPage() {
  return (
    <div className="flex flex-col gap-6 bg-border/20 py-16 px-8 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <h2 className="text-xl font-semibold">Mes explorations</h2>
          <p className="text-sm text-muted-foreground">
            Historique de vos explorations pour suivre vos progrès et découvrir
            de nouvelles idées.
          </p>
        </div>
      </div>
    </div>
  );
}
