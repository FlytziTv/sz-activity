import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserLists } from "@/lib/queries/lists";
import ListsCard from "@/components/cards/ListsCard";
import ListsForm from "@/components/form/ListsForm";

export default async function Lists() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sz-app/login");

  const userLists = await getUserLists(session.user.id);

  return (
    <div className="grid grid-cols-5 gap-2">
      {userLists.map((list) => (
        <ListsCard key={list.id} list={list} />
      ))}
      <ListsForm />
    </div>
  );
}
