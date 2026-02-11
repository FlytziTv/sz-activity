export default function Weight() {
  return (
    <div className="p-4 bg-[#171717] w-full rounded-xl col-span-2 flex flex-col justify-between ">
      <h2 className="font-semibold text-7xl">
        62.3<span className="ml-1 text-3xl text-white/40">kg</span>
      </h2>
      <div className="group flex flex-col items-start">
        <h5 className="text-lg font-bold select-none">Poids corporel</h5>
        <p className="text-xs select-none opacity-60">
          Enregistré il y a 16 heures
        </p>
      </div>
    </div>
  );
}
