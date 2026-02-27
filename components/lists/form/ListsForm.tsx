"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Asterisk } from "lucide-react";

import { Button } from "../../ui/button";
import { useState } from "react";
import { FormGroup } from "../../default/form/FormGroup";

import { addList } from "@/actions/list";
import {
  IconList,
  SelectListsColor,
  SelectListsIcon,
} from "./content/SelectLists";
import VisibilityLists from "@/components/default/lists/VisibilityLists";

export default function ListsForm({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [selectedColor, setSelectedColor] = useState("#D2D2D2");
  const [selectedIcon, setSelectedIcon] = useState("Default");

  const activeIconData = IconList.find((item) => item.name === selectedIcon);
  const Icon = activeIconData ? activeIconData.value : Asterisk;

  const handleReset = () => {
    setSelectedColor("#D2D2D2");
    setSelectedIcon("Default");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) handleReset();
      }}
    >
      <DialogContent className="max-w-sm">
        <form
          action={async (formData) => {
            await addList(formData);
            onOpenChange(false); // Ferme le dialogue après l'ajout
          }}
        >
          <DialogHeader>
            <DialogTitle>Créer une liste</DialogTitle>
            <DialogDescription>
              Remplissez les champs ci-dessous pour créer une nouvelle liste.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-row items-center gap-4">
              <div
                className="flex flex-col items-center justify-center border rounded-2xl h-35 w-35"
                style={{
                  backgroundColor: `${selectedColor}66`,
                  borderColor: `${selectedColor}4D`,
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                <Icon size={30} />
              </div>
            </div>

            <FormGroup
              name="name"
              label="Nom"
              type="text"
              placeholder="Ex: Sac à dos 40L"
            />

            <SelectListsIcon
              onValueChange={setSelectedIcon}
              defaultValue="Default"
            />
            <SelectListsColor
              onValueChange={setSelectedColor}
              defaultValue="#D2D2D2"
            />
            <VisibilityLists />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
