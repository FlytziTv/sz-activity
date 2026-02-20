"use client";

import { useState } from "react";
// import Login from "@/components/form/Login";
import SignUp from "@/components/form/Signup";
import StepLevel from "@/components/onboarding/StepLevel";
import StepRouteType from "@/components/onboarding/StepRouteType";
import StepRegion from "@/components/onboarding/StepRegion";
import StepObjectives from "@/components/onboarding/StepObjectives";
import StepBody from "@/components/onboarding/StepBody";
import Link from "next/link";

const TOTAL_STEPS = 6;

const etapes = [
  { id: 1, title: "Questionnaire de création" },
  { id: 2, title: "Création de compte" },
  { id: 3, title: "Nous rejoindre" },
];

export type OnboardingData = {
  level: string;
  frequency: string;
  preferredRouteType: string[];
  country: string;
  region: string;
  objectives: string[];
  weight: number | null;
  height: number | null;
  shoeSize: number | null;
  annualDistanceGoal: number | null;
  annualActivitiesGoal: number | null;
};

const initialData: OnboardingData = {
  level: "",
  frequency: "",
  preferredRouteType: [],
  country: "",
  region: "",
  objectives: [],
  weight: null,
  height: null,
  shoeSize: null,
  annualDistanceGoal: null,
  annualActivitiesGoal: null,
};

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);

  const updateData = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!data.level && !!data.frequency;
      case 2:
        return data.preferredRouteType.length > 0;
      case 3:
        return !!data.country;
      case 4:
        return data.objectives.length > 0;
      case 5:
        return true;
      default:
        return true;
    }
  };

  const next = () => {
    if (!canProceed()) return;
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepLevel data={data} onChange={updateData} />;
      case 2:
        return <StepRouteType data={data} onChange={updateData} />;
      case 3:
        return <StepRegion data={data} onChange={updateData} />;
      case 4:
        return <StepObjectives data={data} onChange={updateData} />;
      case 5:
        return <StepBody data={data} onChange={updateData} />;
      case 6:
        return <SignUp onboardingData={data} />;
      default:
        return null;
    }
  };

  return (
    <main className="p-4 grid grid-cols-2 gap-4 h-screen bg-[#F2F2F2]">
      <div className="bg-[url('/bg-esc-carre.png')] bg-cover bg-center bg-no-repeat grid grid-rows-2 relative rounded-4xl gap-4 p-4">
        <div className="w-full -row-start-2 flex flex-col gap-2 items-center justify-end pb-5">
          <h1 className="text-3xl font-bold text-center text-white ">
            Bienvenue sur ESC Life
          </h1>
          <p className="font-medium text-center text-base text-[#989898]">
            Prêt à vous échapper de votre routine ?
          </p>
          <div className="flex flex-col mt-2 gap-1 w-85">
            {etapes.map((etape) => (
              <div
                key={etape.id}
                className="flex flex-row items-center gap-6 py-3 px-5 bg-[#E8E8E8]/10 rounded-2xl"
              >
                <p className="flex items-center justify-center text-sm text-[#E8E8E8] text-center w-8 h-8 rounded-full bg-[#E8E8E8]/20">
                  {etape.id}
                </p>
                <p className="text-white text-base">{etape.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#E8E8E8] border border-[#DBDBDB] flex flex-col relative rounded-4xl p-4 gap-4">
        {/* Suivi des étapes */}
        <header className="flex flex-row items-center justify-center gap-2 bg-[#DCDCDC] p-4 rounded-2xl">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-10 rounded-full transition-colors duration-300 ${
                i + 1 <= currentStep ? "bg-[#000000]" : "bg-[#EAEAEA]"
              }`}
            />
          ))}
        </header>

        <main className=" flex items-center justify-center bg-[#FFFFFF] border border-[#D2D2D2] rounded-2xl p-4 h-full">
          {renderStep()}
        </main>

        {currentStep < TOTAL_STEPS && (
          <footer className="flex flex-col gap-4 w-full bg-[#DCDCDC] rounded-2xl p-4">
            <p className="text-sm text-center text-black">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/login"
                className="underline hover:text-[#000000]/65 transition-colors duration-250"
              >
                Connectez-vous ici.
              </Link>
            </p>
            <div className="flex flex-row items-center justify-center gap-2 w-full">
              <button
                onClick={prev}
                disabled={currentStep === 1}
                className="text-center w-full p-2 bg-[#F6F6F6] hover:bg-transparent text-[#000000] font-medium rounded-lg transition-colors duration-300 cursor-pointer disabled:opacity-30"
              >
                Étape précédente
              </button>
              <button
                onClick={next}
                disabled={!canProceed()}
                className="text-center w-full p-2 bg-[#000000] hover:bg-[#000000]/75 text-[#FFFFFF] font-medium rounded-lg transition-colors duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Étape suivante
              </button>
            </div>
          </footer>
        )}
      </div>
    </main>
  );
}
