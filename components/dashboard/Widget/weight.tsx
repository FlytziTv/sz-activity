export default function Weight() {
  return (
    <div className="bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl p-4 col-span-2 flex flex-col justify-between ">
      {/* Header */}
      <div className="flex flex-row items-center justify-between">
        <h5 className="text-black text-base font-semibold">Poids</h5>
        <p className="text-gray-700 text-sm font-medium opacity-60 ">
          14h56 - 14/02/2026
        </p>
      </div>

      <h2 className="font-semibold text-7xl">
        62.3<span className="ml-1 text-3xl text-gray-400">kg</span>
      </h2>
    </div>
  );
}
