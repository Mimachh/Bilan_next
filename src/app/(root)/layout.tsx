import BetaFooter from "@/components/landing/beta-footer";
import BetaNav from "@/components/landing/beta-nav";
import GoogleCaptchaProvider from "@/providers/google-recaptcha-provider";
import ModalProvider from "@/providers/modal-provider";
import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "France Chaos - Le bilan en direct de la France",
  description: "Le bilan en temps réel de la France sous le mandat de Emmanuel Macron.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

const gaId = process.env.ANALYTICS ?? '';
  return (
    <GoogleCaptchaProvider>
      <ModalProvider>
        <div className="h-max bg-black w-full relative">
          <BetaNav />
          {children}
          <BetaFooter />
          <GoogleAnalytics gaId={gaId as string} />
        </div>
      </ModalProvider>
    </GoogleCaptchaProvider>
  );
}
