import Dropdown, { DropdownItem } from './ui/dropdown'
import { Icons } from './ui/icons'

const items: DropdownItem[] = [
    {
        label: "Profile",
        icon: <Icons.dashboard className='w-4 h-4' />,
        href: "/profile"
    },
    {
        label: "Settings",
        icon: <Icons.commission className='w-4 h-4' />,
    }
]

const Header = () => {
    return (
        <header className='sticky top-0 z-10 bg-white min-h-[77px] border-b border-[#E5E5E5] flex items-center px-8'>
            Header Content
            <Dropdown
                trigger={<button className='ml-auto flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer'>
                    <span className='w-12 h-12 rounded-full border'></span>
                    John Doe
                </button>}
                items={items}
            />
        </header>
    )
}

export default Header
