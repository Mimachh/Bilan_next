import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/next-auth-config/auth";
import "./globals.css";
import "./font.css";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import CredenzaProvider from "@/providers/credenza-provider";
const montSerrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" className={montSerrat.className}>
        <body>
          <Toaster />
          <SonnarToaster />
          {/* <div vaul-drawer-wrapper="" className='!bg-white'> */}
          <CredenzaProvider>{children}</CredenzaProvider>
          {/* </div> */}
        </body>
      </html>
    </SessionProvider>
  );
}
