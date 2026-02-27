import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserLists } from "@/lib/queries/lists";
import ListsCard from "@/components/lists/cards/ListsCard";

export default async function Lists() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sz-app/login");

  const userLists = await getUserLists(session.user.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
      {userLists.map((list) => (
        <ListsCard key={list.id} list={list} />
      ))}
    </div>
  );
}
