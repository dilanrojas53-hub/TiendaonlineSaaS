export function ProductVisual({ index, compact = false }: { index: number; compact?: boolean }) {
  const box = compact ? 'h-16 w-16 rounded-2xl' : 'h-36 w-48 rounded-[2rem]';
  const shape = compact ? 'h-7 w-12' : 'h-16 w-32';

  return (
    <div className={`relative flex ${box} items-center justify-center bg-gradient-to-br from-stone-100 via-amber-50 to-neutral-400 shadow-inner`}>
      <div className={`${shape} -rotate-12 rounded-full bg-white shadow-xl`} />
      <div className="absolute h-4 w-4 rounded-full bg-[#d4af37]" />
    </div>
  );
}
