import { WifiHigh, Network, Plug, ShareNetwork, PlugCharging } from '@phosphor-icons/react'
import type { EquipmentType } from '../../types/equipment'

export const EASE = [0.32, 0.72, 0, 1] as const

export type EquipmentIcon = typeof WifiHigh

export const equipmentIconMap: Record<EquipmentType, EquipmentIcon> = {
  dish: WifiHigh,
  router: Network,
  accessory: Plug,
  switch: ShareNetwork,
  power: PlugCharging,
}

export interface EquipmentTypeStyles {
  badge: string
  iconBg: string
  imageBg: string
}

export const equipmentTypeStyles: Record<EquipmentType, EquipmentTypeStyles> = {
  dish: {
    badge: 'bg-[#4274D9]/10 text-[#293681] dark:bg-[#4274D9]/15 dark:text-[#95CCDD]',
    iconBg: 'from-[#4274D9] to-[#293681]',
    imageBg: 'from-[#4274D9]/10 via-[#95CCDD]/5 to-transparent dark:from-[#4274D9]/15 dark:via-[#95CCDD]/5',
  },
  router: {
    badge: 'bg-[#95CCDD]/25 text-[#293681] dark:bg-[#95CCDD]/15 dark:text-[#95CCDD]',
    iconBg: 'from-[#95CCDD] to-[#4274D9]',
    imageBg: 'from-[#95CCDD]/15 via-[#4274D9]/5 to-transparent dark:from-[#95CCDD]/12 dark:via-[#4274D9]/5',
  },
  accessory: {
    badge: 'bg-[#D0E7E6]/50 text-[#293681] dark:bg-[#D0E7E6]/12 dark:text-[#D0E7E6]',
    iconBg: 'from-[#D0E7E6] to-[#95CCDD]',
    imageBg: 'from-[#D0E7E6]/30 via-[#95CCDD]/8 to-transparent dark:from-[#D0E7E6]/10 dark:via-[#95CCDD]/4',
  },
  switch: {
    badge: 'bg-[#293681]/8 text-[#293681] dark:bg-[#4274D9]/15 dark:text-[#95CCDD]',
    iconBg: 'from-[#293681] to-[#4274D9]',
    imageBg: 'from-[#293681]/10 via-[#4274D9]/6 to-transparent dark:from-[#293681]/25 dark:via-[#4274D9]/8',
  },
  power: {
    badge: 'bg-[#4274D9]/10 text-[#293681] dark:bg-[#95CCDD]/12 dark:text-[#95CCDD]',
    iconBg: 'from-[#4274D9] to-[#95CCDD]',
    imageBg: 'from-[#4274D9]/12 via-[#D0E7E6]/8 to-transparent dark:from-[#4274D9]/15 dark:via-[#D0E7E6]/6',
  },
}

export function equipmentIconColor(type: EquipmentType): string {
  return type === 'accessory' ? 'text-[#293681] dark:text-white' : 'text-white'
}
