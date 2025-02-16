import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const BetaNav = () => {
  return (
    <nav className="sticky top-0 inset-x-0  bg-black backdrop-blur-sm text-white z-50  px-4">
    <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
      <div className="w-12 h-12 bg-red-300 rounded-full" />
      <div className="flex items-center gap-4">
        <NavigationMenu className="border-none">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent hover:text-primaryColor"
                  )}
                >
                  Nous contacter
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  </nav>
  )
}

export default BetaNav