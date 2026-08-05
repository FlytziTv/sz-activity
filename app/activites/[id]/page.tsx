import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { HikeItemPicker } from "@/components/hikes/hike-item-picker";
import { HikeConfirmChecklist } from "@/components/hikes/hike-confirm-checklist";
import { HikeCheckpoints } from "@/components/hikes/hike-checkpoints";
import { HikeStepper } from "@/components/hikes/hike-stepper";
import { Badge } from "@/components/ui/badge";
import { HIKE_STATUS_LABELS } from "@/lib/labels";
import {
  COMPLETED_STEPS_BY_STATUS,
  DEFAULT_STEP_BY_STATUS,
  HikeStepKey,
  STEP_KEYS,
} from "@/lib/stepper-hike";

export default async function HikeDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ step?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const { step } = await searchParams;

  const hike = await prisma.hike.findFirst({
    where: { id, userId: session.user.id },
    include: {
      items: {
        include: {
          item: { include: { category: true } },
          statusSplits: { orderBy: { createdAt: "asc" } },
        },
        orderBy: { item: { name: "asc" } },
      },
      checkPoints: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!hike) {
    notFound();
  }

  const currentStep: HikeStepKey = STEP_KEYS.includes(step as HikeStepKey)
    ? (step as HikeStepKey)
    : DEFAULT_STEP_BY_STATUS[hike.status];

  const items = await prisma.item.findMany({
    where: { userId: session.user.id },
    include: { category: true },
    orderBy: { name: "asc" },
  });

  const initialSelection = Object.fromEntries(
    hike.items.map((hikeItem) => [hikeItem.itemId, hikeItem.quantity]),
  );

  return (
    <div className="flex flex-col gap-6 bg-border/20 py-16 px-8 min-h-screen">
      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">{hike.name}</h2>
          <Badge variant="outline">{HIKE_STATUS_LABELS[hike.status]}</Badge>
        </div>
        {hike.location && (
          <p className="text-sm text-muted-foreground">{hike.location}</p>
        )}
      </div>

      <HikeStepper
        hikeId={hike.id}
        currentStep={currentStep}
        completedSteps={COMPLETED_STEPS_BY_STATUS[hike.status]}
      />

      {currentStep === "selection" && (
        <HikeItemPicker
          hikeId={hike.id}
          items={items}
          initialSelection={initialSelection}
        />
      )}

      {currentStep === "preparation" &&
        (hike.items.length > 0 ? (
          <HikeConfirmChecklist
            hikeId={hike.id}
            hikeStatus={hike.status}
            hikeItems={hike.items}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Choisis d&apos;abord tes items dans l&apos;étape Sélection.
          </p>
        ))}

      {currentStep === "en-rando" &&
        (hike.status === "IN_PROGRESS" || hike.status === "COMPLETED" ? (
          <HikeCheckpoints
            hikeId={hike.id}
            hikeStatus={hike.status}
            checkPoints={hike.checkPoints}
            hikeItems={hike.items}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Confirme d&apos;abord ton sac dans l&apos;étape Préparation.
          </p>
        ))}

      {currentStep === "bilan" && (
        <p className="text-sm text-muted-foreground">
          Bientôt disponible : statistiques et statut des items en fin de rando.
        </p>
      )}
    </div>
  );
}
