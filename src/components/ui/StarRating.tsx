import { Star } from '@phosphor-icons/react'

interface StarRatingProps {
  rating: number
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight={i < rating ? 'fill' : 'regular'}
          className={i < rating ? 'text-[#4274D9]' : 'text-slate-300 dark:text-slate-700'}
        />
      ))}
    </div>
  )
}
