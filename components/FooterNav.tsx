'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Album, Trophy, Bell, User } from 'lucide-react'

const FooterNavigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/bookings', icon: Album, label: 'Bookings' },
    { href: '/leaderboard', icon: Trophy, label: 'Leaderboards' },
    { href: '/inbox', icon: Bell, label: 'Inbox' },
    { href: '/account', icon: User, label: 'Account' },
  ]

  return (
    <nav className="block lg:hidden fixed bottom-0 left-0 right-0 pb-5 bg-white border-t border-mono-200"
      // style={{ boxShadow: '0 -16px 16px -1px rgba(0, 0, 0, 0.08), 0 -8px 8px -1px rgba(0, 0, 0, 0.04)' }}
    >
      <ul className="flex justify-around items-center h-18">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href} prefetch className={`flex flex-col items-center p-2
              ${pathname === item.href ? 'text-mono-900 font-bold' : 'text-mono-400'}`}>
              <div className={`w-10 h-10 flex items-center justify-center ${pathname === item.href ? 'bg-primary-200 rounded-lg' : ''}`}>
                <item.icon className={`w-6 h-6 
                  ${pathname === item.href ? 'text-secondary-400' : 'text-mono-400'}`} />
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FooterNavigation

