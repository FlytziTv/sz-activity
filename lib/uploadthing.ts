import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export async function uploadItemImage(
  file: File
): Promise<{ url: string; key: string } | { error: string }> {
  if (!file.type.startsWith("image/")) {
    return { error: "Le fichier doit être une image." };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { error: "L'image ne doit pas dépasser 5 Mo." };
  }

  const response = await utapi.uploadFiles(file);

  if (response.error) {
    return { error: "Échec de l'upload de l'image." };
  }

  return { url: response.data.ufsUrl, key: response.data.key };
}

export async function deleteItemImage(key: string) {
  await utapi.deleteFiles(key);
}
