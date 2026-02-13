export default function KeyValue({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) {
  return (
    <div className="flex flex-col gap-0">
      <h5 className="text-xs text-gray-600">{label}</h5>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}
