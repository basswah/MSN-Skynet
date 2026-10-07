import type { ITranslationMap } from './types'
import { enHome } from './en/home'
import { enEquipment } from './en/equipment'
import { enSections } from './en/sections'

export const en: ITranslationMap = {
  ...enHome,
  ...enEquipment,
  ...enSections,
}
