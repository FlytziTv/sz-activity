const sleepData = [
  { id: 1, quality: "affreuse", number: 0 },
  { id: 2, quality: "mauvaise", number: 1 },
  { id: 3, quality: "moyenne", number: 2 },
  { id: 4, quality: "bonne", number: 3 },
  { id: 5, quality: "excellente", number: 4 },
];

export default function Sleeps() {
  return (
    <div className="p-4 bg-[#E8E8E8] border border-[#DBDBDB] rounded-2xl w-full col-span-2 flex flex-col gap-4 ">
      <h2 className="text-base font-medium">Comment avez-vous dormi ?</h2>
      <div className="flex flex-row items-center justify-between w-full">
        {sleepData.map((data) => (
          <div key={data.id} className="group flex flex-col items-center">
            <h5 className="text-3xl font-bold select-none opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              {data.number}
            </h5>
            <p className="text-xs select-none opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              {data.quality}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
