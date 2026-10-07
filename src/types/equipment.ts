export type EquipmentType = 'dish' | 'router' | 'accessory' | 'switch' | 'power'

export type EquipmentSpecKeys = readonly [string, string, string]

export interface EquipmentItem {
  id: string
  nameKey: string
  brand: string
  type: EquipmentType
  price: number
  priceKey: string
  descriptionKey: string
  specKeys: EquipmentSpecKeys
  image: string
}

export type EquipmentFilterType = 'all' | EquipmentType
