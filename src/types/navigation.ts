export interface INavLink {
  id: string
  labelKey: string
  href: string
}

export interface INavItem extends INavLink {
  isActive: boolean
}

export interface IDesktopNavProps {
  navItems: INavItem[]
  isOverDarkBg: boolean
  prefersReduced: boolean
}
