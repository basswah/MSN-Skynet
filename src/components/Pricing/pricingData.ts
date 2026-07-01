import type { PricingPackage } from '../../types/pricing';

/**
 * Pricing data definitions for the Premium Pricing Section.
 * Each package references i18n keys for title, price, and feature list.
 */
export const pricingPackages: PricingPackage[] = [
  {
    id: 'browsing',
    titleKey: 'pricing.browsing.title',
    speed: '2 Mbps',
    priceKey: 'pricing.browsing.price',
    featuresKeys: [
      'pricing.feature.1',
      'pricing.feature.2',
      'pricing.feature.3',
      'pricing.feature.4',
    ],
    isPopular: false,
  },
  {
    id: 'family',
    titleKey: 'pricing.family.title',
    speed: '4 Mbps',
    priceKey: 'pricing.family.price',
    featuresKeys: [
      'pricing.feature.1',
      'pricing.feature.2',
      'pricing.feature.3',
      'pricing.feature.4',
    ],
    isPopular: true,
  },
  {
    id: 'business',
    titleKey: 'pricing.business.title',
    speed: '8 Mbps',
    priceKey: 'pricing.business.price',
    featuresKeys: [
      'pricing.feature.1',
      'pricing.feature.2',
      'pricing.feature.3',
      'pricing.feature.4',
    ],
    isPopular: false,
  },
];
