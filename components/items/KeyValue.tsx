export default function KeyValue({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div className="flex flex-col gap-0">
      <h5 className="text-xs text-muted-foreground">{label}</h5>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
