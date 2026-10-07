import { useCallback, useMemo, useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { EquipmentHero } from '../components/equipment/EquipmentHero'
import { EquipmentFilter } from '../components/equipment/EquipmentFilter'
import { EquipmentGrid } from '../components/equipment/EquipmentGrid'
import { EquipmentCTA } from '../components/equipment/EquipmentCTA'
import { equipmentItems } from '../data/equipmentData'
import type { EquipmentFilterType } from '../types/equipment'

export function EquipmentPage() {
  const [activeFilter, setActiveFilter] = useState<EquipmentFilterType>('all')

  const handleFilterChange = useCallback((filter: EquipmentFilterType) => {
    setActiveFilter(filter)
  }, [])

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return equipmentItems
    return equipmentItems.filter((item) => item.type === activeFilter)
  }, [activeFilter])

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 lg:pt-[72px]">
        <EquipmentHero />
        <div className="mx-auto max-w-[1400px] px-5 pb-8 sm:px-6 lg:px-8">
          <EquipmentFilter activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          <EquipmentGrid items={filteredItems} totalCount={equipmentItems.length} />
        </div>
        <EquipmentCTA />
      </div>
      <Footer />
    </>
  )
}
