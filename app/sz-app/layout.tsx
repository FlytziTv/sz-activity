import Header from "@/components/sz/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-16.5 px-2">{children}</main>
    </>
  );
}
