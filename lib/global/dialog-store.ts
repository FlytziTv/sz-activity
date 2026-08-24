import { create } from "zustand";
import type { ReactNode } from "react";

type DialogSize = "sm" | "md" | "lg" | "xl";

interface DialogOptions {
  title?: string;
  description?: string;
  size?: DialogSize;
  // si true, empêche la fermeture en cliquant en dehors / Echap
  preventClose?: boolean;
}

interface DialogState {
  isOpen: boolean;
  content: ReactNode | null;
  options: DialogOptions;
  openDialog: (content: ReactNode, options?: DialogOptions) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  content: null,
  options: {},
  openDialog: (content, options = {}) =>
    set({ isOpen: true, content, options }),
  closeDialog: () => set({ isOpen: false, content: null, options: {} }),
}));

export const openDialog = (content: ReactNode, options?: DialogOptions) =>
  useDialogStore.getState().openDialog(content, options);

export const closeDialog = () => useDialogStore.getState().closeDialog();
