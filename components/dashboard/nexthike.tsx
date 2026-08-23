import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HIKE_STATUS_LABELS } from "@/lib/labels";
import Link from "next/link";

export default function NextHike({
  upcomingHike,
}: {
  upcomingHike: {
    id: string;
    name: string;
    location: string | null;
    status: string;
  } | null;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">Prochaine rando</h3>
        {upcomingHike ? (
          <Link
            href={`/activites/${upcomingHike.id}`}
            className="flex items-center justify-between gap-2 rounded-lg border border-input px-3 py-2 hover:bg-muted"
          >
            <div className="flex flex-col gap-0">
              <span className="font-medium">{upcomingHike.name}</span>
              {upcomingHike.location && (
                <span className="text-sm text-muted-foreground">
                  {upcomingHike.location}
                </span>
              )}
            </div>
            <Badge variant="outline">
              {HIKE_STATUS_LABELS[upcomingHike.status]}
            </Badge>
          </Link>
        ) : (
          <p className="text-sm text-muted-foreground">
            Aucune rando prévue pour l&apos;instant.
          </p>
        )}
        <Link
          href="/activites"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-fit",
          )}
        >
          Voir toutes les randos
        </Link>
      </CardContent>
    </Card>
  );
}
