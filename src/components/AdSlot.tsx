export default function AdSlot({ position }: { position: 'top' | 'middle' | 'bottom' }) {
  const heightMap = {
    top: 'h-24',
    middle: 'h-20',
    bottom: 'h-28',
  }

  return (
    <div
      className={`${heightMap[position]} w-full rounded-xl bg-gray-100 dark:bg-slate-800 border-2 border-dashed border-gray-200 dark:border-slate-700 flex items-center justify-center text-sm text-gray-400 dark:text-slate-500 select-none`}
    >
      <span>广告位{position === 'top' ? '（顶部）' : position === 'middle' ? '（中部）' : '（底部）'}</span>
    </div>
  )
}
