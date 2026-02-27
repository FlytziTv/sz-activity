"use client";

import { useState } from "react";
import CreateActivity from "@/components/activity/form/CreateActivty";
import CreateSortieActivity from "@/components/activity/form/CreateSortieActivity";
import ListsForm from "@/components/lists/form/ListsForm";
import StuffForm from "@/components/stuffs/form/stuffsForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Footprints, Map, List, Backpack } from "lucide-react";

type ModalType = "sortie" | "activite" | "liste" | "stuff" | null;

export default function Add() {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="h-8 w-8 flex items-center justify-center border border-[#333] rounded-full hover:border-[#555] transition-colors bg-[#1a1a1a] text-[#bebebe] cursor-pointer">
            <Plus size={14} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Activités</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenModal("sortie")}>
            <Footprints size={14} /> Ajouter une activité
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModal("activite")}>
            <Map size={14} /> Ajouter une exploration
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>Enregistrement</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenModal("liste")}>
            <List size={14} /> Ajouter une liste
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModal("stuff")}>
            <Backpack size={14} /> Ajouter un équipement
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateSortieActivity
        open={openModal === "sortie"}
        onOpenChange={(v) => !v && setOpenModal(null)}
      />
      <CreateActivity
        open={openModal === "activite"}
        onOpenChange={(v) => !v && setOpenModal(null)}
      />
      <ListsForm
        open={openModal === "liste"}
        onOpenChange={(v) => !v && setOpenModal(null)}
      />
      <StuffForm
        open={openModal === "stuff"}
        onOpenChange={(v) => !v && setOpenModal(null)}
      />
    </>
  );
}
