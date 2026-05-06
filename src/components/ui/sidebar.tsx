"use client"
import { sidebarItems } from '@/constant.data/sidebar-items'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Icons } from './icons'
import { Button } from './button'
import { memo } from 'react'
import useLogout from '@/hooks/logout'

const Sidebar = () => {
  const pathName = usePathname()
  const logout = useLogout()
  return (
    <>
      <nav className="space-y-2 w-full">
        {sidebarItems.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons] || Icons.dashboard
          return (
            <Link
              key={item.path}
              href={item.path}
              className={twMerge(
                "flex items-center gap-2 text-dark-700 py-2.5 px-5 rounded-lg duration-300 hover:bg-dark-900 hover:text-white",
                pathName === item.path ? "bg-dark-900 text-white" : ""
              )}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <Button onClick={logout} type='button' variant="ghost" icon={<Icons.logout size={24} />} className='px-4 relative bottom-10 py-6 hover:bg-dark-900 hover:text-white w-full justify-start'>Logout</Button>
    </>
  )
}

export default memo(Sidebar)
