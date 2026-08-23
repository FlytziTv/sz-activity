import NavBar from "@/components/layout/navbar";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
