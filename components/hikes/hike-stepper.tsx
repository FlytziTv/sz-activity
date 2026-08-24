import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HikeStepKey, LABEL_STEPS } from "@/lib/stepper-hike";

export function HikeStepper({
  hikeId,
  currentStep,
  completedSteps,
}: {
  hikeId: string;
  currentStep: HikeStepKey;
  completedSteps: number;
}) {
  return (
    <Card>
      <CardHeader className="gap-0">
        <CardTitle>Étapes</CardTitle>
        <CardDescription>Suivez les étapes de votre randonnée</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {LABEL_STEPS.map((step, index) => {
            const isActive = step.key === currentStep;
            const isDone = index < completedSteps;
            return (
              <Link
                key={step.key}
                href={`/activites/${hikeId}?step=${step.key}`}
                className="flex flex-col gap-1 items-center justify-center cursor-pointer"
              >
                <p
                  className={cn(
                    "text-sm",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </p>
                <div
                  className={cn(
                    "w-full h-1 rounded-2xl",
                    isDone || isActive
                      ? "bg-primary"
                      : "bg-muted-foreground/30",
                  )}
                />
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
