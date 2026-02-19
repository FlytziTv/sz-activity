import Image from "next/image";
import KeyValue from "../sz/KeyValue";
import Link from "next/link";
import ActionButton from "../button/ActionButton";

export default function StuffCard({
  id,
  name,
  brand,
  category,
  weight,
  url,
  image,
}: {
  id: string;
  name: string;
  brand: string;
  category: string;
  weight: number;
  url: string;
  image: string;
}) {
  return (
    <div className="relative bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-2 flex flex-row gap-2 ">
      <div className="relative aspect-square rounded-lg h-full shrink-0 min-h-35">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain rounded-lg bg-white"
          />
        ) : (
          <div className="bg-white border border-gray-300 w-full h-full rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">Aucune image</span>
          </div>
        )}
      </div>
      {url ? (
        <Link
          href={url}
          target="_blank"
          className="bg-[#DCDCDC] rounded-lg p-2 w-full flex flex-col items-start gap-2 relative"
        >
          <KeyValue label="Nom" value={name} />
          <KeyValue label="Marque" value={brand} />
          <KeyValue label="Catégorie" value={category} />
          <KeyValue label="Poids" value={weight + " g"} />
        </Link>
      ) : (
        <div className="bg-[#DCDCDC] rounded-lg p-2 w-full flex flex-col items-start gap-2 relative">
          <KeyValue label="Nom" value={name} />
          <KeyValue label="Marque" value={brand} />
          <KeyValue label="Catégorie" value={category} />
          <KeyValue label="Poids" value={weight + " g"} />
        </div>
      )}
    </div>
  );
}
