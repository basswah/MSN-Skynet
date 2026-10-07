import { User } from '@phosphor-icons/react'

interface UserAvatarProps {
  className?: string
}

export function UserAvatar({ className }: UserAvatarProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-[#4274D9] to-[#293681] dark:from-[#95CCDD] dark:to-[#4274D9] ${className ?? ''}`}
    >
      <User size={24} weight="fill" className="text-white dark:text-[#0F172A]" />
    </div>
  )
}
