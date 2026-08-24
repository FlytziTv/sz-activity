import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ItemsStats({
  itemQuantityAgg,
  itemsNeedingAttention,
}: {
  itemQuantityAgg: { _sum: { quantity: number | null } };
  itemsNeedingAttention: number;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold">Inventaire</h3>
        <div className="flex flex-col gap-0">
          <span className="text-2xl font-semibold">
            {itemQuantityAgg._sum.quantity ?? 0}
          </span>
          <span className="text-sm text-muted-foreground">
            équipements au total
          </span>
        </div>
        {itemsNeedingAttention > 0 && (
          <p className="text-sm text-destructive">
            {itemsNeedingAttention} item
            {itemsNeedingAttention > 1 ? "s" : ""} à surveiller (perdu, abîmé ou
            à racheter)
          </p>
        )}
        <Link
          href="/items"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-fit",
          )}
        >
          Voir l&apos;équipement
        </Link>
      </CardContent>
    </Card>
  );
}
