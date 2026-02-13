import { Stuff } from "@/data/stuffs";
import Image from "next/image";
import KeyValue from "../sz/KeyValue";
import Link from "next/link";

export default function StuffCard({ stuff }: { stuff: Stuff }) {
  return (
    <Link
      href={stuff.url}
      className="bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-2 flex flex-row gap-2 "
    >
      <div className="relative aspect-square rounded-lg h-full shrink-0 min-h-35">
        <Image
          src={stuff.image}
          alt={stuff.name}
          fill
          className="object-contain rounded-lg"
        />
      </div>

      <div className="bg-[#DCDCDC] rounded-lg p-2 w-full flex flex-col items-start gap-2">
        <KeyValue label="Nom" value={stuff.name} />
        <KeyValue label="Marque" value={stuff.brand} />
        <KeyValue label="Type" value={stuff.type} />
        <KeyValue label="Poids" value={stuff.weight + " g"} />
      </div>
    </Link>
  );
}
