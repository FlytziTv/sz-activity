import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const f = createUploadthing();

export const ourFileRouter = {
  // Définition de la route "imageUploader"
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session) throw new Error("Non autorisé");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload terminé pour:", metadata.userId);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
