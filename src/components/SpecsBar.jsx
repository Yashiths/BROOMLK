export default function SpecsBar({ specs }) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-gradient-to-t from-black/80 to-transparent px-12 py-8 flex justify-around md:justify-start md:space-x-24 text-white border-t border-white/5 backdrop-blur-sm">
      
      <div className="flex flex-col">
        <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Power</span>
        <span className="text-xl md:text-2xl font-bold tracking-tight text-blue-400 mt-1">
          {specs?.power}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Acceleration</span>
        <span className="text-xl md:text-2xl font-bold tracking-tight text-blue-400 mt-1">
          {specs?.acceleration}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Top Speed</span>
        <span className="text-xl md:text-2xl font-bold tracking-tight text-blue-400 mt-1">
          {specs?.topSpeed}
        </span>
      </div>

    </div>
  );
}