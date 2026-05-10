"use client"
import { useAuthStore } from '@/store/use-auth-store';
import Dropdown, { DropdownItem } from './ui/dropdown'
import { Icons } from './ui/icons'
import LocaleSwitcher from './ui/locale-switcher'
import { useTranslations } from 'next-intl';

const Header = () => {
    const tCommon = useTranslations("Common");
    const user = useAuthStore((s) => s.user);

    const items: DropdownItem[] = [
        {
            label: tCommon("profile"),
            icon: <Icons.dashboard className='w-4 h-4' />,
            href: "/profile"
        },
        {
            label: tCommon("settings"),
            icon: <Icons.commission className='w-4 h-4' />,
        }
    ]

    return (
        <header className='sticky top-0 z-10 bg-white min-h-[77px] border-b border-[#E5E5E5] flex items-center px-8 gap-4'>
            Header Content
            <div className='ml-auto flex items-center gap-6'>
                <LocaleSwitcher />
                <Dropdown
                    trigger={<button className='flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer'>
                        <span className='w-12 h-12 rounded-full border overflow-clip'>
                            <img src={user?.profile_url||""} width={48} height={48} alt='profile'/>
                        </span>
                        {user?.name}
                    </button>}
                    items={items}
                />
            </div>
        </header>
    )
}

export default Header
