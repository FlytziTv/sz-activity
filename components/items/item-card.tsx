import { ImageOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { EditItemButton } from "./editItem-button";
import { DeleteItemButton } from "./deleteItem-button";
import Image from "next/image";
import KeyValue from "./KeyValue";

export default function ItemCard({
  item,
  categories,
  brands,
}: {
  item: {
    id: string;
    name: string;
    weight: number | null;
    quantity: number;
    categoryId: string | null;
    brand: { id: string; name: string } | null;
    category: { id: string; name: string } | null;
    imageUrl: string | null;
    status: string;
    waterCapacityLiters: number | null;
  };
  categories: { id: string; name: string }[];
  brands: { id: string; name: string }[];
}) {
  return (
    <Card size="sm">
      <CardContent className="flex flex-row gap-4">
        <div className="relative overflow-hidden rounded-md w-40 h-40 bg-muted">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="160px"
              className="rounded-md object-cover"
            />
          ) : (
            <div className="flex size-40 items-center justify-center rounded-md">
              <ImageOff className="size-8 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex flex-1 min-w-0 flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-2">
              <span className="min-w-0 flex-1 truncate font-semibold text-xl">
                {item.name}
              </span>

              <div className="flex flex-row gap-1 items-center justify-end shrink-0">
                <EditItemButton
                  item={{
                    id: item.id,
                    name: item.name,
                    weight: item.weight,
                    quantity: item.quantity,
                    categoryId: item.categoryId,
                    imageUrl: item.imageUrl,
                    brand: item.brand,
                    waterCapacityLiters: item.waterCapacityLiters,
                  }}
                  categories={categories}
                  brands={brands}
                />
                <DeleteItemButton itemId={item.id} itemName={item.name} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-6 items-start flex-wrap">
                <KeyValue
                  label="Marque"
                  value={item.brand?.name ?? "Sans marque"}
                />
                <KeyValue
                  label="Catégorie"
                  value={item.category?.name ?? "Sans catégorie"}
                />
              </div>

              <div className="flex flex-row gap-6 items-start flex-wrap">
                {item.weight != 0 && (
                  <KeyValue label="Poids" value={`${item.weight} g`} />
                )}
                {item.waterCapacityLiters != null && (
                  <KeyValue
                    label="Litrage"
                    value={`${item.waterCapacityLiters} L`}
                  />
                )}
                <KeyValue label="Quantité" value={item.quantity} />
              </div>

              <KeyValue label="Statut" value={item.status} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
