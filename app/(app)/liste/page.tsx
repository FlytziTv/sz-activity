export default function ListePage() {
  return (
    <div className="flex flex-col gap-6 bg-border/20 py-16 px-8 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <h2 className="text-xl font-semibold">Mes listes</h2>
          <p className="text-sm text-muted-foreground">
            Créez et gérez vos listes de tâches pour rester organisé et
            productif.
          </p>
        </div>
      </div>
    </div>
  );
}
