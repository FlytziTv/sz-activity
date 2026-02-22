"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";

export default function ImgUpload() {
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Initialisation du hook UploadThing
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setImageUrl(res[0].url);
      setIsUploading(false);
    },
    onUploadError: () => {
      alert("Erreur lors de l'upload");
      setIsUploading(false);
    },
    onUploadBegin: () => {
      setIsUploading(true);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Image</label>

      {imageUrl ? (
        <div className="relative w-40 h-40 group">
          <Image
            src={imageUrl}
            alt="Preview"
            width={160}
            height={160}
            className=" object-cover rounded-md border border-input"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setImageUrl("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {/* Input invisible pour gérer le clic fichier */}
          <input
            type="file"
            id="upload-button"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) startUpload([file]);
            }}
          />

          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed py-8 flex flex-col gap-2"
            disabled={isUploading}
            onClick={() => document.getElementById("upload-button")?.click()}
          >
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
            ) : (
              <>
                <ImageIcon className="h-6 w-6 text-zinc-500" />
                <span className="text-xs text-zinc-500">
                  Cliquez pour importer une image
                </span>
              </>
            )}
          </Button>
        </div>
      )}

      {/* Champ caché pour ton action addStuff */}
      <input type="hidden" name="image" value={imageUrl} />
    </div>
  );
}
