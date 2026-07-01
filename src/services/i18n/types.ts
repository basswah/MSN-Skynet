import type { ILocale } from '../../types'

export type TranslationKey = string

export interface ITranslationMap {
  [key: TranslationKey]: string
}

export interface ILocaleMap {
  ar: ITranslationMap
  en: ITranslationMap
}

export const LOCALE_MAP: Record<string, ILocale> = {
  ar: { dir: 'rtl', lang: 'ar' },
  en: { dir: 'ltr', lang: 'en' },
}
