import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ColourfulText } from '../ui/colorful-text'

const BetaNav = () => {
  return (
    <nav className="sticky top-0 inset-x-0  bg-black/70 backdrop-blur-md text-white z-50  px-4">
    <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
      <h1 className='font-bold font-madeTommy text-3xl'>
        <ColourfulText text='France' /> Chaos</h1>
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