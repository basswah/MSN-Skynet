import { describe, it, expect } from 'vitest'
import { translations } from './translations'

describe('translations', () => {
  it('should have Arabic translations', () => {
    expect(translations.ar).toBeDefined()
    expect(translations.ar['nav.home']).toBe('الرئيسية')
    expect(translations.ar['hero.title']).toContain('سكاي نت')
  })

  it('should have English translations', () => {
    expect(translations.en).toBeDefined()
    expect(translations.en['nav.home']).toBe('Home')
    expect(translations.en['hero.title']).toContain('SkyNet')
  })

  it('should have matching keys for both languages', () => {
    const arKeys = Object.keys(translations.ar)
    const enKeys = Object.keys(translations.en)
    expect(arKeys).toEqual(enKeys)
  })

  it('should have contact information', () => {
    expect(translations.ar['contact.phone.value']).toBe('0994817193')
    expect(translations.en['contact.phone.value']).toBe('0994817193')
  })

  it('should have pricing data', () => {
    expect(translations.ar['pricing.starter.price']).toBe('850 ل.س')
    expect(translations.en['pricing.starter.price']).toBe('850 SYP')
  })
})
