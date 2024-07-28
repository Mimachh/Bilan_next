"use client";
import { Navbar } from "@/components/admin/sidebar/navbar";
import { useSidebarStore } from "@/hooks/sidebar/useSidebarStore";
import { useSidebarToggle } from "@/hooks/sidebar/useSidebarToggle";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
}
const Core = (props: Props) => {
  const { children } = props;

  const sidebar = useSidebarStore(useSidebarToggle, (state) => state);
  if (!sidebar) return null;

  return (
    <main
      className={cn(
        "min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
        sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
      )}
    >
      <Navbar />
      <section className="min-h-[calc(100vh_-_56px)] relative z-0 flex flex-col gap-5 p-2 md:p-10">
        {children}
      </section>
    </main>
  );
};

export default Core;
