import type { IStatItem } from '../types'

export const stats: IStatItem[] = [
  { id: 'years', value: 15, suffixKey: '+', labelKey: 'stats.years', iconName: 'Building2' },
  { id: 'clients', value: 50000, suffixKey: '+', labelKey: 'stats.clients', iconName: 'Users' },
  { id: 'cities', value: 20, suffixKey: '+', labelKey: 'stats.cities', iconName: 'MapPin' },
  { id: 'uptime', value: 999, suffixKey: '%', labelKey: 'stats.uptime', iconName: 'Activity' },
]
