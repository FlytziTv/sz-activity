"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/lib/global/dialog-store";

const SIZE_CLASSES: Record<string, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
};

export function GlobalDialog() {
  const { isOpen, content, options, closeDialog } = useDialogStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && options.preventClose) return;
        if (!open) closeDialog();
      }}
    >
      <DialogContent className={SIZE_CLASSES[options.size ?? "md"]}>
        {(options.title || options.description) && (
          <DialogHeader>
            {options.title && <DialogTitle>{options.title}</DialogTitle>}
            {options.description && (
              <DialogDescription>{options.description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {content}
      </DialogContent>
    </Dialog>
  );
}
