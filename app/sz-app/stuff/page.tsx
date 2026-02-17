import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import StuffCard from "@/components/cards/StuffCard";
import StuffForm from "@/components/form/stuffsForm";

async function getStuff() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return [];

  // On récupère uniquement le matériel de l'utilisateur connecté
  const allStuff = db
    .prepare(
      `
    SELECT * FROM stuff 
    WHERE userId = ? 
    ORDER BY created_at DESC
  `,
    )
    .all(session.user.id);

  return allStuff;
}

export default async function Stuff() {
  const items = await getStuff();

  return (
    <>
      <div className="grid grid-cols-4 gap-2 ">
        {items.map((item: any) => (
          <StuffCard
            key={item.id}
            name={item.name}
            brand={item.brand}
            type={item.type}
            weight={item.weight}
            url={item.url}
            image={item.image}
          />
        ))}
        <StuffForm />
      </div>
    </>
  );
}

export function FormGroup({
  name,
  label,
  type,
  placeholder,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium text-base">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        className="py-2 px-3 bg-[#F7F7F7] rounded-lg text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-[#000000]/50 transition-colors duration-300"
      />
    </div>
  );
}
