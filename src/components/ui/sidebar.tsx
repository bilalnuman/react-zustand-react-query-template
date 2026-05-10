"use client"
import { sidebarItems } from '@/constant.data/sidebar-items'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { Icons } from './icons'
import { Button } from './button'
import { memo } from 'react'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/use-auth-store'
import { SalesRepCanNotAccessTheseRoutes } from '@/constant.data/routes'
const Sidebar = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { mutate: logout, isPending } = useApiMutation({ url: "/auth/logout", })
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);
  const handleLogout = () => {
    logout({}, {
      onSuccess: (res: any) => {
        toast.success(res?.message)
        setUser(null)
        router.replace("/login")
      }
    })
  }
  return (
    <>
      <nav className="space-y-2 w-full">
        {sidebarItems.map((item) => {
          if(user?.role === "sales_rep" && SalesRepCanNotAccessTheseRoutes.includes(item.path.split("/")?.[1])) return
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
      <Button onClick={handleLogout} type='button' variant={isPending ? "default" : "ghost"} icon={<Icons.logout size={24} />} className='px-4 relative bottom-10 py-6 hover:bg-dark-900 hover:text-white w-full justify-start'>
        <p className='flex justify-between flex-1'>
          Logout
          {isPending && <Icons.spinner size={24} />}
        </p>
      </Button>
    </>
  )
}

export default memo(Sidebar)
