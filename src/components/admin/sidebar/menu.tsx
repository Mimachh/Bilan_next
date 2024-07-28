"use client";
import {
  Bell,
  Calendar,
  Clock,
  Ellipsis,
  HandPlatter,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  PencilIcon,
  Settings,
  Star,
  StickyNote,
  Store,
  Timer,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { CollapseMenuButton } from "./collapse-menu-button";


import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";
import { ROUTES } from "@/config/routes";

interface MenuProps {
  isOpen: boolean | undefined;
}

interface MenuListProps {
  groupLabel: string | null;
  menus: Array<{
    label: string;
    href: string;
    active: boolean;
    icon: any;
    submenus: Array<{
      label: string;
      href: string;
      active: boolean;
    }>;
  }>;
}
export function Menu(props: MenuProps) {
  const { isOpen } = props;
  const pathname = usePathname();
  //   const menuList = getMenuList(pathname);

  let menuList: MenuListProps[] = [];

  menuList = [
    {
      groupLabel: null,
      menus: [
        {
          label: "Dashboard",
          href: ROUTES.dashboard,
          active: pathname === ROUTES.dashboard,
          icon: LayoutDashboard,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Compteurs",
      menus: [
        {
          label: "Compteurs",
          href: "",
          active: pathname === ROUTES.category,
          icon: Timer,
          submenus: [
            {
              label: "Catégories",
              href: ROUTES.category,
              active: pathname === ROUTES.category,
            },
            {
              label: "Rafraichisseur de compteurs",
              href: ROUTES.refresh,
              active: pathname === ROUTES.refresh,
            },
            {
              label: "Stats",
              href: ROUTES.statistic,
              active: pathname === ROUTES.statistic,
            },
          ],
        },
        {
          label: "Paramètres",
          href: ROUTES.dashboard,
          active: pathname === `/`,
          icon: Settings,
          submenus: [
            {
              label: "Informations générales",
              href: ROUTES.dashboard,
              active: pathname === `/`,
            },
          ],
        },
      ],
    },
  ];



  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="flex w-full items-center justify-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className="mb-1 h-10 w-full justify-start"
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="flex w-full grow items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="w-full">
                  <LogoutButton>
                    <div className="border hover:bg-secondary/80  rounded-md mt-5 h-10 w-full justify-center flex items-center">
                      <span className={cn(isOpen === false ? "" : "mr-4")}>
                        <LogOut size={18} />
                      </span>
                      <p
                        className={cn(
                          "whitespace-nowrap",
                          isOpen === false ? "hidden opacity-0" : "opacity-100"
                        )}
                      >
                        Déconnexion
                      </p>
                    </div>
                  </LogoutButton>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">
                    <LogoutButton>Déconnexion</LogoutButton>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
