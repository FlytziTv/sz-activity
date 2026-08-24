import { create } from "zustand";

interface AlertDialogOptions {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
}

interface AlertDialogState {
  isOpen: boolean;
  options: AlertDialogOptions;
  resolve: ((value: boolean) => void) | null;
}

export const useAlertDialogStore = create<AlertDialogState>(() => ({
  isOpen: false,
  options: {},
  resolve: null,
}));

export function confirm(options: AlertDialogOptions = {}): Promise<boolean> {
  return new Promise((resolve) => {
    useAlertDialogStore.setState({ isOpen: true, options, resolve });
  });
}

function respond(value: boolean) {
  const { resolve } = useAlertDialogStore.getState();
  resolve?.(value);
  useAlertDialogStore.setState({ isOpen: false, options: {}, resolve: null });
}

export const confirmYes = () => respond(true);
export const confirmNo = () => respond(false);
