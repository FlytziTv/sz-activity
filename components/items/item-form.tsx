"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createItem, updateItem } from "@/lib/actions/items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import Image from "next/image";
import { HYDRATION_CATEGORY_NAME } from "@/lib/item-weight";
import { ITEM_HIKE_STATUS_LABELS } from "@/lib/labels";

const ITEM_STATUS_VALUES = ["OK", "DAMAGED", "LOST", "TO_REPLACE"] as const;

type Category = { id: string; name: string };
type Brand = { id: string; name: string };
type Item = {
  id: string;
  name: string;
  weight: number | null;
  quantity: number;
  status: string;
  categoryId: string | null;
  imageUrl: string | null;
  brand: Brand | null;
  waterCapacityLiters: number | null;
};

export function ItemForm({
  categories,
  brands,
  item,
  onSuccess,
}: {
  categories: Category[];
  brands: Brand[];
  item?: Item;
  onSuccess?: () => void;
}) {
  const isEdit = !!item;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [categoryId, setCategoryId] = useState(item?.categoryId ?? "none");

  const isHydration = categories.some(
    (category) =>
      category.id === categoryId && category.name === HYDRATION_CATEGORY_NAME,
  );

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);
    const result = isEdit
      ? await updateItem(item.id, null, formData)
      : await createItem(null, formData);
    setPending(false);
    if (result?.error) {
      setError(result.error);
    } else {
      onSuccess?.();
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="item-name">Nom</FieldLabel>
          <Input
            id="item-name"
            name="name"
            placeholder="Réchaud MSR"
            defaultValue={item?.name}
            required
          />
        </Field>

        <Field orientation="responsive">
          <Field>
            <FieldLabel htmlFor="item-weight">Poids (g)</FieldLabel>
            <Input
              id="item-weight"
              name="weight"
              type="number"
              placeholder="500"
              min={0}
              step={1}
              defaultValue={item?.weight ?? undefined}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="item-quantity">Quantité</FieldLabel>
            <Input
              id="item-quantity"
              name="quantity"
              type="number"
              min={1}
              step={1}
              defaultValue={item?.quantity ?? 1}
              required
            />
          </Field>
        </Field>

        <Field>
          <FieldLabel htmlFor="item-image">Photo</FieldLabel>
          {item?.imageUrl && !removeImage && (
            <div>
              <div className="flex relative overflow-hidden rounded-md w-16 h-16">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={() => setRemoveImage(true)}
                  aria-label="Retirer l'image"
                  className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
          {removeImage && (
            <input type="hidden" name="removeImage" value="true" />
          )}
          <Input id="item-image" name="image" type="file" accept="image/*" />
        </Field>

        <Field>
          <FieldLabel htmlFor="item-brandId">Marque</FieldLabel>
          <Select name="brandId" defaultValue={item?.brand?.id ?? "none"}>
            <SelectTrigger id="item-brandId" className="w-full">
              <SelectValue placeholder="Choisir une marque" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">Aucune marque</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="item-categoryId">Catégorie</FieldLabel>
          <Select
            name="categoryId"
            value={categoryId}
            onValueChange={setCategoryId}
          >
            <SelectTrigger id="item-categoryId" className="w-full">
              <SelectValue placeholder="Choisir une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">Aucune catégorie</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        {isEdit && (
          <Field>
            <FieldLabel htmlFor="item-status">Statut</FieldLabel>
            <Select name="status" defaultValue={item.status}>
              <SelectTrigger id="item-status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ITEM_STATUS_VALUES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {ITEM_HIKE_STATUS_LABELS[value] ?? value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}

        {isHydration && (
          <Field>
            <FieldLabel htmlFor="item-waterCapacityLiters">
              Contenance en eau (L)
            </FieldLabel>
            <Input
              id="item-waterCapacityLiters"
              name="waterCapacityLiters"
              type="number"
              placeholder="3"
              min={0}
              step={0.1}
              defaultValue={item?.waterCapacityLiters ?? undefined}
            />
          </Field>
        )}

        {error && <FieldError>{error}</FieldError>}

        <Button type="submit" disabled={pending}>
          {pending
            ? "Enregistrement..."
            : isEdit
              ? "Enregistrer"
              : "Ajouter l'item"}
        </Button>
      </FieldGroup>
    </form>
  );
}
