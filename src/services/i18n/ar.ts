import type { ITranslationMap } from './types'
import { arHome } from './ar/home'
import { arEquipment } from './ar/equipment'
import { arSections } from './ar/sections'

export const ar: ITranslationMap = {
  ...arHome,
  ...arEquipment,
  ...arSections,
}
