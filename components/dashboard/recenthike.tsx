import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HIKE_STATUS_LABELS } from "@/lib/labels";
import Link from "next/link";

export default function RecentHikes({
  recentHikes,
}: {
  recentHikes: {
    id: string;
    name: string;
    location: string | null;
    status: string;
  }[];
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">Randos récentes</h3>
        {recentHikes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucune rando pour l&apos;instant.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {recentHikes.map((hike) => (
              <li key={hike.id}>
                <Link
                  href={`/activites/${hike.id}`}
                  className="flex items-center justify-between gap-2 rounded-lg border border-input px-3 py-2 hover:bg-muted"
                >
                  <div className="flex flex-col gap-0">
                    <span className="font-medium">{hike.name}</span>
                    {hike.location && (
                      <span className="text-sm text-muted-foreground">
                        {hike.location}
                      </span>
                    )}
                  </div>
                  <Badge variant="outline">
                    {HIKE_STATUS_LABELS[hike.status]}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
