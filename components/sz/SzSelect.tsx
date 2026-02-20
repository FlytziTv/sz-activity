"use client";

import { useState, createContext, useContext } from "react";
import { CircleIcon } from "lucide-react";

// --- Context ---

type QuestionContextType = {
  selected: Set<string>;
  toggle: (label: string) => void;
  multi: boolean;
};

const QuestionContext = createContext<QuestionContextType | null>(null);

function useQuestion() {
  const ctx = useContext(QuestionContext);
  if (!ctx)
    throw new Error(
      "ResponseComp doit être dans QuestionComp ou QuestionMultiComp",
    );
  return ctx;
}

// --- QuestionComp (radio) ---

export function QuestionComp({
  titre,
  description,
  children,
  className,
  onValueChange,
}: {
  titre: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onValueChange?: (value: string) => void;
}) {
  const [selectedOne, setSelectedOne] = useState<string | null>(null);

  const selected = new Set(selectedOne ? [selectedOne] : []);
  const toggle = (label: string) => {
    setSelectedOne(label);
    setTimeout(() => onValueChange?.(label), 0);
    onValueChange?.(label);
  };

  return (
    <QuestionContext.Provider value={{ selected, toggle, multi: false }}>
      <div className={`flex flex-col gap-2 items-start w-full ${className}`}>
        <div className="flex flex-col gap-0 items-start">
          <h3 className="font-semibold">{titre}</h3>
          {description && (
            <p className="text-sm text-[#6F6F6F]">{description}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">{children}</div>
      </div>
    </QuestionContext.Provider>
  );
}

// --- QuestionMultiComp (multi-select) ---

export function QuestionMultiComp({
  titre,
  description,
  children,
  className,
  onValueChange,
}: {
  titre: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onValueChange?: (values: string[]) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (label: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      const values = [...next];
      setTimeout(() => onValueChange?.(values), 0);
      return next;
    });
  };

  return (
    <QuestionContext.Provider value={{ selected, toggle, multi: true }}>
      <div className="flex flex-col gap-2 items-start w-full">
        <div className="flex flex-col gap-0 items-start">
          <h3 className="font-semibold">{titre}</h3>
          {description && (
            <p className="text-sm text-[#6F6F6F]">{description}</p>
          )}
        </div>
        <div className={`grid grid-cols-2 gap-2 w-full ${className}`}>
          {children}
        </div>
      </div>
    </QuestionContext.Provider>
  );
}

// --- ResponseComp ---

export function ResponseComp({
  label,
  description,
}: {
  label: string;
  description?: string;
}) {
  const { selected, toggle } = useQuestion();
  const isSelected = selected.has(label);

  return (
    <div
      onClick={() => toggle(label)}
      className={`group flex flex-row gap-2 p-4 border rounded-lg cursor-pointer transition-colors duration-300 select-none
        ${isSelected ? "border-primary bg-primary/5" : "hover:border-black hover:bg-black/5"}`}
    >
      <div className="flex flex-col items-start gap-1.5 w-full">
        <p className="font-medium text-sm">{label}</p>

        {description && <p className="text-sm text-[#737373]">{description}</p>}
      </div>

      <div
        className={`shrink-0 aspect-square size-4 rounded-full border shadow-xs transition-colors relative flex items-center justify-center
          ${isSelected ? "border-primary text-primary" : "border-input"}`}
      >
        {isSelected && (
          <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
  );
}
