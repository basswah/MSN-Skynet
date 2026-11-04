import { ArrowSquareOut, Wallet } from '@phosphor-icons/react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { externalLinks } from '../../services/externalLinks'
import { useI18nStore } from '../../store/useI18nStore'
import type { IPaymentLinkProps } from '../../types/payment'

export function PaymentLink({ compact = false, variant = 'button', lightOverride = false }: IPaymentLinkProps) {
  const t = useI18nStore((state) => state.t)
  const isText = variant === 'text'

  return (
    <a
      href={externalLinks.payment}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('payment.ariaLabel')}
      className={twMerge(clsx(
        'inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4274D9] focus-visible:ring-offset-2 motion-reduce:transition-none',
        isText
          ? 'justify-start rounded px-1 text-white/75 hover:text-white focus-visible:ring-offset-[#293681]'
          : 'border px-3 dark:focus-visible:ring-offset-slate-950',
        !isText && (lightOverride
          ? 'border-[#95CCDD]/60 bg-[#293681] text-white hover:bg-[#354a9b] focus-visible:ring-offset-[#293681]'
          : 'border-[#4274D9] bg-white text-[#293681] hover:bg-[#4274D9]/10 dark:border-[#95CCDD]/60 dark:bg-slate-950 dark:text-[#95CCDD] dark:hover:bg-slate-900'),
        compact && 'gap-1.5 px-2',
      ))}
    >
      <Wallet size={18} weight="duotone" aria-hidden="true" className="shrink-0" />
      <span>{t(compact ? 'payment.shortLabel' : 'payment.label')}</span>
      {!compact && <ArrowSquareOut size={14} aria-hidden="true" className="shrink-0" />}
    </a>
  )
}
