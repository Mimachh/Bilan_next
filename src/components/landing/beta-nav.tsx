"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ColourfulText } from "../ui/colorful-text";
import { usePathname } from "next/navigation";

const BetaNav = () => {
  const pathname = usePathname();

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Nous contacter", href: "/nous-contacter" },
  ];

  return (
    <nav className="sticky top-0 inset-x-0 bg-black/70 backdrop-blur-md text-white z-50 px-4">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
        <h1 className="font-bold font-madeTommy text-3xl">
          <ColourfulText text="France" /> Chaos
        </h1>
        <div className="flex items-center gap-4">
          <NavigationMenu className="border-none">
            <NavigationMenuList>
              {links.map((link, index) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(link.href + "/");

                return (
                  <NavigationMenuItem key={index}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        active={isActive}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'focus:bg-transparent focus:text-white data-[active]:bg-transparent data-[active]:text-primaryColor bg-transparent hover:bg-transparent hover:text-primaryColor'
                        )}
                      >
                        {link.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};

export default BetaNav;
