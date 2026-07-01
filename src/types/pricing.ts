export interface IPricingFeature {
  labelKey: string
  included: boolean
}

export interface IPricingPlan {
  id: string
  nameKey: string
  speed: string
  price: string
  currencyKey: string
  isPopular: boolean
  features: IPricingFeature[]
  ctaKey: string
}

export interface PricingPackage {
  id: string
  titleKey: string
  speed: string
  priceKey: string
  featuresKeys: string[]
  isPopular: boolean
}
