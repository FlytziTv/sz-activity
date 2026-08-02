import Link from "next/link";
import { DeleteHikeButton } from "@/components/hikes/deleteHike-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HIKE_STATUS_LABELS } from "@/lib/labels";
import { ImageOff } from "lucide-react";
import Image from "next/image";

export default function HikeCard({
  hike,
}: {
  hike: {
    id: string;
    imageUrl?: string | null;
    name: string;
    location?: string | null;
    status: string;
    plannedWeight?: number | null;
  };
}) {
  return (
    <li>
      <Card size="sm">
        <CardContent className="flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-lg w-full h-40 bg-muted">
            {hike.imageUrl ? (
              <Image
                src={hike.imageUrl}
                alt={hike.name}
                fill
                sizes="160px"
                className="object-cover"
              />
            ) : (
              <div className="flex w-full h-40 items-center justify-center">
                <ImageOff className="size-8 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <Link href={`/activites/${hike.id}`} className="flex-1 min-w-0">
                <span className="truncate text-lg font-medium">
                  {hike.name}
                </span>
              </Link>
              <DeleteHikeButton hikeId={hike.id} hikeName={hike.name} />
            </div>

            {/* Status and Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline">{HIKE_STATUS_LABELS[hike.status]}</Badge>
              {hike.location && <span>{hike.location}</span>}
            </div>

            {/* Planned Weight */}
            {hike.plannedWeight != null && (
              <span className="text-sm text-muted-foreground">
                Poids prévu : {hike.plannedWeight} g
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </li>
  );
}
