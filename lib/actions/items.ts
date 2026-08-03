"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteItemImage, uploadItemImage } from "@/lib/uploadthing";
import { HYDRATION_CATEGORY_NAME } from "@/lib/item-weight";

export type CreateItemState = { error: string } | null;

type ParsedItemFields = {
  name: string;
  weight: number;
  quantity: number;
  categoryId: string;
  brandId: string;
  waterCapacityLiters: number | null;
};

function parseItemFields(
  formData: FormData,
): ParsedItemFields | { error: string } {
  const name = String(formData.get("name") ?? "").trim();
  const weight = Number(formData.get("weight"));
  const quantity = Number(formData.get("quantity") ?? 1);
  const rawCategoryId = String(formData.get("categoryId") ?? "");
  const categoryId = rawCategoryId === "none" ? "" : rawCategoryId;
  const rawBrandId = String(formData.get("brandId") ?? "");
  const brandId = rawBrandId === "none" ? "" : rawBrandId;
  const rawWaterCapacity = String(
    formData.get("waterCapacityLiters") ?? "",
  ).trim();
  const waterCapacityLiters = rawWaterCapacity
    ? Number(rawWaterCapacity)
    : null;

  if (!name) {
    return { error: "Le nom est obligatoire." };
  }
  if (!Number.isFinite(weight) || weight < 0) {
    return { error: "Le poids doit être un nombre positif." };
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return { error: "La quantité doit être un entier supérieur ou égal à 1." };
  }
  if (
    waterCapacityLiters !== null &&
    (!Number.isFinite(waterCapacityLiters) || waterCapacityLiters < 0)
  ) {
    return { error: "La contenance en eau doit être un nombre positif." };
  }

  return {
    name,
    weight: Math.round(weight),
    quantity,
    categoryId,
    brandId,
    waterCapacityLiters,
  };
}

type CategoryResult =
  | { ok: true; category: { id: string; name: string } | null }
  | { ok: false; error: string };

async function validateCategory(
  categoryId: string,
  userId: string,
): Promise<CategoryResult> {
  if (!categoryId) return { ok: true, category: null };
  const category = await prisma.category.findFirst({
    where: { id: categoryId, OR: [{ userId: null }, { userId }] },
    select: { id: true, name: true },
  });
  return category
    ? { ok: true, category }
    : { ok: false, error: "Catégorie invalide." };
}

async function validateBrand(brandId: string, userId: string) {
  if (!brandId) return null;
  const brand = await prisma.brand.findFirst({
    where: { id: brandId, OR: [{ userId: null }, { userId }] },
    select: { id: true },
  });
  return brand ? null : { error: "Marque invalide." };
}

export async function createItem(
  _prevState: CreateItemState,
  formData: FormData,
): Promise<CreateItemState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Tu dois être connecté." };
  }

  const fields = parseItemFields(formData);
  if ("error" in fields) return fields;

  const categoryResult = await validateCategory(
    fields.categoryId,
    session.user.id,
  );
  if (!categoryResult.ok) return { error: categoryResult.error };

  const brandError = await validateBrand(fields.brandId, session.user.id);
  if (brandError) return brandError;

  const isHydration = categoryResult.category?.name === HYDRATION_CATEGORY_NAME;

  let imageUrl: string | undefined;
  let imageKey: string | undefined;
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    const result = await uploadItemImage(image);
    if ("error" in result) {
      return { error: result.error };
    }
    imageUrl = result.url;
    imageKey = result.key;
  }

  await prisma.item.create({
    data: {
      name: fields.name,
      weight: fields.weight,
      quantity: fields.quantity,
      userId: session.user.id,
      categoryId: fields.categoryId || null,
      brandId: fields.brandId || null,
      waterCapacityLiters: isHydration ? fields.waterCapacityLiters : null,
      imageUrl,
      imageKey,
    },
  });

  revalidatePath("/items");
  return null;
}

export async function updateItem(
  itemId: string,
  _prevState: CreateItemState,
  formData: FormData,
): Promise<CreateItemState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: "Tu dois être connecté." };
  }

  const existingItem = await prisma.item.findFirst({
    where: { id: itemId, userId: session.user.id },
  });
  if (!existingItem) {
    return { error: "Item introuvable." };
  }

  const fields = parseItemFields(formData);
  if ("error" in fields) return fields;

  const categoryResult = await validateCategory(
    fields.categoryId,
    session.user.id,
  );
  if (!categoryResult.ok) return { error: categoryResult.error };

  const brandError = await validateBrand(fields.brandId, session.user.id);
  if (brandError) return brandError;

  const isHydration = categoryResult.category?.name === HYDRATION_CATEGORY_NAME;

  let imageUrl = existingItem.imageUrl;
  let imageKey = existingItem.imageKey;
  const image = formData.get("image");
  const removeImage = formData.get("removeImage") === "true";

  if (image instanceof File && image.size > 0) {
    const result = await uploadItemImage(image);
    if ("error" in result) {
      return { error: result.error };
    }
    if (existingItem.imageKey) {
      await deleteItemImage(existingItem.imageKey);
    }
    imageUrl = result.url;
    imageKey = result.key;
  } else if (removeImage && existingItem.imageKey) {
    await deleteItemImage(existingItem.imageKey);
    imageUrl = null;
    imageKey = null;
  }

  await prisma.item.update({
    where: { id: existingItem.id },
    data: {
      name: fields.name,
      weight: fields.weight,
      quantity: fields.quantity,
      categoryId: fields.categoryId || null,
      brandId: fields.brandId || null,
      waterCapacityLiters: isHydration ? fields.waterCapacityLiters : null,
      imageUrl,
      imageKey,
    },
  });

  revalidatePath("/items");
  return null;
}

export async function deleteItem(itemId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Tu dois être connecté.");
  }

  const item = await prisma.item.findFirst({
    where: { id: itemId, userId: session.user.id },
    select: { id: true, imageKey: true },
  });
  if (!item) {
    throw new Error("Item introuvable.");
  }

  if (item.imageKey) {
    await deleteItemImage(item.imageKey);
  }

  await prisma.item.delete({ where: { id: item.id } });

  revalidatePath("/items");
}
