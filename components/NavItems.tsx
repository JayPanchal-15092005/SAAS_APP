'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const navItems = [
    { label:'Home', href: '/' },
    { label: 'Companions', href: '/companions' },
    { label: 'My Journey', href: 'my-journey' },
]

const NavItems = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-4 text-black">
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(pathname === href && 'text-primary font-bold')}
                    // Please use the  font-semibold if the text is not good after completed the Project.
                >
                    {label}
                </Link>
            ))}
        </nav>
    )
}

export default NavItems;