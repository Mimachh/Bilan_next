import BetaFooter from "@/components/landing/beta-footer";
import BetaNav from "@/components/landing/beta-nav";
import GoogleCaptchaProvider from "@/providers/google-recaptcha-provider";
import ModalProvider from "@/providers/modal-provider";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <GoogleCaptchaProvider>
      <ModalProvider>
        <div className="h-max bg-black w-full relative">
          <BetaNav />
          {children}
          <BetaFooter />
        </div>
      </ModalProvider>
    </GoogleCaptchaProvider>
  );
}
