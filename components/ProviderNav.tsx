'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CirclePlus, List, Backpack } from 'lucide-react'

const ProviderNavigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/createNew', icon: CirclePlus, label: 'Create activity' },
    { href: '/reservations', icon: Backpack, label: 'Reservations' },
    { href: '/activityListings', icon: List, label: 'Activity Listings' },
  ]

  return (
    <nav className="hidden md:block w-[250px] p-4">
      <ul className="flex flex-col gap-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href} className={`flex flex-row items-center gap-2 
              ${pathname === item.href ? 'text-mono-900  font-bold' : 'text-mono-600' }`}>
              <div className="w-8 h-8 flex items-center justify-center">
                <item.icon className={`w-6 h-6
                  ${pathname === item.href ? 'text-mono-900' : 'text-mono-600'}`} />
              </div>
              <span className="text-base mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default ProviderNavigation

